---
doc: spec
status: approved
---

# ScopeSprint — Technical Spec

## How This Works, In Plain Language

ScopeSprint is a small website made from HTML, CSS, and JavaScript. HTML gives the page its structure, CSS gives it the two visual themes, and JavaScript handles the form, plan rules, checkboxes, and saving. There is no app server or account system. A tiny local web server only delivers the website files to the browser while it is running.

When someone enters an idea, a rules-based planner looks for a few familiar beginner-project patterns and selects matching prewritten tasks. A general small-web-app plan is the fallback. It uses the available time to keep core tasks first, move optional tasks into “Save for later” when they do not fit, and show an honest warning if even the smallest useful plan is longer than the budget. This is not a real AI model, and it will not understand every possible idea.

The browser's `localStorage` is like a small sticky note kept by one browser for one website address. ScopeSprint uses it for the user's own projects and theme choice. The user's projects stay on that browser and device; they do not sync to other devices. The StudyBuddy sample is separate: it starts from its built-in original data each time it opens and is never saved with real projects.

## The Core Journey Through the System

Implements `prd.md > The Core Journey`, `prd.md > Dashboard and Project Creation`, `prd.md > Project Task Plan`, `prd.md > Interactive StudyBuddy Sample`, and `prd.md > Theme and Responsive Use`.

```text
Dashboard form
  → validate name, idea, and positive hours
  → rules planner selects a task template and scopes it to the time budget
  → create a project with ordered stages and tasks
  → show the project plan
  → checkbox, rename, or add task updates the visible plan and progress
  → save the changed real project to this browser's localStorage
  → dashboard reads it back on return

Explore StudyBuddy
  → copy the built-in demo data into temporary in-memory page data
  → interact with checkboxes and see progress
  → leave or reopen the demo to get the original state again
```

The idea goes from the form to the planner in the same browser page. The planner returns plain task data; the screen displays it. When a real task changes, the app recalculates progress from the task checkboxes and saves that project's updated data. The sample uses the same task display but never calls the real-project save function.

## Stack

- **HTML, CSS, and browser JavaScript:** Chosen to build on the learner's existing familiarity with these web basics and avoid adding a framework to learn. Use native browser features and JavaScript modules.
- **Python 3.11.5 built-in static file server:** Serves the files at a stable local web address so browser storage behaves consistently. It is not an application backend and does not process project data. Python documents this command and its bind option in [`http.server`](https://docs.python.org/3.11/library/http.server.html).
- **Node.js 24.22.1 built-in test runner:** Runs tests for the pure planning and progress logic without installing test packages. See the [Node.js test runner documentation](https://nodejs.org/docs/latest-v24.x/api/test.html).
- **No framework, third-party runtime package, external API, database, or API key.** There is no dependency installation step.

## Where It Runs and How Someone Tries It

Run locally in a current desktop or mobile browser. Python 3.11.5 serves the files; Node.js 24.22.1 is only needed to run the automated logic tests. No API keys or internet access are needed after the website files are present.

From the project root, run:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/` in the browser. Keep that terminal open while using the app. Use the same address each time: browser storage belongs to an exact site address. Do not open `index.html` as a `file://` URL, since browser storage behavior for local files is not consistently defined. Python's documentation describes this server as a simple local server, not a production web server.

Run the automated planner tests from a second terminal at the project root:

```powershell
node --test tests/planner.test.mjs
```

The demo can be recorded from the local browser: create a small project, check and add a task, refresh to show saving, open StudyBuddy and interact with it, then show the theme switch. Hackathon submission still needs a short demo video and a public GitHub repository; a deployed URL is optional and has not been selected.

## Look and Feel

Implement `prd.md > Look and Feel` with semantic CSS variables so a single theme change updates all surfaces. Light mode uses the approved warm ivory, cream, beige, brown, sand, terracotta, and sage palette. Dark mode uses deep navy, slate-blue surfaces, soft off-white, blue-grey, steel blue, and sage. Keep the layout calm and spacious, use clear plain-English labels, and ensure keyboard focus, errors, completion, and disabled states are identifiable without color alone. The theme toggle reads the device setting on first visit and then remembers a user's manual choice.

## Components

### Dashboard and project form

Shows project creation, saved project cards, recent project, sample entry, and progress preview. Validate trimmed project name and idea plus a positive finite hours value before planning; keep input values when invalid and show inline messages. Positive decimal hours are accepted.

Implements `prd.md > Dashboard`, `prd.md > Dashboard and Project Creation`, and `prd.md > States and Boundaries`.

### Rules-based planner

Contains a small curated set of beginner web-app task templates and keyword rules. Match only patterns deliberately covered by that set; otherwise choose the general small-web-app template. Do not call a model or describe the result as AI-generated. Templates include ordered Plan, Build, and Test & Polish stages, task descriptions, completion criteria, and approximate estimates in minutes. Rule data also identifies core versus optional tasks and gives postponed items a short reason.

The planner converts the entered hours to minutes. It includes core tasks first, then includes optional tasks while the plan remains within budget. Unselected optional tasks go under “Save for later.” When all core tasks exceed the budget, keep the smallest useful core plan and show its approximate minimum time in a clear warning rather than claiming it fits. Show the original description exactly as entered in “Your original idea.”

Implements `prd.md > Dashboard and Project Creation` and `prd.md > Project Task Plan`.

### Project plan and task interactions

Displays the project's name, original idea, progress, ordered collapsible stages, and task details. The first demo supports editing the project name, renaming a task, checking/unchecking tasks, and adding a custom task. An added task needs a title and a stage (Plan, Build, or Test & Polish; default Plan); description and estimate are optional. Use a positive numeric estimate and a minutes-or-hours selector, converting to minutes internally. A custom task does not need completion criteria. Append it to the selected stage, leave other tasks in their current order, start it incomplete, and show it immediately. Update the selected stage count and total progress at once.

Progress is derived from completed tasks divided by all tasks; with no tasks, show 0% and 0 of 0. Adding an incomplete task increases the denominator and recalculates the project percentage. Re-rendering a task or progress display must not overwrite or reorder unrelated tasks.

Implements `prd.md > Project Task Plan` and `prd.md > States and Boundaries`.

### StudyBuddy sample

Displays the bundled StudyBuddy example and uses a fresh in-memory copy each time the sample is opened. Its task checkboxes and progress work for the current visit. “Reset Demo” replaces that temporary copy with the original sample. The sample never invokes project persistence, never appears in My Projects, and never changes any real project. “Create My Own Project” and “Back to Dashboard” follow the PRD actions.

Implements `prd.md > StudyBuddy Sample Plan` and `prd.md > Interactive StudyBuddy Sample`.

### Browser storage and theme

Storage helpers load, save, and update own projects separately by project ID, as well as the most recently opened project ID and chosen theme. Theme selection falls back to `prefers-color-scheme` only if no saved choice exists. Sample data remains outside storage.

Implements `prd.md > Dashboard and Project Creation`, `prd.md > Project Task Plan`, `prd.md > Theme and Responsive Use`, and `prd.md > States and Boundaries`.

## Data Model

All project and task changes for real projects are saved as JSON in the browser's `localStorage`; UI rendering reads the in-memory project and then writes changed project data back. Each own project has a unique ID, so editing one cannot accidentally replace another. A stored project is shaped roughly like this:

```js
{
  id: "unique-project-id",
  name: "Study tracker",
  ideaText: "The exact description entered by the user",
  availableMinutes: 150,
  createdAt: "ISO date-time",
  updatedAt: "ISO date-time",
  stages: [
    {
      id: "plan",
      name: "Plan",
      tasks: [
        {
          id: "unique-task-id",
          title: "Sketch the main screen",
          description: "Optional plain-English instructions",
          completionCriteria: "An observable finish condition",
          estimatedMinutes: 30,
          completed: false
        }
      ]
    }
  ]
}
```

Custom tasks may have empty description or `estimatedMinutes: null`; they do not require completion criteria. All estimates and available time are stored in minutes to make comparison consistent. The user-facing hour input is converted by multiplying by 60. Task labels display minutes below one hour and hours for longer estimates; all are approximate.

Separate storage entries hold the list of own projects, last opened own project ID, and manual theme choice. On dashboard load, read those entries and compute progress from task completion flags. On each own-project edit, update its timestamp and save that project. The `localStorage` API is scoped to an origin and can fail in private/restricted browser contexts; see [MDN's localStorage documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). The app should catch read/write errors, keep the current session usable where possible, and tell the user changes could not be saved.

StudyBuddy is immutable source data in the app code. Opening it makes an in-memory copy; every new open starts from the source data. It is never put into the own-project list or localStorage.

## File Structure

```text
scopesprint/
├── index.html                 # The single-page app shell and screen regions
├── styles.css                 # Responsive layout and semantic light/dark variables
├── js/
│   ├── app.js                  # Dashboard/plan/sample navigation and event wiring
│   ├── planner.js              # Templates, keyword rules, time fit, and plan creation
│   ├── storage.js              # Own-project and theme localStorage helpers
│   ├── sample.js               # Original StudyBuddy demo data and fresh-copy helper
│   └── theme.js                # Device preference, saved choice, and theme toggle
├── tests/
│   └── planner.test.mjs        # Node built-in tests for plan rules and progress math
├── devpost/
│   ├── learner-profile.md      # Learner context and learning preferences
│   ├── scope.md                # Approved product boundary
│   ├── scope.html              # Scope visual companion
│   ├── prd.md                  # Approved product requirements (canonical)
│   ├── prd.html                # PRD visual companion
│   ├── spec.md                 # This technical blueprint (canonical)
│   └── spec.html               # Interactive visual companion to this blueprint
└── README.md                   # Setup, run, test, and project notes
```

The `js` files split the user interface, planning rules, storage, sample, and theme so each piece has one clear job. The build should keep the app as one page with simple view switching; no router or framework is needed.

## External Services and Dependencies

There are no external services, APIs, databases, paid plans, secrets, or third-party runtime dependencies. The app can create plans offline after the files are available. The two local tools have no installation requirement in the agreed environment:

- [Python 3.11 `http.server`](https://docs.python.org/3.11/library/http.server.html) serves local files only.
- [Node.js 24 test runner](https://nodejs.org/docs/latest-v24.x/api/test.html) runs the planner tests.
- [MDN `localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) documents browser persistence and its origin/privacy limits.

## Important Failure Modes

- **Idea does not match a known keyword pattern** → use the clearly labeled general small-web-app template; do not imply deeper understanding or a real AI call.
- **Even the core template is longer than the time budget** → show the smallest useful core plan and its approximate minimum time with an honest warning; keep nonessential ideas in “Save for later.”
- **Browser storage is unavailable or invalid JSON is found** → avoid crashing; show an understandable saving/loading notice, keep the current session usable when possible, and never claim an unsaved edit is safely stored.
- **A required field or custom-task value is invalid** → show a field-level message, preserve other values, and do not create/save an invalid project or task.

## What Was Simplified and Why

- **Prewritten templates and transparent keyword rules** instead of an AI service — no API key, cost, network delay, or false AI claim; the tradeoff is that only a few common patterns receive tailored plans and other ideas get the generic fallback.
- **Browser-local project data** instead of accounts and a hosted database — it proves the create/edit/return loop with minimal setup; projects do not sync across devices and can be lost if browser data is cleared.
- **Session-only interactive sample** instead of saving demo edits — every visit begins with the same clean example and demo state cannot mix with user work.
- **Limited first-demo editing** instead of full project management — name edit, task rename/add, and checkbox completion prove the useful core while keeping the solo build achievable.
- **Local-only run instructions** instead of adding deployment setup — enough for learning and recording a demo; hosting remains an optional later choice.

## Decisions and Open Issues

- **Learner choice:** Use simple HTML/CSS/JavaScript and avoid a backend or paid API unless essential. The accepted tradeoff is that data stays in one browser/device.
- **Learner choice:** Use rules and templates for the first demo; use a general fallback for unmatched ideas. No real AI model is claimed.
- **Learner choice:** Keep StudyBuddy session-only and reset it to its original state whenever reopened; keep real projects in `localStorage`.
- **Learner choice:** Show the original description exactly as entered; an AI-written summary is not required.
- **Learner choice:** Custom tasks require a title and selected/default stage; description and estimate are optional, completion criteria are not required, new tasks append at the end of that stage, start incomplete, and save to the current project.
- **Implementation detail derived from the accepted time requirements:** Store project budget and task estimates in minutes, while displaying project entry in hours and short/long task estimates in the requested units.
- **Learning question clarified:** The learner is new to coding agents and spec-driven work and wants to understand the process rather than trust generated code blindly. This spec makes the plan rules and saved-data boundaries explicit; during the build, explain the planner/storage code in small slices and verify behavior with tests and a browser walkthrough.
- **Open issues:** None that block the first build. Production hosting and additional project patterns are intentionally deferred.
