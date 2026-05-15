import os
import sys
import json
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from supabase_inserter import SupabaseInserter

def simulate_udise_data():
    """
    Returns a sample of school data as it would be parsed from UDISE+
    """
    return [
        {
            "udise_code": "360101001",
            "name": "The Global Edge School",
            "address": "Kukatpally",
            "city": "Hyderabad",
            "state": "Telangana",
            "pincode": "500072",
            "latitude": 17.4849,
            "longitude": 78.3884,
            "classification": "Private",
            "category": "Higher Secondary",
            "management": "Private Unaided",
            "board": "CBSE",
            "medium_of_instruction": ["English", "Hindi", "Telugu"],
            "fee_range": "₹1L - ₹2L",
            "is_residential": False,
            "gender_type": "Co-ed",
            "tags": ["Academics", "STEM/Robotics", "Discipline"]
        },
        {
            "udise_code": "360101002",
            "name": "Oakridge International School",
            "address": "Gachibowli",
            "city": "Hyderabad",
            "state": "Telangana",
            "pincode": "500032",
            "latitude": 17.4399,
            "longitude": 78.3489,
            "classification": "Private",
            "category": "Higher Secondary",
            "management": "Private Unaided",
            "board": "IB",
            "medium_of_instruction": ["English"],
            "fee_range": "₹4L - ₹7L",
            "is_residential": True,
            "gender_type": "Co-ed",
            "tags": ["Sports", "Arts & music", "STEM/Robotics"]
        },
        {
            "udise_code": "290101001",
            "name": "Greenwood High",
            "address": "Sarjapur Road",
            "city": "Bengaluru",
            "state": "Karnataka",
            "pincode": "560083",
            "latitude": 12.8942,
            "longitude": 77.7241,
            "classification": "Private",
            "category": "Higher Secondary",
            "management": "Private Unaided",
            "board": "ICSE",
            "medium_of_instruction": ["English"],
            "fee_range": "₹2L - ₹4L",
            "is_residential": False,
            "gender_type": "Co-ed",
            "tags": ["Academics", "Sports", "Mental wellbeing"]
        },
        {
            "udise_code": "270101001",
            "name": "Dhirubhai Ambani International",
            "address": "Bandra Kurla Complex",
            "city": "Mumbai",
            "state": "Maharashtra",
            "pincode": "400098",
            "latitude": 19.0667,
            "longitude": 72.8667,
            "classification": "Private",
            "category": "Higher Secondary",
            "management": "Private Unaided",
            "board": "IB",
            "medium_of_instruction": ["English"],
            "fee_range": "₹7L+",
            "is_residential": False,
            "gender_type": "Co-ed",
            "tags": ["Academics", "STEM/Robotics", "Arts & music"]
        },
        {
            "udise_code": "070101001",
            "name": "Modern School",
            "address": "Barakhamba Road",
            "city": "Delhi NCR",
            "state": "Delhi",
            "pincode": "110001",
            "latitude": 28.6297,
            "longitude": 77.2274,
            "classification": "Private",
            "category": "Higher Secondary",
            "management": "Private Unaided",
            "board": "CBSE",
            "medium_of_instruction": ["English", "Hindi"],
            "fee_range": "₹1L - ₹2L",
            "is_residential": False,
            "gender_type": "Co-ed",
            "tags": ["Academics", "Discipline", "Arts & music"]
        }
    ]

def run_ingestion():
    print("Starting UDISE data ingestion simulation...")
    schools = simulate_udise_data()
    
    # Add location geography point for PostGIS
    for school in schools:
        lat, lon = school['latitude'], school['longitude']
        school['location'] = f'SRID=4326;POINT({lon} {lat})'
    
    inserter = SupabaseInserter()
    inserter.insert_schools(schools)
    print("UDISE ingestion completed.")

if __name__ == "__main__":
    run_ingestion()
