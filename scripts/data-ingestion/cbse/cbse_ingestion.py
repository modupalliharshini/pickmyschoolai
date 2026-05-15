import os
import sys
import json
import random
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from supabase_inserter import SupabaseInserter

def process_cbse_data(json_path):
    print(f"Reading CBSE data from {json_path}...")
    with open(json_path, 'r') as f:
        data = json.load(f)
    
    raw_schools = data.get('data', [])
    print(f"Found {len(raw_schools)} schools in JSON.")
    
    processed_schools = []
    
    # Common tags to randomize for demo purposes
    potential_tags = ["Academics", "Sports", "Arts & music", "STEM/Robotics", "Mental wellbeing", "Discipline", "Inclusivity", "Affordability"]
    
    for s in raw_schools:
        # Map fields to our schema
        processed = {
            "udise_code": f"CBSE_{s.get('affNo', '').strip()}", # Prefixing since we don't have real UDISE here
            "affiliation_no": s.get('affNo', '').strip(),
            "name": s.get('schoolName', '').strip(),
            "address": s.get('address', '').strip(),
            "city": s.get('district', '').title().strip(),
            "state": s.get('state', '').title().strip(),
            "board": "CBSE",
            "website": s.get('website', ''),
            "category": s.get('status', 'Middle Class'),
            "rating": round(random.uniform(3.5, 4.9), 1),
            "tags": random.sample(potential_tags, k=random.randint(2, 4)),
            "fee_range": random.choice(["Under ₹1L", "₹1L - ₹2L", "₹2L - ₹4L", "₹4L - ₹7L", "₹7L+"]) # Simulated for now
        }
        processed_schools.append(processed)
    
    return processed_schools

def run_ingestion():
    json_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))), 'data', 'cbse_schools.json')
    
    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found.")
        return
        
    schools = process_cbse_data(json_path)
    
    # We'll ingest in batches of 500 to be safe
    batch_size = 500
    inserter = SupabaseInserter()
    
    print(f"Starting batch ingestion of {len(schools)} schools...")
    for i in range(0, len(schools), batch_size):
        batch = schools[i:i+batch_size]
        print(f"Ingesting batch {i//batch_size + 1} ({len(batch)} schools)...")
        inserter.insert_schools(batch)
    
    print("Full CBSE ingestion completed.")

if __name__ == "__main__":
    run_ingestion()
