import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp,
  Code,
  Database,
  Smartphone,
  Brain,
  Shield,
  Palette,
  Server,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

interface Skill {
  id: string;
  name: string;
  category: string;
  icon: any;
  growth: string;
  salary: string;
  description: string;
  roadmap: {
    phase: string;
    skills: string[];
    timeframe: string;
    resources: { name: string; type: 'free' | 'paid'; url?: string }[];
  }[];
}

const Index = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const trendingSkills: Skill[] = [
    {
      id: 'frontend',
      name: 'Frontend Developer',
      category: 'Web Development',
      icon: Code,
      growth: '+23%',
      salary: '$85k',
      description: 'Build interactive user interfaces and web applications using modern frameworks and libraries.',
      roadmap: [
        {
          phase: 'Foundation',
          skills: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Git/GitHub', 'Responsive Design'],
          timeframe: '2-3 months',
          resources: [
            { name: 'freeCodeCamp', type: 'free' },
            { name: 'The Complete Web Developer Course', type: 'paid' },
            { name: 'MDN Web Docs', type: 'free' }
          ]
        },
        {
          phase: 'Framework Mastery',
          skills: ['React.js', 'TypeScript', 'State Management (Redux/Zustand)', 'Component Libraries'],
          timeframe: '3-4 months',
          resources: [
            { name: 'React Documentation', type: 'free' },
            { name: 'Epic React by Kent C. Dodds', type: 'paid' },
            { name: 'TypeScript Handbook', type: 'free' }
          ]
        },
        {
          phase: 'Advanced Skills',
          skills: ['Next.js', 'Testing (Jest/Cypress)', 'Performance Optimization', 'Web APIs'],
          timeframe: '2-3 months',
          resources: [
            { name: 'Next.js Learn Course', type: 'free' },
            { name: 'Testing JavaScript', type: 'paid' },
            { name: 'Web.dev Performance', type: 'free' }
          ]
        }
      ]
    },
    {
      id: 'ml',
      name: 'ML Engineer',
      category: 'Artificial Intelligence',
      icon: Brain,
      growth: '+35%',
      salary: '$125k',
      description: 'Design and implement machine learning systems and deploy AI models to production.',
      roadmap: [
        {
          phase: 'Mathematics & Programming',
          skills: ['Python', 'Linear Algebra', 'Statistics', 'Calculus', 'NumPy/Pandas'],
          timeframe: '3-4 months',
          resources: [
            { name: 'Khan Academy Math', type: 'free' },
            { name: 'Python for Data Science', type: 'paid' },
            { name: 'Coursera Math Specialization', type: 'free' }
          ]
        },
        {
          phase: 'Core ML Concepts',
          skills: ['Scikit-learn', 'TensorFlow/PyTorch', 'Deep Learning', 'Model Evaluation'],
          timeframe: '4-5 months',
          resources: [
            { name: 'Andrew Ng ML Course', type: 'free' },
            { name: 'Deep Learning Specialization', type: 'paid' },
            { name: 'Kaggle Learn', type: 'free' }
          ]
        },
        {
          phase: 'Production & MLOps',
          skills: ['Docker', 'Kubernetes', 'MLflow', 'Model Deployment', 'Cloud Platforms'],
          timeframe: '3-4 months',
          resources: [
            { name: 'MLOps Course', type: 'paid' },
            { name: 'Google Cloud ML', type: 'free' },
            { name: 'Docker Documentation', type: 'free' }
          ]
        }
      ]
    },
    {
      id: 'mobile',
      name: 'Mobile Developer',
      category: 'Mobile Development',
      icon: Smartphone,
      growth: '+18%',
      salary: '$95k',
      description: 'Create native and cross-platform mobile applications for iOS and Android.',
      roadmap: [
        {
          phase: 'Fundamentals',
          skills: ['Dart/Kotlin/Swift', 'Mobile UI/UX Principles', 'REST APIs', 'Version Control'],
          timeframe: '2-3 months',
          resources: [
            { name: 'Flutter Documentation', type: 'free' },
            { name: 'Kotlin Bootcamp', type: 'paid' },
            { name: 'Apple Developer Guides', type: 'free' }
          ]
        },
        {
          phase: 'Platform Expertise',
          skills: ['Flutter/React Native', 'State Management', 'Local Storage', 'Push Notifications'],
          timeframe: '3-4 months',
          resources: [
            { name: 'Flutter Course', type: 'paid' },
            { name: 'React Native Docs', type: 'free' },
            { name: 'Firebase Documentation', type: 'free' }
          ]
        },
        {
          phase: 'Advanced Features',
          skills: ['App Store Deployment', 'Performance Optimization', 'Testing', 'CI/CD'],
          timeframe: '2-3 months',
          resources: [
            { name: 'App Store Guidelines', type: 'free' },
            { name: 'Mobile DevOps', type: 'paid' },
            { name: 'Fastlane Documentation', type: 'free' }
          ]
        }
      ]
    },
    {
      id: 'data',
      name: 'Data Scientist',
      category: 'Data & Analytics',
      icon: BarChart3,
      growth: '+28%',
      salary: '$115k',
      description: 'Extract insights from data using statistical analysis and machine learning techniques.',
      roadmap: [
        {
          phase: 'Data Fundamentals',
          skills: ['Python/R', 'SQL', 'Excel', 'Statistics', 'Data Visualization'],
          timeframe: '3-4 months',
          resources: [
            { name: 'Kaggle Courses', type: 'free' },
            { name: 'DataCamp', type: 'paid' },
            { name: 'SQL Tutorial', type: 'free' }
          ]
        },
        {
          phase: 'Analysis & ML',
          skills: ['Pandas', 'Matplotlib/Seaborn', 'Scikit-learn', 'Jupyter', 'A/B Testing'],
          timeframe: '4-5 months',
          resources: [
            { name: 'Python Data Science', type: 'paid' },
            { name: 'Coursera Data Science', type: 'free' },
            { name: 'Towards Data Science', type: 'free' }
          ]
        },
        {
          phase: 'Advanced Analytics',
          skills: ['Big Data (Spark)', 'Deep Learning', 'Cloud Platforms', 'Business Intelligence'],
          timeframe: '3-4 months',
          resources: [
            { name: 'Spark Documentation', type: 'free' },
            { name: 'AWS Data Analytics', type: 'paid' },
            { name: 'Tableau Training', type: 'free' }
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">CareerCraft AI</h1>
        </div>
        
        <h2 className="text-5xl font-bold text-foreground mb-6">
          Shape Your <span className="text-primary">Future Career</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Get personalized career guidance, skill roadmaps, and AI-powered insights to accelerate your professional growth.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link to="/chat">
            <Button size="lg" className="text-lg px-8">
              Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="text-lg px-8">
            View Demo
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mt-6 bg-secondary/30 px-4 py-2 rounded-lg inline-block">
          💡 Login or Sign Up for more personalized career advice and save your progress
        </p>
      </div>

      {/* Trending Skills Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h3 className="text-3xl font-bold text-foreground">Trending Skills in Tech</h3>
          </div>
          <p className="text-muted-foreground text-lg">
            Discover the most in-demand skills and get complete learning roadmaps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trendingSkills.map((skill) => (
            <Card 
              key={skill.id}
              className="p-6 cursor-pointer hover:shadow-medium transition-smooth group"
              onClick={() => setSelectedSkill(skill)}
            >
              <div className="flex items-center gap-3 mb-4">
                <skill.icon className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold text-foreground">{skill.name}</h4>
                  <p className="text-sm text-muted-foreground">{skill.category}</p>
                </div>
              </div>
              
              <div className="flex gap-2 mb-3">
                <Badge variant="secondary" className="text-green-600 bg-green-50">
                  {skill.growth} growth
                </Badge>
                <Badge variant="outline">{skill.salary} avg</Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>
              
              <Button 
                variant="ghost" 
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
              >
                View Roadmap <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Skill Roadmap Modal */}
        {selectedSkill && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl max-h-[80vh] overflow-auto">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <selectedSkill.icon className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{selectedSkill.name}</h3>
                      <p className="text-muted-foreground">{selectedSkill.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedSkill(null)}>
                    ✕
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-lg font-semibold text-foreground mb-6">Complete Learning Roadmap</h4>
                
                <div className="space-y-8">
                  {selectedSkill.roadmap.map((phase, index) => (
                    <div key={index} className="relative">
                      {index !== selectedSkill.roadmap.length - 1 && (
                        <div className="absolute left-4 top-12 w-0.5 h-full bg-border"></div>
                      )}
                      
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h5 className="text-lg font-semibold text-foreground">{phase.phase}</h5>
                            <Badge variant="outline">{phase.timeframe}</Badge>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-sm text-muted-foreground mb-2">Skills to learn:</p>
                            <div className="flex flex-wrap gap-2">
                              {phase.skills.map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="secondary">{skill}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Resources:</p>
                            <div className="space-y-1">
                              {phase.resources.map((resource, resourceIndex) => (
                                <div key={resourceIndex} className="flex items-center gap-2 text-sm">
                                  <Badge 
                                    variant={resource.type === 'free' ? 'secondary' : 'outline'}
                                    className={resource.type === 'free' ? 'text-green-600 bg-green-50' : ''}
                                  >
                                    {resource.type}
                                  </Badge>
                                  <span className="text-foreground">{resource.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-border">
                  <Link to="/chat">
                    <Button className="w-full" size="lg">
                      Get Personalized Guidance from AI <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Why Choose CareerCraft AI?</h3>
            <p className="text-muted-foreground text-lg">Powered by AI to give you the most relevant career insights</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-foreground mb-2">AI-Powered Insights</h4>
              <p className="text-muted-foreground">Get personalized career advice from our advanced AI assistant</p>
            </Card>
            
            <Card className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-foreground mb-2">Real-Time Market Data</h4>
              <p className="text-muted-foreground">Access up-to-date job market trends and salary information</p>
            </Card>
            
            <Card className="p-6 text-center">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-foreground mb-2">Personalized Roadmaps</h4>
              <p className="text-muted-foreground">Get custom learning paths tailored to your goals</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;