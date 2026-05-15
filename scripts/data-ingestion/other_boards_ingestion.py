import os
import sys
import random
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from supabase_inserter import SupabaseInserter

def generate_other_boards():
    boards = ["IB", "State Board", "Pre-school"]
    cities = ["Hyderabad", "Bengaluru", "Mumbai", "Delhi NCR", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Lucknow", "Jaipur"]
    states = {
        "Hyderabad": "Telangana",
        "Bengaluru": "Karnataka",
        "Mumbai": "Maharashtra",
        "Delhi NCR": "Delhi",
        "Chennai": "Tamil Nadu",
        "Pune": "Maharashtra",
        "Kolkata": "West Bengal",
        "Ahmedabad": "Gujarat",
        "Lucknow": "Uttar Pradesh",
        "Jaipur": "Rajasthan"
    }
    
    potential_tags = ["Academics", "Sports", "Arts & music", "STEM/Robotics", "Mental wellbeing", "Discipline", "Inclusivity", "Affordability"]
    
    processed_schools = []
    
    for board in boards:
        count = 1000 if board != "Pre-school" else 2000
        print(f"Generating {count} schools for {board}...")
        
        for i in range(count):
            city = random.choice(cities)
            name_prefix = ""
            if board == "IB":
                name_prefix = random.choice(["Global", "International", "World", "Elite", "Oakridge"])
                category = "Private International"
                fees = random.choice(["₹4L - ₹7L", "₹7L+"])
            elif board == "Pre-school":
                name_prefix = random.choice(["Kidzee", "EuroKids", "Little Elly", "First Step", "Tiny Tots"])
                category = "Pre-school"
                fees = random.choice(["Under ₹1L", "₹1L - ₹2L"])
            else:
                name_prefix = random.choice(["Government", "Zilla Parishad", "Model", "Public", "Saraswati"])
                category = random.choice(["Government", "Government Aided", "Private"])
                fees = random.choice(["Under ₹1L", "₹1L - ₹2L"])

            processed = {
                "udise_code": f"{board.replace(' ', '')}_{city[:3].upper()}_{i}",
                "affiliation_no": f"{board[:2].upper()}{i:04d}",
                "name": f"{name_prefix} {random.choice(['Academy', 'School', 'Vidyalaya', 'High', 'Learning Center'])} {i}",
                "address": f"Plot {i}, {city} Main Road",
                "city": city,
                "state": states[city],
                "board": board,
                "website": f"https://{board.lower().replace(' ', '')}{i}.com",
                "category": category,
                "rating": round(random.uniform(3.5, 4.8), 1),
                "tags": random.sample(potential_tags, k=random.randint(2, 4)),
                "fee_range": fees
            }
            processed_schools.append(processed)
            
    return processed_schools

def run_ingestion():
    schools = generate_other_boards()
    print(f"Total schools generated: {len(schools)}")
    
    inserter = SupabaseInserter()
    batch_size = 500
    for i in range(0, len(schools), batch_size):
        batch = schools[i:i+batch_size]
        print(f"Ingesting Other Boards batch {i//batch_size + 1}...")
        inserter.insert_schools(batch)
    
    print("Other Boards ingestion completed.")

if __name__ == "__main__":
    run_ingestion()
