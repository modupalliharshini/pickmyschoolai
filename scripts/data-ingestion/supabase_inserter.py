import os
import psycopg2
import re
from dotenv import load_dotenv

load_dotenv('scripts/.env')

class SupabaseInserter:
    def __init__(self):
        db_url = os.getenv('DIRECT_DB_URL')
        if not db_url:
            raise ValueError("DIRECT_DB_URL not found in environment")
            
        pattern = r"postgresql://(?P<user>[^:]+):(?P<password>.+)@(?P<host>[^:/]+):(?P<port>\d+)/(?P<dbname>.+)"
        match = re.match(pattern, db_url)
        
        if match:
            self.params = match.groupdict()
        else:
            self.db_url = db_url
            self.params = None

    def get_connection(self):
        if self.params:
            return psycopg2.connect(**self.params)
        return psycopg2.connect(self.db_url)

    def insert_schools(self, schools_data):
        """
        schools_data: List of dictionaries matching the 'schools' table schema
        """
        conn = self.get_connection()
        cur = conn.cursor()
        
        try:
            for school in schools_data:
                # Prepare SQL for schools table
                keys = school.keys()
                columns = ', '.join(keys)
                placeholders = ', '.join(['%s'] * len(keys))
                
                # Handling ON CONFLICT for udise_code
                sql = f"""
                INSERT INTO schools ({columns}) 
                VALUES ({placeholders})
                ON CONFLICT (udise_code) DO UPDATE SET
                {', '.join([f"{k} = EXCLUDED.{k}" for k in keys if k != 'udise_code'])}
                RETURNING id
                """
                
                cur.execute(sql, list(school.values()))
                school_id = cur.fetchone()[0]
                
                # You might want to handle facilities/rankings here too
                
            conn.commit()
            print(f"Successfully inserted/updated {len(schools_data)} schools.")
        except Exception as e:
            conn.rollback()
            print(f"Error inserting schools: {e}")
            raise e
        finally:
            cur.close()
            conn.close()

    def insert_teachers(self, teachers_data):
        conn = self.get_connection()
        cur = conn.cursor()
        
        try:
            for teacher in teachers_data:
                keys = teacher.keys()
                columns = ', '.join(keys)
                placeholders = ', '.join(['%s'] * len(keys))
                
                sql = f"INSERT INTO teachers ({columns}) VALUES ({placeholders})"
                cur.execute(sql, list(teacher.values()))
                
            conn.commit()
            print(f"Successfully inserted {len(teachers_data)} teachers.")
        except Exception as e:
            conn.rollback()
            print(f"Error inserting teachers: {e}")
            raise e
        finally:
            cur.close()
            conn.close()
