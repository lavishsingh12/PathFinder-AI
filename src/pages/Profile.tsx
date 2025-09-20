import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  Award,
  BookOpen,
  Target,
  TrendingUp,
  Bookmark,
  Clock,
  Star
} from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Lavish Singh Rajawat",
    email: "thelavish12@gmail.com",
    location: "Jaipur, Rajasthan",
    title: "ML Engineer and AI specialist",
    bio: "P✨ Second-year B.Tech CSE student | Aspiring Developer | Exploring the realms of AI & Machine Learning with curiosity and passion 🌐🤖",
    skills: ["Python", "Data Structures", "SQL", "CSS", "HTML", "Git", "Github"],
    goals: ["Learn Next.js", "Master ML Algorithms", "Get AWS certification"],
    experience: "1+ years"
  });

  const savedRecommendations = [
    {
      id: 1,
      type: "Course",
      title: "Advanced React Patterns",
      provider: "TechEd Pro",
      savedDate: "2025-08-15",
      status: "In Progress"
    },
    {
      id: 2,
      type: "Job",
      title: "Master ML core concepts",
      provider: "Udemy",
      savedDate: "2025-08-15",
      status: "Applied"
    },
    {
      id: 3,
      type: "Certification",
      title: "AWS Certified Developer",
      provider: "Amazon",
      savedDate: "2025-08-15",
      status: "Planned"
    }
  ];

  const achievements = [
    {
      title: "Skill Master",
      description: "Completed 5 technical assessments",
      icon: Award,
      date: "Aug 2025",
      color: "text-accent"
    },
    {
      title: "Quick Learner", 
      description: "Finished 2 courses in one month",
      icon: BookOpen,
      date: "Aug 2025",
      color: "text-success"
    },
    {
      title: "Goal Achiever",
      description: "Reached 3 career milestones",
      icon: Target,
      date: "Aug 2025", 
      color: "text-primary"
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
          <p className="text-muted-foreground">Manage your career information and track progress</p>
        </div>
        <Button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={isEditing ? "bg-success" : ""}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="text-xl bg-gradient-primary text-primary-foreground">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        placeholder="Full Name"
                      />
                      <Input
                        value={profileData.title}
                        onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                        placeholder="Job Title"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-foreground">{profileData.name}</h3>
                      <p className="text-muted-foreground">{profileData.title}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      type="email"
                    />
                  ) : (
                    <span className="text-foreground">{profileData.email}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    />
                  ) : (
                    <span className="text-foreground">{profileData.location}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">About</label>
                {isEditing ? (
                  <Textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    placeholder="Tell us about yourself..."
                    className="min-h-[80px]"
                  />
                ) : (
                  <p className="text-muted-foreground">{profileData.bio}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Skills & Goals */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Skills & Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Current Skills</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                  {isEditing && (
                    <Badge variant="outline" className="cursor-pointer border-dashed">
                      + Add Skill
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Career Goals</label>
                <div className="space-y-2">
                  {profileData.goals.map((goal, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-accent" />
                      <span className="text-foreground">{goal}</span>
                    </div>
                  ))}
                  {isEditing && (
                    <div className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground">
                      <Target className="w-4 h-4" />
                      <span>+ Add Goal</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Saved Recommendations */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-primary" />
                Saved Recommendations
              </CardTitle>
              <CardDescription>
                Your bookmarked courses, jobs, and resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedRecommendations.map((item) => (
                  <div key={item.id} className="p-4 border border-border rounded-lg hover:shadow-soft transition-smooth">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          <Badge 
                            variant={item.status === 'In Progress' ? 'default' : item.status === 'Applied' ? 'secondary' : 'outline'}
                            className="text-xs"
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.provider}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Saved {new Date(item.savedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats & Achievements */}
        <div className="space-y-6">
          {/* Stats */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-gradient-card rounded-lg">
                <div className="text-2xl font-bold text-foreground">78%</div>
                <div className="text-sm text-muted-foreground">Career Match Score</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Skills Mastered</span>
                  <span className="font-medium text-foreground">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Courses Completed</span>
                  <span className="font-medium text-foreground">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Learning Streak</span>
                  <span className="font-medium text-foreground">15 days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-secondary ${achievement.color}`}>
                    <achievement.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{achievement.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="font-medium">Completed skill assessment</span>
                </div>
                <p className="text-muted-foreground ml-4">2 hours ago</p>
              </div>
              
              <div className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-medium">Started new course</span>
                </div>
                <p className="text-muted-foreground ml-4">1 day ago</p>
              </div>
              
              <div className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="font-medium">Updated career goals</span>
                </div>
                <p className="text-muted-foreground ml-4">3 days ago</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;