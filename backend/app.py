from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os
import google.generativeai as genai
from dotenv import load_dotenv

# ──────────────────────────────────────────────────────────────
# Load environment variables
# ──────────────────────────────────────────────────────────────
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("❌ GEMINI_API_KEY not found in .env file")

genai.configure(api_key=GEMINI_API_KEY)

# ──────────────────────────────────────────────────────────────
# FastAPI App
# ──────────────────────────────────────────────────────────────
app = FastAPI()

# Allow frontend (React/Vite) to talk with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later replace with ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/")
def root():
    return {"message": "Career AI Backend is running 🚀"}


# ──────────────────────────────────────────────────────────────
# Endpoints
# ──────────────────────────────────────────────────────────────

# 1. Chatbot (general Q&A)
@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    query = data.get("query", "")

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(query)

    return {"answer": response.text}


# 2. Skills Analysis
@app.post("/skills")
async def analyze_skills(request: Request):
    data = await request.json()
    skills = data.get("skills", "")

    prompt = f"""
    Analyze these skills: {skills}.
    - Identify strengths
    - Suggest missing/weak areas
    - Recommend career paths matching them
    """
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)

    return {"analysis": response.text}


# 3. Resume Screener
@app.post("/resume")
async def resume_screener(request: Request):
    data = await request.json()
    resume_text = data.get("resume", "")

    prompt = f"""
    Review this resume text: {resume_text}.
    - Highlight strengths
    - Point out weaknesses
    - Suggest improvements for career growth
    """
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)

    return {"feedback": response.text}


# 4. Course Recommendation
@app.post("/chatbot")
async def chatbot(request: Request):
    data = await request.json()
    query = data.get("query", "").strip()

    # Debug print
    print("Received query:", repr(query))

    if not query:
        return {"reply": "❌ Please enter a question or prompt."}

    try:
        # Create the model
        model = genai.GenerativeModel("gemini-1.5-flash")

        # Send prompt to Gemini
        response = model.generate_content(
            content=query,  # keep it simple for debugging
            temperature=0.7,
            max_output_tokens=300
        )

        print("Gemini response:", repr(response.text))  # ✅ debug

        if not response or not response.text.strip():
            return {"reply": "❌ Gemini returned an empty response. Please try again."}

        return {"reply": response.text.strip()}

    except Exception as e:
        print("Error calling Gemini API:", e)
        return {"reply": f"❌ Something went wrong: {str(e)}"}


