import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  MessageCircle,
  Lightbulb,
  Target,
  TrendingUp
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hey! 👋 I'm your **AI Career Strategist** from CareerCraft! I'm here to help you:\n\n🚀 **Build your dream career**\n📈 **Learn in-demand skills** \n💰 **Negotiate better salaries**\n🎯 **Create personalized roadmaps**\n\nI give real, actionable advice - not just generic tips! What career challenge can I help you tackle today?",
      isBot: true,
      timestamp: new Date(),
      suggestions: [
        "What skills should I learn for data science?",
        "How can I transition to product management?",
        "What are the highest paying tech jobs?",
        "How do I negotiate my salary?"
      ]
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(content),
        isBot: true,
        timestamp: new Date(),
        suggestions: generateSuggestions(content)
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('ml') || lowerInput.includes('machine learning') || lowerInput.includes('ai engineer')) {
      return `**🚀 Awesome choice!** ML Engineering is one of the hottest fields right now! Here's your complete roadmap:

**📚 Phase 1: Foundation (3-4 months)**
• **Mathematics**: Linear Algebra, Statistics, Calculus
• **Programming**: Python (NumPy, Pandas, Matplotlib)
• **Tools**: Jupyter Notebooks, Git

**🧠 Phase 2: Core ML (4-5 months)** 
• **Algorithms**: Supervised/Unsupervised Learning
• **Libraries**: Scikit-learn, TensorFlow/PyTorch
• **Deep Learning**: Neural Networks, CNNs, RNNs
• **Practice**: Kaggle competitions, personal projects

**⚡ Phase 3: MLOps & Production (3-4 months)**
• **Deployment**: Docker, Kubernetes, Cloud (AWS/GCP)
• **MLOps**: MLflow, Airflow, Model Monitoring  
• **Databases**: SQL, NoSQL for big data

**💰 Salary Range**: $95k - $180k+ (senior roles)
**🔥 Growth**: +35% job demand this year!

**Free Resources**: Andrew Ng's ML Course, Kaggle Learn
**Paid**: Deep Learning Specialization, MLOps courses

Want me to create a personalized timeline based on your current background? 🎯`;
    }
    
    if (lowerInput.includes('frontend') || lowerInput.includes('web dev') || lowerInput.includes('react')) {
      return `**🎨 Frontend Development is perfect for creative problem-solvers!** Here's your path to success:

**🏗️ Phase 1: Web Fundamentals (2-3 months)**
• **HTML5**: Semantic markup, accessibility  
• **CSS3**: Flexbox, Grid, animations, responsive design
• **JavaScript**: ES6+, DOM manipulation, async/await
• **Tools**: VS Code, Git/GitHub, Chrome DevTools

**⚛️ Phase 2: React Ecosystem (3-4 months)**
• **React**: Components, hooks, state management
• **TypeScript**: Type safety, better code quality
• **Styling**: Styled-components, Tailwind CSS
• **State**: Redux/Zustand for complex apps

**🚀 Phase 3: Advanced & Production (2-3 months)**
• **Frameworks**: Next.js for full-stack apps
• **Testing**: Jest, Cypress for reliable code
• **Performance**: Code splitting, lazy loading
• **Deployment**: Vercel, Netlify, CI/CD

**💰 Salary Range**: $70k - $130k+ (senior roles)  
**📈 Growth**: +23% increase in job postings!

**Free Resources**: freeCodeCamp, React docs, MDN
**Paid**: Epic React, Frontend Masters

Ready to start building amazing user experiences? Let me know your current level! 💪`;
    }
    
    if (lowerInput.includes('salary') || lowerInput.includes('negotiate')) {
      return `**💰 Salary negotiation is a GAME CHANGER!** Here's how to master it:

**📊 Research Phase:**
• **Use tools**: Glassdoor, levels.fyi, Payscale
• **Network**: Ask peers in similar roles (anonymously)  
• **Location matters**: SF/NYC vs other cities = 20-40% difference

**💪 Build Your Case:**
• **Document wins**: Quantify your achievements with numbers
• **Market rate**: "Based on my research, similar roles pay $X-Y"
• **Unique value**: What makes you special vs other candidates?

**🎯 Negotiation Strategy:**
• **Timing**: After job offer, before accepting
• **Be enthusiastic**: "I'm excited about this role AND..."
• **Ask for time**: "Can I have 24-48 hours to review?"
• **Bundle**: Salary + benefits + equity + PTO

**🔥 Pro Tips:**
• People who negotiate earn **$1M+ more** over their career
• **Women**: Practice saying numbers out loud (confidence boost!)
• **New grads**: Still negotiate! Even 5-10% adds up

**💡 Sample script**: "I'm thrilled about joining the team! Based on my research and experience with [specific skills], I was hoping we could discuss a salary of $X. Is there flexibility there?"

Want me to help you prepare for a specific negotiation? Share your situation! 🚀`;
    }
    
    if (lowerInput.includes('transition') || lowerInput.includes('change') || lowerInput.includes('switch')) {
      return `**🔄 Career transitions are exciting opportunities!** Here's your strategic approach:

**🎯 Step 1: Skills Audit (Week 1-2)**
• **Map current skills**: What transferable skills do you have?
• **Identify gaps**: What's missing for your target role?
• **Quick wins**: Skills you can learn in 30-90 days

**📚 Step 2: Strategic Learning (Month 1-3)**
• **Focus on high-impact skills**: Don't try to learn everything
• **Build projects**: Portfolio > Certificates  
• **Network actively**: LinkedIn, industry events, informational interviews

**🚀 Step 3: Transition Strategy**
• **Internal moves**: Easier path if possible
• **Freelance/Side projects**: Build experience gradually
• **Bootcamps/Courses**: Intensive learning + network

**✅ Success Examples:**
• Teacher → Data Scientist (via Python + statistics)
• Marketing → Product Manager (via analytics + user research)  
• Sales → Software Engineer (via coding bootcamp)

**🔥 Hot Transition Paths Right Now:**
• Any field → **Data/AI roles** (huge demand!)
• Traditional roles → **Remote-first careers**
• Corporate → **Freelance/Consulting**

**💡 Remember**: Your unique background is an ASSET, not a limitation. Different perspectives are valued!

What's your current role and dream destination? Let me create a custom transition plan! 🎯`;
    }
    
    return `Hey there! 👋 I'm here to be your **personal career strategist**! 

Whether you're looking to:
🚀 **Break into tech** (I love helping with this!)
📈 **Level up your current role**  
💰 **Negotiate better compensation**
🔄 **Make a career pivot**

I've got you covered with **real, actionable advice** - not just generic tips!

**What's on your mind today?** Share your:
• Current situation
• Career goals  
• Biggest challenges
• Timeline for change

Let's craft a plan that actually works for YOU! 💪✨`;
  };

  const generateSuggestions = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('skill')) {
      return [
        "Show me a learning roadmap for these skills",
        "What certifications should I get?",
        "How long will it take to learn these?",
        "Find relevant courses for me"
      ];
    }
    
    if (lowerInput.includes('salary')) {
      return [
        "What's the salary range for my role?",
        "How do I prepare for salary negotiation?",
        "What benefits should I negotiate?",
        "When is the best time to negotiate?"
      ];
    }
    
    return [
      "What are the top skills in demand?",
      "How can I improve my LinkedIn profile?",
      "What career paths match my skills?",
      "Find job opportunities for me"
    ];
  };

  const quickActions = [
    {
      icon: Target,
      label: "Career Assessment",
      description: "Discover your ideal career path"
    },
    {
      icon: TrendingUp,
      label: "Skill Analysis",
      description: "Identify skill gaps and opportunities"
    },
    {
      icon: Lightbulb,
      label: "Interview Prep",
      description: "Get ready for your next interview"
    },
    {
      icon: MessageCircle,
      label: "Resume Review",
      description: "Optimize your resume for ATS"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">CareerCraft AI Chat</h1>
            <p className="text-muted-foreground">Get personalized career advice powered by AI</p>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <Card 
              key={index}
              className="p-4 cursor-pointer hover:shadow-medium transition-smooth"
              onClick={() => handleSendMessage(`Help me with ${action.label.toLowerCase()}`)}
            >
              <action.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm text-foreground">{action.label}</h3>
              <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <Card className="h-96 overflow-hidden shadow-medium">
        <div className="h-full flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.isBot ? '' : 'flex-row-reverse'}`}>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={message.isBot ? 'bg-primary text-primary-foreground' : 'bg-secondary'}>
                    {message.isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`max-w-[80%] ${message.isBot ? '' : 'text-right'}`}>
                  <div 
                    className={`p-3 rounded-lg ${
                      message.isBot 
                        ? 'bg-secondary text-secondary-foreground' 
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    <div 
                      className="text-sm leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: message.content
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>')
                          .replace(/•/g, '&bull;')
                      }}
                    />
                  </div>
                  
                  {message.suggestions && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-muted-foreground">Suggestions:</p>
                      <div className="flex flex-wrap gap-1">
                        {message.suggestions.map((suggestion, idx) => (
                          <Badge 
                            key={idx}
                            variant="outline" 
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground text-xs"
                            onClick={() => handleSendMessage(suggestion)}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-secondary p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about your career..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              />
              <Button onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chatbot;