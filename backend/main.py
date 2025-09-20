from fastapi import FastAPI, Request, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import io
import json
import docx
import fitz
from dotenv import load_dotenv
import google.generativeai as genai
from pydantic import BaseModel

# ────────────────
# Load .env & configure Gemini
# ────────────────
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash-latest")  # single global model

# ────────────────
# FastAPI App
# ────────────────
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------
# Career Assessment
# -----------------
@app.post("/career-assessment")
async def career_assessment(request: Request):
    data = await request.json()
    answers = data.get("answers", [])

    if not answers or len(answers) != 10:
        return {"error": "Please provide all 10 answers."}

    prompt = f"""
You are a career guidance expert.
Based on these 10 answers, suggest the most suitable career goal.

Rules:
- Respond in a few short paragraphs
- Highlight key points using bold text
- Use bullet points (•) for main suggestions
- Keep it concise and objective

Answers: {answers}
    """

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")  # ⚡ model fixed
        response = model.generate_content(prompt)
        return {"result": response.text.strip()}
    except Exception as e:
        return {"error": str(e)}


# -----------------
# Analyze Skills
# -----------------
class AnalyzeRequest(BaseModel):
    skills: str
    targetRole: str

@app.post("/analyze-skills")
async def analyze_skills(req: AnalyzeRequest):
    prompt = f"""
You are an expert career coach and skills analyst. Analyze the skills gap for a person wanting to become "{req.targetRole}".
Their current skills are: "{req.skills}".
- Highlight **strengths**
- Show **missing skills** clearly
- Recommend actionable steps in bullets

Return JSON like:
{{
  "matchPercentage": <number>,
  "currentSkills": [{{"name": "...", "level": 50-95, "status": "strong|good|developing"}}],
  "missingSkills": [{{"name": "...", "importance": "High|Medium", "description": "...", "timeToLearn": "...}}],
  "recommendations": [{{"type": "course|certification|project", "title": "...", "provider": "...", "duration": "...", "rating": 4.5-4.9, "price": "..."}}
  ]
}}
    """
    try:
        response = model.generate_content(prompt)
        json_text = response.text.strip().replace("```json", "").replace("```", "")
        results = json.loads(json_text)
        return results
    except Exception as e:
        print("Analyze skills error:", e)
        raise HTTPException(status_code=500, detail="Failed to analyze skills.")


from fastapi import UploadFile, File, HTTPException
import io, fitz, docx

@app.post("/extract-skills")
async def extract_skills_from_resume(resume: UploadFile = File(...)):
    if not model:
        raise HTTPException(status_code=500, detail="Gemini API not configured")

    try:
        file_bytes = await resume.read()
        raw_text = ""

        # PDF
        if resume.content_type == 'application/pdf':
            with fitz.open(stream=file_bytes, filetype="pdf") as doc:
                raw_text = "".join(page.get_text() for page in doc)
        # DOCX
        elif resume.content_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            doc = docx.Document(io.BytesIO(file_bytes))
            raw_text = "\n".join([para.text for para in doc.paragraphs])
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type. Upload PDF or DOCX.")

        # Prompt Gemini for skills extraction
        prompt = f"""
Extract all technical skills, languages, frameworks, and tools from this resume text. Return as a comma-separated string.

Resume Text:
"{raw_text}"
        """
        response = model.generate_content(prompt)
        skills = response.text.strip().replace("\n", ", ")
        return {"skills": skills}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process resume: {e}")


# -----------------
# Chatbot
# -----------------
@app.post("/chatbot")
async def chatbot(request: Request):
    data = await request.json()
    message = data.get("message", "").strip()  # ⚡ must match frontend

    if not message:
        return {"error": "Message is required."}

    try:
        # Improved prompt for pointwise & highlighted text
        prompt = f"""
You are PathFinder, an expert AI Career Strategist. Answer the user's message below.
- Provide key points clearly
- Highlight main ideas using bold text
- Use bullet points (•)
- Keep response concise and actionable

User's message: "{message}"
        """

        model = genai.GenerativeModel("gemini-1.5-flash")  # ⚡ model fixed
        response = model.generate_content(prompt)
        return {"reply": response.text.strip()}

    except Exception as e:
        return {"error": str(e)}
