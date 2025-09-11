import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { age } = await req.json();
    console.log('Generating quiz recommendations for age:', age);

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = `Generate 3 specific quiz recommendations for a ${age}-year-old student interested in environmental education. Consider their age-appropriate learning level and interests. 

For each recommendation, provide:
1. A specific quiz topic/category
2. Why it's suitable for their age group
3. What they'll learn

Format each recommendation as a brief, engaging paragraph (2-3 sentences max). Focus on environmental topics, science, nature, geography, and general knowledge that would be educational and fun for someone of this age.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          { 
            role: 'system', 
            content: 'You are an educational AI assistant specializing in age-appropriate learning recommendations. Provide engaging, educational quiz suggestions that match the user\'s developmental stage.' 
          },
          { role: 'user', content: prompt }
        ],
        max_completion_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');

    const content = data.choices[0].message.content;
    
    // Split the content into individual recommendations
    const recommendations = content
      .split('\n')
      .filter((line: string) => line.trim().length > 20)
      .map((line: string) => line.replace(/^\d+\.\s*/, '').trim())
      .slice(0, 3);

    return new Response(JSON.stringify({ 
      recommendations,
      age 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in quiz-recommendations function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      recommendations: [
        "Try our Science & Nature quiz to explore fascinating facts about our planet and ecosystem!",
        "Challenge yourself with Geography questions to discover amazing places around the world.",
        "Test your General Knowledge with fun facts that will broaden your learning horizons."
      ]
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});