const API_BASE = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"
).replace(/\/$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, options);

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.detail || `Backend error: ${response.status}`
    );
  }

  return data;
}

export const api = {
  health: () => request("/health"),

  analyze: (text) =>
    request("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    }),

  analyzeDocument: (file) => {
    const form = new FormData();
    form.append("file", file);

    return request("/api/document/analyze", {
      method: "POST",
      body: form,
    });
  },

  matchResume: (file, jobDescription) => {
    const form = new FormData();
    form.append("file", file);
    form.append("job_description", jobDescription);

    return request("/api/resume/match", {
      method: "POST",
      body: form,
    });
  },

  roadmap: (targetJob, missingSkills) =>
    request("/api/skill-coach/roadmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        target_job: targetJob,
        missing_skills: missingSkills,
      }),
    }),

  gmailStatus: () => request("/api/email/status"),
  gmailConnect: "http://localhost:8000/api/email/connect",
  gmailSync: () =>
    request("/api/email/sync", { method: "POST" }),
  gmailSaved: () => request("/api/email/saved"),
  gmailDashboard: () => request("/api/email/dashboard"),
};
