import test from "node:test";
import assert from "node:assert/strict";
import { createSampleProject } from "../js/sample.js";
import { calculateProgress, flattenTasks } from "../js/planner.js";

test("each StudyBuddy demo starts with its original tasks and zero progress", () => {
  const firstVisit = createSampleProject();
  const initialTasks = flattenTasks(firstVisit.stages);
  assert.equal(firstVisit.name, "StudyBuddy: A Student Planner App");
  assert.equal(initialTasks.length, 6);
  assert.deepEqual(calculateProgress(initialTasks), { total: 6, completed: 0, percent: 0 });

  initialTasks[0].completed = true;
  const reopenedDemo = createSampleProject();
  assert.deepEqual(calculateProgress(flattenTasks(reopenedDemo.stages)), { total: 6, completed: 0, percent: 0 });
  assert.equal(reopenedDemo.stages[0].tasks[0].completed, false);
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
});
