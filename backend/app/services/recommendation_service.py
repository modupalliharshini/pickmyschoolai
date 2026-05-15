import math

class RecommendationService:
    def __init__(self, db_conn):
        self.conn = db_conn

    def calculate_score(self, school, user_prefs):
        """
        Calculates a match score (0-100) for a school based on user preferences.
        """
        score = 0
        weights = {
            'board': 20,
            'budget': 20,
            'priority': 40,
            'rating': 20
        }
        
        # 1. Board Match
        if user_prefs.get('board'):
            if school.get('board') in user_prefs['board']:
                score += weights['board']
            elif school.get('board') == 'Multiple' and any(b in school.get('boards', []) for b in user_prefs['board']):
                score += weights['board']

        # 2. Budget Match (Simple range check)
        if user_prefs.get('budget'):
            # This would ideally compare numerical values
            if school.get('fee_range') == user_prefs['budget']:
                score += weights['budget']
            else:
                score += weights['budget'] * 0.5 # Partial match

        # 3. Priorities Match
        if user_prefs.get('priority'):
            priorities = user_prefs['priority']
            school_tags = school.get('tags', []) # Or from school_facilities
            matches = set(priorities).intersection(set(school_tags))
            if priorities:
                priority_score = (len(matches) / len(priorities)) * weights['priority']
                score += priority_score

        # 4. Rating Score
        rating = school.get('rating', 0)
        score += (rating / 5.0) * weights['rating']

        return round(min(score, 100), 1)

    def get_recommendations(self, user_prefs, limit=10):
        """
        Fetches schools and ranks them.
        """
        cur = self.conn.cursor()
        
        # Basic filtering by city
        city = user_prefs.get('city')
        query = "SELECT * FROM schools"
        params = []
        if city:
            query += " WHERE city = %s"
            params.append(city)
            
        cur.execute(query, params)
        columns = [desc[0] for desc in cur.description]
        schools = [dict(zip(columns, row)) for row in cur.fetchall()]
        
        # Calculate scores
        for school in schools:
            school['score'] = self.calculate_score(school, user_prefs)
            
        # Sort by score
        ranked_schools = sorted(schools, key=lambda x: x['score'], reverse=True)
        
        return ranked_schools[:limit]
