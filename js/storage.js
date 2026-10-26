const PROJECTS_KEY = "scopesprint.projects.v1";
const RECENT_PROJECT_KEY = "scopesprint.recent-project.v1";

export function loadProjects(storage) {
  try {
    const target = storage ?? globalThis.localStorage;
    const value = target.getItem(PROJECTS_KEY);
    if (!value) return { projects: [], error: null };
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) throw new Error("Saved projects are not a list.");
    return { projects: parsed, error: null };
  } catch {
    return { projects: [], error: "Saved projects could not be read. You can keep working, but older browser data may be unavailable." };
  }
}

export function saveProject(project, storage) {
  try {
    const target = storage ?? globalThis.localStorage;
    const { projects, error } = loadProjects(target);
    if (error) return { ok: false, error: "This project could not be saved because the saved-project list could not be read." };
    const index = projects.findIndex((item) => item.id === project.id);
    if (index < 0) projects.push(project);
    else projects[index] = project;
    target.setItem(PROJECTS_KEY, JSON.stringify(projects));
    return { ok: true, error: null };
  } catch {
    return { ok: false, error: "Browser storage is unavailable. Your current changes may not survive a refresh." };
  }
}

export function getRecentProjectId(storage) {
  try { return (storage ?? globalThis.localStorage).getItem(RECENT_PROJECT_KEY); }
  catch { return null; }
}

export function setRecentProjectId(id, storage) {
  try {
    (storage ?? globalThis.localStorage).setItem(RECENT_PROJECT_KEY, id);
    return true;
  } catch { return false; }
}
