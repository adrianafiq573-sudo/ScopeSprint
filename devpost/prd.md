---
doc: prd
status: approved
---
# ScopeSprint — Product Requirements

A beginner-friendly planner that turns a small web app idea and available time into an achievable, trackable plan.

Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`, `scope.md > The Core Loop`.

## The Core Journey

1. **Open the dashboard.** ScopeSprint opens directly to the dashboard, with no separate welcome screen. A new user can describe a small web app idea, enter its name and available time, create a project, or explore the StudyBuddy sample. A returning user can continue the most recently opened project or choose one from **My Projects**. The learner can switch themes at any time.
2. **Create a project.** The user completes the project name, idea description, and available-time fields. Invalid or blank fields show inline errors and preserve the entered information. A valid submission creates a plan and takes the user directly to its task page.
3. **Understand the plan.** The plan page shows the project name and description, overall completion percentage and task count, and a sequence of collapsible stages. The stage order communicates task priority. Each task has a title, plain-English description, observable completion criteria, estimated time, and completion checkbox. Tasks can be expanded for detail.
4. **Make the plan their own.** The user can edit the project name, rename a task, add a custom task, and mark tasks complete or incomplete. Progress updates immediately and changes save automatically.
5. **Return later.** Saved projects remain available in the browser after refresh or reopening. The dashboard highlights the most recently opened project and lists saved projects so the user can continue one.
6. **Try the sample.** The user can open the separate StudyBuddy sample, explore its plan, complete tasks, observe progress, reset the demo, and return to the dashboard. Sample data never changes a user's own projects.

Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`, `scope.md > The POC Boundary`.

## Screens and Layout

### Dashboard

A clean, modern, responsive starting screen with the headline **“Turn your idea into a plan.”** and a short explanation that ScopeSprint breaks software ideas into manageable tasks. Keep the project creation form and primary **“Create My Project”** action clear and uncluttered. The form collects project name, idea description, and available time in the field labeled “How many hours do you have?”, with “hours” beside the input. Include an **“Explore Sample Project”** action and a preview of prioritized tasks and progress.

For returning users, place **Continue Where You Left Off** at the top with the most recently opened project, its name, completion percentage, completed-task count, total task count, and a **“Continue Project”** button. Below it, show **My Projects** as clean cards with project name, short description, progress bar and task count, last updated time, and an action to open the project.

### Project Task Plan

Show the project name and description, an edit action for the name, a prominent overall progress bar with percentage and completed/total count, and a **“Back to Dashboard”** action. Display stages as labeled sections with their task and completion counts; allow each section to expand or collapse. Display tasks under their stages in the planned order. A task can expand to reveal its details.

### StudyBuddy Sample Plan

Open the interactive **“StudyBuddy: A Student Planner App”** example as a clearly labeled sample/demo, with a short project overview and MVP goal. Group tasks into stages such as Planning, Building, and Testing. Show each task's approximate estimated time and completion criteria. Display short estimates in minutes and longer estimates in hours, and make clear they are not guarantees. Stage and task order communicate priority; no separate priority label is needed. Include task checkboxes, expandable details, a progress bar, **“Reset Demo”**, **“Create My Own Project”**, and **“Back to Dashboard”** actions.

Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`, `scope.md > The POC Boundary`.

## Look and Feel

ScopeSprint should feel welcoming, calm, modern, slightly cozy, beginner-friendly, and polished—not corporate or intimidating. Keep labels clear and the interface uncluttered. Use two expressions of one brand: warm, earthy, paper-like light mode and cool, quiet, night-sky-inspired dark mode.

| Semantic use | Light mode | Dark mode |
|---|---|---|
| Main background | Warm ivory/cream `#F8F4EC` | Deep navy `#111827` |
| Cards and panels | Soft cream `#FFFDF8` | Dark slate blue `#1B2638` |
| Secondary surfaces | Warm beige `#EDE3D4` | Blue-grey `#273449` |
| Primary text | Dark warm brown `#342F29` | Soft off-white `#E8EDF4` |
| Secondary text | Muted warm text, with readable contrast | Muted blue-grey `#A6B3C5` |
| Borders | Muted sand `#D9CBB8` | Slate grey `#39475B` |
| Primary controls | Muted terracotta `#B86F52` | Soft steel blue `#8AAED0` |
| Supporting/success accent | Sage green `#87977A` | Muted sage green `#91B59A` |

Keep a visible theme toggle available throughout the app. On the first visit, start with the device's theme; after the user changes it, remember their choice. Apply semantic colors consistently across forms, cards, tasks, progress, dialogs, and navigation. Provide clear hover, focus, disabled, and completed states. Maintain readable contrast and never rely on color alone to communicate errors or task status. Avoid pure white or pure black as the dominant background.

Source: `scope.md > Inspiration & Identity`, `scope.md > The POC Boundary`.

## Features and Behavior

### Dashboard and Project Creation

- The dashboard is the first screen; there is no separate welcome screen. It presents the named headline, short explanation, project form, sample entry point, and progress preview.
- The project form requires a project name, idea description, and a positive numeric time value. Label the time field **“How many hours do you have?”** and show **hours** beside the input. Accept positive decimals such as 2.5. Empty or whitespace-only, non-numeric, zero, and negative values are invalid.
- If the user submits an invalid form, highlight every missing/invalid required field and show a short inline message beneath it. Preserve entered information; do not create a project, generate a plan, or navigate. Remove each field's message as soon as that field becomes valid. Errors remain readable in both themes and are not communicated by color alone.
- When a valid project is created, take the user directly to that project's plan.
- If the idea is too large for the entered time, include a concise, beginner-friendly **“How we narrowed your idea”** section alongside the MVP plan. It contains **Your original idea** (show the user's description exactly as entered), **Your MVP for now** (the smallest useful version that fits the time, its core features, and why they matter), and **Save for later** (postponed useful features with a short reason). Include the explanation: “We prioritized the features that make the core experience work, so you can build and test a usable version before adding more.”
- **Continue Where You Left Off** identifies the most recently opened project and shows its name, completion percentage, completed-task count, total task count, and continue action.
- **My Projects** shows each saved project's name, short description, progress and completed/total task count, last updated time, and open action.

**Acceptance criteria**

- Submitting valid project details opens a task plan for that project.
- Submitting with any required field blank or whitespace-only, or with a time value that is non-numeric, zero, or negative, shows an inline error for the invalid field, keeps all other entered values, and does not create a project or leave the dashboard. A positive decimal such as 2.5 is accepted.
- Correcting a field removes its error without clearing the other fields.
- A too-large idea produces the three-part narrowing explanation next to its MVP plan; an idea that fits does not need that explanation. “Your original idea” reproduces the entered description verbatim.
- Returning to the dashboard shows the most recently opened project and saved project cards with their current progress counts.

Source: `scope.md > The Unique Kernel`, `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`, `scope.md > The POC Boundary`.

### Project Task Plan

- Show project name and description; the name can be edited. Project description and available time are not editable in the first demo.
- Show overall percent complete and a completed/total task count. Recalculate immediately whenever a task is checked or unchecked.
- Group tasks in labeled, collapsible stages. Show task count and completion count per stage. Stage and task order communicate priority; do not add separate priority badges.
- Each task shows an action-oriented title, a one- or two-sentence plain-English description, observable completion criteria, an approximate time estimate, and a checkbox for incomplete/complete status. Show short-task estimates in minutes and longer-task estimates in hours. Make clear these are estimates, not guarantees; compare them consistently against the available-hours budget. A task can expand or collapse to show details.
- For the first demo, users can rename a task, add a custom task, and mark any task complete or incomplete. A custom task requires a title and a stage (Plan, Build, or Test & Polish; default Plan); description and a positive time estimate are optional. The estimate accepts a positive number and a minutes-or-hours unit. Put the new incomplete task at the end of its chosen stage without changing other task order. Custom tasks do not require completion criteria. Show the task immediately, update stage counts and project progress, and save it with that project. Keep these controls uncluttered and usable on desktop and mobile.
- Automatically save each project's changes in browser storage. Keep projects separate and preserve them after refresh or reopening the app.
- Allow the user to permanently delete an own project from its plan screen after a clear confirmation. Remove only that project's saved record and recent-project pointer; leave all other projects and the StudyBuddy demo untouched.
- Provide a **“Back to Dashboard”** action.

**Acceptance criteria**

- A task checkbox changes the task status and overall progress bar/count immediately.
- Stage counts update when a task in that stage changes status. Estimates display in minutes for short tasks and hours for longer tasks, are labeled approximate rather than guaranteed, and compare correctly with the hours budget using one consistent unit.
- Renaming a task changes its displayed title. Adding a custom task with a title and selected/default stage appends it to that stage, leaves existing order intact, starts it incomplete, updates counts/progress immediately, and preserves it in that project after refresh. Description and estimate may be omitted; completion criteria are not required.
- After refreshing or reopening the app, an own project and its saved task/progress changes remain available, without appearing in another project.
- Deleting an own project requires confirmation, removes it from the saved list and dashboard, and does not change any other saved project. Canceling confirmation leaves it unchanged.
- The dashboard's project and recent-project summaries show the current saved progress.

Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`, `scope.md > The POC Boundary`.

### Interactive StudyBuddy Sample

- Make the sample an interactive, realistic, beginner-sized example, clearly labeled as a demo.
- Show the sample overview, MVP goal, stages, task estimates, completion criteria, expand/collapse details, completion checkboxes, and progress bar.
- **“Reset Demo”** restores the sample to its original task and progress state. It must never overwrite or delete a user's real projects.
- **“Create My Own Project”** takes the user to the project creation form. **“Back to Dashboard”** returns to the dashboard.
- Include a small, session-only working planner preview. A user can open a visual screen sketch, add an assignment with a title and due date, and mark an assignment complete. The related sample-plan actions help the user try those two core features. Reset Demo clears those preview changes as well as task progress.
- The sample requires no account and remains usable without an internet connection after the app has loaded. It follows the selected theme.

**Acceptance criteria**

- Completing or reopening a sample task updates the sample progress indicator.
- “View screen sketch” opens the planner wireframe; “Try adding an assignment” moves focus to the working preview form. Adding an assignment marks its matching sample-plan task complete; marking an assignment complete demonstrates the completion task and updates the assignment count.
- Reset Demo restores the original sample plan and progress while leaving all own projects unchanged.
- Reopening or resetting the demo restores the original preview assignments and unchecked assignment states.
- Sample activity never appears in the user's saved project list or changes real-project progress.
- From the sample, the user can return to the dashboard or start creating their own project.

Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`, `scope.md > The POC Boundary`.

### Theme and Responsive Use

- Start with the device's light/dark setting on a first visit. Remember a manually selected theme and apply it consistently throughout all screens.
- Layouts and controls remain readable and usable on desktop and mobile.
- Focus, hover, disabled, completed, and error states remain distinguishable in both palettes, using more than color alone where meaning matters.

**Acceptance criteria**

- On first visit, the selected device theme is reflected. After a manual toggle and return, the user's chosen theme is restored.
- Dashboard, task plan, and sample all use the same selected palette; labels and controls remain readable.

Source: `scope.md > The POC Boundary`.

## States and Boundaries

- **First visit:** Open on the dashboard. No own projects are listed yet; the project form and sample remain available.
- **Invalid project form:** Keep the user on the dashboard, retain entered values, and show field-specific inline errors until corrected. Time must be a positive number of hours; accept decimals and reject blank, non-numeric, zero, or negative values.
- **Created project:** Open its plan directly and show progress at zero completed tasks.
- **Returning user:** Show saved own projects and the last-opened project summary with current progress.
- **Sample/demo:** Keep its task state separate from own projects. Reset Demo restores the sample baseline. Sample progress is not saved as an own project.
- **Theme:** Use the device theme only before the user has chosen one; a saved user choice takes precedence on later visits.
- **Offline/account boundary:** No account is required. The StudyBuddy sample and rules-based idea planning remain interactive offline after the app has loaded.
- **Honest plan claims:** Do not tell users that a real AI model produced plans unless a real model is integrated.

Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`, `scope.md > The POC Boundary`, `scope.md > Explicitly Cut`.

## Product Decisions

- Focus the first version on small, beginner-friendly web app ideas; scale oversized ideas down to a time-fitting MVP rather than a production-scale plan.
- Open directly to a dashboard; no separate welcome screen.
- Use a visible light/dark switch, begin from the device theme, and remember the user's selection.
- Use ordered stages to communicate task priority rather than adding priority labels.
- Make the StudyBuddy sample interactive but separate from real projects; reset only the sample.
- Limit first-demo editing to project name, task title, adding a task, and completion status.
- Use a positive numeric hours budget, accept decimals, show short task estimates in minutes and longer estimates in hours, and label estimates approximate.
- Show the original idea description exactly as entered in the narrowing explanation; an AI-written summary is not essential.
- Keep plan and progress changes available in the browser without accounts; do not claim AI generation unless genuinely integrated.

## What We're Building

A polished responsive dashboard and plan view; required project idea/name/time input with accessible validation; a prioritized, staged plan with clear completion criteria; immediate progress updates; first-demo task editing (rename/add/complete); saved, separate projects; the interactive StudyBuddy demo; oversized-idea MVP explanation; theme switching with device-theme default; and the sample/own-project navigation described above.

## Deferred From the POC

- Editing the project description or available time after creation — first-demo editing is limited to the project name.
- Editing task descriptions, completion criteria, or estimated time; changing priority labels; reordering stages/tasks; deleting individual tasks; restoring a generated plan — the first demo focuses on rename, add, completion, and confirmed project deletion.
- Collaboration, team accounts, external integrations, payment processing, and complex backend or project-management features — outside the solo beginner proof of concept.
- Production-scale plans for complex social networks or Uber-like applications — show a smaller MVP instead.
- Broader project categories beyond beginner-friendly web apps.

## Possible Later Enhancements

If the core flow works well, consider expanded project/task editing, task restore controls, task reordering, additional kinds of projects, and collaboration only after a clear need emerges.

## Non-Goals

- Build a complete project-management product.
- Require users to sign up or create an account.
- Claim to use a real AI model without integrating one.
- Generate production-scale plans for ideas that exceed the beginner-friendly scope.

## Open Questions

- **Resolved in `4-spec`:** Create idea-based plans with a small set of keyword-matched, prewritten task templates and a general web-app fallback; this is rules-based planning, not a real AI model. Plan creation works offline after the app loads. Store and compare all estimates in minutes, accept positive decimal hours for the project budget, display short estimates in minutes and longer estimates in hours, and label estimates approximate.
