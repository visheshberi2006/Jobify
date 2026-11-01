# Jobify Frontend (UI-only, integration-ready)

This package is a standalone React + Vite frontend using the same light lavender/white visual theme. It does not modify or start the backend, and it does not make API requests yet.

## Run on Windows
1. Extract this folder.
2. Open the folder in VS Code.
3. Open Terminal > New Terminal.
4. Run `npm install`
5. Run `npm run dev`
6. Open the local URL shown by Vite (normally `http://localhost:5173`).

If PowerShell blocks npm scripts, use `npm.cmd install` and `npm.cmd run dev`.

## Backend contract recorded for later integration
The supplied FastAPI backend exposes:
- `POST /api/analyze` — JSON `{ "text": "..." }`
- `POST /api/document/analyze` — multipart form field `file`
- `POST /api/resume/match` — multipart form fields `file`, `job_description`
- `POST /api/skill-coach/roadmap` — JSON `{ "target_job": "...", "missing_skills": ["..."] }`
- `GET /health`

The app currently uses clearly labelled demo responses so the screens can be reviewed before integration. Do not treat demo results as real analysis.
