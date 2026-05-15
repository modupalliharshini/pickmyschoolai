const SUPABASE_PROJECT_URL = 'https://szcyjmfnmwshikszunpg.supabase.co';
const API_BASE_URL = `${SUPABASE_PROJECT_URL}/functions/v1`;

// Note: In a real app, you would include the Anon Key in the headers
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || ''}`
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
