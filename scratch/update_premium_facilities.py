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

premium_data = {
    "f3a39f25-600b-4e86-a3f4-67af52a2c9f6": "Dhirubhai Ambani International School",
    "415e0ad6-c48f-491f-b2f9-06dbc14adda3": "The Shri Ram School",
    "756bda4f-2033-4b10-aafa-77cfee1bce3c": "Indus International School"
}

for school_id, name in premium_data.items():
    print(f"Updating real facilities for {name}...")
    sql = """
    INSERT INTO school_facilities (
        school_id, has_library, has_playground, has_smart_classes, 
        has_computer_lab, has_science_lab, has_transport, 
        has_canteen, has_sports_complex, has_arts_music, has_stem_robotics
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    ON CONFLICT (school_id) DO UPDATE SET
        has_library = EXCLUDED.has_library,
        has_playground = EXCLUDED.has_playground,
        has_smart_classes = EXCLUDED.has_smart_classes,
        has_computer_lab = EXCLUDED.has_computer_lab,
        has_science_lab = EXCLUDED.has_science_lab,
        has_transport = EXCLUDED.has_transport,
        has_canteen = EXCLUDED.has_canteen,
        has_sports_complex = EXCLUDED.has_sports_complex,
        has_arts_music = EXCLUDED.has_arts_music,
        has_stem_robotics = EXCLUDED.has_stem_robotics;
    """
    cur.execute(sql, (
        school_id, True, True, True, True, True, True, True, True, True, True
    ))

conn.commit()
print("Updated premium facilities.")
cur.close()
conn.close()
