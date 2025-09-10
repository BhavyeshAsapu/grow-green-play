import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container px-4 mx-auto py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-primary animate-bounce-gentle" />
              <span className="font-bold text-2xl">Game2Grow</span>
            </div>
            <p className="text-background/80 mb-4">
              Empowering the next generation through gamified environmental education. 
              Learn, play, and make a positive impact on our planet's future.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-background/60 hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-background/60 hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-background/60 hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-background/60 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Games</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Achievements</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Leaderboard</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Preschool Games</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Middle School</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">High School</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">College Level</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Teacher Resources</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-background/80">support@game2grow.edu</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-background/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-background/80">Green Valley, CA 94041</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-background/60 mb-4 md:mb-0">
              © {currentYear} Game2Grow. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-background/60 hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;