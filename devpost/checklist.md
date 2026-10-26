---
doc: checklist
status: approved
---

# Build Checklist

Build mode: learn

## Slices

- [x] **1. Create an idea and see its scoped plan**
  Becomes usable: A running dashboard accepts a valid project name, idea, and positive hours value and opens a staged MVP plan. Invalid fields stay on the dashboard with clear messages. The plan shows task details, estimates, progress, and the narrowing explanation when needed; checking a task updates progress for the current visit.
  Why now: This proves ScopeSprint's unique idea-to-manageable-plan journey early. The basic app setup is included in this working behavior, not delivered as an empty scaffold.
  PRD ref: `prd.md > The Core Journey`, `prd.md > Dashboard and Project Creation`, `prd.md > Project Task Plan`
  Spec ref: `spec.md > How This Works, In Plain Language`, `spec.md > Rules-based planner`, `spec.md > Project plan and task interactions`, `spec.md > File Structure`
  Build: Create the static HTML/CSS/JavaScript app and local run instructions; implement trimmed form validation, curated keyword templates with a generic fallback, minute-based budget checks and honest too-small-budget warnings, staged task display, expandable details, estimates, and in-session task checkboxes that recalculate progress.
  Verify (mechanical): `node --check js/app.js` and all nine planner tests pass. Browser smoke check: a 2.5-hour assignment-planner idea produced six ordered tasks and an honest three-hour core-plan warning; checking the first task changed progress from 0% to 17%. Submitting a whitespace-only name and zero hours displayed both inline errors and preserved the entered description. The learner later confirmed the refreshed preview and main flow worked.
  Learner check: Complete. The learner confirmed the preview worked; Slice 2 now adds saving for real projects.
  Commit: `Build the idea-to-plan journey`

- [x] **2. Edit a plan and find it again later**
  Becomes usable: A real project can be renamed, its task titles changed, tasks added to a chosen stage, and tasks checked or unchecked; progress updates immediately and project changes survive refresh.
  Why now: Once the core plan is visible, this proves the promised beginner feedback loop and the first consequential data boundary: one user's projects save separately from each other.
  PRD ref: `prd.md > The Core Journey`, `prd.md > Project Task Plan`, `prd.md > Dashboard and Project Creation`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Project plan and task interactions`, `spec.md > Browser storage and theme`, `spec.md > Data Model`, `spec.md > Important Failure Modes`
  Build: Add per-project browser saving and dashboard reload; implement project-name editing, task-title editing, completion toggles, progress/stage counts, and the custom-task form. Custom tasks require a title and stage (Plan by default), allow optional description and positive estimate with minute/hour choice, need no completion criteria, append to the selected stage, start incomplete, and save only with the current project.
  Verify (mechanical): `node --check js/app.js`, `node --check js/planner.js`, and `node --check js/storage.js` pass; all 12 planner and storage tests pass; `git diff --check` reports no whitespace errors. The learner confirmed the local browser flow works after creating/editing a task and refreshing.
  Learner check: Complete. The learner confirmed the updated app worked in their browser, including the Slice 2 project-editing and persistence flow.
  Commit: `Save and edit project plans`

- [x] **3. Explore the isolated sample and switch themes**
  Becomes usable: StudyBuddy is interactive but resets to its original state whenever opened; the theme follows the device until changed, then remembers the choice; the full app works on a narrow mobile screen.
  Why now: The main journey and saved-data boundary are already working. This adds the demo and final visual behavior without putting temporary demo edits at risk of entering real-project storage.
  PRD ref: `prd.md > Interactive StudyBuddy Sample`, `prd.md > StudyBuddy Sample Plan`, `prd.md > Theme and Responsive Use`, `prd.md > Look and Feel`
  Spec ref: `spec.md > StudyBuddy sample`, `spec.md > Browser storage and theme`, `spec.md > Look and Feel`, `spec.md > Important Failure Modes`
  Build: Add StudyBuddy's original sample data and reset/reopen behavior, sample navigation actions, system/manual theme handling, semantic palette variables, responsive layout, and readable keyboard, hover, error, disabled, and completed states.
  Verify (mechanical): `node --check` passes for the app, planner, storage, sample, and theme modules; all 16 planner, storage, sample-reset, and theme-choice tests pass; `git diff --check` reports no whitespace errors. The learner confirmed the StudyBuddy demo, reset, saved-project isolation, and theme behavior work in the browser.
  Learner check: Complete. The learner confirmed the sample, reset behavior, project storage, and theme switch work as expected.
  Commit: `Add the resettable sample and responsive themes`

## Hands-on Checkpoints

- [x] Early usable behavior explored — after Slice 1, while remaining implementation can still respond to feedback
- [x] Final kick-the-tires exploration and feedback completed — after Slice 3

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [x] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [x] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: Generated and opened `devpost/app-map.html`; it explains actual code paths and includes a sample-task practice. The learner confirmed all three slices work in their WSL browser. The browser attached to the agent could not reach the local server, so the code tour uses the static map. Sixteen planner, storage, sample, and theme tests pass.
Route and stops: `index.html` (`#app`, `#theme-toggle`) → `js/app.js` (`setupThemeToggle`, `renderDashboard`, `renderPlan`, `rememberProject`) → `js/planner.js` (`validateProjectInput`, `chooseTemplate`, `buildPlan`, `calculateProgress`) → `js/storage.js` (`loadProjects`, `saveProject`). Sample path: `js/sample.js` (`createSampleProject`) and the `isSample` guard in `js/app.js`. Theme path: `js/theme.js` (`resolveInitialTheme`, `setupThemeToggle`) → semantic variables in `styles.css`.
Edit outcome: Not tried; the optional sample-task edit is offered in `devpost/app-map.html`, with a matching test update and verification command.
Reflection: Offered in the code map's reusable practice; no personal response has been recorded.
Activity mode: Static code map and guided route, connected to the live app behavior the learner verified in their browser.

## Revisions
