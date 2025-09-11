import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Clock, Trophy, Star, Play } from "lucide-react";

interface QuizCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    icon: any;
    totalQuestions: number;
  };
  onStartQuiz: (category: string, difficulty: string) => void;
}

const difficulties = [
  { value: "easy", label: "Easy", points: 10, color: "bg-green-100 text-green-700" },
  { value: "medium", label: "Medium", points: 20, color: "bg-yellow-100 text-yellow-700" },
  { value: "hard", label: "Hard", points: 30, color: "bg-red-100 text-red-700" }
];

const QuizCard = ({ category, onStartQuiz }: QuizCardProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");

  const handleStart = () => {
    if (selectedDifficulty) {
      onStartQuiz(category.id, selectedDifficulty);
    }
  };

  const selectedDifficultyData = difficulties.find(d => d.value === selectedDifficulty);

  return (
    <Card className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <category.icon className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-xl">{category.name}</CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            <span>{category.totalQuestions} Questions</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>10-15 min</span>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Difficulty Level:</label>
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((diff) => (
                <SelectItem key={diff.value} value={diff.value}>
                  <div className="flex items-center gap-2">
                    <Badge className={diff.color}>{diff.label}</Badge>
                    <span className="flex items-center gap-1">
                      <Trophy className="h-3 w-3" />
                      {diff.points} pts
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedDifficultyData && (
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span>Potential reward:</span>
              <div className="flex items-center gap-1 font-medium">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                {selectedDifficultyData.points} points
              </div>
            </div>
          </div>
        )}
        
        <Button 
          className="w-full bg-gradient-primary hover:opacity-90 shadow-medium"
          onClick={handleStart}
          disabled={!selectedDifficulty}
        >
          <Play className="mr-2 h-4 w-4" />
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizCard;