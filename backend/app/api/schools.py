from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
import os
import psycopg2
import re

router = APIRouter()

def get_db_conn():
    db_url = os.getenv('DIRECT_DB_URL')
    if not db_url:
        raise HTTPException(status_code=500, detail="Database URL not configured")
    
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

@router.get("/")
async def list_schools(city: Optional[str] = None, conn=Depends(get_db_conn)):
    cur = conn.cursor()
    query = "SELECT * FROM schools"
    params = []
    if city:
        query += " WHERE city = %s"
        params.append(city)
        
    cur.execute(query, params)
    columns = [desc[0] for desc in cur.description]
    results = [dict(zip(columns, row)) for row in cur.fetchall()]
    cur.close()
    return results

@router.get("/{school_id}")
async def get_school(school_id: str, conn=Depends(get_db_conn)):
    cur = conn.cursor()
    cur.execute("SELECT * FROM schools WHERE id = %s", (school_id,))
    row = cur.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="School not found")
    
    columns = [desc[0] for desc in cur.description]
    school = dict(zip(columns, row))
    
    # Also fetch facilities
    cur.execute("SELECT * FROM school_facilities WHERE school_id = %s", (school_id,))
    fac_row = cur.fetchone()
    if fac_row:
        fac_columns = [desc[0] for desc in cur.description]
        school['facilities'] = dict(zip(fac_columns, fac_row))
    
    cur.close()
    return school
