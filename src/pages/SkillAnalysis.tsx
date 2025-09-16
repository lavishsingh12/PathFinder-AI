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
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) { // 20MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 20MB.",
          variant: "destructive",
        });
        return;
      }

      if (!file.name.toLowerCase().match(/\.(pdf|doc|docx)$/)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, DOC, or DOCX file.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded and is being processed...`,
      });
      
      // Simulate AI processing of the resume
      setTimeout(() => {
        const extractedSkills = extractSkillsFromFileName(file.name);
        setCurrentSkills(extractedSkills);
        toast({
          title: "Resume processed",
          description: "Skills have been extracted from your resume.",
        });
      }, 2000);
    }
  };

  const extractSkillsFromFileName = (fileName: string) => {
    // Simulate skill extraction based on common resume content
    const commonSkillSets = [
      "React.js, JavaScript, CSS, HTML, Git, MongoDB, Node.js, TypeScript",
      "Python, Django, PostgreSQL, Docker, AWS, REST APIs, Git, Linux",
      "Java, Spring Boot, MySQL, Jenkins, Kubernetes, Microservices, Git",
      "Machine Learning, Python, TensorFlow, Pandas, SQL, Statistics, Jupyter",
      "PHP, Laravel, MySQL, Vue.js, Git, Apache, Linux",
      "C#, .NET, SQL Server, Azure, Git, Visual Studio, Entity Framework"
    ];
    
    return commonSkillSets[Math.floor(Math.random() * commonSkillSets.length)];
  };

  const handleAnalyze = () => {
    if (!currentSkills.trim()) {
      toast({
        title: "Missing information",
        description: "Please upload a resume or enter your skills manually.",
        variant: "destructive",
      });
      return;
    }

    setAnalysisStep('analyzing');
    
    // Simulate analysis
    setTimeout(() => {
      setAnalysisStep('results');
    }, 3000);
  };

  const mockResults = {
    matchPercentage: 78,
    currentSkills: [
      { name: "React.js", level: 90, status: "strong" },
      { name: "JavaScript", level: 85, status: "strong" },
      { name: "TypeScript", level: 70, status: "good" },
      { name: "CSS", level: 75, status: "good" },
      { name: "Node.js", level: 60, status: "developing" }
    ],
    missingSkills: [
      { 
        name: "Next.js", 
        importance: "High",
        description: "Modern React framework for production applications",
        timeToLearn: "4-6 weeks"
      },
      { 
        name: "GraphQL", 
        importance: "Medium",
        description: "Query language for APIs, increasingly popular",
        timeToLearn: "2-3 weeks"
      },
      { 
        name: "Docker", 
        importance: "Medium",
        description: "Containerization technology for deployment",
        timeToLearn: "3-4 weeks"
      },
      { 
        name: "AWS", 
        importance: "High",
        description: "Cloud platform knowledge essential for modern development",
        timeToLearn: "6-8 weeks"
      }
    ],
    recommendations: [
      {
        type: "course",
        title: "Complete Next.js Developer Course",
        provider: "Udemy",
        duration: "40 hours",
        rating: 4.8,
        price: "$89"
      },
      {
        type: "certification",
        title: "AWS Certified Developer",
        provider: "Amazon",
        duration: "3 months prep",
        rating: 4.9,
        price: "$150"
      },
      {
        type: "project",
        title: "Build a Full-Stack E-commerce App",
        provider: "GitHub",
        duration: "2-3 weeks",
        rating: 4.7,
        price: "Free"
      }
    ]
  };

  const renderInput = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Skills Gap Analysis</h1>
        <p className="text-muted-foreground">
          Discover what skills you need to reach your career goals
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Resume */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Upload Your Resume
            </CardTitle>
            <CardDescription>
              Let our AI analyze your current skills automatically
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-smooth">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Drag and drop your resume or click to browse
              </p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload">
                <Button variant="outline" className="cursor-pointer">
                  Choose File
                </Button>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Manual Input */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              Manual Input
            </CardTitle>
            <CardDescription>
              Enter your skills and target role manually
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Target Role
              </label>
              <Input
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g., Frontend Developer, Data Scientist"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Current Skills
              </label>
              <Textarea
                value={currentSkills}
                onChange={(e) => setCurrentSkills(e.target.value)}
                placeholder="List your skills separated by commas (e.g., React, JavaScript, Python, SQL)"
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button 
          onClick={handleAnalyze}
          className="bg-gradient-primary px-8 py-3 text-lg"
        >
          <Target className="w-5 h-5 mr-2" />
          Analyze My Skills
        </Button>
      </div>
    </div>
  );

  const renderAnalyzing = () => (
    <div className="text-center space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Analyzing Your Skills</h2>
        <p className="text-muted-foreground">
          Our AI is comparing your skills with {targetRole} requirements...
        </p>
      </div>
      
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 mx-auto mb-6 relative">
          <div className="w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <Target className="w-8 h-8 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            Processing your skills data...
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            Comparing with market requirements...
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            Generating recommendations...
          </div>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Your Skills Analysis</h2>
        <p className="text-muted-foreground">
          Here's how you match with {targetRole} requirements
        </p>
      </div>

      {/* Overall Match */}
      <Card className="shadow-strong bg-gradient-card">
        <CardContent className="p-6 text-center">
          <div className="w-24 h-24 mx-auto mb-4 relative">
            <div className="w-full h-full rounded-full bg-secondary">
              <div 
                className="h-full rounded-full bg-gradient-primary flex items-center justify-center"
                style={{ width: `${mockResults.matchPercentage}%` }}
              >
                <span className="text-white font-bold text-lg">{mockResults.matchPercentage}%</span>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Skills Match</h3>
          <p className="text-muted-foreground">
            You have a strong foundation! Focus on the missing skills to reach 95%+
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Skills */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              Your Current Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockResults.currentSkills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">{skill.name}</span>
                  <Badge 
                    variant={skill.status === 'strong' ? 'default' : skill.status === 'good' ? 'secondary' : 'outline'}
                  >
                    {skill.level}%
                  </Badge>
                </div>
                <Progress value={skill.level} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Missing Skills */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              Skills to Develop
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockResults.missingSkills.map((skill, index) => (
              <div key={index} className="p-3 border border-border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-foreground">{skill.name}</h4>
                  <Badge variant={skill.importance === 'High' ? 'destructive' : 'secondary'}>
                    {skill.importance}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{skill.description}</p>
                <p className="text-xs text-accent font-medium">⏱️ {skill.timeToLearn}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            Recommended Learning Path
          </CardTitle>
          <CardDescription>
            Curated resources to bridge your skills gap
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockResults.recommendations.map((item, index) => (
              <div key={index} className="p-4 border border-border rounded-lg hover:shadow-soft transition-smooth">
                <div className="flex items-center gap-2 mb-3">
                  {item.type === 'course' && <BookOpen className="w-4 h-4 text-primary" />}
                  {item.type === 'certification' && <Star className="w-4 h-4 text-accent" />}
                  {item.type === 'project' && <Briefcase className="w-4 h-4 text-success" />}
                  <Badge variant="outline" className="text-xs capitalize">
                    {item.type}
                  </Badge>
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
                  <Button size="sm" variant="outline">
                    Learn More
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button 
          onClick={() => setAnalysisStep('input')}
          variant="outline"
          className="mr-4"
        >
          Analyze Different Role
        </Button>
        <Button className="bg-gradient-primary">
          Create Learning Plan
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {analysisStep === 'input' && renderInput()}
      {analysisStep === 'analyzing' && renderAnalyzing()}
      {analysisStep === 'results' && renderResults()}
    </div>
  );
};

export default SkillAnalysis;