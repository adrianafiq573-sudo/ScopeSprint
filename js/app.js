import { buildPlan, calculateProgress, flattenTasks, formatEstimate, validateProjectInput, STAGES } from "./planner.js";
import { getRecentProjectId, loadProjects, saveProject, setRecentProjectId } from "./storage.js";

const app = document.querySelector("#app");
let currentProject = null;
let formState = { name: "", ideaText: "", hours: "" };
let savedState = loadProjects();
let projects = savedState.projects;
let storageNotice = savedState.error;

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function projectProgress(project) { return calculateProgress(flattenTasks(project.stages ?? [])); }

function relativeTime(value) {
  if (!value) return "Not updated yet";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not updated yet";
  const minutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000));
  if (minutes < 1) return "Updated just now";
  if (minutes < 60) return `Updated ${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Updated ${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  return `Updated ${new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(date)}`;
}

function rememberProject(project) {
  project.updatedAt = new Date().toISOString();
  const result = saveProject(project);
  const index = projects.findIndex((item) => item.id === project.id);
  if (index < 0) projects.push(project);
  else projects[index] = project;
  storageNotice = result.error;
  return result.ok;
}

function storageNoticeMarkup() {
  return storageNotice ? `<p class="storage-notice" role="status">${escapeHtml(storageNotice)}</p>` : "";
}

function renderProjectCard(project) {
  const progress = projectProgress(project);
  return `<article class="project-card panel">
    <div class="project-card-heading"><div><h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(project.ideaText)}</p></div><span class="project-percent">${progress.percent}%</span></div>
    <div class="progress-track" role="progressbar" aria-label="${escapeHtml(project.name)} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress.percent}"><div class="progress-fill" style="width:${progress.percent}%"></div></div>
    <div class="project-card-footer"><span>${progress.completed} of ${progress.total} tasks</span><span>${escapeHtml(relativeTime(project.updatedAt))}</span></div>
    <button class="button project-open" type="button" data-open-project="${escapeHtml(project.id)}">Open Project</button>
  </article>`;
}

function renderDashboard() {
  const recentId = getRecentProjectId();
  const recentProject = projects.find((project) => project.id === recentId);
  const recentProgress = recentProject ? projectProgress(recentProject) : null;
  const sortedProjects = [...projects].sort((a, b) => new Date(b.updatedAt ?? 0) - new Date(a.updatedAt ?? 0));
  app.innerHTML = `${storageNoticeMarkup()}
    ${recentProject ? `<section class="panel continue-panel" aria-labelledby="continue-heading">
      <div><p class="eyebrow">Pick up where you left off</p><h2 id="continue-heading">${escapeHtml(recentProject.name)}</h2>
      <p>${recentProgress.percent}% complete · ${recentProgress.completed} of ${recentProgress.total} tasks completed</p>
      <div class="progress-track" role="progressbar" aria-label="Recent project progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${recentProgress.percent}"><div class="progress-fill" style="width:${recentProgress.percent}%"></div></div></div>
      <button class="button" type="button" data-open-project="${escapeHtml(recentProject.id)}">Continue Project <span aria-hidden="true">→</span></button>
    </section>` : ""}
    <section class="hero"><p class="eyebrow">A little structure, a lot less overwhelm</p>
      <h1>Turn your idea<br>into a plan.</h1>
      <p class="hero-copy">ScopeSprint breaks a software idea into manageable tasks, so you can focus on one doable step at a time.</p>
    </section>
    <div class="dashboard-grid">
      <section class="panel form-panel" aria-labelledby="create-heading">
        <h2 id="create-heading" class="panel-title">Start with your idea</h2>
        <p class="panel-intro">A small first version is a great place to begin.</p>
        <form id="project-form" novalidate>
          <div class="field"><label for="project-name">Project name</label>
            <input id="project-name" name="name" type="text" autocomplete="off" placeholder="e.g. StudyBuddy" value="${escapeHtml(formState.name)}" aria-describedby="name-error">
            <p class="field-error" id="name-error" role="alert" hidden></p></div>
          <div class="field"><label for="idea-description">What would you like to build?</label>
            <textarea id="idea-description" name="ideaText" placeholder="Describe the app idea in a few sentences..." aria-describedby="idea-error">${escapeHtml(formState.ideaText)}</textarea>
            <p class="field-error" id="idea-error" role="alert" hidden></p></div>
          <div class="field"><label for="available-hours">How many hours do you have?</label>
            <div class="input-unit"><input id="available-hours" name="hours" type="number" min="0.01" step="any" inputmode="decimal" placeholder="e.g. 2.5" value="${escapeHtml(formState.hours)}" aria-describedby="hours-unit hours-error"><span class="unit-label" id="hours-unit">hours</span></div>
            <p class="field-error" id="hours-error" role="alert" hidden></p></div>
          <button class="button button-full" type="submit">Create My Project <span aria-hidden="true">→</span></button>
        </form>
      </section>
      <aside class="side-column" aria-label="Example plan preview">
        <section class="panel preview-panel"><div class="preview-head"><h2>Here's what a plan can look like</h2><p>A small sample of the steps inside your project.</p></div>
          <div class="preview-content"><div class="preview-project"><span class="preview-icon" aria-hidden="true">✳</span><div><strong>StudyBuddy</strong><span>A sample student planner</span></div></div>
            <div class="progress-heading"><span>Project progress</span><span>2 of 6 tasks</span></div><div class="progress-track" aria-hidden="true"><div class="progress-fill"></div></div>
            <div class="mini-task"><span class="mini-check done" aria-hidden="true">✓</span><span>Sketch the main planner screen</span></div><div class="mini-task"><span class="mini-check" aria-hidden="true"></span><span>Add an assignment to the list</span></div>
            <div><span class="stage-pill">Plan</span><span class="stage-pill">Build</span><span class="stage-pill">Test &amp; Polish</span></div></div>
        </section>
        <section class="panel note-panel"><h3>Built for first versions</h3><p>Plans use clear, approximate estimates and put essential steps first. If an idea is too big, ScopeSprint helps you choose a smaller MVP.</p></section>
      </aside>
    </div>
    ${projects.length ? `<section class="projects-section" aria-labelledby="projects-heading"><div class="section-heading"><div><p class="eyebrow">Your work, saved here</p><h2 id="projects-heading">My Projects</h2></div><span>${projects.length} saved</span></div><div class="project-grid">${sortedProjects.map(renderProjectCard).join("")}</div></section>` : ""}`;

  const form = app.querySelector("#project-form");
  const inputs = Object.fromEntries(["name", "ideaText", "hours"].map((key) => [key, form.elements.namedItem(key)]));
  for (const [key, input] of Object.entries(inputs)) {
    input.addEventListener("input", () => { formState[key] = input.value; updateFieldError(key, validateProjectInput(formState).errors[key]); });
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formState = Object.fromEntries(Object.entries(inputs).map(([key, input]) => [key, input.value]));
    const { errors } = validateProjectInput(formState);
    for (const key of Object.keys(inputs)) updateFieldError(key, errors[key]);
    if (Object.keys(errors).length) { form.querySelector("[aria-invalid='true']")?.focus(); return; }
    currentProject = buildPlan(formState);
    rememberProject(currentProject);
    setRecentProjectId(currentProject.id);
    renderPlan();
  });
  app.querySelectorAll("[data-open-project]").forEach((button) => button.addEventListener("click", () => {
    currentProject = projects.find((project) => project.id === button.dataset.openProject) ?? null;
    if (!currentProject) return;
    setRecentProjectId(currentProject.id);
    renderPlan();
  }));
}

function updateFieldError(key, message) {
  const input = app.querySelector(`[name="${key}"]`);
  const error = app.querySelector(`#${key === "ideaText" ? "idea" : key}-error`);
  if (!input || !error) return;
  input.setAttribute("aria-invalid", message ? "true" : "false");
  error.textContent = message ?? "";
  error.hidden = !message;
}

function renderScopeSection(project) {
  if (!project.narrowed) return "";
  const features = (project.coreFeatures ?? []).map((feature) => `<li>${escapeHtml(feature)}</li>`).join("");
  const fitMessage = project.overCoreBudget ? `<p class="scope-warning"><strong>Time check:</strong> even this smallest useful plan is about ${escapeHtml(formatEstimate(project.coreMinutes).replace("About ", ""))}. Your budget is ${escapeHtml(formatEstimate(project.availableMinutes).replace("About ", ""))}, so treat this as a starting point and consider reducing the goal further.</p>` : "";
  const postponed = project.postponedTasks?.length ? `<ul>${project.postponedTasks.map((task) => `<li><strong>${escapeHtml(task.title)}:</strong> ${escapeHtml(task.reason)}</li>`).join("")}</ul>` : "<p>No optional features were postponed for this plan.</p>";
  return `<section class="panel scope-panel" aria-labelledby="scope-heading"><p class="eyebrow">A smaller first version</p><h2 id="scope-heading">How we narrowed your idea</h2><p class="scope-intro">We prioritized the features that make the core experience work, so you can build and test a usable version before adding more.</p>${fitMessage}<div class="scope-columns">
    <section class="scope-card"><h3>Your original idea</h3><p class="idea-verbatim">${escapeHtml(project.ideaText)}</p></section>
    <section class="scope-card"><h3>Your MVP for now</h3><p>The smallest useful version for this first build includes:</p><ul>${features}</ul></section>
    <section class="scope-card"><h3>Save for later</h3>${postponed}</section></div></section>`;
}

function renderPlan(expandedStages, editingTaskId = null) {
  if (!currentProject) return renderDashboard();
  const allTasks = flattenTasks(currentProject.stages);
  const progress = calculateProgress(allTasks);
  const openStageIds = expandedStages ?? new Set(currentProject.stages.map((stage) => stage.id));
  const stages = currentProject.stages.map((stage) => {
    const stageProgress = calculateProgress(stage.tasks);
    const cards = stage.tasks.map((task) => `<article class="task-card ${task.completed ? "is-complete" : ""}">
      <input class="task-check" type="checkbox" data-stage="${escapeHtml(stage.id)}" data-task="${escapeHtml(task.id)}" ${task.completed ? "checked" : ""} aria-label="Mark ${escapeHtml(task.title)} complete">
      <div class="task-main">${editingTaskId === task.id ? `<form class="task-edit-form" data-edit-task="${escapeHtml(task.id)}"><label class="sr-only" for="edit-${escapeHtml(task.id)}">Task title</label><input id="edit-${escapeHtml(task.id)}" name="title" value="${escapeHtml(task.title)}" required><button class="small-button" type="submit">Save</button><button class="text-button small-text-button" type="button" data-cancel-edit>Cancel</button><p class="field-error" data-title-error role="alert" hidden></p></form>` : `<div class="task-heading"><h3 class="task-title">${escapeHtml(task.title)}</h3><button class="task-action" type="button" data-edit-title="${escapeHtml(task.id)}">Edit title</button></div>`}
        ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ""}
        ${task.completionCriteria ? `<details class="task-details"><summary>See completion goal</summary><p class="task-criteria">${escapeHtml(task.completionCriteria)}</p></details>` : ""}</div>
      <span class="task-time">${task.estimatedMinutes ? escapeHtml(formatEstimate(task.estimatedMinutes)) : "No estimate"}</span></article>`).join("");
    return `<details class="panel stage" data-stage-section="${escapeHtml(stage.id)}" ${openStageIds.has(stage.id) ? "open" : ""}><summary><span class="stage-title">${escapeHtml(stage.name)}<span class="stage-count">${stageProgress.completed} of ${stageProgress.total} complete</span></span></summary><div class="stage-tasks">${cards || `<p class="empty-stage">No tasks yet. Add one below.</p>`}</div></details>`;
  }).join("");

  app.innerHTML = `${storageNoticeMarkup()}<div class="plan-header"><button class="text-button" id="back-to-dashboard" type="button">← Back to Dashboard</button><div><p class="eyebrow">Your first version, step by step</p><h1>${escapeHtml(currentProject.name)}</h1></div></div>
    <section class="panel plan-summary" aria-label="Project overview and progress"><div><div class="project-name-edit"><h2>Project name</h2><button class="task-action" id="edit-project-name" type="button">Edit name</button></div><p class="idea-verbatim">${escapeHtml(currentProject.ideaText)}</p><form id="project-name-form" class="inline-name-form" hidden><label for="new-project-name">Project name</label><input id="new-project-name" name="name" value="${escapeHtml(currentProject.name)}" required><button class="small-button" type="submit">Save name</button><button class="text-button small-text-button" type="button" data-cancel-name>Cancel</button><p class="field-error" id="project-name-error" role="alert" hidden></p></form></div>
      <div class="plan-progress"><div class="progress-heading"><strong>Overall progress</strong><span>${progress.percent}%</span></div><div class="progress-track" role="progressbar" aria-label="Overall task progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress.percent}"><div class="progress-fill" style="width:${progress.percent}%"></div></div><div class="plan-progress-note">${progress.completed} of ${progress.total} tasks completed · time estimates are approximate</div></div></section>
    ${renderScopeSection(currentProject)}<p class="plan-note">Work through the stages in order. Check a task when its completion goal is met.</p>
    <section aria-label="Project stages">${stages}</section>
    <section class="panel add-task-panel" aria-labelledby="add-task-heading"><h2 id="add-task-heading">Add a task</h2><p class="panel-intro">New tasks start incomplete and appear at the end of their stage.</p><form id="add-task-form" novalidate>
      <div class="field"><label for="new-task-title">Task title</label><input id="new-task-title" name="title" placeholder="e.g. Add a clear empty state" required aria-describedby="new-task-title-error"><p class="field-error" id="new-task-title-error" role="alert" hidden></p></div>
      <div class="field"><label for="new-task-stage">Stage</label><select id="new-task-stage" name="stage">${STAGES.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("")}</select></div>
      <div class="field"><label for="new-task-description">Description <span class="optional-label">(optional)</span></label><textarea id="new-task-description" name="description" placeholder="What should you do?"></textarea></div>
      <div class="field"><label for="new-task-estimate">Estimated time <span class="optional-label">(optional)</span></label><div class="input-unit"><input id="new-task-estimate" name="estimate" type="number" min="0.01" step="any" placeholder="e.g. 30"><select name="unit" aria-label="Estimate unit"><option value="minutes">minutes</option><option value="hours">hours</option></select></div><p class="field-error" id="new-task-estimate-error" role="alert" hidden></p></div>
      <button class="button" type="submit">Add Task</button></form></section>
    <div class="plan-footer-action"><button class="text-button" id="plan-back-to-dashboard" type="button">← Back to Dashboard</button></div>`;

  const currentOpenIds = () => new Set([...app.querySelectorAll(".stage[open]")].map((element) => element.dataset.stageSection));
  const saveAndRender = () => { rememberProject(currentProject); renderPlan(currentOpenIds()); };
  const back = () => { currentProject = null; renderDashboard(); app.focus(); };
  app.querySelectorAll("#back-to-dashboard, #plan-back-to-dashboard").forEach((button) => button.addEventListener("click", back));
  app.querySelectorAll(".task-check").forEach((checkbox) => checkbox.addEventListener("change", () => {
    const stage = currentProject.stages.find((item) => item.id === checkbox.dataset.stage);
    const task = stage?.tasks.find((item) => item.id === checkbox.dataset.task);
    if (!task) return;
    task.completed = checkbox.checked;
    rememberProject(currentProject);
    renderPlan(currentOpenIds());
  }));
  app.querySelectorAll("[data-edit-title]").forEach((button) => button.addEventListener("click", () => renderPlan(currentOpenIds(), button.dataset.editTitle)));
  app.querySelectorAll("[data-cancel-edit]").forEach((button) => button.addEventListener("click", () => renderPlan(currentOpenIds())));
  app.querySelectorAll("[data-edit-task]").forEach((form) => form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = form.elements.title.value.trim();
    const error = form.querySelector("[data-title-error]");
    if (!title) { error.textContent = "Enter a task title."; error.hidden = false; form.elements.title.setAttribute("aria-invalid", "true"); return; }
    const task = flattenTasks(currentProject.stages).find((item) => item.id === form.dataset.editTask);
    if (!task) return;
    task.title = title;
    saveAndRender();
  }));
  app.querySelector("#edit-project-name").addEventListener("click", () => {
    const form = app.querySelector("#project-name-form"); form.hidden = false; form.elements.name.focus();
  });
  app.querySelector("[data-cancel-name]").addEventListener("click", () => { app.querySelector("#project-name-form").hidden = true; });
  app.querySelector("#project-name-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name.value.trim();
    const error = form.querySelector("#project-name-error");
    if (!name) { error.textContent = "Enter a project name."; error.hidden = false; form.elements.name.setAttribute("aria-invalid", "true"); return; }
    currentProject.name = name;
    saveAndRender();
  });
  app.querySelector("#add-task-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const title = form.elements.title.value.trim();
    const rawEstimate = form.elements.estimate.value.trim();
    const estimate = rawEstimate === "" ? null : Number(rawEstimate);
    const titleError = app.querySelector("#new-task-title-error");
    const estimateError = app.querySelector("#new-task-estimate-error");
    titleError.hidden = Boolean(title); titleError.textContent = title ? "" : "Enter a task title.";
    const invalidEstimate = rawEstimate !== "" && (!Number.isFinite(estimate) || estimate <= 0);
    estimateError.hidden = !invalidEstimate;
    estimateError.textContent = invalidEstimate ? "Enter a time greater than 0, or leave it blank." : "";
    form.elements.title.setAttribute("aria-invalid", String(!title));
    form.elements.estimate.setAttribute("aria-invalid", String(invalidEstimate));
    if (!title || !estimateError.hidden) { (!title ? form.elements.title : form.elements.estimate).focus(); return; }
    const stageName = form.elements.stage.value;
    let stage = currentProject.stages.find((item) => item.name === stageName);
    if (!stage) { stage = { id: stageName.toLowerCase().replace(/[^a-z]+/g, "-"), name: stageName, tasks: [] }; currentProject.stages.push(stage); currentProject.stages.sort((a, b) => STAGES.indexOf(a.name) - STAGES.indexOf(b.name)); }
    stage.tasks.push({
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title, description: form.elements.description.value.trim(), completionCriteria: "",
      estimatedMinutes: estimate === null ? null : estimate * (form.elements.unit.value === "hours" ? 60 : 1), completed: false
    });
    rememberProject(currentProject);
    renderPlan(new Set([...currentOpenIds(), stage.id]));
  });
}

renderDashboard();
