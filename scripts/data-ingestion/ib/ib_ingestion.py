import os
import sys
import json
import random
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from supabase_inserter import SupabaseInserter

def process_ib_data(json_path):
    print(f"Reading IB data from {json_path}...")
    with open(json_path, 'r') as f:
        schools = json.load(f)
    
    processed_schools = []
    potential_tags = ["Academics", "Sports", "Arts & music", "STEM/Robotics", "Mental wellbeing", "Discipline", "Inclusivity", "Affordability"]
    
    for s in schools:
        # Map fields to our schema
        name = s.get('name', '').strip()
        city = s.get('city', '').strip()
        state = s.get('state', '').title().strip()
        
        processed = {
            "udise_code": f"IB_{name.replace(' ', '_')[:20]}_{city.replace(' ', '_')[:10]}",
            "affiliation_no": f"IB_{random.randint(1000, 9999)}",
            "name": name,
            "address": f"{city}, {state}",
            "city": city,
            "state": state,
            "board": "IB",
            "website": s.get('website', ''),
            "category": "Private International",
            "rating": round(random.uniform(4.2, 4.9), 1), # IB schools usually have higher ratings in our simulation
            "tags": random.sample(potential_tags, k=random.randint(3, 5)),
            "fee_range": random.choice(["₹4L - ₹7L", "₹7L+"])
        }
        processed_schools.append(processed)
    
    return processed_schools

def run_ingestion():
    json_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))), 'data', 'ib_schools.json')
    
    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found.")
        return
        
    schools = process_ib_data(json_path)
    print(f"Processed {len(schools)} IB schools.")
    
    inserter = SupabaseInserter()
    batch_size = 500
    for i in range(0, len(schools), batch_size):
        batch = schools[i:i+batch_size]
        print(f"Ingesting IB batch {i//batch_size + 1}...")
        inserter.insert_schools(batch)
    
    print("Full IB ingestion completed.")

if __name__ == "__main__":
    run_ingestion()
