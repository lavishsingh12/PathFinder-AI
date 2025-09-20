import { Outlet, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  LayoutDashboard, 
  MessageCircle, 
  Target, 
  User, 
  LogIn,
  Menu,
  X,
  Compass
} from "lucide-react";
import { useState } from "react";

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'AI Chat', href: '/chat', icon: MessageCircle },
    { name: 'Skills Analysis', href: '/skills', icon: Target },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const getLinkStyles = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth font-medium ${
      isActive 
        ? 'bg-primary text-primary-foreground shadow-medium' 
        : 'text-foreground hover:bg-secondary hover:text-secondary-foreground'
    }`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Compass className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground">PathFinder AI</h1>
                <p className="text-xs text-muted-foreground">Career & Skills Advisor</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <NavLink key={item.name} to={item.href} className={getLinkStyles} end>
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>

            {/* Auth Button */}
            <div className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden sm:flex">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Sign In to PathFinder AI</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <Button className="w-full">
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                      Don't have an account? <button className="text-primary hover:underline">Sign up</button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border bg-card">
              <nav className="py-4 space-y-2">
                {navigation.map((item) => (
                  <NavLink 
                    key={item.name} 
                    to={item.href} 
                    className={getLinkStyles} 
                    end
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </NavLink>
                ))}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Sign In to PathFinder AI</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobile-email">Email</Label>
                        <Input
                          id="mobile-email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobile-password">Password</Label>
                        <Input
                          id="mobile-password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <Button className="w-full">
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                      <div className="text-center text-sm text-muted-foreground">
                        Don't have an account? <button className="text-primary hover:underline">Sign up</button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;