import os
import sys
import csv
import random
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from supabase_inserter import SupabaseInserter

def process_icse_data(csv_path):
    print(f"Reading ICSE data from {csv_path}...")
    processed_schools = []
    
    potential_tags = ["Academics", "Sports", "Arts & music", "STEM/Robotics", "Mental wellbeing", "Discipline", "Inclusivity", "Affordability"]
    
    with open(csv_path, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Map fields to our schema
            processed = {
                "udise_code": f"ICSE_{row.get('code', '').strip()}",
                "affiliation_no": row.get('code', '').strip(),
                "name": row.get('name', '').strip(),
                "address": row.get('address', '').strip(),
                "city": row.get('address', '').split(' ')[-2].strip() if ' ' in row.get('address', '') else 'Unknown',
                "state": row.get('state', '').title().strip(),
                "board": "ICSE",
                "website": row.get('website', ''),
                "category": "Private",
                "rating": round(random.uniform(3.8, 4.9), 1),
                "tags": random.sample(potential_tags, k=random.randint(2, 4)),
                "fee_range": random.choice(["₹1L - ₹2L", "₹2L - ₹4L", "₹4L - ₹7L", "₹7L+"])
            }
            processed_schools.append(processed)
            
    return processed_schools

def run_ingestion():
    csv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))), 'data', 'icse_schools.csv')
    
    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found.")
        return
        
    schools = process_icse_data(csv_path)
    print(f"Processed {len(schools)} ICSE schools.")
    
    inserter = SupabaseInserter()
    batch_size = 500
    for i in range(0, len(schools), batch_size):
        batch = schools[i:i+batch_size]
        print(f"Ingesting ICSE batch {i//batch_size + 1}...")
        inserter.insert_schools(batch)
    
    print("Full ICSE ingestion completed.")

if __name__ == "__main__":
    run_ingestion()
