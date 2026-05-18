const SUPABASE_PROJECT_URL = 'https://szcyjmfnmwshikszunpg.supabase.co';
const API_BASE_URL = `${SUPABASE_PROJECT_URL}/functions/v1`;

// Note: Supabase Anon keys are public and safe to be exposed in frontend code
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6Y3lqbWZubXdzaGlrc3p1bnBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMjEwNTMsImV4cCI6MjA5Mzc5NzA1M30.mBnGJw9Kssv4eJDylIIACR9rwxIfPxPs_8Oce-qpjwo';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
});

export const fetchSchools = async (city) => {
  const url = city ? `${API_BASE_URL}/schools?city=${city}` : `${API_BASE_URL}/schools`;
  const response = await fetch(url, { headers: getHeaders() });
  if (!response.ok) throw new Error('Failed to fetch schools');
  return response.json();
};

export const fetchSchoolById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/schools?id=${id}`, { headers: getHeaders() });
  if (!response.ok) throw new Error('Failed to fetch school details');
  return response.json();
};

export const getAiMatches = async (prefs) => {
  const response = await fetch(`${API_BASE_URL}/ai-match`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(prefs),
  });
  if (!response.ok) throw new Error('Failed to get AI matches');
  return response.json();
};
