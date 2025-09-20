from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Create FastAPI app
app = FastAPI()

# Enable CORS (important for frontend to call backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define Gemini model
model = genai.GenerativeModel("gemini-1.5-pro")


@app.post("/career-assessment")
async def career_assessment(request: Request):
    data = await request.json()
    answers = data.get("answers", [])

    if not answers or len(answers) != 10:
        return {"error": "Please provide all 10 answers."}

    # Prompt for Gemini
    prompt = f"""
You are a career guidance expert. 
Based on these 10 answers from a user, suggest the most suitable career goal.  

Answers: {answers}

Return result in this format:
1. Best Career Match (with explanation)
2. 3 Alternative Career Options (with short reasons)
3. Suggested Next Steps (skills to learn, path to follow)
    """

    try:
        response = model.generate_content(prompt)
        return {"result": response.text}
    except Exception as e:
        return {"error": str(e)}
