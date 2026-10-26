# ScopeSprint

ScopeSprint helps a beginner turn a small web app idea into an ordered project plan. The first demo uses a few transparent task templates and rules; it does not call or claim to use a real AI model.

## Run locally

Python serves the app files to your browser; it does not receive or process project data. From this folder, run:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open <http://127.0.0.1:8000/> and leave the terminal running while you use the app. Use the same address each time because browser storage is tied to that address. Do not open `index.html` directly as a `file://` URL; browser module and storage behavior is not consistent there.

## Run planner checks

Node.js 24 can run the built-in test runner without downloading packages:

```powershell
node --test tests/planner.test.mjs tests/storage.test.mjs tests/sample.test.mjs tests/theme.test.mjs
```

There are no package installs, external APIs, or environment keys for this demo.

## Project notes

- `devpost/scope.md`, `devpost/prd.md`, and `devpost/spec.md` are the Markdown planning sources of truth.
- `devpost/checklist.md` tracks the approved build order and slice progress.
- `devpost/app-map.html` is a guided code tour with a small practice change you can reuse in a future project.
- Real projects and their edits are saved in this browser's local storage. They do not sync across browsers or devices. The demo uses temporary data and stays separate from saved projects.
- Editing supports changing the project name, renaming and adding tasks, and updating task completion. More complete project-management controls are intentionally out of scope.
- Delete an own project from its plan after confirming; only that project's saved record is removed.
- The StudyBuddy demo starts fresh whenever it opens and includes a working assignment preview and screen sketch; demo changes never write to the saved-project list. The theme follows your device until you switch it, then your choice is remembered in this browser.
