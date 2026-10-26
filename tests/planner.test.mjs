import test from "node:test";
import assert from "node:assert/strict";
import { buildPlan, calculateProgress, chooseTemplate, flattenTasks, formatEstimate, validateProjectInput } from "../js/planner.js";

test("required fields are trimmed and empty answers are rejected", () => {
  const { errors } = validateProjectInput({ name: "   ", ideaText: "  ", hours: "  " });
  assert.deepEqual(Object.keys(errors).sort(), ["hours", "ideaText", "name"]);
});

test("accepts a positive decimal hours budget and trims project name", () => {
  const result = validateProjectInput({ name: "  StudyBuddy ", ideaText: "A student study planner", hours: "2.5" });
  assert.deepEqual(result.errors, {});
  assert.equal(result.values.name, "StudyBuddy");
  assert.equal(result.values.hours, 2.5);
});

test("rejects zero, negative, and non-numeric hours", () => {
  for (const hours of ["0", "-1", "banana"]) {
    assert.ok(validateProjectInput({ name: "A", ideaText: "An app", hours }).errors.hours);
  }
});

test("matches a known student planner and falls back for other ideas", () => {
  assert.equal(chooseTemplate("StudyBuddy", "A planner for student assignments").key, "student");
  assert.equal(chooseTemplate("Garden notes", "Keep a list of plants and notes").key, "general");
});

test("uses a consistent minute budget and preserves the original idea exactly", () => {
  const ideaText = "  A student study planner for my friends.\n";
  const plan = buildPlan({ name: "StudyBuddy", ideaText, hours: "2.5" });
  assert.equal(plan.availableMinutes, 150);
  assert.equal(plan.ideaText, ideaText);
  assert.equal(plan.narrowed, true);
  assert.ok(plan.overCoreBudget);
  assert.ok(plan.stages.length > 0);
});

test("puts tasks into the required stage order", () => {
  const plan = buildPlan({ name: "StudyBuddy", ideaText: "A student assignment planner", hours: "10" });
  assert.deepEqual(plan.stages.map((stage) => stage.name), ["Plan", "Build", "Test & Polish"]);
});

test("oversized clone wording uses a smaller generic MVP and a narrowing explanation", () => {
  const plan = buildPlan({ name: "Ride app", ideaText: "An Uber clone with payment processing", hours: "80" });
  assert.equal(plan.templateKey, "general");
  assert.equal(plan.largeIdea, true);
  assert.equal(plan.narrowed, true);
  assert.ok(plan.postponedTasks.length > 0);
});

test("progress recalculates from task completion and handles an empty list", () => {
  assert.deepEqual(calculateProgress([]), { total: 0, completed: 0, percent: 0 });
  const plan = buildPlan({ name: "StudyBuddy", ideaText: "A student planner", hours: "10" });
  const tasks = flattenTasks(plan.stages);
  tasks[0].completed = true;
  assert.equal(calculateProgress(tasks).percent, Math.round(100 / tasks.length));
});

test("task estimates use minutes for short work and hours for longer work", () => {
  assert.equal(formatEstimate(25), "About 25 min");
  assert.equal(formatEstimate(60), "About 1 hour");
  assert.equal(formatEstimate(90), "About 1.5 hours");
});
