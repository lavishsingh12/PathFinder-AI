import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Check for API key
if (!process.env.GEMINI_API_KEY) {
  console.error("CRITICAL ERROR: GEMINI_API_KEY is not defined. Please check your backend/.env file.");
  process.exit(1);
}

// Initialize the Google Generative AI model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// FIX: Updated model name to a current, valid model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// Define the API endpoint
app.post('/chatbot', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const prompt = `You are PathFinder, an expert AI Career Strategist. A user's message is: "${message}". Provide a helpful, encouraging, and actionable response using markdown formatting like **bold text** and bullet points (using •).`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({ reply: text });

  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    res.status(500).json({ error: "Failed to generate AI response." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🤖 Server is running with modern ES Module syntax at http://localhost:${port}`);
});

