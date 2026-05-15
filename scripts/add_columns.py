import os
import re
import psycopg2
from dotenv import load_dotenv

def add_columns():
    load_dotenv()
    db_url = os.getenv("DIRECT_DB_URL")
    
    # Handle password with '@' using regex
    match = re.match(r'postgresql://(.*?):(.*)@(.*):(\d+)/(.*)', db_url)
    if match:
        user, password, host, port, dbname = match.groups()
        conn = psycopg2.connect(
            dbname=dbname,
            user=user,
            password=password,
            host=host,
            port=port
        )
    else:
        conn = psycopg2.connect(db_url)
    
    cur = conn.cursor()
    
    try:
        print("Adding 'tags', 'affiliation_no', and 'rating' columns to schools table...")
        cur.execute("ALTER TABLE schools ADD COLUMN IF NOT EXISTS tags TEXT[];")
        cur.execute("ALTER TABLE schools ADD COLUMN IF NOT EXISTS affiliation_no TEXT;")
        cur.execute("ALTER TABLE schools ADD COLUMN IF NOT EXISTS rating FLOAT;")
        conn.commit()
        print("Successfully updated schema.")
    except Exception as e:
        print(f"Error updating schema: {e}")
        conn.rollback()
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    add_columns()
