import os
import sys
import random
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from supabase_inserter import SupabaseInserter

def simulate_teacher_data(count=100):
    first_names = ["Arun", "Priya", "Rajesh", "Sneha", "Vikram", "Anjali", "Suresh", "Kavita", "Amit", "Meera"]
    last_names = ["Kumar", "Sharma", "Iyer", "Reddy", "Patel", "Singh", "Nair", "Gupta", "Verma", "Joshi"]
    subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Computer Science", "Arts", "Economics"]
    cities = ["Hyderabad", "Bengaluru", "Mumbai", "Delhi NCR", "Chennai", "Pune"]
    
    teachers = []
    for i in range(count):
        teachers.append({
            "name": f"{random.choice(first_names)} {random.choice(last_names)}",
            "subject": random.choice(subjects),
            "grade_levels": random.sample(["Class 1-5", "Class 6-8", "Class 9-10", "Class 11-12"], k=random.randint(1, 2)),
            "experience_years": random.randint(2, 25),
            "education": random.choice(["B.Ed, M.Sc", "M.A, Ph.D", "B.Tech, M.Ed", "M.Sc, B.Ed"]),
            "rating": round(random.uniform(4.0, 5.0), 1),
            "hourly_rate": random.randint(500, 2500),
            "city": random.choice(cities),
            "locality": "Main Road Area",
            "mode": random.choice(["Online", "Offline", "Both"]),
            "bio": "Experienced educator passionate about student growth and interactive learning.",
            "image_url": f"https://i.pravatar.cc/150?u=teacher{i}"
        })
    return teachers

def run_ingestion():
    print("Starting teacher data ingestion simulation...")
    teachers = simulate_teacher_data(150)
    
    inserter = SupabaseInserter()
    # Adding a method to inserter for teachers if not exists
    if not hasattr(inserter, 'insert_teachers'):
        def insert_teachers(self, teachers):
            return self.client.table('teachers').upsert(teachers).execute()
        inserter.insert_teachers = insert_teachers.__get__(inserter)
        
    inserter.insert_teachers(teachers)
    print("Teacher ingestion completed.")

if __name__ == "__main__":
    run_ingestion()
