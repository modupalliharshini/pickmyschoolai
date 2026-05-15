import os
import sys
import googlemaps
from dotenv import load_dotenv

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from supabase_inserter import SupabaseInserter

load_dotenv('scripts/.env')

class GMBIntegration:
    def __init__(self):
        self.api_key = os.getenv('GOOGLE_PLACES_API_KEY')
        if not self.api_key or self.api_key == 'your_google_places_api_key_here':
            print("Warning: GOOGLE_PLACES_API_KEY not found or is placeholder. Using mock data.")
            self.gmaps = None
        else:
            self.gmaps = googlemaps.Client(key=self.api_key)

    def fetch_school_reviews(self, school_name, location_str):
        """
        Fetches ratings and reviews for a school using Google Places API
        """
        if not self.gmaps:
            # Mock review data
            return {
                "rating": 4.5,
                "reviews": [
                    {"reviewer_name": "John Doe", "rating": 5, "review_text": "Excellent academic standards!", "review_date": "2024-05-01"},
                    {"reviewer_name": "Jane Smith", "rating": 4, "review_text": "Good infrastructure, but traffic is an issue.", "review_date": "2024-04-15"}
                ]
            }

        try:
            # 1. Find place ID
            places_result = self.gmaps.find_place(school_name + " " + location_str, 'textquery')
            if not places_result or not places_result.get('candidates'):
                return None
            
            place_id = places_result['candidates'][0]['place_id']
            
            # 2. Get place details (reviews)
            place_details = self.gmaps.place(place_id, fields=['name', 'rating', 'reviews'])
            result = place_details.get('result', {})
            
            return {
                "rating": result.get('rating', 0),
                "reviews": [
                    {
                        "reviewer_name": r.get('author_name'),
                        "rating": r.get('rating'),
                        "review_text": r.get('text'),
                        "review_date": None # Needs conversion from timestamp
                    }
                    for r in result.get('reviews', [])
                ]
            }
        except Exception as e:
            print(f"Error fetching reviews for {school_name}: {e}")
            return None

def run_integration():
    print("Starting Google Places integration...")
    gmb = GMBIntegration()
    inserter = SupabaseInserter()
    
    # In a real scenario, we'd fetch schools from DB first
    # For now, we'll use a sample
    conn = inserter.get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, name, city FROM schools")
    schools = cur.fetchall()
    
    for s_id, s_name, s_city in schools:
        print(f"Processing reviews for {s_name} in {s_city}...")
        data = gmb.fetch_school_reviews(s_name, s_city)
        if data:
            # Update school rating
            cur.execute("UPDATE schools SET updated_at = NOW() WHERE id = %s", (s_id,))
            
            # Insert reviews
            for rev in data['reviews']:
                cur.execute("""
                    INSERT INTO reviews (school_id, rating, review_text, reviewer_name)
                    VALUES (%s, %s, %s, %s)
                """, (s_id, rev['rating'], rev['review_text'], rev['reviewer_name']))
    
    conn.commit()
    cur.close()
    conn.close()
    print("GMB integration completed.")

if __name__ == "__main__":
    run_integration()
