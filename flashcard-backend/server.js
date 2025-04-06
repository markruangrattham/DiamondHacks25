const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const multer = require('multer');
const pdfParse = require('pdf-parse');
const { OpenAI } = require('openai');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Multer setup for file upload (in memory)
const upload = multer({ storage: multer.memoryStorage() });

// Text echo endpoint
app.post('/echo', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Missing message in request body' });
  }

  try {

    var promptForTxt = `Create a list of 10 flashcards with questions and answers based on the following text: "${message}". Each flashcard should have a question and an answer. Format the response as a JSON array of objects, where each object has a "question" and an "answer" field.`;
  

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: promptForTxt }],
      temperature: 0.7
    });

    const reply = completion.choices[0].message.content.trim();
    console.log('GPT reply:', reply);
    let parsed;
    parsed = JSON.parse(cleanGPTResponse(reply)); // now an array of objects

    const questions = parsed.map(item => item.question);
    const answers = parsed.map(item => item.answer);

    console.log('✅ Questions:', questions);
    console.log('✅ Answers:', answers);

  // If you want to send this to the frontend
  res.json({ questions, answers });
  } catch (err) {
    console.error("GPT API error:", err);
    res.status(500).json({ error: "ChatGPT API call failed" });
  }
});

app.post('/upload-pdf', upload.any('pdf'), async (req, res) => {
  
 
  const pdfData = await pdfParse(req.files[0].buffer);
  // console.log('PDF text:', pdfData.text); // Log the extracted text for debugging
  var customPrompt = `Create a list of 10 flashcards with questions and answers based on the following text: "${pdfData.text}". Each flashcard should have a question and an answer. Format the response as a JSON array of objects, where each object has a "question" and an "answer" field.`;


 
console.log('Custom prompt:', customPrompt); // Log the custom prompt for debugging
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: customPrompt }],
      temperature: 0.7
    });

    const reply = completion.choices[0].message.content.trim();
    let parsed;
  parsed = JSON.parse(cleanGPTResponse(reply)); // now an array of objects

  const questions = parsed.map(item => item.question);
  const answers = parsed.map(item => item.answer);

  console.log('✅ Questions:', questions);
  console.log('✅ Answers:', answers);

  // If you want to send this to the frontend
  res.json({ questions, answers });
    
  } catch (err) {
    console.error("GPT API error:", err);
    res.status(500).json({ error: "ChatGPT API call failed" });
  }
  
});

function cleanGPTResponse(rawText) {
  // Remove triple backticks and optional language tags (like ```json or ```)
  let cleaned = rawText.trim().replace(/```(?:json)?/g, '').replace(/```/g, '');

  // Remove anything before the first bracket
  const firstBracket = cleaned.indexOf('[');
  if (firstBracket > 0) {
    cleaned = cleaned.slice(firstBracket);
  }

  // Optional: remove anything after the last bracket (sometimes GPT adds a comment)
  const lastBracket = cleaned.lastIndexOf(']');
  if (lastBracket !== -1) {
    cleaned = cleaned.slice(0, lastBracket + 1);
  }

  return cleaned;
}

  

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
