import test from "node:test";
import assert from "node:assert/strict";
import { deleteProject, getRecentProjectId, loadProjects, saveProject, setRecentProjectId } from "../js/storage.js";

class MemoryStorage {
  values = new Map();
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { this.values.set(key, String(value)); }
  removeItem(key) { this.values.delete(key); }
}

test("projects save by ID without replacing other projects", () => {
  const storage = new MemoryStorage();
  const first = { id: "first", name: "First", stages: [] };
  const second = { id: "second", name: "Second", stages: [] };

  assert.equal(saveProject(first, storage).ok, true);
  assert.equal(saveProject(second, storage).ok, true);
  assert.equal(saveProject({ ...first, name: "First edited" }, storage).ok, true);
  assert.deepEqual(loadProjects(storage).projects.map(({ id, name }) => ({ id, name })), [
    { id: "first", name: "First edited" }, { id: "second", name: "Second" }
  ]);
});

test("the most recently opened project is stored separately", () => {
  const storage = new MemoryStorage();
  setRecentProjectId("project-2", storage);
  assert.equal(getRecentProjectId(storage), "project-2");
  assert.deepEqual(loadProjects(storage).projects, []);
});

test("deleting one project preserves others and clears its recent-project pointer", () => {
  const storage = new MemoryStorage();
  saveProject({ id: "first", name: "First", stages: [] }, storage);
  saveProject({ id: "second", name: "Second", stages: [] }, storage);
  setRecentProjectId("first", storage);

  assert.deepEqual(deleteProject("first", storage), { ok: true, deleted: true, error: null });
  assert.deepEqual(loadProjects(storage).projects.map((project) => project.id), ["second"]);
  assert.equal(getRecentProjectId(storage), null);
});

test("a failed project-list write does not delete the project", () => {
  const storage = new MemoryStorage();
  saveProject({ id: "keep", name: "Keep me", stages: [] }, storage);
  const originalSetItem = storage.setItem.bind(storage);
  storage.setItem = (key, value) => {
    if (key === "scopesprint.projects.v1") throw new Error("Storage full");
    originalSetItem(key, value);
  };

  const result = deleteProject("keep", storage);
  assert.equal(result.ok, false);
  assert.equal(result.deleted, false);
  assert.deepEqual(loadProjects(storage).projects.map((project) => project.id), ["keep"]);
});

test("invalid saved JSON returns a readable storage error instead of crashing", () => {
  const storage = new MemoryStorage();
  storage.setItem("scopesprint.projects.v1", "not json");
  const result = loadProjects(storage);
  assert.deepEqual(result.projects, []);
  assert.match(result.error, /could not be read/i);
});
