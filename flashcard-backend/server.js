const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const { OpenAI } = require('openai');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});




app.post('/echo', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Missing message in request body' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4" if you have access
      messages: [
        { role: "user", content: message }
      ],
      temperature: 0.7
    });

    const reply = completion.choices[0].message.content.trim();

    res.json({ reply });
    console.log("GPT response:", reply);

  } catch (err) {
    console.error("GPT API error:", err);
    res.status(500).json({ error: "ChatGPT API call failed" });
  }
});


app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
