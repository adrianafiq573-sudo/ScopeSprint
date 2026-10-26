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

- [x] Early usable behavior explored — after Slice 1, while remaining implementation can still respond to feedback
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
