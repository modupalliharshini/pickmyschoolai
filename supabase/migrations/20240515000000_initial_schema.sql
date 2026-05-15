-- Initial Schema for Pick My School AI

-- Enable PostGIS for location-based queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. Schools Table
CREATE TABLE IF NOT EXISTS schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    udise_code TEXT UNIQUE,
    name TEXT NOT NULL,
    address TEXT,
    city TEXT,
    state TEXT,
    pincode TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    location GEOGRAPHY(POINT, 4326),
    classification TEXT, -- Government, Private, etc.
    category TEXT, -- Primary, Secondary, Higher Secondary
    management TEXT,
    board TEXT, -- CBSE, ICSE, State, IB, IGCSE
    medium_of_instruction TEXT[],
    fee_range TEXT,
    is_residential BOOLEAN DEFAULT FALSE,
    gender_type TEXT, -- Co-ed, Boys, Girls
    establishment_year INTEGER,
    website TEXT,
    phone TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for location searches
CREATE INDEX IF NOT EXISTS schools_location_idx ON schools USING GIST (location);

-- 2. School Facilities Table
CREATE TABLE IF NOT EXISTS school_facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    has_library BOOLEAN DEFAULT FALSE,
    has_playground BOOLEAN DEFAULT FALSE,
    has_smart_classes BOOLEAN DEFAULT FALSE,
    has_computer_lab BOOLEAN DEFAULT FALSE,
    has_science_lab BOOLEAN DEFAULT FALSE,
    has_transport BOOLEAN DEFAULT FALSE,
    has_canteen BOOLEAN DEFAULT FALSE,
    has_sports_complex BOOLEAN DEFAULT FALSE,
    has_arts_music BOOLEAN DEFAULT FALSE,
    has_stem_robotics BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. School Rankings & Scores
CREATE TABLE IF NOT EXISTS school_rankings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    infrastructure_score FLOAT DEFAULT 0,
    academic_score FLOAT DEFAULT 0,
    faculty_score FLOAT DEFAULT 0,
    safety_score FLOAT DEFAULT 0,
    parent_rating_score FLOAT DEFAULT 0,
    overall_match_score FLOAT DEFAULT 0,
    popularity_index FLOAT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Reviews Table (GMB Aggregated)
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    source TEXT DEFAULT 'GMB',
    rating FLOAT,
    review_text TEXT,
    reviewer_name TEXT,
    sentiment TEXT, -- Positive, Neutral, Negative
    review_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Teachers Table
CREATE TABLE IF NOT EXISTS teachers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    subject TEXT,
    grade_levels TEXT[],
    experience_years INTEGER,
    education TEXT,
    rating FLOAT DEFAULT 0,
    hourly_rate FLOAT,
    city TEXT,
    locality TEXT,
    mode TEXT, -- Online, Offline, Both
    bio TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_school_rankings_updated_at BEFORE UPDATE ON school_rankings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
