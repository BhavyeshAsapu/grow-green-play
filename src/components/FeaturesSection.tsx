import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Users, 
  BarChart3, 
  Shield, 
  Smartphone, 
  Globe,
  Lightbulb,
  Target,
  Heart
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Adaptive Learning",
    description: "AI-powered content that adjusts to your learning pace and style",
    benefits: ["Personalized curriculum", "Smart difficulty scaling", "Learning analytics"],
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description: "Team up with classmates worldwide to solve environmental challenges",
    benefits: ["Global classroom", "Team challenges", "Peer learning"],
    color: "bg-green-100 text-green-600"
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Detailed insights into your learning journey and achievements",
    benefits: ["Real-time analytics", "Skill assessment", "Parent dashboard"],
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Globe,
    title: "Real-World Impact",
    description: "See how your actions in-game translate to actual environmental benefits",
    benefits: ["Virtual to reality", "Impact measurement", "Community projects"],
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    icon: Smartphone,
    title: "Multi-Platform Access",
    description: "Learn anywhere, anytime on any device with seamless synchronization",
    benefits: ["Cross-device sync", "Offline mode", "Mobile optimized"],
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Child-safe environment with privacy protection and content moderation",
    benefits: ["Data privacy", "Safe chat", "Parental controls"],
    color: "bg-red-100 text-red-600"
  }
];

const impactStats = [
  { icon: Lightbulb, number: "500K+", label: "Students Educated", color: "text-yellow-500" },
  { icon: Target, number: "2.3M+", label: "Challenges Completed", color: "text-blue-500" },
  { icon: Heart, number: "95%", label: "Positive Impact Rate", color: "text-red-500" },
  { icon: Globe, number: "120+", label: "Countries Reached", color: "text-green-500" }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4 text-sm">
            Why Choose Game2Grow?
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Features That Make Learning Fun
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with proven educational methods to create 
            an engaging and effective learning experience for environmental education.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {impactStats.map((stat, index) => (
            <Card 
              key={index} 
              className="text-center hover:shadow-medium transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li 
                      key={benefitIndex} 
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3 flex-shrink-0"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center animate-fade-in">
          <Card className="bg-gradient-card border-primary/20 shadow-large max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Make a Difference?
              </h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of students who are already learning and making a positive impact on our planet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-medium">
                  Start Learning Today
                </button>
                <button className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors">
                  Learn More
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;