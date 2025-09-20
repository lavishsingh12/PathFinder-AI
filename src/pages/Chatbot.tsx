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

type Message = {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hey! 👋 I'm your **AI Career Strategist** from PathFinder! I'm here to help you:\n\n🚀 **Build your dream career**\n📈 **Learn in-demand skills** \n💰 **Negotiate better salaries**\n🎯 **Create personalized roadmaps**\n\nI give real, actionable advice - not just generic tips! What career challenge can I help you tackle today?",
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

  // This function now generates suggestions based on the user's input.
  const generateSuggestions = (input: string): string[] => {
    const lower = input.toLowerCase();

    if (lower.includes("ml") || lower.includes("machine learning") || lower.includes("ai engineer")) {
      return ["Show ML Roadmap", "Best free ML courses", "Salary for ML engineers"];
    }
    if (lower.includes("frontend") || lower.includes("web dev") || lower.includes("react")) {
      return ["Learn React", "Roadmap for Frontend", "Best hosting platforms"];
    }
    if (lower.includes("salary") || lower.includes("negotiate")) {
      return [
        "What's the salary range for my role?",
        "How do I prepare for salary negotiation?",
        "How to ask for raise"
      ];
    }
    if (lower.includes("transition") || lower.includes("switch") || lower.includes("change")) {
      return ["Steps for career switch", "Quick skills to learn", "Top growing roles"];
    }
    if (lower.includes("skill")) {
      return [
        "Show me a learning roadmap for these skills",
        "What certifications should I get?",
        "Find relevant courses for me"
      ];
    }
    // Default suggestions
    return [
      "Explore career paths",
      "Analyze my skills",
      "Find courses",
      "What are the top skills in demand?",
    ];
  };

  // ✅ THIS IS THE MODIFIED PART
  // This function now sends all messages to your backend and provides helpful error messages.
  const generateResponse = async (input: string): Promise<string> => {
    try {
      const response = await fetch("https://pathfinder-ai-c65o.onrender.com/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        // This will catch server-side errors (e.g., 500 Internal Server Error)
        return "Sorry, I'm having a bit of trouble thinking right now. Please try again later.";
      }

      const data = await response.json();
      return data.reply || "I'm not sure how to answer that. Could you rephrase?";
    } catch (error) {
      console.error("Error fetching from backend:", error);
      // This specifically checks for the "Failed to fetch" error and gives a helpful tip.
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return "⚠️ **Connection Error**\n\nI couldn't connect to the AI server. This usually means the backend isn't running.\n\n**Solution:**\n1. Open a new terminal.\n2. Navigate to your `backend` folder.\n3. Run the command: `node server.js`";
      }
      return "⚠️ An unexpected error occurred. Please check the console for details.";
    }
  };

  // This function handles sending the message and receiving a response.
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

    const responseText = await generateResponse(userMessage.content);

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: responseText,
      isBot: true,
      timestamp: new Date(),
      suggestions: generateSuggestions(userMessage.content)
    };

    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const quickActions = [
    { icon: Target, label: "Career Assessment", description: "Discover your ideal career path" },
    { icon: TrendingUp, label: "Skill Analysis", description: "Identify skill gaps" },
    { icon: Lightbulb, label: "Interview Prep", description: "Get ready for your next interview" },
    { icon: MessageCircle, label: "Resume Review", description: "Optimize your resume" }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">PathFinder AI Chat</h1>
            <p className="text-muted-foreground">Get personalized career advice powered by AI</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleSendMessage(`Help me with ${action.label.toLowerCase()}`)}
            >
              <action.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm text-foreground">{action.label}</h3>
              <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
            </Card>
          ))}
        </div>
      </div>

      <Card className="h-96 overflow-hidden shadow-lg">
        <div className="h-full flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 items-start ${message.isBot ? '' : 'flex-row-reverse'}`}>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={message.isBot ? 'bg-primary text-primary-foreground' : 'bg-secondary'}>
                    {message.isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>

                <div className={`max-w-[80%] ${message.isBot ? 'text-left' : 'text-right'}`}>
                  <div
                    className={`p-3 rounded-lg ${message.isBot ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'}`}
                  >
                    <div
                      className="text-sm leading-relaxed whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: message.content
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>')
                          .replace(/•/g, '&bull;')
                      }}
                    />
                  </div>
                  
                  {message.suggestions && (
                    <div className={`mt-2 space-y-1 ${!message.isBot && 'flex justify-end'}`}>
                        {/* ✅ FIXED CLASSNAME BUG HERE */}
                        <div className={`flex flex-wrap gap-1 ${!message.isBot && 'justify-end'}`}>
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

                  <p className="text-xs text-muted-foreground mt-1 px-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 items-start">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-secondary p-3 rounded-lg">
                  <div className="flex gap-1 items-center">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about your career..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              />
              <Button onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim() || isTyping}>
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