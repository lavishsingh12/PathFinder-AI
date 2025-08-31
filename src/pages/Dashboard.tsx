import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  BookOpen, 
  Briefcase, 
  Star, 
  ArrowRight,
  Target,
  Award,
  Clock,
  Users
} from "lucide-react";

const Dashboard = () => {
  const careerPaths = [
    {
      title: "Full Stack Developer",
      match: 92,
      description: "Based on your JavaScript and React skills",
      trending: true
    },
    {
      title: "Product Manager",
      match: 78,
      description: "Your leadership experience aligns well",
      trending: false
    },
    {
      title: "UX/UI Designer",
      match: 85,
      description: "Creative problem-solving skills detected",
      trending: true
    }
  ];

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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success-light rounded-lg">
                <Award className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-sm text-muted-foreground">Skills Mastered</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-light rounded-lg">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">85%</p>
                <p className="text-sm text-muted-foreground">Career Match</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent-light rounded-lg">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">24h</p>
                <p className="text-sm text-muted-foreground">Learning Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning-light rounded-lg">
                <Users className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">Active Goals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Career Path Suggestions */}
        <div className="lg:col-span-2">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Recommended Career Paths
              </CardTitle>
              <CardDescription>
                Based on your skills and interests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {careerPaths.map((path, index) => (
                <div 
                  key={index}
                  className="p-4 border border-border rounded-lg hover:shadow-soft transition-smooth"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{path.title}</h3>
                        {path.trending && (
                          <Badge variant="secondary" className="text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{path.description}</p>
                    </div>
                    <span className="text-lg font-bold text-primary">{path.match}%</span>
                  </div>
                  <Progress value={path.match} className="mb-3" />
                  <Button variant="outline" size="sm">
                    Learn More
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

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
    </div>
  );
};

export default Dashboard;