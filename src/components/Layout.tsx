import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  MessageCircle, 
  Target, 
  User, 
  LogIn,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  // Only show navigation for non-landing pages (signed-in users)
  const navigation = !isLandingPage ? [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'AI Chat', href: '/chat', icon: MessageCircle },
    { name: 'Skills Analysis', href: '/skills', icon: Target },
    { name: 'Profile', href: '/profile', icon: User },
  ] : [];

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
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground">CareerCraft AI</h1>
                <p className="text-xs text-muted-foreground">Career & Skills Advisor</p>
              </div>
            </div>

            {/* Desktop Navigation - Only show for non-landing pages */}
            {!isLandingPage && (
              <nav className="hidden md:flex items-center gap-1">
                {navigation.map((item) => (
                  <NavLink key={item.name} to={item.href} className={getLinkStyles} end>
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            )}

            {/* Auth Button */}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              
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

          {/* Mobile Navigation - Only show for non-landing pages */}
          {mobileMenuOpen && !isLandingPage && (
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
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
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