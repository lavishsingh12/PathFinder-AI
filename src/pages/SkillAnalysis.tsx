import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Target, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  BookOpen,
  Briefcase,
  Star,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SkillAnalysis = () => {
  const [analysisStep, setAnalysisStep] = useState<'input' | 'analyzing' | 'results'>('input');
  const [currentSkills, setCurrentSkills] = useState("");
  const [targetRole, setTargetRole] = useState("Frontend Developer");
  const [results, setResults] = useState<any | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // ------------------- Resume Upload (Now Connected to Backend) -------------------
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // --- Client-side validation ---
    if (file.size > 20 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please select a file smaller than 20MB.", variant: "destructive" });
      return;
    }
    if (!file.name.toLowerCase().match(/\.(pdf|doc|docx)$/)) {
      toast({ title: "Invalid file type", description: "Please upload a PDF, DOC, or DOCX file.", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    toast({ title: "Uploading resume...", description: "Our AI is reading your resume to extract skills." });

    const formData = new FormData();
    // The key 'resume' must match the parameter name in the FastAPI endpoint: `def extract_skills_from_resume(resume: UploadFile = File(...))`
    formData.append('resume', file); 

    try {
      const response = await fetch("http://127.0.0.1:8000/extract-skills", {
        method: "POST",
        body: formData, // The browser will automatically set the correct headers for FormData
      });

      if (!response.ok) {
        throw new Error('Server responded with an error during file processing.');
      }

      const data = await response.json();
      setCurrentSkills(data.skills); // Populate skills textarea with the AI's response

      toast({
        title: "Skills Extracted!",
        description: "Your skills have been populated below. You can now analyze them.",
      });

    } catch (error) {
      console.error("Error uploading resume:", error);
      toast({
        title: "⚠️ Connection Error",
        description: (
          <span>
            Could not connect to the AI server. Please ensure the backend is running.
          </span>
        ),
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      event.target.value = ''; // Reset the file input 
    }
  };

  // ------------------- Analyze Skills (Already Connected to Backend) -------------------
  const handleAnalyze = async () => {
    if (!currentSkills.trim()) {
      toast({ title: "Missing information", description: "Please upload a resume or enter your skills manually.", variant: "destructive" });
      return;
    }
    setAnalysisStep('analyzing');
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: currentSkills, targetRole: targetRole }),
      });

      if (!response.ok) throw new Error("The analysis request failed.");

      const data = await response.json();
      setResults(data);
      setTimeout(() => setAnalysisStep('results'), 1000);

    } catch (error) {
      console.error("Error analyzing skills:", error);
      toast({ 
        title: "⚠️ Analysis Error", 
        description: "Could not perform the skills analysis. Please check the backend server.", 
        variant: "destructive" 
      });
      setAnalysisStep('input');
    }
  };

  // ------------------- Render Sections (No changes needed here) -------------------
  const renderInput = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Skills Gap Analysis</h1>
        <p className="text-muted-foreground">Discover what skills you need to reach your career goals</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Upload className="w-5 h-5 text-primary" /> Upload Your Resume</CardTitle>
            <CardDescription>Let our AI analyze your skills automatically</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-smooth">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Click to browse for a PDF or DOCX file</p>
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" id="resume-upload" disabled={isUploading} />
              <Button variant="outline" className="cursor-pointer" onClick={() => document.getElementById('resume-upload')?.click()} disabled={isUploading}>
                {isUploading ? "Processing..." : "Choose File"}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-accent" /> Manual Input</CardTitle>
            <CardDescription>Enter your skills and target role manually</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Target Role</label>
              <Input value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="e.g., Frontend Developer" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Current Skills</label>
              <Textarea value={currentSkills} onChange={(e) => setCurrentSkills(e.target.value)} placeholder="Your skills will appear here after uploading a resume, or you can type them." className="min-h-[100px]" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="text-center">
        <Button onClick={handleAnalyze} className="bg-gradient-primary px-8 py-3 text-lg" disabled={!currentSkills.trim()}>
          <Target className="w-5 h-5 mr-2" />
          Analyze My Skills
        </Button>
      </div>
    </div>
  );
  
  const renderAnalyzing = () => (
    <div className="text-center space-y-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-foreground mb-2">Analyzing Your Skills</h2>
        <p className="text-muted-foreground">Our AI is comparing your skills with {targetRole} requirements...</p>
        <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <Target className="w-8 h-8 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
    </div>
  );

  const renderResults = () => {
    if (!results) return null;
    return (
      <div className="space-y-8 animate-slide-up">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">Your Skills Analysis</h2>
          <p className="text-muted-foreground">Here's how you match with the role of {targetRole}</p>
        </div>
        <Card className="shadow-strong bg-gradient-card">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">{results.matchPercentage}% Skills Match</h3>
            <Progress value={results.matchPercentage} className="w-1/2 mx-auto" />
            <p className="text-muted-foreground mt-4">You have a strong foundation! Focus on the missing skills to improve.</p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-success" /> Your Current Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.currentSkills.map((skill: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <Badge variant={skill.status === 'strong' ? 'default' : 'secondary'}>{skill.status}</Badge>
                  </div>
                  <Progress value={skill.level} />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><AlertCircle className="w-5 h-5 text-warning" /> Skills to Develop</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.missingSkills.map((skill: any, index: number) => (
                <div key={index} className="p-3 border border-border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-foreground">{skill.name}</h4>
                    <Badge variant={skill.importance === 'High' ? 'destructive' : 'secondary'}>{skill.importance}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{skill.description}</p>
                  <p className="text-xs text-accent font-medium">⏱️ {skill.timeToLearn}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Star className="w-5 h-5 text-accent" /> Recommended Learning Path</CardTitle>
            <CardDescription>Curated resources to bridge your skills gap</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {results.recommendations.map((item: any, index: number) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:shadow-soft transition-smooth">
                    <div className="flex items-center gap-2 mb-3">
                        {item.type === 'course' && <BookOpen className="w-4 h-4 text-primary" />}
                        {item.type === 'certification' && <Star className="w-4 h-4 text-accent" />}
                        {item.type === 'project' && <Briefcase className="w-4 h-4 text-success" />}
                        <Badge variant="outline" className="text-xs capitalize">{item.type}</Badge>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{item.provider}</p>
                    <div className="flex justify-between items-center text-xs mb-3">
                        <span className="text-muted-foreground">{item.duration}</span>
                        <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-accent fill-current" />
                            <span>{item.rating}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-accent">{item.price}</span>
                        <Button size="sm" variant="outline">Learn More <ArrowRight className="w-3 h-3 ml-1" /></Button>
                    </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="text-center">
          <Button onClick={() => setAnalysisStep('input')} variant="outline" className="mr-4">Analyze Different Role</Button>
          <Button className="bg-gradient-primary">Create Learning Plan <ArrowRight className="w-4 h-4 ml-2" /></Button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {analysisStep === 'input' && renderInput()}
      {analysisStep === 'analyzing' && renderAnalyzing()}
      {analysisStep === 'results' && renderResults()}
    </div>
  );
};

export default SkillAnalysis;

