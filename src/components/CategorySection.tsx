import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Baby, BookOpen, GraduationCap, University, Star, Users, Clock } from "lucide-react";

const categories = [
  {
    id: "preschool",
    title: "Preschool",
    description: "Fun environmental games for ages 3-5",
    icon: Baby,
    color: "bg-blue-100 text-blue-600 border-blue-200",
    games: [
      { name: "Recycle Race", players: "1.2K+", rating: 4.8 },
      { name: "Animal Friends", players: "980+", rating: 4.9 },
      { name: "Plant Paradise", players: "1.5K+", rating: 4.7 },
    ]
  },
  {
    id: "middle-school",
    title: "Middle School",
    description: "Interactive challenges for ages 11-14",
    icon: BookOpen,
    color: "bg-green-100 text-green-600 border-green-200",
    games: [
      { name: "Ecosystem Explorer", players: "2.1K+", rating: 4.9 },
      { name: "Climate Quest", players: "1.8K+", rating: 4.8 },
      { name: "Renewable Rangers", players: "2.3K+", rating: 4.7 },
    ]
  },
  {
    id: "high-school",
    title: "High School",
    description: "Advanced environmental simulations for ages 15-18",
    icon: GraduationCap,
    color: "bg-purple-100 text-purple-600 border-purple-200",
    games: [
      { name: "Carbon Footprint Calculator", players: "1.9K+", rating: 4.6 },
      { name: "Sustainable Cities", players: "2.5K+", rating: 4.8 },
      { name: "Green Technology Lab", players: "1.7K+", rating: 4.9 },
    ]
  },
  {
    id: "college",
    title: "College",
    description: "Real-world environmental case studies",
    icon: University,
    color: "bg-orange-100 text-orange-600 border-orange-200",
    games: [
      { name: "Policy Maker Simulator", players: "1.4K+", rating: 4.7 },
      { name: "Environmental Impact Assessment", players: "1.1K+", rating: 4.8 },
      { name: "Research Challenge", players: "890+", rating: 4.9 },
    ]
  }
];

const CategorySection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Choose Your Learning Adventure
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover age-appropriate environmental games designed to educate, engage, and inspire action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={category.id} 
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">{category.title}</CardTitle>
                <CardDescription className="text-sm">{category.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground mb-3">TOP GAMES</h4>
                  {category.games.map((game, gameIndex) => (
                    <div key={gameIndex} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{game.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{game.players}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-muted-foreground">{game.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90 shadow-medium"
                  size="sm"
                >
                  Explore Games
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;