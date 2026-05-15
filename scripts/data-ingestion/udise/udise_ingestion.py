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
            "gender_type": "Co-ed"
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
            "gender_type": "Co-ed"
        },
        {
            "udise_code": "360101003",
            "name": "Delhi Public School",
            "address": "Nacharam",
            "city": "Hyderabad",
            "state": "Telangana",
            "pincode": "500076",
            "latitude": 17.4258,
            "longitude": 78.5582,
            "classification": "Private",
            "category": "Secondary",
            "management": "Private Unaided",
            "board": "CBSE",
            "medium_of_instruction": ["English", "Hindi"],
            "fee_range": "₹1L - ₹2L",
            "is_residential": False,
            "gender_type": "Co-ed"
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
