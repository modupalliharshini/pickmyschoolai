import os
import psycopg2
import re
from dotenv import load_dotenv

# Load environment variables from scripts/.env
load_dotenv('scripts/.env')

db_url = os.getenv('DIRECT_DB_URL')

if not db_url:
    print("Error: DIRECT_DB_URL not found in scripts/.env")
    exit(1)

try:
    pattern = r"postgresql://(?P<user>[^:]+):(?P<password>.+)@(?P<host>[^:/]+):(?P<port>\d+)/(?P<dbname>.+)"
    match = re.match(pattern, db_url)
    
    if match:
        params = match.groupdict()
        conn = psycopg2.connect(**params)
    else:
        conn = psycopg2.connect(db_url)
        
    cur = conn.cursor()
    
    cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
    tables = cur.fetchall()
    
    print("Tables in database:")
    for table in tables:
        cur.execute(f"SELECT COUNT(*) FROM {table[0]}")
        count = cur.fetchone()[0]
        print(f"- {table[0]}: {count} records")
    
    print("\nSchools by Board:")
    cur.execute("SELECT board, COUNT(*) FROM schools GROUP BY board ORDER BY COUNT(*) DESC")
    boards = cur.fetchall()
    for board, count in boards:
        print(f"- {board}: {count} schools")
    
except Exception as e:
    print(f"Error: {e}")
finally:
    if 'cur' in locals() and cur: cur.close()
    if 'conn' in locals() and conn: conn.close()
