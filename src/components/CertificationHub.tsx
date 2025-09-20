import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Award, 
  Clock, 
  Star, 
  Users, 
  ExternalLink,
  BookOpen,
  TrendingUp,
  CheckCircle
} from "lucide-react";

interface Certification {
  id: number;
  title: string;
  provider: string;
  category: string;
  level: string;
  duration: string;
  rating: number;
  reviews: number;
  price: string;
  originalPrice?: string;
  badge: string;
  skills: string[];
  description: string;
  curriculum: {
    module: string;
    topics: string[];
    duration: string;
  }[];
  instructor: string;
  enrollments: string;
  certificate: boolean;
  link: string;
}

const CertificationHub = () => {
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);

  const certifications: Certification[] = [
    {
      id: 1,
      title: "Google Data Analytics Professional Certificate",
      provider: "Google Career Certificates",
      category: "Data Analytics",
      level: "Beginner",
      duration: "6 months",
      rating: 4.6,
      reviews: 87234,
      price: "Free",
      originalPrice: "₹7,800",
      badge: "Professional Certificate",
      skills: ["Data Analytics", "R Programming", "SQL", "Tableau", "Data Visualization"],
      description: "Gain skills to become a data analyst through hands-on curriculum developed by Google. No prior experience required.",
      curriculum: [
        {
          module: "Foundations: Data, Data, Everywhere",
          topics: ["Data ecosystem", "Data analyst roles", "Data lifecycle", "Tools and platforms"],
          duration: "3 weeks"
        },
        {
          module: "Ask Questions to Make Data-Driven Decisions",
          topics: ["Effective questioning", "Data-driven decision making", "Spreadsheets basics"],
          duration: "4 weeks"
        },
        {
          module: "Prepare Data for Exploration",
          topics: ["Data types", "Data structures", "Data bias", "Databases and SQL"],
          duration: "5 weeks"
        },
        {
          module: "Process Data from Dirty to Clean",
          topics: ["Data integrity", "Data cleaning", "SQL functions", "Verification"],
          duration: "4 weeks"
        }
      ],
      instructor: "Google Career Certificates Team",
      enrollments: "2.5M+ students",
      certificate: true,
      link: "https://www.coursera.org/professional-certificates/google-data-analytics"
    },
    {
      id: 2,
      title: "AWS Cloud Practitioner Essentials",
      provider: "Amazon Web Services",
      category: "Cloud Computing",
      level: "Beginner to Intermediate",
      duration: "3 months",
      rating: 4.7,
      reviews: 45678,
      price: "Free",
      badge: "Industry Recognition",
      skills: ["AWS Services", "Cloud Architecture", "Security", "Pricing", "Support"],
      description: "Learn cloud fundamentals and prepare for the AWS Certified Cloud Practitioner exam.",
      curriculum: [
        {
          module: "Introduction to AWS",
          topics: ["Cloud computing concepts", "AWS global infrastructure", "Core services"],
          duration: "2 weeks"
        },
        {
          module: "Core AWS Services",
          topics: ["Compute services", "Storage services", "Database services", "Networking"],
          duration: "4 weeks"
        },
        {
          module: "Security and Compliance",
          topics: ["Shared responsibility model", "Identity and access management", "Security services"],
          duration: "3 weeks"
        },
        {
          module: "Pricing and Support",
          topics: ["Pricing models", "Billing and cost management", "Support plans"],
          duration: "2 weeks"
        }
      ],
      instructor: "AWS Training Team",
      enrollments: "1.8M+ students",
      certificate: true,
      link: "https://aws.amazon.com/training/path-cloudpractitioner/"
    },
    {
      id: 3,
      title: "Meta Front-End Developer Professional Certificate",
      provider: "Meta",
      category: "Web Development",
      level: "Beginner",
      duration: "7 months",
      rating: 4.8,
      reviews: 92156,
      price: "Free",
      originalPrice: "₹5,200",
      badge: "Meta Certified",
      skills: ["HTML", "CSS", "JavaScript", "React", "Bootstrap", "Figma"],
      description: "Launch your career as a front-end developer. Build job-ready skills for an in-demand career.",
      curriculum: [
        {
          module: "Introduction to Front-End Development",
          topics: ["Web development basics", "HTML fundamentals", "CSS styling", "UI/UX principles"],
          duration: "4 weeks"
        },
        {
          module: "Programming with JavaScript",
          topics: ["JavaScript syntax", "DOM manipulation", "Event handling", "ES6 features"],
          duration: "5 weeks"
        },
        {
          module: "Version Control",
          topics: ["Git fundamentals", "GitHub workflow", "Collaboration", "Branching strategies"],
          duration: "2 weeks"
        },
        {
          module: "React Basics",
          topics: ["Components", "Props and state", "Event handling", "Hooks"],
          duration: "6 weeks"
        }
      ],
      instructor: "Meta Staff",
      enrollments: "1.2M+ students",
      certificate: true,
      link: "https://www.coursera.org/professional-certificates/meta-front-end-developer"
    },
    {
      id: 4,
      title: "Google UX Design Professional Certificate",
      provider: "Google Career Certificates",
      category: "UX/UI Design",
      level: "Beginner",
      duration: "6 months",
      rating: 4.7,
      reviews: 78234,
      price: "Free",
      badge: "Google Certified",
      skills: ["User Research", "Wireframing", "Prototyping", "Figma", "Adobe XD"],
      description: "Get started in the fast-growing field of user experience (UX) design with a professional certificate.",
      curriculum: [
        {
          module: "Foundations of User Experience Design",
          topics: ["UX design process", "User-centered design", "Accessibility", "Design thinking"],
          duration: "4 weeks"
        },
        {
          module: "Start the UX Design Process",
          topics: ["User research methods", "Personas", "User stories", "Journey maps"],
          duration: "4 weeks"
        },
        {
          module: "Build Wireframes and Low-Fidelity Prototypes",
          topics: ["Wireframing", "Paper prototypes", "Digital wireframes", "Information architecture"],
          duration: "5 weeks"
        },
        {
          module: "Conduct UX Research and Test Early Concepts",
          topics: ["Research methods", "Usability testing", "Research insights", "Iteration"],
          duration: "4 weeks"
        }
      ],
      instructor: "Google UX Design Team",
      enrollments: "800K+ students",
      certificate: true,
      link: "https://www.coursera.org/professional-certificates/google-ux-design"
    },
    {
      id: 5,
      title: "IBM Data Science Professional Certificate",
      provider: "IBM",
      category: "Data Science",
      level: "Beginner to Intermediate",
      duration: "8 months",
      rating: 4.5,
      reviews: 156789,
      price: "Free",
      badge: "IBM Certified",
      skills: ["Python", "SQL", "Machine Learning", "Data Analysis", "Jupyter"],
      description: "Master the most up-to-date practical skills and knowledge for data scientists.",
      curriculum: [
        {
          module: "What is Data Science?",
          topics: ["Data science methodology", "Career paths", "Industry applications"],
          duration: "2 weeks"
        },
        {
          module: "Tools for Data Science",
          topics: ["Jupyter notebooks", "RStudio", "GitHub", "Watson Studio"],
          duration: "3 weeks"
        },
        {
          module: "Data Science Methodology",
          topics: ["CRISP-DM methodology", "Problem solving", "Data collection", "Modeling"],
          duration: "3 weeks"
        },
        {
          module: "Python for Data Science and AI",
          topics: ["Python basics", "Data structures", "Pandas", "NumPy", "APIs"],
          duration: "5 weeks"
        }
      ],
      instructor: "IBM Skills Network Team",
      enrollments: "950K+ students",
      certificate: true,
      link: "https://www.coursera.org/professional-certificates/ibm-data-science"
    },
    {
      id: 6,
      title: "Microsoft Azure Fundamentals",
      provider: "Microsoft",
      category: "Cloud Computing",
      level: "Beginner",
      duration: "2 months",
      rating: 4.6,
      reviews: 34567,
      price: "Free",
      badge: "Microsoft Certified",
      skills: ["Azure Services", "Cloud Concepts", "Security", "Compliance", "Pricing"],
      description: "Learn Azure fundamentals and prepare for the AZ-900 certification exam.",
      curriculum: [
        {
          module: "Cloud Concepts",
          topics: ["Cloud computing", "Benefits of cloud services", "Cloud service types"],
          duration: "2 weeks"
        },
        {
          module: "Core Azure Services",
          topics: ["Azure architecture", "Compute services", "Networking services", "Storage services"],
          duration: "3 weeks"
        },
        {
          module: "Security and Compliance",
          topics: ["Azure security features", "Network security", "Identity services", "Governance"],
          duration: "2 weeks"
        },
        {
          module: "Azure Pricing and Support",
          topics: ["Azure subscriptions", "Planning and managing costs", "Support options"],
          duration: "1 week"
        }
      ],
      instructor: "Microsoft Learn Team",
      enrollments: "600K+ students",
      certificate: true,
      link: "https://docs.microsoft.com/learn/paths/azure-fundamentals/"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Certification Hub</h2>
        <p className="text-muted-foreground text-lg">
          Advance your career with industry-recognized certifications from top companies
        </p>
      </div>

      {/* Certification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((certification) => (
          <Card 
            key={certification.id}
            className="group hover:shadow-strong transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
            onClick={() => setSelectedCertification(certification)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {certification.badge}
                </Badge>
                {certification.originalPrice && (
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    50% OFF
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {certification.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{certification.provider}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-accent fill-current" />
                  <span className="text-sm font-medium">{certification.rating}</span>
                  <span className="text-sm text-muted-foreground">({certification.reviews.toLocaleString()})</span>
                </div>
                <Badge variant="outline">{certification.level}</Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{certification.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{certification.enrollments}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-success">{certification.price}</p>
                  {certification.originalPrice && (
                    <p className="text-sm text-muted-foreground line-through">{certification.originalPrice}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  {certification.certificate && (
                    <Award className="w-5 h-5 text-accent" />
                  )}
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {certification.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {certification.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{certification.skills.length - 3} more
                  </Badge>
                )}
              </div>

              <Button 
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                variant="outline"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Certification Details Modal */}
      {selectedCertification && (
        <Dialog open={!!selectedCertification} onOpenChange={() => setSelectedCertification(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground">
                {selectedCertification.title}
              </DialogTitle>
              <DialogDescription className="text-lg">
                {selectedCertification.provider} • {selectedCertification.category}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="enroll">Enroll Now</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">About this Certificate</h3>
                      <p className="text-muted-foreground">{selectedCertification.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Skills you'll gain</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCertification.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Card className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-accent fill-current" />
                          <span className="font-semibold">{selectedCertification.rating}/5</span>
                          <span className="text-sm text-muted-foreground">
                            ({selectedCertification.reviews.toLocaleString()} reviews)
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-muted-foreground" />
                          <span>{selectedCertification.duration} to complete</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-muted-foreground" />
                          <span>{selectedCertification.enrollments} enrolled</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-accent" />
                          <span>Certificate included</span>
                        </div>

                        <div className="pt-3 border-t">
                          <p className="text-2xl font-bold text-success">{selectedCertification.price}</p>
                          {selectedCertification.originalPrice && (
                            <p className="text-sm text-muted-foreground line-through">
                              {selectedCertification.originalPrice}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Course Curriculum</h3>
                <div className="space-y-4">
                  {selectedCertification.curriculum.map((module, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-foreground">{module.module}</h4>
                            <Badge variant="outline">{module.duration}</Badge>
                          </div>
                          <ul className="space-y-1">
                            {module.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-success" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="enroll" className="space-y-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Ready to start your journey?</h3>
                  <p className="text-muted-foreground">
                    Join thousands of learners who have advanced their careers with this certification.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-success">{selectedCertification.price}</p>
                      {selectedCertification.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          {selectedCertification.originalPrice}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Instructor: {selectedCertification.instructor}
                      </p>
                    </div>
                  </div>

                  <Button 
                    className="bg-gradient-primary text-lg px-8 py-3"
                    onClick={() => window.open(selectedCertification.link, '_blank')}
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Enroll Now
                  </Button>
                  
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-success" />
                      7-day free trial
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-success" />
                      Certificate included
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-success" />
                      Full access
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CertificationHub;