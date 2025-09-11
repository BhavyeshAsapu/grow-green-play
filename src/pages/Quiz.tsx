import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, BookOpen, Globe, Clock, Trophy, Sparkles, ArrowLeft, Lightbulb } from "lucide-react";
import QuizCard from "@/components/QuizCard";
import QuizInterface from "@/components/QuizInterface";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const categories = [
  {
    id: "general-knowledge",
    name: "General Knowledge",
    description: "Test your knowledge across various topics",
    icon: Brain,
    totalQuestions: 10
  },
  {
    id: "science-nature",
    name: "Science & Nature",
    description: "Explore the wonders of science and nature",
    icon: Globe,
    totalQuestions: 10
  },
  {
    id: "history",
    name: "History",
    description: "Journey through time and historical events",
    icon: BookOpen,
    totalQuestions: 10
  },
  {
    id: "geography", 
    name: "Geography",
    description: "Discover places and cultures around the world",
    icon: Globe,
    totalQuestions: 10
  }
];

const Quiz = () => {
  const [currentQuiz, setCurrentQuiz] = useState<{category: string, difficulty: string} | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<{score: number, total: number, points: number} | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const { user, profile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user && profile?.age) {
      fetchRecommendations();
    }
  }, [user, profile]);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const fetchRecommendations = async () => {
    if (!profile?.age) return;
    
    setLoadingRecommendations(true);
    try {
      const { data, error } = await supabase.functions.invoke('quiz-recommendations', {
        body: { age: profile.age }
      });

      if (error) throw error;
      
      if (data?.recommendations) {
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const handleStartQuiz = (category: string, difficulty: string) => {
    setCurrentQuiz({ category, difficulty });
    setShowResult(false);
  };

  const handleQuizComplete = (score: number, totalQuestions: number, pointsEarned: number) => {
    setQuizResult({ score, total: totalQuestions, points: pointsEarned });
    setShowResult(true);
    setCurrentQuiz(null);

    toast({
      title: "Quiz Completed!",
      description: `You scored ${score}/${totalQuestions} and earned ${pointsEarned} points!`,
    });
  };

  const handleBackToQuizzes = () => {
    setCurrentQuiz(null);
    setShowResult(false);
  };

  if (currentQuiz) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={handleBackToQuizzes}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Quizzes
            </Button>
          </div>
          
          <QuizInterface
            category={currentQuiz.category}
            difficulty={currentQuiz.difficulty}
            onComplete={handleQuizComplete}
            onExit={handleBackToQuizzes}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Quiz Center
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Challenge yourself with engaging quizzes and earn points while learning!
          </p>
          
          {profile && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <Badge className="bg-gradient-primary text-white px-4 py-2">
                <Trophy className="h-4 w-4 mr-2" />
                {profile.points} Points
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                Welcome, {profile.username || 'Player'}!
              </Badge>
            </div>
          )}
        </div>

        {/* Quiz Result */}
        {showResult && quizResult && (
          <Card className="max-w-2xl mx-auto mb-8 bg-gradient-card border-2 border-primary/30">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                Quiz Completed!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-6xl font-bold text-primary mb-4">
                {quizResult.score}/{quizResult.total}
              </div>
              <p className="text-lg text-muted-foreground">
                You answered {quizResult.score} out of {quizResult.total} questions correctly
              </p>
              <div className="flex items-center justify-center gap-2 text-lg font-semibold">
                <Trophy className="h-5 w-5 text-yellow-500" />
                +{quizResult.points} Points Earned!
              </div>
              <Button onClick={() => setShowResult(false)} className="mt-4">
                Take Another Quiz
              </Button>
            </CardContent>
          </Card>
        )}

        {/* AI Recommendations */}
        {recommendations.length > 0 && (
          <Card className="max-w-4xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                AI Recommendations for You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {recommendations.map((rec, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg text-sm">
                    {rec}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quiz Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <QuizCard
                category={category}
                onStartQuiz={handleStartQuiz}
              />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        {profile && (
          <Card className="max-w-2xl mx-auto mt-8">
            <CardHeader>
              <CardTitle className="text-center">Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{profile.points}</div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {profile.age || 'Not set'}
                  </div>
                  <p className="text-sm text-muted-foreground">Age</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Quiz;