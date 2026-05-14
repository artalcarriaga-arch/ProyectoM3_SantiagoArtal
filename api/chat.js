export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const FALLBACK_RESPONSES = [
    'El poder no se regala, se conquista y se mantiene con astucia.',
    'La política es el arte de lo posible, no de los ideales.',
    'Un príncipe debe aparentar virtud, pero actuar según la necesidad del momento.',
    'Los hombres olvidan más fácilmente la muerte de su padre que la pérdida de su patrimonio.',
    'Es mejor ser temido que amado, si no se puede ser ambos.',
    'La fortuna es ciega: quien es necio tiene tanto éxito como el inteligente.',
    'En tiempos de paz, prepárate para la guerra. En tiempos de guerra, lucha por la paz.',
    'La verdadera gloria no reside en la bondad, sino en la efectividad.',
  ];

  try {
    const { messages, systemPrompt } = req.body;
    
    if (!messages?.length) {
      return res.status(400).json({ error: 'No messages' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key missing' });
    }

    const lastMessage = messages[messages.length - 1].text;
    const MODEL = 'gemini-2.0-flash';
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

    const requestBody = {
      system_instruction: {
        parts: {
          text: systemPrompt
        }
      },
      contents: [{
        role: 'user',
        parts: [{
          text: lastMessage
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500
      }
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Si es error de cuota, retornar respuesta predeterminada
      if (response.status === 429) {
        const fallbackResponse = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
        console.log('API quota exceeded, using fallback response');
        return res.status(200).json({ response: fallbackResponse });
      }
      
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';

    return res.status(200).json({ 
      response: text
    });

  } catch (error) {
    console.error('Chat API Error:', error.message);
    // Fallback final si hay cualquier otro error
    const FALLBACK_RESPONSES_LOCAL = [
      'El poder no se regala, se conquista y se mantiene con astucia.',
      'La política es el arte de lo posible, no de los ideales.',
      'Un príncipe debe aparentar virtud, pero actuar según la necesidad del momento.',
    ];
    const fallback = FALLBACK_RESPONSES_LOCAL[Math.floor(Math.random() * FALLBACK_RESPONSES_LOCAL.length)];
    return res.status(200).json({ response: fallback });
  }
}
