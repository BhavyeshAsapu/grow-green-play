import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Sparkles, ArrowRight } from "lucide-react";

const WelcomeCard = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-16 lg:py-24">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container relative px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Welcome Content */}
          <div className="flex-1 text-center lg:text-left animate-fade-in">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <Sparkles className="h-8 w-8 text-white mr-3 animate-bounce-gentle" />
              <span className="text-white/90 text-lg font-medium">Welcome to the Future of Learning</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Learn, Play, and 
              <span className="block text-yellow-300">Save the Planet!</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              Join thousands of students worldwide in our gamified environmental education platform. 
              Turn learning into an adventure while making a real impact on our planet's future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-large text-lg px-8 py-6"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Welcome Card */}
          <div className="flex-1 animate-scale-in">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-large">
              <CardContent className="p-8">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Leaf className="h-10 w-10 text-white animate-bounce-gentle" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">Choose Your Level</h3>
                  <p className="text-white/90 mb-6">
                    Tailored environmental challenges for every age group
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 rounded-lg p-3 text-sm font-medium hover:bg-white/20 transition-colors cursor-pointer">
                      Preschool
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-sm font-medium hover:bg-white/20 transition-colors cursor-pointer">
                      Middle School
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-sm font-medium hover:bg-white/20 transition-colors cursor-pointer">
                      High School
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-sm font-medium hover:bg-white/20 transition-colors cursor-pointer">
                      College
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeCard;