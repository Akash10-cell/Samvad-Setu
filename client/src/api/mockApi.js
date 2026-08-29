// Initial fake database matching Section 6 JSON shape
let mockProblems = [
  {
    id: "SICP-2026-8901",
    title: "Solar Water Pump Malfunction in Secondary School",
    description: "The primary solar-powered water pump at Govt High School, Khunti has been non-functional for 3 weeks, affecting drinking water supply.",
    category: "Renewable Energy & Water",
    status: "in-progress", // 'new' | 'routed' | 'in-progress' | 'resolved'
    urgency: "urgent",
    location: { district: "Khunti", block: "Murhu", lat: 23.0726, lng: 85.2789 },
    createdAt: "2026-08-20T10:30:00Z",
    citizenName: "Soumyajit Karmakar",
    assignedInstitution: "Birsa Institute of Technology, Sindri",
    timeline: [
      { stage: "Reported", timestamp: "2026-08-20", actor: "Citizen" },
      { stage: "Classified", timestamp: "2026-08-20", actor: "AI Engine" },
      { stage: "Routed", timestamp: "2026-08-22", actor: "BIT Sindri" },
      { stage: "In Progress", timestamp: "2026-08-25", actor: "Student Team Alpha" }
    ]
  }
];

export const mockApi = {
  // Fetch citizen problems
  getProblems: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate 300ms network latency
    return [...mockProblems];
  },

  // Submit a new problem
  submitProblem: async (problemData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newProblem = {
      id: `SICP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      ...problemData,
      status: "new",
      createdAt: new Date().toISOString(),
      timeline: [
        { stage: "Reported", timestamp: new Date().toISOString().split('T')[0], actor: "Citizen" },
        { stage: "Classified", timestamp: new Date().toISOString().split('T')[0], actor: "AI Engine" }
      ]
    };
    mockProblems.unshift(newProblem);
    return newProblem;
  }
};