export const STAGES = ["Plan", "Build", "Test & Polish"];

const templates = {
  student: [
    { stage: "Plan", title: "Choose one student problem to solve", description: "Pick one frustrating study-planning moment to improve, such as keeping track of assignments and due dates.", completionCriteria: "Write down one target student and the single problem this first version will solve.", estimatedMinutes: 20, core: true, feature: "A focused study-planning goal", saveReason: "A clear first user keeps the first build small." },
    { stage: "Plan", title: "Sketch the main planner screen", description: "Draw where a student will see the next assignment and add a new one. Paper is enough for this first sketch.", completionCriteria: "A simple sketch shows the assignment list and the add-task form.", estimatedMinutes: 25, core: true, feature: "A simple assignment list", saveReason: "Extra screens can wait until the main list is useful." },
    { stage: "Plan", title: "Decide which assignment details to keep", description: "Start with only the details needed to recognize and finish one assignment.", completionCriteria: "Choose a title and due date as the first version's assignment fields.", estimatedMinutes: 15, core: false, feature: "Clear assignment details", saveReason: "Additional labels and filters are easier after the basic list works." },
    { stage: "Build", title: "Create the planner page structure", description: "Add the page heading, assignment form, and an empty area where assignments will appear.", completionCriteria: "The page shows the heading, form fields, and an empty assignment-list area.", estimatedMinutes: 35, core: true, feature: "A usable planner page", saveReason: "A visual redesign can follow once the page works." },
    { stage: "Build", title: "Add an assignment to the list", description: "When the form is submitted, show the new assignment in the list and clear the form fields.", completionCriteria: "Submitting a title and due date adds one visible assignment without refreshing the page.", estimatedMinutes: 45, core: true, feature: "Add and view assignments", saveReason: "Reminders and automatic schedule planning need more pieces than a small first version." },
    { stage: "Build", title: "Mark an assignment as finished", description: "Add a checkbox beside each assignment so a student can show what is already done.", completionCriteria: "Checking an assignment visibly marks it complete; unchecking it restores the unfinished state.", estimatedMinutes: 30, core: true, feature: "Track assignment completion", saveReason: "Charts and streaks can wait until completion tracking is useful." },
    { stage: "Build", title: "Keep assignments after closing the page", description: "Save assignment data in the browser so the list can return after a refresh.", completionCriteria: "An assignment remains visible after refreshing the page in the same browser.", estimatedMinutes: 35, core: false, feature: "Save the study plan", saveReason: "Browser saving is a helpful follow-up after the main task flow works." },
    { stage: "Test & Polish", title: "Try the planner with a few assignments", description: "Check that adding, completing, and refreshing the planner behave as expected.", completionCriteria: "Two assignments can be added, one completed, and both remain understandable after a refresh.", estimatedMinutes: 25, core: true, feature: "A tested core flow", saveReason: "More advanced testing can grow with the app." },
    { stage: "Test & Polish", title: "Make the planner comfortable on a phone", description: "Check that the form and list fit a narrow screen and the buttons are easy to tap.", completionCriteria: "The page can be used at a phone-sized width without sideways scrolling.", estimatedMinutes: 30, core: false, feature: "A mobile-friendly planner", saveReason: "Fine visual polish can follow after the phone layout works." }
  ],
  habit: [
    { stage: "Plan", title: "Choose one habit to track", description: "Keep the first version focused on one small habit, such as reading for ten minutes.", completionCriteria: "Write down one habit and what counts as completing it today.", estimatedMinutes: 15, core: true, feature: "One clear daily habit", saveReason: "Multiple habits can wait until one habit is easy to track." },
    { stage: "Plan", title: "Sketch today's habit view", description: "Decide where the habit name, today's status, and completion action will appear.", completionCriteria: "A quick sketch shows the habit and one done/not-done control.", estimatedMinutes: 20, core: true, feature: "A simple daily view", saveReason: "Separate reports and settings are not needed to test the habit loop." },
    { stage: "Build", title: "Create the habit card", description: "Show the chosen habit and a clear control for marking it complete for today.", completionCriteria: "The page displays one habit and a visible completion checkbox or button.", estimatedMinutes: 35, core: true, feature: "A trackable habit", saveReason: "Custom icons and colors can be added after the action works." },
    { stage: "Build", title: "Show today's completion state", description: "Make it clear when the habit has been completed and let the user undo that action.", completionCriteria: "Marking the habit complete changes the visible status; toggling it again returns it to incomplete.", estimatedMinutes: 35, core: true, feature: "Visible completion tracking", saveReason: "Streaks require date handling and can come later." },
    { stage: "Build", title: "Save today's habit status", description: "Keep the habit and its current status in the browser after a refresh.", completionCriteria: "The habit name and today's status return after refreshing the same browser page.", estimatedMinutes: 35, core: false, feature: "Remember today's progress", saveReason: "History across many days is a separate feature." },
    { stage: "Test & Polish", title: "Test the daily habit loop", description: "Try completing and undoing the habit, then check it on a narrow screen.", completionCriteria: "The status toggles correctly and the main control is usable on a phone-sized screen.", estimatedMinutes: 25, core: true, feature: "A checked habit flow", saveReason: "A larger test suite can wait until more behavior is added." }
  ],
  recipe: [
    { stage: "Plan", title: "Choose the recipe details to keep", description: "Start with the information someone needs to recognize a recipe and begin cooking it.", completionCriteria: "Choose a recipe name and a short ingredient or note field.", estimatedMinutes: 20, core: true, feature: "A focused recipe card", saveReason: "Ratings, photos, and nutrition can wait until saving recipes works." },
    { stage: "Plan", title: "Sketch the recipe list", description: "Plan a simple list and a small form for adding another recipe.", completionCriteria: "A sketch shows where saved recipes and the add form appear.", estimatedMinutes: 20, core: true, feature: "A simple recipe collection", saveReason: "Search and categories are useful later, but not needed for the first list." },
    { stage: "Build", title: "Create the recipe form and list", description: "Add fields for a recipe name and notes, then show saved recipes in a list.", completionCriteria: "Submitting a recipe makes its name and notes appear on the page.", estimatedMinutes: 50, core: true, feature: "Add and view recipes", saveReason: "Importing recipes from other websites adds a separate integration." },
    { stage: "Build", title: "Keep recipes after a refresh", description: "Save recipes in the browser so the collection is still there when the user returns.", completionCriteria: "A saved recipe remains after refreshing the page in the same browser.", estimatedMinutes: 35, core: true, feature: "A saved recipe collection", saveReason: "Sharing and cloud sync need accounts and a server, so they are outside this first version." },
    { stage: "Build", title: "Add a recipe search box", description: "Let someone find a recipe by searching the names already in the list.", completionCriteria: "Typing part of a recipe name narrows the visible list.", estimatedMinutes: 35, core: false, feature: "Find a recipe by name", saveReason: "Search is helpful but the first collection can work as a short list." },
    { stage: "Test & Polish", title: "Test adding and finding recipes", description: "Add two recipes, refresh, and confirm the important information is still readable.", completionCriteria: "Both recipes return after refresh and their names and notes are visible.", estimatedMinutes: 25, core: true, feature: "A tested recipe flow", saveReason: "Advanced import and sharing tests are outside the first version." }
  ],
  general: [
    { stage: "Plan", title: "Choose one user and one problem", description: "Describe who the first version is for and the one small problem it should solve.", completionCriteria: "Write one sentence naming a user and the problem they need help with.", estimatedMinutes: 15, core: true, feature: "A focused first goal", saveReason: "A narrow goal makes it possible to finish and test a first version." },
    { stage: "Plan", title: "Sketch the main screen", description: "Draw the most important information and the one action the user needs first.", completionCriteria: "A paper or digital sketch shows the main content and one key action.", estimatedMinutes: 20, core: true, feature: "One useful screen", saveReason: "Additional pages can be added after the main screen solves one problem." },
    { stage: "Build", title: "Create the page and its main form", description: "Build one page with a clear heading, a small input form, and a place for the result.", completionCriteria: "The page shows its heading, one form, and a visible result area.", estimatedMinutes: 35, core: true, feature: "A simple web app screen", saveReason: "A multi-page layout can wait until the first screen is useful." },
    { stage: "Build", title: "Make the main action work", description: "Connect the form to the main action so the user sees a useful result on the page.", completionCriteria: "Entering a valid example and submitting it updates the page without a reload.", estimatedMinutes: 45, core: true, feature: "One working core action", saveReason: "Accounts, payments, and outside integrations can be considered only if the core action proves useful." },
    { stage: "Build", title: "Keep the result in the browser", description: "If the project needs saved information, store the first version locally in the browser.", completionCriteria: "The key result remains after a refresh in the same browser.", estimatedMinutes: 35, core: false, feature: "Remember the result", saveReason: "Cloud sync would add accounts and a server, so it is postponed." },
    { stage: "Test & Polish", title: "Try the main action with a few inputs", description: "Check a normal input, an empty input, and a small-screen layout.", completionCriteria: "The app gives a useful result for normal input and a clear message for an empty one.", estimatedMinutes: 25, core: true, feature: "A tested first flow", saveReason: "Broader edge-case testing can grow with the app." }
  ]
};

const rules = [
  { key: "student", keywords: ["student", "study", "homework", "assignment", "class planner", "study planner"] },
  { key: "habit", keywords: ["habit", "routine", "daily tracker", "streak"] },
  { key: "recipe", keywords: ["recipe", "meal planner", "recipe organizer", "cookbook"] }
];
const largeIdeaPattern = /\b(uber clone|social network|social media platform|marketplace|payment processing|ride sharing|rideshare|banking app|production scale)\b/i;

export function validateProjectInput({ name = "", ideaText = "", hours = "" } = {}) {
  const errors = {};
  if (!String(name).trim()) errors.name = "Enter a project name.";
  if (!String(ideaText).trim()) errors.ideaText = "Describe the app idea in a few words.";
  const rawHours = String(hours).trim();
  const numericHours = rawHours === "" ? NaN : Number(rawHours);
  if (!Number.isFinite(numericHours) || numericHours <= 0) {
    errors.hours = "Enter a number of hours greater than 0. Decimals are okay.";
  }
  return { errors, values: { name: String(name).trim(), ideaText: String(ideaText).trim(), hours: numericHours } };
}

export function chooseTemplate(name, ideaText) {
  const words = `${name} ${ideaText}`.toLowerCase();
  if (largeIdeaPattern.test(words)) return { key: "general", largeIdea: true };
  const match = rules.find((rule) => rule.keywords.some((keyword) => words.includes(keyword)));
  return { key: match?.key ?? "general", largeIdea: false };
}

export function formatEstimate(minutes) {
  if (!Number.isFinite(minutes) || minutes <= 0) return "Not estimated";
  if (minutes < 60) return `About ${minutes} min`;
  const hours = minutes / 60;
  const rounded = Math.round(hours * 10) / 10;
  return `About ${rounded} ${rounded === 1 ? "hour" : "hours"}`;
}

export function calculateProgress(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  return { total, completed, percent: total === 0 ? 0 : Math.round((completed / total) * 100) };
}

export function buildPlan({ name, ideaText, hours }) {
  const { values, errors } = validateProjectInput({ name, ideaText, hours });
  if (Object.keys(errors).length) throw new Error("Project details must be valid before a plan can be created.");

  const chosen = chooseTemplate(values.name, values.ideaText);
  const sourceTasks = templates[chosen.key];
  const availableMinutes = Math.round(values.hours * 60);
  const coreTasks = sourceTasks.filter((task) => task.core);
  const optionalTasks = sourceTasks.filter((task) => !task.core);
  const coreMinutes = coreTasks.reduce((sum, task) => sum + task.estimatedMinutes, 0);
  const totalMinutes = sourceTasks.reduce((sum, task) => sum + task.estimatedMinutes, 0);
  const selectedIds = new Set(coreTasks.map((task) => task.title));
  let remaining = Math.max(0, availableMinutes - coreMinutes);
  const postponedTasks = [];

  for (const task of optionalTasks) {
    if (!chosen.largeIdea && coreMinutes <= availableMinutes && task.estimatedMinutes <= remaining) {
      selectedIds.add(task.title);
      remaining -= task.estimatedMinutes;
    } else {
      postponedTasks.push(task);
    }
  }

  const includedTasks = sourceTasks.filter((task) => selectedIds.has(task.title));
  const narrowed = chosen.largeIdea || totalMinutes > availableMinutes || coreMinutes > availableMinutes;
  const stages = STAGES.map((stageName) => ({
    id: stageName.toLowerCase().replace(/[^a-z]+/g, "-"),
    name: stageName,
    tasks: includedTasks.filter((task) => task.stage === stageName).map((task, index) => ({
      id: `${stageName.toLowerCase().replace(/[^a-z]+/g, "-")}-${index + 1}`,
      title: task.title,
      description: task.description,
      completionCriteria: task.completionCriteria,
      estimatedMinutes: task.estimatedMinutes,
      completed: false
    }))
  }));

  const now = new Date().toISOString();
  return {
    id: `project-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: values.name,
    ideaText: String(ideaText),
    createdAt: now,
    updatedAt: now,
    availableMinutes,
    templateKey: chosen.key,
    narrowed,
    overCoreBudget: coreMinutes > availableMinutes,
    largeIdea: chosen.largeIdea,
    coreMinutes,
    totalMinutes,
    includedMinutes: includedTasks.reduce((sum, task) => sum + task.estimatedMinutes, 0),
    coreFeatures: [...new Set(coreTasks.map((task) => task.feature))],
    postponedTasks: postponedTasks.map((task) => ({ title: task.feature, reason: task.saveReason })),
    stages
  };
}

export function flattenTasks(stages) {
  return stages.flatMap((stage) => stage.tasks);
}
