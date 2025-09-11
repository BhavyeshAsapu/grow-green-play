import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, User, Trophy, Gamepad2, LogIn, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

interface HeaderProps {
  onLoginClick?: () => void;
}

const Header = ({ onLoginClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4">
        {/* Animated Logo */}
        <div className="mr-4 hidden md:flex">
          <div className="flex items-center space-x-2 animate-fade-in">
            <div className="relative">
              <Leaf className="h-8 w-8 text-primary animate-bounce-gentle" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            </div>
            <span className="font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent">
              Game2Grow
            </span>
          </div>
        </div>

        {/* Mobile Logo */}
        <div className="flex md:hidden">
          <div className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary animate-bounce-gentle" />
            <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
              Game2Grow
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-auto">
          <Link to="/quiz">
            <Button variant="ghost" className="hover:bg-accent/50">
              <Gamepad2 className="mr-2 h-4 w-4" />
              Quizzes
            </Button>
          </Link>
          <Button variant="ghost" className="hover:bg-accent/50">
            <Trophy className="mr-2 h-4 w-4" />
            Leaderboard
          </Button>
          
          {user ? (
            <div className="flex items-center space-x-4">
              {profile && (
                <Badge className="bg-gradient-primary text-white">
                  <Trophy className="mr-1 h-3 w-3" />
                  {profile.points} pts
                </Badge>
              )}
              <span className="text-sm font-medium">
                Welcome, {profile?.username || 'Player'}!
              </span>
              <Button variant="ghost" onClick={signOut} className="hover:bg-accent/50">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Button className="bg-gradient-primary hover:opacity-90 shadow-medium" onClick={onLoginClick}>
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <div className="container px-4 py-4 space-y-2">
            <Link to="/quiz" className="block">
              <Button variant="ghost" className="w-full justify-start hover:bg-accent/50">
                <Gamepad2 className="mr-2 h-4 w-4" />
                Quizzes
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start hover:bg-accent/50">
              <Trophy className="mr-2 h-4 w-4" />
              Leaderboard
            </Button>
            
            {user ? (
              <>
                {profile && (
                  <div className="px-4 py-2 text-center">
                    <Badge className="bg-gradient-primary text-white">
                      <Trophy className="mr-1 h-3 w-3" />
                      {profile.points} pts
                    </Badge>
                    <p className="text-sm mt-1">Welcome, {profile.username || 'Player'}!</p>
                  </div>
                )}
                <Button className="w-full bg-gradient-primary hover:opacity-90 shadow-medium" onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button className="w-full bg-gradient-primary hover:opacity-90 shadow-medium" onClick={onLoginClick}>
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;