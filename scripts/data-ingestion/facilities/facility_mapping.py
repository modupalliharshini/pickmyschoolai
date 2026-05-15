import os
import sys
import random
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from supabase_inserter import SupabaseInserter

def get_heuristic_facilities(board, classification):
    """
    Returns a dictionary of facilities based on school profile probabilities.
    """
    board = (board or '').upper()
    classification = (classification or '').title()
    
    # Default probabilities
    probs = {
        "library": 0.6,
        "playground": 0.7,
        "smart_classes": 0.3,
        "computer_lab": 0.5,
        "science_lab": 0.4,
        "transport": 0.8,
        "canteen": 0.4,
        "sports_complex": 0.2,
        "arts_music": 0.4,
        "stem_robotics": 0.1
    }
    
    # Adjust based on board
    if "IB" in board or "IGCSE" in board:
        probs.update({
            "smart_classes": 0.95, "computer_lab": 0.98, "science_lab": 0.95,
            "sports_complex": 0.8, "stem_robotics": 0.9, "arts_music": 0.9
        })
    elif "ICSE" in board or "CBSE" in board:
        if classification == "Private":
            probs.update({
                "smart_classes": 0.7, "computer_lab": 0.85, "science_lab": 0.8,
                "sports_complex": 0.4, "stem_robotics": 0.3, "arts_music": 0.6
            })
    
    # Adjust based on classification
    if classification == "Government":
        probs.update({
            "smart_classes": 0.1, "stem_robotics": 0.05, "transport": 0.3,
            "library": 0.8, "playground": 0.9
        })

    return {k: random.random() < v for k, v in probs.items()}

def populate_all_facilities():
    inserter = SupabaseInserter()
    conn = inserter.get_connection()
    cur = conn.cursor()
    
    try:
        # Get all schools
        print("Fetching schools for heuristic population...")
        cur.execute("SELECT id, board, classification FROM schools;")
        schools = cur.fetchall()
        print(f"Found {len(schools)} schools.")
        
        batch_size = 1000
        for i in range(0, len(schools), batch_size):
            batch = schools[i:i+batch_size]
            print(f"Processing batch {i//batch_size + 1}...")
            
            for school_id, board, classification in batch:
                f = get_heuristic_facilities(board, classification)
                
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
                    school_id, f['library'], f['playground'], f['smart_classes'],
                    f['computer_lab'], f['science_lab'], f['transport'],
                    f['canteen'], f['sports_complex'], f['arts_music'], f['stem_robotics']
                ))
            conn.commit()
            
        print("Heuristic facilities population completed.")
    except Exception as e:
        print(f"Error: {e}")
        conn.rollback()
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    populate_all_facilities()
