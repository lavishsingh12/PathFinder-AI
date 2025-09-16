import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  BookOpen, 
  Briefcase, 
  Star, 
  ArrowRight,
  Target,
  Award,
  Clock,
  Users,
  Code,
  Database,
  Smartphone,
  BarChart3,
  Shield,
  Palette,
  Globe,
  Brain,
  DollarSign,
  MapPin,
  Play,
  ExternalLink
} from "lucide-react";

const Dashboard = () => {
  const [selectedCareer, setSelectedCareer] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "B.Tech/Engineering", "MBA/Management", "BCA/MCA", "B.Des/Creative", "BA/Humanities"];

  const careerPaths = [
    {
      id: 1,
      title: "Software Engineer",
      category: "B.Tech/Engineering",
      icon: Code,
      salary: "₹6-30 LPA",
      experience: "0-5 years",
      location: "Bangalore, Hyderabad, Delhi",
      rating: 4.8,
      openings: "25K+ openings",
      trending: true,
      description: "Design and develop software applications using various programming languages and frameworks.",
      skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git", "AWS"],
      roadmap: [
        { phase: "Foundation", duration: "2-3 months", skills: ["HTML/CSS", "JavaScript Basics", "Git"] },
        { phase: "Frontend Development", duration: "3-4 months", skills: ["React", "TypeScript", "Tailwind CSS"] },
        { phase: "Backend Development", duration: "3-4 months", skills: ["Node.js", "Express", "MongoDB/PostgreSQL"] },
        { phase: "Advanced Topics", duration: "2-3 months", skills: ["System Design", "AWS", "Testing"] }
      ],
      courses: [
        { name: "Complete Web Developer Course", provider: "Udemy", price: "Free", rating: 4.7, link: "https://udemy.com" },
        { name: "React Developer Path", provider: "Coursera", price: "$49/month", rating: 4.8, link: "https://coursera.org" }
      ],
      videos: [
        { title: "Web Development Roadmap 2024", channel: "Traversy Media", duration: "45 min" },
        { title: "React Full Course", channel: "freeCodeCamp", duration: "12 hours" }
      ]
    },
    {
      id: 2,
      title: "Data Scientist",
      category: "B.Tech/Engineering",
      icon: BarChart3,
      salary: "₹8-35 LPA",
      experience: "0-4 years",
      location: "Bangalore, Mumbai, Gurgaon",
      rating: 4.8,
      openings: "25K+ openings",
      trending: true,
      description: "Analyze complex data to help organizations make data-driven decisions using statistical methods and machine learning.",
      skills: ["Python", "R", "SQL", "Machine Learning", "Statistics", "Pandas", "Scikit-learn"],
      roadmap: [
        { phase: "Mathematics & Statistics", duration: "2-3 months", skills: ["Statistics", "Linear Algebra", "Calculus"] },
        { phase: "Programming", duration: "2-3 months", skills: ["Python", "R", "SQL"] },
        { phase: "Data Analysis", duration: "3-4 months", skills: ["Pandas", "NumPy", "Data Visualization"] },
        { phase: "Machine Learning", duration: "4-5 months", skills: ["Scikit-learn", "TensorFlow", "Deep Learning"] }
      ],
      courses: [
        { name: "Data Science Specialization", provider: "Coursera", price: "$39/month", rating: 4.9, link: "https://coursera.org" },
        { name: "Python for Data Science", provider: "edX", price: "Free", rating: 4.6, link: "https://edx.org" }
      ],
      videos: [
        { title: "Data Science Full Course", channel: "Simplilearn", duration: "8 hours" },
        { title: "Machine Learning Explained", channel: "3Blue1Brown", duration: "3 hours" }
      ]
    },
    {
      id: 3,
      title: "Cybersecurity Analyst",
      category: "B.Tech/Engineering",
      icon: Shield,
      salary: "₹7-25 LPA",
      experience: "0-3 years",
      location: "Delhi, Mumbai, Bangalore",
      rating: 4.7,
      openings: "15K+ openings",
      trending: true,
      description: "Protect organizations from cyber threats by monitoring, detecting, and responding to security incidents.",
      skills: ["Network Security", "Penetration Testing", "SIEM Tools", "Incident Response", "Risk Assessment"],
      roadmap: [
        { phase: "Foundations", duration: "2-3 months", skills: ["Networking Basics", "Operating Systems", "Security Fundamentals"] },
        { phase: "Security Tools", duration: "3-4 months", skills: ["Wireshark", "Nmap", "Metasploit", "Burp Suite"] },
        { phase: "Specialized Skills", duration: "4-5 months", skills: ["Penetration Testing", "Incident Response", "Forensics"] },
        { phase: "Certifications", duration: "2-3 months", skills: ["CEH", "CISSP", "CompTIA Security+"] }
      ],
      courses: [
        { name: "Cybersecurity Specialization", provider: "Coursera", price: "$49/month", rating: 4.8, link: "https://coursera.org" },
        { name: "Ethical Hacking Course", provider: "Udemy", price: "$89", rating: 4.7, link: "https://udemy.com" }
      ],
      videos: [
        { title: "Cybersecurity Full Course", channel: "Professor Messer", duration: "10 hours" },
        { title: "Ethical Hacking Tutorial", channel: "The Cyber Mentor", duration: "6 hours" }
      ]
    },
    {
      id: 4,
      title: "Mobile Developer",
      category: "B.Tech/Engineering",
      icon: Smartphone,
      salary: "₹5-28 LPA",
      experience: "0-4 years",
      location: "Bangalore, Pune, Chennai",
      rating: 4.6,
      openings: "20K+ openings",
      trending: false,
      description: "Build mobile applications for iOS and Android platforms using native or cross-platform technologies.",
      skills: ["Flutter", "React Native", "Swift", "Kotlin", "Java", "Firebase", "REST APIs"],
      roadmap: [
        { phase: "Programming Basics", duration: "2-3 months", skills: ["Dart/JavaScript", "OOP Concepts"] },
        { phase: "Mobile Development", duration: "3-4 months", skills: ["Flutter/React Native", "State Management"] },
        { phase: "Backend Integration", duration: "2-3 months", skills: ["REST APIs", "Firebase", "Authentication"] },
        { phase: "Advanced Features", duration: "2-3 months", skills: ["Push Notifications", "App Store Deployment"] }
      ],
      courses: [
        { name: "Flutter Development Course", provider: "Udemy", price: "$79", rating: 4.8, link: "https://udemy.com" },
        { name: "React Native Specialization", provider: "Coursera", price: "$39/month", rating: 4.7, link: "https://coursera.org" }
      ],
      videos: [
        { title: "Flutter Full Course", channel: "freeCodeCamp", duration: "8 hours" },
        { title: "React Native Tutorial", channel: "Programming with Mosh", duration: "5 hours" }
      ]
    },
    {
      id: 5,
      title: "Product Manager",
      category: "MBA/Management",
      icon: Target,
      salary: "₹10-40 LPA",
      experience: "2-6 years",
      location: "Bangalore, Mumbai, Delhi",
      rating: 4.5,
      openings: "12K+ openings",
      trending: true,
      description: "Drive product strategy and work with cross-functional teams to deliver successful products to market.",
      skills: ["Product Strategy", "Market Research", "Analytics", "Agile/Scrum", "Stakeholder Management"],
      roadmap: [
        { phase: "Business Fundamentals", duration: "2-3 months", skills: ["Business Analysis", "Market Research"] },
        { phase: "Product Management", duration: "3-4 months", skills: ["Product Strategy", "Roadmapping", "Wireframing"] },
        { phase: "Analytics & Data", duration: "2-3 months", skills: ["SQL", "Analytics Tools", "A/B Testing"] },
        { phase: "Leadership Skills", duration: "Ongoing", skills: ["Stakeholder Management", "Communication", "Agile"] }
      ],
      courses: [
        { name: "Product Management Course", provider: "Coursera", price: "$49/month", rating: 4.9, link: "https://coursera.org" },
        { name: "PM Certification", provider: "Udacity", price: "$399/month", rating: 4.7, link: "https://udacity.com" }
      ],
      videos: [
        { title: "Product Management Basics", channel: "Product School", duration: "2 hours" },
        { title: "How to become a PM", channel: "Google Career Certificates", duration: "45 min" }
      ]
    },
    {
      id: 6,
      title: "UX/UI Designer",
      category: "B.Des/Creative",
      icon: Palette,
      salary: "₹4-22 LPA",
      experience: "0-4 years",
      location: "Bangalore, Mumbai, Pune",
      rating: 4.7,
      openings: "18K+ openings",
      trending: true,
      description: "Design user-centered digital experiences that are both functional and aesthetically pleasing.",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Information Architecture", "Usability Testing"],
      roadmap: [
        { phase: "Design Fundamentals", duration: "2-3 months", skills: ["Design Principles", "Color Theory", "Typography"] },
        { phase: "UX Research", duration: "2-3 months", skills: ["User Research", "Personas", "User Journey Mapping"] },
        { phase: "Design Tools", duration: "2-3 months", skills: ["Figma", "Adobe XD", "Prototyping"] },
        { phase: "Advanced UX", duration: "3-4 months", skills: ["Usability Testing", "Information Architecture", "Interaction Design"] }
      ],
      courses: [
        { name: "Google UX Design Certificate", provider: "Coursera", price: "$39/month", rating: 4.8, link: "https://coursera.org" },
        { name: "UI/UX Design Bootcamp", provider: "Udemy", price: "$119", rating: 4.6, link: "https://udemy.com" }
      ],
      videos: [
        { title: "UX Design Full Course", channel: "DesignCourse", duration: "6 hours" },
        { title: "Figma Tutorial", channel: "Flux", duration: "4 hours" }
      ]
    }
  ];

  const filteredCareers = selectedCategory === "All" 
    ? careerPaths 
    : careerPaths.filter(career => career.category === selectedCategory);

  const trendingSkills = [
    { name: "React.js", demand: "High", growth: "+25%" },
    { name: "Python", demand: "Very High", growth: "+18%" },
    { name: "Cloud Computing", demand: "High", growth: "+30%" },
    { name: "Data Analysis", demand: "Medium", growth: "+22%" }
  ];

  const recommendations = [
    {
      type: "Course",
      title: "Advanced React Patterns",
      provider: "TechEd Pro",
      duration: "12 weeks",
      rating: 4.8
    },
    {
      type: "Job",
      title: "Frontend Developer at TechCorp",
      provider: "LinkedIn",
      duration: "Full-time",
      rating: 4.5
    },
    {
      type: "Course",
      title: "AWS Cloud Practitioner",
      provider: "AWS Training",
      duration: "8 weeks",
      rating: 4.9
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
          <p className="text-muted-foreground">Let's advance your career today</p>
        </div>
        <Button className="bg-gradient-primary">
          <Target className="w-4 h-4 mr-2" />
          Take Assessment
        </Button>
      </div>

      <div className="lg:col-span-full">
        {/* Career Paths Explorer */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Explore 500+ Career Paths
            </CardTitle>
            <CardDescription className="text-center text-lg">
              Discover personalized career opportunities across all degree programs and specializations
            </CardDescription>
          </CardHeader>
          <CardContent>
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

            {/* Career Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCareers.map((career) => {
                const IconComponent = career.icon;
                return (
                  <Card 
                    key={career.id}
                    className="group hover:shadow-strong transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
                    onClick={() => setSelectedCareer(career)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                              {career.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{career.category}</p>
                          </div>
                        </div>
                        {career.trending && (
                          <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Hot
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-success" />
                          <span className="font-semibold text-success">{career.salary}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{career.experience}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{career.location}</span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-accent fill-current" />
                            <span className="text-sm font-medium">{career.rating}/5</span>
                          </div>
                          <span className="text-sm font-medium text-primary">{career.openings}</span>
                        </div>
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Spacer for layout */}
        <div className="lg:col-span-2"></div>

        {/* Trending Skills */}
        <div>
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Trending Skills
              </CardTitle>
              <CardDescription>
                High-demand skills in your field
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {trendingSkills.map((skill, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-foreground">{skill.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {skill.demand} demand
                    </p>
                  </div>
                  <Badge 
                    variant={skill.growth.startsWith('+') ? 'default' : 'secondary'}
                    className="bg-success-light text-success"
                  >
                    {skill.growth}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommendations */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            Recommended for You
          </CardTitle>
          <CardDescription>
            Courses and job opportunities tailored to your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((item, index) => (
              <div 
                key={index}
                className="p-4 border border-border rounded-lg hover:shadow-soft transition-smooth"
              >
                <div className="flex items-center gap-2 mb-2">
                  {item.type === 'Course' ? (
                    <BookOpen className="w-4 h-4 text-primary" />
                  ) : (
                    <Briefcase className="w-4 h-4 text-accent" />
                  )}
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.provider}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{item.duration}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-accent fill-current" />
                    <span className="text-xs font-medium">{item.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Detail Modal */}
      <Dialog open={!!selectedCareer} onOpenChange={() => setSelectedCareer(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCareer && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <selectedCareer.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">{selectedCareer.title}</DialogTitle>
                    <DialogDescription className="text-lg">
                      {selectedCareer.description}
                    </DialogDescription>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-success" />
                    <span className="font-semibold">{selectedCareer.salary}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedCareer.experience}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedCareer.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-accent fill-current" />
                    <span>{selectedCareer.rating}/5 • {selectedCareer.openings}</span>
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="skills" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="skills">Required Skills</TabsTrigger>
                  <TabsTrigger value="roadmap">Learning Roadmap</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                </TabsList>
                
                <TabsContent value="skills" className="space-y-4">
                  <h3 className="text-lg font-semibold">Key Skills Required</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedCareer.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary" className="justify-center py-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="roadmap" className="space-y-6">
                  <h3 className="text-lg font-semibold">Complete Learning Roadmap</h3>
                  <div className="space-y-4">
                    {selectedCareer.roadmap.map((phase: any, index: number) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold">{phase.phase}</h4>
                            <p className="text-sm text-muted-foreground">{phase.duration}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 ml-11">
                          {phase.skills.map((skill: string, skillIndex: number) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="courses" className="space-y-4">
                  <h3 className="text-lg font-semibold">Recommended Courses</h3>
                  <div className="grid gap-4">
                    {selectedCareer.courses.map((course: any, index: number) => (
                      <div key={index} className="border border-border rounded-lg p-4 flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold mb-1">{course.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{course.provider}</p>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-primary">{course.price}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-accent fill-current" />
                              <span className="text-sm">{course.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View Course
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="videos" className="space-y-4">
                  <h3 className="text-lg font-semibold">YouTube Learning Videos</h3>
                  <div className="grid gap-4">
                    {selectedCareer.videos.map((video: any, index: number) => (
                      <div key={index} className="border border-border rounded-lg p-4 flex justify-between items-start">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 bg-red-500 rounded flex items-center justify-center">
                            <Play className="w-4 h-4 text-white fill-current" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{video.title}</h4>
                            <p className="text-sm text-muted-foreground">{video.channel}</p>
                            <span className="text-xs text-accent">{video.duration}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Watch
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;