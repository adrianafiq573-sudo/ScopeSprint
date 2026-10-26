const originalSample = {
  id: "studybuddy-demo",
  name: "StudyBuddy: A Student Planner App",
  ideaText: "A simple planner that helps students keep track of assignments and feel less overwhelmed by schoolwork.",
  sampleGoal: "Help one student add assignments, see what is due, and mark work as finished.",
  stages: [
    { id: "plan", name: "Plan", tasks: [
      { id: "sample-plan-1", title: "Choose the first assignment details", description: "Decide what information makes one assignment easy to recognize and plan around.", completionCriteria: "Write down the assignment title and due date as the two details the first version will keep.", estimatedMinutes: 20, priority: "High", completed: false },
      { id: "sample-plan-2", title: "Sketch the planner screen", description: "Make a quick paper sketch showing where assignments and the add form will appear.", completionCriteria: "A sketch shows an assignment list and a small form for adding an assignment.", estimatedMinutes: 25, priority: "Medium", completed: false }
    ] },
    { id: "build", name: "Build", tasks: [
      { id: "sample-build-1", title: "Create the planner page", description: "Build the heading, assignment form, and an empty area for the list.", completionCriteria: "The page shows a heading, form, and empty assignment-list area.", estimatedMinutes: 45, priority: "High", completed: false },
      { id: "sample-build-2", title: "Add assignments to the list", description: "Connect the form so a submitted assignment appears in the list without reloading.", completionCriteria: "A title and due date can be submitted and appear as one visible assignment.", estimatedMinutes: 60, priority: "High", completed: false },
      { id: "sample-build-3", title: "Mark assignments as finished", description: "Add a checkbox beside each assignment so a student can track completed work.", completionCriteria: "Checking an assignment marks it complete, and unchecking it returns it to unfinished.", estimatedMinutes: 35, priority: "Medium", completed: false }
    ] },
    { id: "test-polish", name: "Test & Polish", tasks: [
      { id: "sample-test-1", title: "Try the planner with a few assignments", description: "Test adding, completing, and refreshing the planner with realistic schoolwork.", completionCriteria: "Two assignments can be added and one can be checked complete without confusing the list.", estimatedMinutes: 30, priority: "High", completed: false }
    ] }
  ]
};

export function createSampleProject() {
  return JSON.parse(JSON.stringify(originalSample));
}
