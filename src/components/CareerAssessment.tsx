import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, ArrowRight } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What type of work environment do you prefer?",
    options: ["Working with teams", "Working independently", "Mix of both", "Leading others"],
  },
  {
    id: 2,
    question: "Which subject did you enjoy most in school?",
    options: ["Mathematics", "Science", "Arts/Literature", "Social Studies"],
  },
  {
    id: 3,
    question: "What motivates you the most?",
    options: ["Solving problems", "Creating something new", "Helping others", "Leading projects"],
  },
  {
    id: 4,
    question: "How do you handle deadlines?",
    options: ["Plan ahead meticulously", "Work best under pressure", "Need flexible timelines", "Prefer no strict deadlines"],
  },
  {
    id: 5,
    question: "What's your preferred learning style?",
    options: ["Hands-on practice", "Reading and research", "Visual learning", "Group discussions"],
  },
  {
    id: 6,
    question: "Which activity appeals to you most?",
    options: ["Coding/Programming", "Designing/Creating", "Analyzing data", "Teaching/Mentoring"],
  },
  {
    id: 7,
    question: "What's your ideal work-life balance?",
    options: ["Flexible hours", "Standard 9-5", "Project-based work", "Remote work preferred"],
  },
  {
    id: 8,
    question: "How do you approach challenges?",
    options: ["Break into smaller parts", "Research thoroughly first", "Dive in immediately", "Seek team collaboration"],
  },
  {
    id: 9,
    question: "What outcome makes you feel most accomplished?",
    options: ["Building something functional", "Creating beautiful designs", "Discovering insights", "Helping others succeed"],
  },
  {
    id: 10,
    question: "Which technology excites you most?",
    options: ["Artificial Intelligence", "Web Development", "Mobile Apps", "Data Analytics"],
  },
];

interface CareerAssessmentProps {
  onClose: () => void;
}

const CareerAssessment = ({ onClose }: CareerAssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = async () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, questions[currentQuestion].options[selectedAnswer]];
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Quiz finished → call backend
        setLoading(true);
        try {
          const response = await fetch("https://pathfinder-ai-c65o.onrender.com/career-assessment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers: newAnswers }),
          });

          const data = await response.json();
          setResults(data.result || "❌ Gemini returned no result.");
        } catch (err) {
          setResults("❌ Error connecting to server!");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (results) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl max-h-[80vh] overflow-auto p-6">
          <CardHeader className="flex justify-between items-center border-b pb-4">
            <CardTitle className="text-2xl">🎯 Your Career Guidance</CardTitle>
            <Button variant="ghost" onClick={onClose}>✕</Button>
          </CardHeader>
          <CardContent className="whitespace-pre-line text-muted-foreground mt-4">
            {results}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-primary" />
              <CardTitle className="text-xl">Career Assessment</CardTitle>
            </div>
            <Button variant="ghost" onClick={onClose}>✕</Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>

        <CardContent className="p-8">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              {questions[currentQuestion].question}
            </h3>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border transition-all ${
                    selectedAnswer === index
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 hover:bg-accent"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null || loading}
              size="lg"
            >
              {loading
                ? "Analyzing..."
                : currentQuestion < questions.length - 1
                ? "Next Question"
                : "Get Results"} 
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerAssessment;