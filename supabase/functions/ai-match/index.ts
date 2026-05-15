import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { city, board, budget, priority } = await req.json()

    // 1. Fetch schools filtered by city
    let query = supabaseClient.from('schools').select('*')
    if (city) {
      query = query.eq('city', city)
    }

    const { data: schools, error } = await query

    if (error) throw error

    // 2. Ranking Logic
    const rankedSchools = schools.map(school => {
      let score = 0
      const weights = { board: 20, budget: 20, priority: 40, rating: 20 }

      // Board Match
      if (board && board.length > 0) {
        if (board.includes(school.board)) {
          score += weights.board
        }
      }

      // Budget Match
      if (budget && school.fee_range === budget) {
        score += weights.budget
      } else {
        score += weights.budget * 0.5
      }

      // Priority Match (using tags or facilities)
      if (priority && priority.length > 0) {
        const schoolTags = school.tags || []
        const matches = priority.filter(p => schoolTags.includes(p))
        score += (matches.length / priority.length) * weights.priority
      }

      // Rating Score
      const rating = school.rating || 0
      score += (rating / 5.0) * weights.rating

      return { ...school, score: Math.round(score * 10) / 10 }
    })

    // Sort by score
    const results = rankedSchools.sort((a, b) => b.score - a.score).slice(0, 10)

    return new Response(JSON.stringify(results), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
