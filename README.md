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
node --test tests/planner.test.mjs
```

There are no package installs, external APIs, or environment keys for this demo.

## Project notes

- `devpost/scope.md`, `devpost/prd.md`, and `devpost/spec.md` are the Markdown planning sources of truth.
- `devpost/checklist.md` tracks the approved build order and slice progress.
- The implementation is being built in small verified slices; some planned behaviors may arrive in later slices.
