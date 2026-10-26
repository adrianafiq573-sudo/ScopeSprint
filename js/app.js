import { buildPlan, calculateProgress, flattenTasks, formatEstimate, validateProjectInput } from "./planner.js";

const app = document.querySelector("#app");
let currentProject = null;
let formState = { name: "", ideaText: "", hours: "" };

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function renderDashboard() {
  app.innerHTML = `
    <section class="hero">
      <p class="eyebrow">A little structure, a lot less overwhelm</p>
      <h1>Turn your idea<br>into a plan.</h1>
      <p class="hero-copy">ScopeSprint breaks a software idea into manageable tasks, so you can focus on one doable step at a time.</p>
    </section>
    <div class="dashboard-grid">
      <section class="panel form-panel" aria-labelledby="create-heading">
        <h2 id="create-heading" class="panel-title">Start with your idea</h2>
        <p class="panel-intro">A small first version is a great place to begin.</p>
        <form id="project-form" novalidate>
          <div class="field">
            <label for="project-name">Project name</label>
            <input id="project-name" name="name" type="text" autocomplete="off" placeholder="e.g. StudyBuddy" value="${escapeHtml(formState.name)}" aria-describedby="name-error">
            <p class="field-error" id="name-error" role="alert" hidden></p>
          </div>
          <div class="field">
            <label for="idea-description">What would you like to build?</label>
            <textarea id="idea-description" name="ideaText" placeholder="Describe the app idea in a few sentences..." aria-describedby="idea-error">${escapeHtml(formState.ideaText)}</textarea>
            <p class="field-error" id="idea-error" role="alert" hidden></p>
          </div>
          <div class="field">
            <label for="available-hours">How many hours do you have?</label>
            <div class="input-unit">
              <input id="available-hours" name="hours" type="number" min="0.01" step="any" inputmode="decimal" placeholder="e.g. 2.5" value="${escapeHtml(formState.hours)}" aria-describedby="hours-unit hours-error">
              <span class="unit-label" id="hours-unit">hours</span>
            </div>
            <p class="field-error" id="hours-error" role="alert" hidden></p>
          </div>
          <button class="button button-full" type="submit">Create My Project <span aria-hidden="true">→</span></button>
        </form>
      </section>
      <aside class="side-column" aria-label="Example plan preview">
        <section class="panel preview-panel">
          <div class="preview-head">
            <h2>Here's what a plan can look like</h2>
            <p>A small sample of the steps inside your project.</p>
          </div>
          <div class="preview-content">
            <div class="preview-project"><span class="preview-icon" aria-hidden="true">✳</span><div><strong>StudyBuddy</strong><span>A sample student planner</span></div></div>
            <div class="progress-heading"><span>Project progress</span><span>2 of 6 tasks</span></div>
            <div class="progress-track" aria-hidden="true"><div class="progress-fill"></div></div>
            <div class="mini-task"><span class="mini-check done" aria-hidden="true">✓</span><span>Sketch the main planner screen</span></div>
            <div class="mini-task"><span class="mini-check" aria-hidden="true"></span><span>Add an assignment to the list</span></div>
            <div><span class="stage-pill">Plan</span><span class="stage-pill">Build</span><span class="stage-pill">Test &amp; Polish</span></div>
          </div>
        </section>
        <section class="panel note-panel">
          <h3>Built for first versions</h3>
          <p>Plans use clear, approximate estimates and put essential steps first. If an idea is too big, ScopeSprint helps you choose a smaller MVP.</p>
        </section>
      </aside>
    </div>`;

  const form = app.querySelector("#project-form");
  const inputs = Object.fromEntries(["name", "ideaText", "hours"].map((key) => [key, form.elements.namedItem(key)]));
  for (const [key, input] of Object.entries(inputs)) {
    input.addEventListener("input", () => {
      formState[key] = input.value;
      const { errors } = validateProjectInput(formState);
      updateFieldError(key, errors[key]);
    });
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formState = Object.fromEntries(Object.entries(inputs).map(([key, input]) => [key, input.value]));
    const { errors } = validateProjectInput(formState);
    for (const key of Object.keys(inputs)) updateFieldError(key, errors[key]);
    if (Object.keys(errors).length) {
      form.querySelector("[aria-invalid='true']")?.focus();
      return;
    }
    currentProject = buildPlan(formState);
    renderPlan();
  });
}

function updateFieldError(key, message) {
  const input = app.querySelector(`[name="${key}"]`);
  const error = app.querySelector(`#${key === "ideaText" ? "idea" : key}-error`);
  if (!input || !error) return;
  input.setAttribute("aria-invalid", message ? "true" : "false");
  if (message) {
    error.textContent = message;
    error.hidden = false;
  } else {
    error.textContent = "";
    error.hidden = true;
  }
}

function renderScopeSection(project) {
  if (!project.narrowed) return "";
  const original = `<section class="scope-card"><h3>Your original idea</h3><p class="idea-verbatim">${escapeHtml(project.ideaText)}</p></section>`;
  const features = project.coreFeatures.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("");
  const fitMessage = project.overCoreBudget
    ? `<p class="scope-warning"><strong>Time check:</strong> even this smallest useful plan is about ${escapeHtml(formatEstimate(project.coreMinutes).replace("About ", ""))}. Your budget is ${escapeHtml(formatEstimate(project.availableMinutes).replace("About ", ""))}, so treat this as a starting point and consider reducing the goal further.</p>`
    : "";
  const postponed = project.postponedTasks.length
    ? `<ul>${project.postponedTasks.map((task) => `<li><strong>${escapeHtml(task.title)}:</strong> ${escapeHtml(task.reason)}</li>`).join("")}</ul>`
    : "<p>No optional features were postponed for this plan.</p>";
  return `<section class="panel scope-panel" aria-labelledby="scope-heading">
    <p class="eyebrow">A smaller first version</p><h2 id="scope-heading">How we narrowed your idea</h2>
    <p class="scope-intro">We prioritized the features that make the core experience work, so you can build and test a usable version before adding more.</p>
    ${fitMessage}
    <div class="scope-columns">
      ${original}
      <section class="scope-card"><h3>Your MVP for now</h3><p>The smallest useful version for this first build includes:</p><ul>${features}</ul></section>
      <section class="scope-card"><h3>Save for later</h3>${postponed}</section>
    </div>
  </section>`;
}

function renderPlan(expandedStages) {
  if (!currentProject) return renderDashboard();
  const allTasks = flattenTasks(currentProject.stages);
  const progress = calculateProgress(allTasks);
  const openStageIds = expandedStages ?? new Set(currentProject.stages.map((stage) => stage.id));
  const stages = currentProject.stages.map((stage) => {
    const stageProgress = calculateProgress(stage.tasks);
    const cards = stage.tasks.map((task) => `
      <article class="task-card ${task.completed ? "is-complete" : ""}">
        <input class="task-check" type="checkbox" data-stage="${escapeHtml(stage.id)}" data-task="${escapeHtml(task.id)}" ${task.completed ? "checked" : ""} aria-label="Mark ${escapeHtml(task.title)} complete">
        <div>
          <h3 class="task-title">${escapeHtml(task.title)}</h3>
          <p class="task-description">${escapeHtml(task.description)}</p>
          <details class="task-details"><summary>See completion goal</summary><p class="task-criteria">${escapeHtml(task.completionCriteria)}</p></details>
        </div>
        <span class="task-time">${escapeHtml(formatEstimate(task.estimatedMinutes))}</span>
      </article>`).join("");
    return `<details class="panel stage" data-stage-section="${escapeHtml(stage.id)}" ${openStageIds.has(stage.id) ? "open" : ""}>
      <summary><span class="stage-title">${escapeHtml(stage.name)}<span class="stage-count">${stageProgress.completed} of ${stageProgress.total} complete</span></span></summary>
      <div class="stage-tasks">${cards}</div>
    </details>`;
  }).join("");

  app.innerHTML = `
    <div class="plan-header">
      <button class="text-button" id="back-to-dashboard" type="button">← Back to Dashboard</button>
      <div><p class="eyebrow">Your first version, step by step</p><h1>${escapeHtml(currentProject.name)}</h1></div>
    </div>
    <section class="panel plan-summary" aria-label="Project overview and progress">
      <div><h2>Project idea</h2><p class="idea-verbatim">${escapeHtml(currentProject.ideaText)}</p></div>
      <div class="plan-progress">
        <div class="progress-heading"><strong>Overall progress</strong><span>${progress.percent}%</span></div>
        <div class="progress-track" role="progressbar" aria-label="Overall task progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress.percent}"><div class="progress-fill" style="width:${progress.percent}%"></div></div>
        <div class="plan-progress-note">${progress.completed} of ${progress.total} tasks completed · time estimates are approximate</div>
      </div>
    </section>
    ${renderScopeSection(currentProject)}
    <p class="plan-note">Work through the stages in order. Check a task when its completion goal is met.</p>
    <section aria-label="Project stages">${stages || `<section class="panel empty-note">No tasks were created for this plan.</section>`}</section>`;

  app.querySelector("#back-to-dashboard").addEventListener("click", () => {
    currentProject = null;
    renderDashboard();
    app.focus();
  });
  app.querySelectorAll(".task-check").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const stage = currentProject.stages.find((item) => item.id === checkbox.dataset.stage);
      const task = stage?.tasks.find((item) => item.id === checkbox.dataset.task);
      if (!task) return;
      task.completed = checkbox.checked;
      const openIds = new Set([...app.querySelectorAll(".stage[open]")].map((element) => element.dataset.stageSection));
      renderPlan(openIds);
    });
  });
}

renderDashboard();
