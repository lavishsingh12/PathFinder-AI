import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, CheckCircle, Target } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
}

interface CareerResult {
  career: string;
  match: number;
  description: string;
  skills: string[];
  salary: string;
  growth: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What type of work environment do you prefer?",
    options: ["Working with teams", "Working independently", "Mix of both", "Leading others"]
  },
  {
    id: 2,
    question: "Which subject did you enjoy most in school?",
    options: ["Mathematics", "Science", "Arts/Literature", "Social Studies"]
  },
  {
    id: 3,
    question: "What motivates you the most?",
    options: ["Solving problems", "Creating something new", "Helping others", "Leading projects"]
  },
  {
    id: 4,
    question: "How do you handle deadlines?",
    options: ["Plan ahead meticulously", "Work best under pressure", "Need flexible timelines", "Prefer no strict deadlines"]
  },
  {
    id: 5,
    question: "What's your preferred learning style?",
    options: ["Hands-on practice", "Reading and research", "Visual learning", "Group discussions"]
  },
  {
    id: 6,
    question: "Which activity appeals to you most?",
    options: ["Coding/Programming", "Designing/Creating", "Analyzing data", "Teaching/Mentoring"]
  },
  {
    id: 7,
    question: "What's your ideal work-life balance?",
    options: ["Flexible hours", "Standard 9-5", "Project-based work", "Remote work preferred"]
  },
  {
    id: 8,
    question: "How do you approach challenges?",
    options: ["Break into smaller parts", "Research thoroughly first", "Dive in immediately", "Seek team collaboration"]
  },
  {
    id: 9,
    question: "What outcome makes you feel most accomplished?",
    options: ["Building something functional", "Creating beautiful designs", "Discovering insights", "Helping others succeed"]
  },
  {
    id: 10,
    question: "Which technology excites you most?",
    options: ["Artificial Intelligence", "Web Development", "Mobile Apps", "Data Analytics"]
  }
];

const careerResults: CareerResult[] = [
  {
    career: "Software Developer",
    match: 92,
    description: "Build applications and systems that solve real-world problems using programming languages and frameworks.",
    skills: ["JavaScript", "React", "Node.js", "Python", "Git"],
    salary: "₹8-25 LPA",
    growth: "+23%"
  },
  {
    career: "Data Scientist",
    match: 88,
    description: "Analyze complex data to extract insights and build predictive models for business decisions.",
    skills: ["Python", "SQL", "Machine Learning", "Statistics", "Tableau"],
    salary: "₹12-30 LPA",
    growth: "+28%"
  },
  {
    career: "UI/UX Designer",
    match: 85,
    description: "Design intuitive and beautiful user interfaces and experiences for digital products.",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "HTML/CSS"],
    salary: "₹6-20 LPA",
    growth: "+18%"
  },
  {
    career: "Product Manager",
    match: 82,
    description: "Lead product development by defining strategy, roadmap, and coordinating cross-functional teams.",
    skills: ["Strategy", "Analytics", "Communication", "Agile", "Market Research"],
    salary: "₹15-40 LPA",
    growth: "+21%"
  }
];

interface CareerAssessmentProps {
  onClose: () => void;
}

const CareerAssessment = ({ onClose }: CareerAssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }
  };

  const calculateResults = () => {
    // Simple algorithm to determine career match based on answers
    // In a real application, this would be more sophisticated
    const scores = careerResults.map((career, index) => ({
      ...career,
      match: Math.max(75, Math.floor(Math.random() * 25) + 75) // Random match between 75-100%
    }));
    
    return scores.sort((a, b) => b.match - a.match);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const results = showResults ? calculateResults() : [];

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl max-h-[80vh] overflow-auto">
          <CardHeader className="text-center border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <CardTitle className="text-2xl">Assessment Complete!</CardTitle>
              </div>
              <Button variant="ghost" onClick={onClose}>✕</Button>
            </div>
            <p className="text-muted-foreground">Here are your personalized career recommendations</p>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="space-y-6">
              {results.map((result, index) => (
                <Card key={index} className={`p-6 ${index === 0 ? 'ring-2 ring-primary' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {index === 0 && <Target className="w-6 h-6 text-primary" />}
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{result.career}</h3>
                        {index === 0 && <Badge className="mt-1">Best Match</Badge>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{result.match}%</div>
                      <div className="text-sm text-muted-foreground">Match</div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{result.description}</p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Key Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {result.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Salary Range</p>
                      <p className="text-lg font-bold text-primary">{result.salary}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Market Growth</p>
                      <p className="text-lg font-bold text-green-600">{result.growth}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t text-center">
              <Button className="w-full max-w-md" size="lg">
                Get Detailed Career Plan <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
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
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border hover:border-primary/50 hover:bg-accent'
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
              disabled={selectedAnswer === null}
              size="lg"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Get Results'} 
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerAssessment;