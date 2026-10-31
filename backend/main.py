
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# from routes.analyze import router

# app = FastAPI(
#     title="ScamShield AI",
#     description="AI-powered job fraud detection platform",
#     version="0.1.0"
# )

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )

# app.include_router(router, prefix="/api")


# @app.get("/")
# def home():
#     return {
#         "project": "ScamShield AI",
#         "status": "running"
#     }


# @app.get("/health")
# def health():
#     return {"status": "healthy"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.analyze import router as analyze_router
from routes.resume import router as resume_router
from routes.skill_coach import router as skill_coach_router
from routes.document_analysis import router as document_router
from routes.email import router as email_router
app = FastAPI(
    title="ScamShield AI",
    description="AI-powered job fraud detection platform",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# API routes
app.include_router(analyze_router, prefix="/api")
app.include_router(resume_router, prefix="/api")
app.include_router(skill_coach_router, prefix="/api")
app.include_router(document_router, prefix="/api")
app.include_router(email_router, prefix="/api")


@app.get("/")
def home():
    return {
        "project": "ScamShield AI",
        "status": "running"
    }


@app.get("/health")
def health():
    return {"status": "healthy"}
