import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Zap, User, LogOut, BarChart3, Code } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

interface NavigationProps {
  isLoggedIn?: boolean;
}

const Navigation = ({ isLoggedIn = false }: NavigationProps) => {
  const location = useLocation();
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">ByteRank</span>
          </Link>
          
          {isLoggedIn && (
            <div className="flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Problems
              </Link>
              <Link 
                to="/playground" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/playground' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Playground
              </Link>
              <Link 
                to="/aptitude" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/aptitude' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Aptitude
              </Link>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Questions Solved: 42</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Code className="mr-2 h-4 w-4" />
                  <span>Total Attempts: 156</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="secondary">Sign Up</Button>
              </Link>
              <Link to="/dashboard">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;