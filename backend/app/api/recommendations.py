from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from pydantic import BaseModel
import os
import psycopg2
import re
from app.services.recommendation_service import RecommendationService

router = APIRouter()

class UserPreferences(BaseModel):
    city: str
    grade: str
    board: List[str]
    budget: str
    priority: List[str]

def get_db_conn():
    db_url = os.getenv('DIRECT_DB_URL')
    if not db_url:
        raise HTTPException(status_code=500, detail="Database URL not configured")
    
    # Handle password with @
    pattern = r"postgresql://(?P<user>[^:]+):(?P<password>.+)@(?P<host>[^:/]+):(?P<port>\d+)/(?P<dbname>.+)"
    match = re.match(pattern, db_url)
    
    if match:
        params = match.groupdict()
        conn = psycopg2.connect(**params)
    else:
        conn = psycopg2.connect(db_url)
    
    try:
        yield conn
    finally:
        conn.close()

@router.post("/match")
async def get_matches(prefs: UserPreferences, conn=Depends(get_db_conn)):
    service = RecommendationService(conn)
    recommendations = service.get_recommendations(prefs.dict())
    return recommendations
