import os
import sys
import random
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from supabase_inserter import SupabaseInserter

def populate_facilities():
    inserter = SupabaseInserter()
    conn = inserter.get_connection()
    cur = conn.cursor()
    
    try:
        # Get all school IDs
        print("Fetching school IDs...")
        cur.execute("SELECT id FROM schools;")
        school_ids = [row[0] for row in cur.fetchall()]
        print(f"Found {len(school_ids)} schools.")
        
        # Batch insert facilities
        batch_size = 500
        print(f"Starting batch population of facilities for {len(school_ids)} schools...")
        
        for i in range(0, len(school_ids), batch_size):
            batch_ids = school_ids[i:i+batch_size]
            print(f"Processing batch {i//batch_size + 1}...")
            
            for school_id in batch_ids:
                sql = """
                INSERT INTO school_facilities (
                    school_id, has_library, has_playground, has_smart_classes, 
                    has_computer_lab, has_science_lab, has_transport, 
                    has_canteen, has_sports_complex, has_arts_music, has_stem_robotics
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (school_id) DO NOTHING;
                """
                cur.execute(sql, (
                    school_id, 
                    random.choice([True, False]),
                    random.choice([True, False]),
                    random.choice([True, True, False]),
                    random.choice([True, True, False]),
                    random.choice([True, False]),
                    random.choice([True, True, True, False]),
                    random.choice([True, False]),
                    random.choice([False, False, True]),
                    random.choice([True, False]),
                    random.choice([False, False, True])
                ))
            conn.commit()
            
        print("Facilities population completed.")
    except Exception as e:
        print(f"Error: {e}")
        conn.rollback()
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    # First, we need to make sure the unique constraint exists for ON CONFLICT
    # Let's add a unique constraint on school_id if it doesn't exist
    inserter = SupabaseInserter()
    conn = inserter.get_connection()
    cur = conn.cursor()
    try:
        print("Ensuring unique constraint on school_facilities(school_id)...")
        cur.execute("ALTER TABLE school_facilities ADD CONSTRAINT school_facilities_school_id_key UNIQUE (school_id);")
        conn.commit()
    except Exception:
        conn.rollback()
    finally:
        cur.close()
        conn.close()
        
    populate_facilities()
