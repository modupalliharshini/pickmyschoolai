import os
import psycopg2
import re
from dotenv import load_dotenv

load_dotenv('scripts/.env')
db_url = os.getenv('DIRECT_DB_URL')

def get_db_params(url):
    pattern = r"postgresql://(?P<user>[^:]+):(?P<password>.+)@(?P<host>[^:/]+):(?P<port>\d+)/(?P<dbname>.+)"
    match = re.match(pattern, url)
    if match:
        return match.groupdict()
    return None

params = get_db_params(db_url)
conn = psycopg2.connect(**params) if params else psycopg2.connect(db_url)
cur = conn.cursor()

names = ['Dhirubhai Ambani International School', 'The Shri Ram School', 'Indus International School']
# Use ILIKE to be safer with names
for name in names:
    cur.execute("SELECT id, name FROM schools WHERE name ILIKE %s LIMIT 1", (f"%{name}%",))
    res = cur.fetchone()
    if res:
        print(f"ID: {res[0]} | Name: {res[1]}")
    else:
        print(f"Not found: {name}")

cur.close()
conn.close()
