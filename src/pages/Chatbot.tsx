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
      content: "Hi! I'm your AI Career Advisor. I'm here to help you with career guidance, skill development, and job opportunities. What would you like to discuss today?",
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
    
    if (lowerInput.includes('skill') || lowerInput.includes('learn')) {
      return "Great question! Based on current market trends, I'd recommend focusing on these high-demand skills: React.js for frontend development, Python for data analysis, and cloud computing with AWS. These skills are showing 25-30% growth in job postings. Would you like me to create a personalized learning path for any of these?";
    }
    
    if (lowerInput.includes('salary') || lowerInput.includes('negotiate')) {
      return "Salary negotiation is crucial for career growth! Research shows that people who negotiate their first salary can earn over $1M more during their career. I recommend researching market rates, documenting your achievements, and practicing your pitch. The average tech salary has increased 8% this year. Would you like tips for your specific role?";
    }
    
    if (lowerInput.includes('transition') || lowerInput.includes('change')) {
      return "Career transitions can be exciting! The key is to identify transferable skills and bridge any gaps through targeted learning. Many successful transitions happen by leveraging existing skills in new contexts. What's your current role and where would you like to move?";
    }
    
    return "I understand you're looking for career guidance. Based on your query, I'd suggest focusing on building relevant skills, networking with professionals in your target field, and creating a strong online presence. What specific aspect of your career development would you like to explore further?";
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
            <h1 className="text-3xl font-bold text-foreground">AI Career Chat</h1>
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
                    <p className="text-sm leading-relaxed">{message.content}</p>
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