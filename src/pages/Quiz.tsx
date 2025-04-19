import { useState, useEffect } from "react";
import QuizQuestion, { QuizQuestionProps } from "@/components/QuizQuestion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, RotateCw } from "lucide-react";

// Sample quiz questions
const quizQuestionsData: Omit<QuizQuestionProps, "onAnswer">[] = [
  {
    question: "Which wave represents atrial depolarization?",
    options: ["P wave", "QRS complex", "T wave", "U wave"],
    correctAnswer: 0,
    explanation: "The P wave represents atrial depolarization, the process when the electrical impulse spreads through the atria.",
  },
  {
    question: "What is the normal PR interval range?",
    options: ["0.06-0.12 seconds", "0.12-0.20 seconds", "0.20-0.30 seconds", "0.30-0.40 seconds"],
    correctAnswer: 1,
    explanation: "The normal PR interval typically ranges from 0.12 to 0.20 seconds (120-200 ms), representing the time from atrial depolarization to ventricular depolarization.",
  },
  {
    question: "Which of the following is a characteristic of a normal sinus rhythm?",
    options: [
      "Irregular RR intervals",
      "Absent P waves",
      "PR interval > 0.20 seconds",
      "Heart rate between 60-100 bpm"
    ],
    correctAnswer: 3,
    explanation: "A normal sinus rhythm typically has a heart rate between 60-100 beats per minute, with regular RR intervals, upright P waves in lead II, and normal PR intervals.",
    imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    question: "What condition is characterized by ST segment elevation?",
    options: [
      "Myocardial infarction",
      "Atrial fibrillation",
      "Sinus bradycardia",
      "First-degree AV block"
    ],
    correctAnswer: 0,
    explanation: "ST segment elevation is a classic finding in acute myocardial infarction (heart attack), indicating damage to the heart muscle.",
    imageUrl: "https://images.unsplash.com/photo-1618939304347-e91db72fae4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    question: "Which of the following can cause a prolonged QT interval?",
    options: [
      "Hyperkalemia",
      "Hypocalcemia",
      "Hypernatremia",
      "Hypercalcemia"
    ],
    correctAnswer: 1,
    explanation: "Hypocalcemia (low calcium levels) can cause a prolonged QT interval on an ECG, which can increase the risk of dangerous arrhythmias.",
  },
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<Omit<QuizQuestionProps, "onAnswer">[]>([]);

  // Shuffle and select quiz questions
  useEffect(() => {
    if (quizStarted) {
      // Randomize questions
      const shuffled = [...quizQuestionsData]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5); // Select 5 random questions
      
      // For each question, shuffle the options while keeping track of the correct answer
      const questions = shuffled.map(question => {
        const options = [...question.options];
        const correctOption = options[question.correctAnswer];
        
        // Shuffle options
        const shuffledOptions = options.sort(() => Math.random() - 0.5);
        
        // Find the new index of the correct answer
        const newCorrectAnswer = shuffledOptions.findIndex(
          option => option === correctOption
        );
        
        return {
          ...question,
          options: shuffledOptions,
          correctAnswer: newCorrectAnswer
        };
      });
      
      setQuizQuestions(questions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setQuizFinished(false);
    }
  }, [quizStarted]);

  const handleAnswerSubmit = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(true);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  // Progress calculation
  const progress = quizQuestions.length > 0 
    ? ((currentQuestionIndex + 1) / quizQuestions.length) * 100
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">ECG Interpretation Quiz</h1>
          <p className="text-gray-600 mt-2">
            Test your knowledge of ECG patterns and interpretation
          </p>
        </div>

        {!quizStarted ? (
          <Card className="text-center p-8">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Test Your ECG Knowledge?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                This quiz contains 5 randomly selected questions covering various aspects of ECG interpretation.
                Try to answer all questions correctly to achieve the highest score!
              </p>
              <Button onClick={startQuiz} size="lg">
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        ) : quizFinished ? (
          <Card className="text-center p-8">
            <CardHeader>
              <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="my-6">
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-4 mx-auto">
                  <Trophy className="h-16 w-16 text-medical-blue" />
                </div>
                <h3 className="text-3xl font-bold mb-1">Your Score: {score}/{quizQuestions.length}</h3>
                <p className="text-gray-600">
                  {score === quizQuestions.length
                    ? "Perfect score! Excellent work!"
                    : score >= quizQuestions.length * 0.8
                    ? "Great job! You have strong ECG knowledge."
                    : score >= quizQuestions.length * 0.6
                    ? "Good effort! Keep practicing to improve."
                    : "Keep learning and try again to improve your score."}
                </p>
              </div>
              <Button onClick={restartQuiz} className="flex items-center">
                <RotateCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
                <span>Score: {score}/{quizQuestions.length}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            {quizQuestions.length > 0 && (
              <QuizQuestion
                {...quizQuestions[currentQuestionIndex]}
                onAnswer={handleAnswerSubmit}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
