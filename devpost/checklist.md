---
doc: checklist
status: approved
---

# Build Checklist

Build mode: learn

## Slices

- [ ] **1. Create an idea and see its scoped plan**
  Becomes usable: A running dashboard accepts a valid project name, idea, and positive hours value and opens a staged MVP plan. Invalid fields stay on the dashboard with clear messages. The plan shows task details, estimates, progress, and the narrowing explanation when needed; checking a task updates progress for the current visit.
  Why now: This proves ScopeSprint's unique idea-to-manageable-plan journey early. The basic app setup is included in this working behavior, not delivered as an empty scaffold.
  PRD ref: `prd.md > The Core Journey`, `prd.md > Dashboard and Project Creation`, `prd.md > Project Task Plan`
  Spec ref: `spec.md > How This Works, In Plain Language`, `spec.md > Rules-based planner`, `spec.md > Project plan and task interactions`, `spec.md > File Structure`
  Build: Create the static HTML/CSS/JavaScript app and local run instructions; implement trimmed form validation, curated keyword templates with a generic fallback, minute-based budget checks and honest too-small-budget warnings, staged task display, expandable details, estimates, and in-session task checkboxes that recalculate progress.
  Verify (mechanical): Run `node --check js/app.js` and `node --test tests/planner.test.mjs`; both passed (nine planner tests). Browser verification is pending: the user reports the server banner appears, but Windows `Test-NetConnection 127.0.0.1 -Port 8000` returned `TcpTestSucceeded: False`. The user notes WSL is running; confirm whether the server and browser are using different environments, then verify the local page and check for browser console errors.
  Learner check: Pending a reachable preview. Enter a small app idea and a positive decimal hours budget, submit it, inspect the task stages, and check a task to see progress update. Then try a very small budget and an unmatched idea; confirm the app gives a clear fallback or time warning. Try blank/invalid fields and confirm nothing navigates or gets erased. Progress is only for this visit until Slice 2 adds saving.
  Commit: `Build the idea-to-plan journey`

- [ ] **2. Edit a plan and find it again later**
  Becomes usable: A real project can be renamed, its task titles changed, tasks added to a chosen stage, and tasks checked or unchecked; progress updates immediately and project changes survive refresh.
  Why now: Once the core plan is visible, this proves the promised beginner feedback loop and the first consequential data boundary: one user's projects save separately from each other.
  PRD ref: `prd.md > The Core Journey`, `prd.md > Project Task Plan`, `prd.md > Dashboard and Project Creation`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Project plan and task interactions`, `spec.md > Browser storage and theme`, `spec.md > Data Model`, `spec.md > Important Failure Modes`
  Build: Add per-project browser saving and dashboard reload; implement project-name editing, task-title editing, completion toggles, progress/stage counts, and the custom-task form. Custom tasks require a title and stage (Plan by default), allow optional description and positive estimate with minute/hour choice, need no completion criteria, append to the selected stage, start incomplete, and save only with the current project.
  Verify (mechanical): Run `node --test tests/planner.test.mjs`; include checks for progress after adding/checking a task and separate project updates. In the browser, create two projects, edit and add tasks in only one, refresh, and confirm changes and counts return only on that project.
  Learner check: Add a task to Build, leave its description and estimate blank, and confirm it appears last in Build and starts unchecked. Complete a task, refresh, and reopen the same project; compare its saved progress with the other project.
  Commit: `Save and edit project plans`

- [ ] **3. Explore the isolated sample and switch themes**
  Becomes usable: StudyBuddy is interactive but resets to its original state whenever opened; the theme follows the device until changed, then remembers the choice; the full app works on a narrow mobile screen.
  Why now: The main journey and saved-data boundary are already working. This adds the demo and final visual behavior without putting temporary demo edits at risk of entering real-project storage.
  PRD ref: `prd.md > Interactive StudyBuddy Sample`, `prd.md > StudyBuddy Sample Plan`, `prd.md > Theme and Responsive Use`, `prd.md > Look and Feel`
  Spec ref: `spec.md > StudyBuddy sample`, `spec.md > Browser storage and theme`, `spec.md > Look and Feel`, `spec.md > Important Failure Modes`
  Build: Add StudyBuddy's original sample data and reset/reopen behavior, sample navigation actions, system/manual theme handling, semantic palette variables, responsive layout, and readable keyboard, hover, error, disabled, and completed states.
  Verify (mechanical): Run `node --test tests/planner.test.mjs`. Start the app and manually exercise demo reset/reopen, theme toggle/reload, project-versus-sample storage isolation, field errors, keyboard focus, and narrow-screen layout; confirm no console errors.
  Learner check: Mark a StudyBuddy task complete, reset and reopen the sample, then check that it is back at zero and your own project is untouched. Switch theme, reload, and inspect the dashboard, plan, and sample in both palettes on a mobile-width window.
  Commit: `Add the resettable sample and responsive themes`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — after Slice 1, while remaining implementation can still respond to feedback
- [ ] Final kick-the-tires exploration and feedback completed — after Slice 3

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [record after the build; include actual code/test references and unfinished work if interrupted]
Route and stops: [record actual file paths and symbols after the build]
Edit outcome: [tried/kept/reverted/declined/not applicable; verification if changed]
Reflection: [offered/answered/declined/already covered; personal answer belongs only in the ignored learner profile]
Activity mode: [live app and editor, explicit static fallback, focused alternative, prior practice, or recap]

## Revisions
