import test from "node:test";
import assert from "node:assert/strict";
import { addSampleAssignment, createSampleProject, setSampleAssignmentCompletion, setSampleTaskCompletion } from "../js/sample.js";
import { calculateProgress, flattenTasks } from "../js/planner.js";

test("each StudyBuddy demo starts with its original tasks and zero progress", () => {
  const firstVisit = createSampleProject();
  const initialTasks = flattenTasks(firstVisit.stages);
  assert.equal(firstVisit.name, "StudyBuddy: A Student Planner App");
  assert.equal(initialTasks.length, 6);
  assert.equal(firstVisit.assignments.length, 2);
  assert.deepEqual(calculateProgress(initialTasks), { total: 6, completed: 0, percent: 0 });

  initialTasks[0].completed = true;
  firstVisit.assignments[0].completed = true;
  firstVisit.assignments.push({ id: "extra", title: "Extra example", completed: false });
  const reopenedDemo = createSampleProject();
  assert.deepEqual(calculateProgress(flattenTasks(reopenedDemo.stages)), { total: 6, completed: 0, percent: 0 });
  assert.equal(reopenedDemo.stages[0].tasks[0].completed, false);
  assert.equal(reopenedDemo.assignments.length, 2);
  assert.equal(reopenedDemo.assignments[0].completed, false);
});

test("the sample has ordered stages and clear task metadata", () => {
  const sample = createSampleProject();
  assert.deepEqual(sample.stages.map((stage) => stage.name), ["Plan", "Build", "Test & Polish"]);
  for (const task of flattenTasks(sample.stages)) {
    assert.ok(task.title);
    assert.ok(task.description);
    assert.ok(task.completionCriteria);
    assert.ok(task.estimatedMinutes > 0);
    assert.ok(["High", "Medium", "Low"].includes(task.priority));
  }
  assert.equal(sample.stages[0].tasks[1].demoAction, "sketch");
  assert.equal(sample.stages[1].tasks[1].demoAction, "add-assignment");
});

test("using the sample planner completes the matching plan steps", () => {
  const sample = createSampleProject();
  assert.equal(setSampleTaskCompletion(sample, "sample-plan-2", true), true);
  addSampleAssignment(sample, { id: "new-work", title: "Review notes", dueDate: "2026-11-01", completed: false });
  let tasks = flattenTasks(sample.stages);
  assert.equal(tasks.find((task) => task.id === "sample-plan-2").completed, true);
  assert.equal(tasks.find((task) => task.id === "sample-build-2").completed, true);
  assert.equal(tasks.find((task) => task.id === "sample-build-3").completed, false);

  assert.equal(setSampleAssignmentCompletion(sample, "new-work", true), true);
  tasks = flattenTasks(sample.stages);
  assert.equal(tasks.find((task) => task.id === "sample-build-3").completed, true);
  assert.equal(setSampleAssignmentCompletion(sample, "new-work", false), true);
  tasks = flattenTasks(sample.stages);
  assert.equal(tasks.find((task) => task.id === "sample-build-3").completed, false);
  assert.equal(setSampleAssignmentCompletion(sample, "missing", true), false);
  assert.equal(setSampleTaskCompletion(sample, "missing", true), false);
});
