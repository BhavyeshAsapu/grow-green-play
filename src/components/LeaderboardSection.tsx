import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Crown, Star, TrendingUp } from "lucide-react";

const topPlayers = [
  { rank: 1, name: "Alex Green", points: 2450, badge: "Eco Champion", avatar: "AG", level: "College", trend: "+125" },
  { rank: 2, name: "Maya Forest", points: 2380, badge: "Planet Protector", avatar: "MF", level: "High School", trend: "+98" },
  { rank: 3, name: "Sam River", points: 2290, badge: "Green Warrior", avatar: "SR", level: "College", trend: "+87" },
  { rank: 4, name: "Luna Earth", points: 2156, badge: "Eco Explorer", avatar: "LE", level: "Middle School", trend: "+76" },
  { rank: 5, name: "Rio Nature", points: 2089, badge: "Green Guardian", avatar: "RN", level: "High School", trend: "+65" },
];

const achievements = [
  { name: "First Steps", description: "Complete your first game", icon: Star, earned: "12.5K+", color: "text-yellow-500" },
  { name: "Streak Master", description: "7 day playing streak", icon: Award, earned: "8.2K+", color: "text-blue-500" },
  { name: "Eco Warrior", description: "Save 1000 virtual trees", icon: Trophy, earned: "3.8K+", color: "text-green-500" },
  { name: "Knowledge King", description: "Perfect score on 10 quizzes", icon: Crown, earned: "1.9K+", color: "text-purple-500" },
];

const LeaderboardSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Champions & Achievements
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See who's leading the way in environmental education and unlock amazing achievements on your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <Card className="shadow-medium animate-fade-in">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Trophy className="h-8 w-8 text-yellow-500 mr-2" />
                <CardTitle className="text-2xl">Global Leaderboard</CardTitle>
              </div>
              <CardDescription>Top environmental champions this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPlayers.map((player, index) => (
                <div
                  key={player.rank}
                  className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-muted/50 ${
                    player.rank <= 3 ? 'bg-gradient-card border border-border/50' : ''
                  }`}
                >
                  {/* Rank */}
                  <div className="flex items-center justify-center w-8 h-8">
                    {player.rank === 1 && <Crown className="h-6 w-6 text-yellow-500" />}
                    {player.rank === 2 && <Medal className="h-6 w-6 text-gray-400" />}
                    {player.rank === 3 && <Medal className="h-6 w-6 text-amber-600" />}
                    {player.rank > 3 && (
                      <span className="text-lg font-bold text-muted-foreground">
                        {player.rank}
                      </span>
                    )}
                  </div>

                  {/* Avatar */}
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                      {player.avatar}
                    </AvatarFallback>
                  </Avatar>

                  {/* Player Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{player.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {player.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{player.badge}</p>
                  </div>

                  {/* Points & Trend */}
                  <div className="text-right">
                    <div className="font-bold text-lg text-primary">
                      {player.points.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <TrendingUp className="h-3 w-3" />
                      <span>{player.trend}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="shadow-medium animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-primary mr-2" />
                <CardTitle className="text-2xl">Achievement System</CardTitle>
              </div>
              <CardDescription>Unlock badges as you learn and grow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`p-2 rounded-full bg-muted ${achievement.color}`}>
                    <achievement.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{achievement.name}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary">
                      {achievement.earned}
                    </div>
                    <div className="text-xs text-muted-foreground">earned</div>
                  </div>
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-gradient-card rounded-lg border border-border/50">
                <div className="text-center">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2 animate-bounce-gentle" />
                  <h4 className="font-semibold mb-1">Start Your Journey!</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete your first game to unlock your first achievement
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;