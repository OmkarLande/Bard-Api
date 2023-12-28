const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv')
dotenv.config()
const app = express();
const port = process.env.PORT || 3000;

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.get('/api/generate', async (req, res) => {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const { prompt } = req.query;

    if (!prompt) {
      return res.status(400).json({ error: 'Please provide a prompt in the query parameter.' });
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ story: text });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Problem in api' });
  }
});

app.get('/', (req,res) => {
    res.json({message: "Bard api working"})
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
