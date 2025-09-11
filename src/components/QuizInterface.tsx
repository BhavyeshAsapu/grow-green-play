import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Brain, CheckCircle, XCircle, Trophy, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  category: string;
  difficulty: string;
}

interface QuizInterfaceProps {
  category: string;
  difficulty: string;
  onComplete: (score: number, totalQuestions: number, pointsEarned: number) => void;
  onExit: () => void;
}

const QuizInterface = ({ category, difficulty, onComplete, onExit }: QuizInterfaceProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const difficultyPoints: Record<string, number> = {
    easy: 10,
    medium: 20,
    hard: 30
  };

  useEffect(() => {
    fetchQuestions();
  }, [category, difficulty]);

  useEffect(() => {
    if (timeLeft > 0 && !showAnswer) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showAnswer) {
      handleAnswer("");
    }
  }, [timeLeft, showAnswer]);

  const fetchQuestions = async () => {
    try {
      const categoryMap: Record<string, string> = {
        'general-knowledge': '9',
        'science-nature': '17',
        'history': '23',
        'geography': '22'
      };

      const categoryId = categoryMap[category] || '9';
      
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`
      );
      
      if (!response.ok) throw new Error('Failed to fetch questions');
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        setQuestions(data.results.map((q: any) => ({
          ...q,
          question: decodeHtml(q.question),
          correct_answer: decodeHtml(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map(decodeHtml)
        })));
      } else {
        throw new Error('No questions available');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast({
        title: "Error",
        description: "Failed to load quiz questions. Please try again.",
        variant: "destructive",
      });
      onExit();
    }
  };

  const decodeHtml = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const handleAnswer = (answer: string) => {
    if (showAnswer) return;

    const question = questions[currentQuestion];
    const correct = answer === question.correct_answer;
    
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setShowAnswer(true);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setShowAnswer(false);
      setIsCorrect(null);
      setTimeLeft(30);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    const totalQuestions = questions.length;
    const percentage = (score / totalQuestions) * 100;
    const basePoints = difficultyPoints[difficulty] || 10;
    const pointsEarned = Math.round((score / totalQuestions) * basePoints * totalQuestions);

    // Save quiz attempt to database
    if (user) {
      try {
        await supabase.from('quiz_attempts').insert({
          user_id: user.id,
          category,
          difficulty,
          score,
          total_questions: totalQuestions,
          points_earned: pointsEarned
        });

        // Update user points
        const { data: profile } = await supabase
          .from('profiles')
          .select('points')
          .eq('user_id', user.id)
          .single();

        if (profile) {
          await supabase
            .from('profiles')
            .update({ points: profile.points + pointsEarned })
            .eq('user_id', user.id);
        }
      } catch (error) {
        console.error('Error saving quiz result:', error);
      }
    }

    onComplete(score, totalQuestions, pointsEarned);
  };

  if (loading) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="flex items-center justify-center p-12">
          <div className="text-center space-y-4">
            <Brain className="h-12 w-12 mx-auto text-primary animate-bounce" />
            <p className="text-lg">Loading your quiz questions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (questions.length === 0) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="text-center p-12">
          <p className="text-lg mb-4">No questions available for this category and difficulty.</p>
          <Button onClick={onExit}>Go Back</Button>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const allAnswers = [...question.incorrect_answers, question.correct_answer].sort();
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge className="bg-gradient-primary text-white">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className={`font-mono text-lg ${timeLeft <= 10 ? 'text-red-500' : ''}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
        
        <Progress value={progress} className="w-full mb-4" />
        
        <CardTitle className="text-xl leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {allAnswers.map((answer, index) => {
            const isSelected = selectedAnswer === answer;
            const isCorrectAnswer = answer === question.correct_answer;
            
            let buttonClass = "w-full p-4 text-left border-2 transition-all duration-200 ";
            
            if (!showAnswer) {
              buttonClass += isSelected 
                ? "border-primary bg-primary/10" 
                : "border-border hover:border-primary/50";
            } else {
              if (isCorrectAnswer) {
                buttonClass += "border-green-500 bg-green-50 text-green-700";
              } else if (isSelected && !isCorrectAnswer) {
                buttonClass += "border-red-500 bg-red-50 text-red-700";
              } else {
                buttonClass += "border-border bg-muted/50";
              }
            }

            return (
              <Button
                key={index}
                variant="ghost"
                className={buttonClass}
                onClick={() => handleAnswer(answer)}
                disabled={showAnswer}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{answer}</span>
                  {showAnswer && isCorrectAnswer && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                  {showAnswer && isSelected && !isCorrectAnswer && (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </Button>
            );
          })}
        </div>

        {showAnswer && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-700">Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="font-medium text-red-700">Incorrect</span>
                </>
              )}
            </div>
            {!isCorrect && (
              <p className="text-sm text-muted-foreground">
                The correct answer is: <span className="font-medium">{question.correct_answer}</span>
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">Score: {score}/{questions.length}</span>
          </div>
          
          {showAnswer && (
            <Button onClick={nextQuestion} className="bg-gradient-primary">
              {currentQuestion + 1 < questions.length ? (
                <>Next Question</>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Finish Quiz
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizInterface;