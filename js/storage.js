const PROJECTS_KEY = "scopesprint.projects.v1";
const RECENT_PROJECT_KEY = "scopesprint.recent-project.v1";

export function loadProjects(storage) {
  try {
    const target = storage ?? globalThis.localStorage;
    const value = target.getItem(PROJECTS_KEY);
    if (!value) return { projects: [], error: null };
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) throw new Error("Saved projects are not a list.");
    return { projects: parsed, error: null };
  } catch {
    return { projects: [], error: "Saved projects could not be read. You can keep working, but older browser data may be unavailable." };
  }
}

export function saveProject(project, storage) {
  try {
    const target = storage ?? globalThis.localStorage;
    const { projects, error } = loadProjects(target);
    if (error) return { ok: false, error: "This project could not be saved because the saved-project list could not be read." };
    const index = projects.findIndex((item) => item.id === project.id);
    if (index < 0) projects.push(project);
    else projects[index] = project;
    target.setItem(PROJECTS_KEY, JSON.stringify(projects));
    return { ok: true, error: null };
  } catch {
    return { ok: false, error: "Browser storage is unavailable. Your current changes may not survive a refresh." };
  }
}

export function deleteProject(projectId, storage) {
  try {
    const target = storage ?? globalThis.localStorage;
    const { projects, error } = loadProjects(target);
    if (error) return { ok: false, deleted: false, error: "This project could not be deleted because the saved-project list could not be read." };
    const remaining = projects.filter((project) => project.id !== projectId);
    if (remaining.length === projects.length) return { ok: true, deleted: false, error: null };
    const wasRecent = target.getItem(RECENT_PROJECT_KEY) === projectId;
    target.setItem(PROJECTS_KEY, JSON.stringify(remaining));
    if (wasRecent) {
      try {
        if (typeof target.removeItem === "function") target.removeItem(RECENT_PROJECT_KEY);
        else target.setItem(RECENT_PROJECT_KEY, "");
      } catch { /* A stale recent ID is ignored when the dashboard rebuilds its project list. */ }
    }
    return { ok: true, deleted: true, error: null };
  } catch {
    return { ok: false, deleted: false, error: "Browser storage is unavailable. The project may still be saved." };
  }
}

export function getRecentProjectId(storage) {
  try { return (storage ?? globalThis.localStorage).getItem(RECENT_PROJECT_KEY); }
  catch { return null; }
}

export function setRecentProjectId(id, storage) {
  try {
    (storage ?? globalThis.localStorage).setItem(RECENT_PROJECT_KEY, id);
    return true;
  } catch { return false; }
}
