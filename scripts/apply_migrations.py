import os
import psycopg2
import re
from dotenv import load_dotenv

# Load environment variables from scripts/.env
load_dotenv('scripts/.env')

db_url = os.getenv('DIRECT_DB_URL')
migration_path = 'supabase/migrations/20240515000000_initial_schema.sql'

conn = None
cur = None

if not db_url:
    print("Error: DIRECT_DB_URL not found in scripts/.env")
    exit(1)

try:
    print(f"Connecting to database...")
    
    # Manually parse the URL to handle @ in password
    # Format: postgresql://user:password@host:port/dbname
    pattern = r"postgresql://(?P<user>[^:]+):(?P<password>.+)@(?P<host>[^:/]+):(?P<port>\d+)/(?P<dbname>.+)"
    match = re.match(pattern, db_url)
    
    if match:
        params = match.groupdict()
        conn = psycopg2.connect(**params)
    else:
        # Fallback to direct URL if pattern doesn't match
        conn = psycopg2.connect(db_url)
        
    cur = conn.cursor()
    
    print(f"Reading migration file: {migration_path}")
    with open(migration_path, 'r') as f:
        sql = f.read()
    
    print("Executing migration...")
    cur.execute(sql)
    conn.commit()
    
    print("Migration applied successfully!")
    
except Exception as e:
    print(f"Error applying migration: {e}")
    if conn:
        conn.rollback()
finally:
    if cur:
        cur.close()
    if conn:
        conn.close()
