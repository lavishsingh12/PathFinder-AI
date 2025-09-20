import os
import io
import json
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
import fitz  
import docx

# --- Initial Setup ---
load_dotenv()
app = FastAPI()

# --- CORS Middleware ---
# Allows your React frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace "*" with your frontend's actual URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Gemini API Configuration ---
try:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in .env file")
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-flash-latest')
except Exception as e:
    print(f"Error configuring Gemini API: {e}")
    # You might want to handle this more gracefully
    model = None

# --- Pydantic Models for Request Bodies ---
class AnalyzeRequest(BaseModel):
    skills: str
    targetRole: str

# =================================================================
# === NEW ENDPOINT: Extract Skills from a Resume File
# =================================================================
@app.post("/extract-skills")
async def extract_skills_from_resume(resume: UploadFile = File(...)):
    if not model:
        raise HTTPException(status_code=500, detail="Gemini API not configured")
        
    try:
        file_bytes = await resume.read()
        raw_text = ""

        # Check file type and extract text accordingly
        if resume.content_type == 'application/pdf':
            with fitz.open(stream=file_bytes, filetype="pdf") as doc:
                raw_text = "".join(page.get_text() for page in doc)
        elif resume.content_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            doc = docx.Document(io.BytesIO(file_bytes))
            raw_text = "\n".join([para.text for para in doc.paragraphs])
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type. Please upload a PDF or DOCX.")

        # --- Send the extracted text to Gemini for skill extraction ---
        prompt = f"""
        From the following resume text, extract all the technical skills, programming languages, 
        frameworks, and tools. Return them as a single string, with each skill separated by a comma.
        
        Resume Text:
        "{raw_text}"
        """
        
        response = model.generate_content(prompt)
        # Clean up the response to ensure it's a clean comma-separated string
        skills = response.text.strip().replace("\n", ", ")
        return {"skills": skills}

    except Exception as e:
        print(f"Error processing resume: {e}")
        raise HTTPException(status_code=500, detail="Failed to process resume file.")


# =================================================================
# === UPGRADED ENDPOINT: Analyze Skills Gap with AI
# =================================================================
@app.post("/analyze-skills")
async def analyze_skills(req: AnalyzeRequest):
    if not model:
        raise HTTPException(status_code=500, detail="Gemini API not configured")

    print("👉 AI analysis request received:", req.dict())
    
    # This prompt asks the AI to act as an expert and return a specific JSON structure.
    prompt = f"""
      You are an expert career coach and skills analyst. Analyze the skills gap for a person wanting to become a "{req.targetRole}".
      Their current skills are: "{req.skills}".

      Provide the analysis in a strict JSON format only. Do not include any text, explanation, or markdown characters like ```json outside of the main JSON object.
      The JSON object must have this exact structure:
      {{
        "matchPercentage": <number between 0-100>,
        "currentSkills": [
          {{ "name": "<skill_name>", "level": <number between 50-95>, "status": "<'strong'|'good'|'developing'>" }}
        ],
        "missingSkills": [
          {{ "name": "<skill_name>", "importance": "<'High'|'Medium'>", "description": "<brief_description>", "timeToLearn": "<estimated_time>" }}
        ],
        "recommendations": [
          {{ "type": "<'course'|'certification'|'project'>", "title": "<item_title>", "provider": "<provider_name>", "duration": "<estimated_duration>", "rating": <number between 4.5-4.9>, "price": "<price_string>" }}
        ]
      }}

      - Base the "level" on how relevant the current skill is to the target role.
      - Identify 3-4 key "missingSkills".
      - Provide 3 diverse "recommendations" (e.g., one course, one certification, one project).
    """

    try:
        response = model.generate_content(prompt)
        # Clean the response to ensure it's valid JSON
        json_text = response.text.strip().replace("```json", "").replace("```", "")
        results = json.loads(json_text)
        return results
    except Exception as e:
        print(f"Error during AI analysis: {e}")
        raise HTTPException(status_code=500, detail="Failed to get skill analysis from AI.")