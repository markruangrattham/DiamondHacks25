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

    const promptForTxt = `
The following text file contains a mix of questions and answers. Please read through it and extract each question and its corresponding answer.

Return the result as a JSON array of objects, where each object has:
- a "question" field
- an "answer" field

Ignore unrelated content like instructions, headers, or formatting notes.

Respond only with the raw JSON, in this format:

[
  {
    "question": "What is an API?",
    "answer": "An API (Application Programming Interface) allows software components to communicate with each other."
  },
  {
    "question": "What is a function?",
    "answer": "A function is a block of code that performs a specific task."
  }
]

Here is the text:
"""
${message}
"""
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: promptForTxt }],
      temperature: 0.7
    });

    const reply = completion.choices[0].message.content.trim();
    console.log('GPT reply:', reply);
    let parsed;
    parsed = JSON.parse(reply); // now an array of objects

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
  const customPrompt = `
The following is a transcript or study guide that contains multiple **question and answer** pairs. Please extract and format each pair as a JSON array of objects, where each object has two fields: "question" and "answer".

Only include actual Q&A content. Ignore titles, section headers, or instructions.

Respond in this exact JSON format:

[
  { "question": "What is a software engineer?", "answer": "A software engineer develops and maintains software systems." },
  { "question": "What are the phases of the software development lifecycle?", "answer": "Planning, design, implementation, testing, deployment, and maintenance." }
]

Here is the raw text:

""" 
${pdfData.text}
"""
`;

 

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: customPrompt }],
      temperature: 0.7
    });

    const reply = completion.choices[0].message.content.trim();
    let parsed;
  parsed = JSON.parse(reply); // now an array of objects

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
  

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
