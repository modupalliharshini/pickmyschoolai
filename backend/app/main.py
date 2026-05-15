from fastapi import FastAPI
from app.api.schools import router as schools_router
from app.api.recommendations import router as recommendations_router

app = FastAPI(title="Pick My School AI API")

app.include_router(schools_router, prefix="/api/schools", tags=["schools"])
app.include_router(recommendations_router, prefix="/api/recommendations", tags=["recommendations"])

@app.get("/")
async def root():
    return {"message": "Welcome to Pick My School AI API"}
