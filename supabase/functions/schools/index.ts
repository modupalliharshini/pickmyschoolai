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

    const url = new URL(req.url)
    const schoolId = url.searchParams.get('id')
    const city = url.searchParams.get('city')

    if (schoolId) {
      // Get single school detail
      const { data: school, error } = await supabaseClient
        .from('schools')
        .select('*, school_facilities(*)')
        .eq('id', schoolId)
        .single()

      if (error) throw error

      return new Response(JSON.stringify(school), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    } else {
      // List schools
      let query = supabaseClient.from('schools').select('*')
      if (city) {
        query = query.eq('city', city)
      }

      const { data: schools, error } = await query
      if (error) throw error

      return new Response(JSON.stringify(schools), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
