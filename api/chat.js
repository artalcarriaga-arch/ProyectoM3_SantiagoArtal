export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, systemPrompt } = req.body;

    if (!messages?.length) {
      return res.status(400).json({ error: 'Missing messages' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key missing' });
    }

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const conversationContent = systemPrompt ? [
      {
        role: 'user',
        parts: [{ text: systemPrompt }],
      },
    ] : [];

    conversationContent.push(...messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    })));

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: conversationContent,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'API error');
    }

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta';

    return res.status(200).json({ response: responseText });
  } catch (error) {
    return res.status(500).json({
      error: error?.message || 'Unknown error',
    });
  }
}
