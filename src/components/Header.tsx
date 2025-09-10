import { Button } from "@/components/ui/button";
import { Leaf, User, Trophy, Gamepad2, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onLoginClick?: () => void;
}

const Header = ({ onLoginClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Button variant="ghost" className="hover:bg-accent/50">
            <Gamepad2 className="mr-2 h-4 w-4" />
            Games
          </Button>
          <Button variant="ghost" className="hover:bg-accent/50">
            <Trophy className="mr-2 h-4 w-4" />
            Achievements
          </Button>
          <Button variant="ghost" className="hover:bg-accent/50">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90 shadow-medium" onClick={onLoginClick}>
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
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
            <Button variant="ghost" className="w-full justify-start hover:bg-accent/50">
              <Gamepad2 className="mr-2 h-4 w-4" />
              Games
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-accent/50">
              <Trophy className="mr-2 h-4 w-4" />
              Achievements
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-accent/50">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button className="w-full bg-gradient-primary hover:opacity-90 shadow-medium" onClick={onLoginClick}>
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;