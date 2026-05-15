import os
import sys
import json
import random
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from supabase_inserter import SupabaseInserter

def process_state_data(json_path):
    print(f"Reading State Board data from {json_path}...")
    with open(json_path, 'r') as f:
        city_data = json.load(f)
    
    processed_schools = []
    potential_tags = ["Academics", "Sports", "Arts & music", "STEM/Robotics", "Mental wellbeing", "Discipline", "Inclusivity", "Affordability"]
    
    states = {
        "Delhi": "Delhi",
        "Mumbai": "Maharashtra",
        "Bengaluru": "Karnataka",
        "Hyderabad": "Telangana"
    }
    
    for city, schools in city_data.items():
        state = states.get(city, 'Unknown')
        for s in schools:
            name = s.get('name', '').strip()
            board = s.get('board', 'State Board').strip()
            category = s.get('category', 'Day School').strip()
            
            # Simple UDISE code generation
            udise_code = f"ST_{city[:3].upper()}_{name.replace(' ', '_')[:20]}"
            
            processed = {
                "udise_code": udise_code,
                "affiliation_no": f"ST_{random.randint(10000, 99999)}",
                "name": name,
                "address": f"{city}, {state}",
                "city": city,
                "state": state,
                "board": board,
                "website": "",
                "category": category,
                "rating": round(random.uniform(3.5, 4.8), 1),
                "tags": random.sample(potential_tags, k=random.randint(2, 4)),
                "fee_range": random.choice(["Under ₹1L", "₹1L - ₹2L", "₹2L - ₹4L"])
            }
            processed_schools.append(processed)
    
    return processed_schools

def run_ingestion():
    json_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))), 'data', 'state_board_schools.json')
    
    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found.")
        return
        
    schools = process_state_data(json_path)
    print(f"Processed {len(schools)} State/Mixed schools.")
    
    inserter = SupabaseInserter()
    batch_size = 500
    for i in range(0, len(schools), batch_size):
        batch = schools[i:i+batch_size]
        print(f"Ingesting State Board batch {i//batch_size + 1}...")
        inserter.insert_schools(batch)
    
    print("Full State Board ingestion completed.")

if __name__ == "__main__":
    run_ingestion()
