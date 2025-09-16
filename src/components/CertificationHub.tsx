import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Award, 
  Clock, 
  Users, 
  DollarSign, 
  Star,
  ExternalLink,
  CheckCircle
} from "lucide-react";

interface Certification {
  id: string;
  title: string;
  company: string;
  discount: string;
  isHot: boolean;
  duration: string;
  level: string;
  rating: number;
  enrolledCount: string;
  expectedSalary: string;
  description: string;
  skills: string[];
  curriculum: string[];
  enrollLink: string;
  curriculumLink: string;
}

const CertificationHub = () => {
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Data Science", "Cloud Computing", "Web Development", "Cybersecurity", "Design"];

  const certifications: Certification[] = [
    {
      id: "google-data",
      title: "Google Data Analytics Certificate",
      company: "Google",
      discount: "20% OFF",
      isHot: true,
      duration: "6 months",
      level: "Beginner",
      rating: 4.8,
      enrolledCount: "500K+",
      expectedSalary: "₹6-12 LPA",
      description: "Prepare for a career in data analytics with hands-on training from Google.",
      skills: ["Python", "SQL", "Tableau"],
      curriculum: [
        "Foundations of Data Analytics",
        "Ask Questions to Make Data-Driven Decisions",
        "Prepare Data for Exploration",
        "Process Data from Dirty to Clean",
        "Analyze Data to Answer Questions",
        "Share Data Through the Art of Visualization",
        "Data Analysis with R Programming",
        "Google Data Analytics Capstone"
      ],
      enrollLink: "https://coursera.org/google-data-analytics",
      curriculumLink: "https://coursera.org/google-data-analytics-curriculum"
    },
    {
      id: "aws-cloud",
      title: "AWS Cloud Practitioner",
      company: "Amazon",
      discount: "15% OFF",
      isHot: true,
      duration: "3 months",
      level: "Beginner",
      rating: 4.9,
      enrolledCount: "1M+",
      expectedSalary: "₹8-18 LPA",
      description: "Foundational understanding of AWS Cloud services and architecture.",
      skills: ["AWS", "Cloud Architecture", "DevOps"],
      curriculum: [
        "Introduction to Cloud Computing",
        "AWS Core Services",
        "Security and Compliance",
        "Pricing and Support",
        "Hands-on Labs",
        "Practice Exams",
        "Certification Preparation"
      ],
      enrollLink: "https://aws.amazon.com/training",
      curriculumLink: "https://aws.amazon.com/training/path-cloudpractitioner"
    },
    {
      id: "meta-frontend",
      title: "Meta Front-End Developer",
      company: "Meta",
      discount: "25% OFF",
      isHot: false,
      duration: "7 months",
      level: "Intermediate",
      rating: 4.7,
      enrolledCount: "300K+",
      expectedSalary: "₹7-20 LPA",
      description: "Create responsive websites and mobile apps using cutting-edge tools.",
      skills: ["React", "JavaScript", "HTML/CSS"],
      curriculum: [
        "Introduction to Front-End Development",
        "Programming with JavaScript",
        "Version Control",
        "HTML and CSS in depth",
        "React Basics",
        "Advanced React",
        "Principles of UX/UI Design",
        "Front-End Developer Capstone"
      ],
      enrollLink: "https://coursera.org/meta-frontend",
      curriculumLink: "https://coursera.org/meta-frontend-curriculum"
    }
  ];

  const filteredCertifications = selectedCategory === "All" 
    ? certifications 
    : certifications.filter(cert => {
        if (selectedCategory === "Data Science") return cert.id.includes("data");
        if (selectedCategory === "Cloud Computing") return cert.id.includes("aws");
        if (selectedCategory === "Web Development") return cert.id.includes("frontend");
        return false;
      });

  return (
    <div className="bg-secondary/30 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-8 h-8 text-primary" />
            <h3 className="text-4xl font-bold text-foreground">Certification Hub</h3>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Earn industry-recognized certifications from top companies and boost your career prospects
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm">
            <div className="text-3xl font-bold text-foreground mb-2">50+</div>
            <div className="text-muted-foreground">Industry Certifications</div>
          </Card>
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm">
            <div className="text-3xl font-bold text-foreground mb-2">2M+</div>
            <div className="text-muted-foreground">Students Enrolled</div>
          </Card>
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm">
            <div className="text-3xl font-bold text-foreground mb-2">95%</div>
            <div className="text-muted-foreground">Job Placement Rate</div>
          </Card>
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm">
            <div className="text-3xl font-bold text-primary mb-2">₹15L</div>
            <div className="text-muted-foreground">Avg Salary Increase</div>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Certification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertifications.map((cert) => (
            <Card 
              key={cert.id}
              className="group hover:shadow-strong transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 relative overflow-hidden"
              onClick={() => setSelectedCertification(cert)}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-muted-foreground">{cert.company}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant="destructive" className="text-xs">
                      {cert.discount}
                    </Badge>
                    {cert.isHot && (
                      <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 border-orange-500/20">
                        Hot
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{cert.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {cert.level}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{cert.rating}/5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{cert.enrolledCount}</span>
                  </div>
                </div>

                {/* Expected Salary */}
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-4 h-4 text-success" />
                  <span className="font-semibold text-success">Expected Salary: {cert.expectedSalary}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>

                {/* Skills */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-foreground mb-2">You'll Learn:</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    <Badge variant="outline" className="text-xs">
                      +{cert.skills.length > 3 ? cert.curriculum.length - 3 : 1} more
                    </Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button className="w-full" size="sm">
                    Enroll Now <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    View Curriculum
                  </Button>
                </div>

                {/* Industry Recognized Badge */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">Industry Recognized Certificate</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certification Detail Modal */}
        {selectedCertification && (
          <Dialog open={!!selectedCertification} onOpenChange={() => setSelectedCertification(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedCertification.title}</DialogTitle>
                <DialogDescription className="text-lg">
                  By {selectedCertification.company} • {selectedCertification.duration} • {selectedCertification.level}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Key Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-secondary/20 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2 fill-current" />
                    <div className="font-semibold">{selectedCertification.rating}/5</div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/20 rounded-lg">
                    <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="font-semibold">{selectedCertification.enrolledCount}</div>
                    <div className="text-sm text-muted-foreground">Enrolled</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/20 rounded-lg">
                    <Clock className="w-6 h-6 text-accent mx-auto mb-2" />
                    <div className="font-semibold">{selectedCertification.duration}</div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/20 rounded-lg">
                    <DollarSign className="w-6 h-6 text-success mx-auto mb-2" />
                    <div className="font-semibold">{selectedCertification.expectedSalary}</div>
                    <div className="text-sm text-muted-foreground">Expected Salary</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-lg font-semibold mb-2">About This Certification</h4>
                  <p className="text-muted-foreground">{selectedCertification.description}</p>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-lg font-semibold mb-2">Skills You'll Gain</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCertification.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Curriculum */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Course Curriculum</h4>
                  <div className="space-y-2">
                    {selectedCertification.curriculum.map((module, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <span className="text-foreground">{module}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button className="flex-1" size="lg" asChild>
                    <a href={selectedCertification.enrollLink} target="_blank" rel="noopener noreferrer">
                      Enroll Now <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1" size="lg" asChild>
                    <a href={selectedCertification.curriculumLink} target="_blank" rel="noopener noreferrer">
                      View Full Curriculum <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default CertificationHub;