# # import google.generativeai as genai
# # from dotenv import load_dotenv
# # import os

# # load_dotenv()
# # genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# # # List models
# # models = genai.list_models()
# # for m in models:
# #     print("Name:", m.name, "Supports generate_content:", m.supported_generation_methods)


# import express from 'express';
# import { GoogleGenerativeAI } from '@google/generative-ai';
# import dotenv from 'dotenv';
# import cors from 'cors';
# import multer from 'multer';
# import pdf from 'pdf-parse';
# import mammoth from 'mammoth';

# // --- Basic Setup ---
# dotenv.config();
# const app = express();
# const port = 8000;

# // --- Middleware ---
# app.use(cors());
# app.use(express.json());

# // --- Gemini AI Initialization ---
# if (!process.env.GEMINI_API_KEY) {
#   console.error("CRITICAL ERROR: GEMINI_API_KEY is not defined.");
#   process.exit(1);
# }
# const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
# const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

# // --- File Upload Setup (Multer) ---
# const storage = multer.memoryStorage(); // Store files in memory
# const upload = multer({ storage: storage });

# // =================================================================
# // --- NEW ENDPOINT: Extract Skills from Resume ---
# // =================================================================
# app.post('/extract-skills', upload.single('resume'), async (req, res) => {
#   if (!req.file) {
#     return res.status(400).json({ error: 'No resume file uploaded.' });
#   }

#   try {
#     let rawText = '';
#     // Process file based on its type (PDF or DOCX)
#     if (req.file.mimetype === 'application/pdf') {
#       const data = await pdf(req.file.buffer);
#       rawText = data.text;
#     } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
#       const { value } = await mammoth.extractRawText({ buffer: req.file.buffer });
#       rawText = value;
#     } else {
#       return res.status(400).json({ error: 'Unsupported file type. Please upload a PDF or DOCX.' });
#     }

#     // --- Send Extracted Text to Gemini for Skill Extraction ---
#     const prompt = `From the following resume text, extract all the technical skills, programming languages, frameworks, and tools. Return them as a single string, with each skill separated by a comma. Text: "${rawText}"`;
    
#     const result = await model.generateContent(prompt);
#     const response = await result.response;
#     const skills = response.text();

#     res.json({ skills: skills.trim() });

#   } catch (error) {
#     console.error('Error processing resume:', error);
#     res.status(500).json({ error: 'Failed to process resume.' });
#   }
# });


# // =================================================================
# // --- EXISTING ENDPOINT: Analyze Skills Gap ---
# // =================================================================
# app.post('/analyze-skills', async (req, res) => {
#   const { skills, targetRole } = req.body;

#   if (!skills || !targetRole) {
#     return res.status(400).json({ error: 'Skills and target role are required.' });
#   }

#   try {
#     const prompt = `
#       Analyze the skills gap for a person wanting to become a "${targetRole}".
#       Their current skills are: "${skills}".

#       Provide the analysis in a strict JSON format. Do not include any text outside of the JSON object.
#       The JSON object must have the following structure:
#       {
#         "matchPercentage": <number between 0-100>,
#         "currentSkills": [
#           { "name": "<skill_name>", "level": <number between 50-95>, "status": "<'strong'|'good'|'developing'>" }
#         ],
#         "missingSkills": [
#           { "name": "<skill_name>", "importance": "<'High'|'Medium'>", "description": "<brief_description>", "timeToLearn": "<estimated_time>" }
#         ],
#         "recommendations": [
#           { "type": "<'course'|'certification'|'project'>", "title": "<item_title>", "provider": "<provider_name>", "duration": "<estimated_duration>", "rating": <number between 4.5-4.9>, "price": "<price_string>" }
#         ]
#       }

#       - Base the "level" on how relevant the current skill is to the target role.
#       - Identify 3-4 key "missingSkills".
#       - Provide 3 diverse "recommendations" (e.g., one course, one certification, one project).
#     `;

#     const result = await model.generateContent(prompt);
#     const response = await result.response;
#     const jsonText = response.text().replace(/```json/g, '').replace(/```/g, ''); // Clean up potential markdown
    
#     const data = JSON.parse(jsonText);
#     res.json(data);

#   } catch (error) {
#     console.error('Error analyzing skills:', error);
#     res.status(500).json({ error: 'Failed to analyze skills with AI.' });
#   }
# });

# // =================================================================
# // --- EXISTING ENDPOINT: General Chatbot ---
# // =================================================================
# app.post('/chatbot', async (req, res) => {
#     // ... your chatbot logic remains here ...
# });

# // --- Start the Server ---
# app.listen(port, () => {
#   console.log(`🤖 Server is running at http://localhost:${port}`);
# });
