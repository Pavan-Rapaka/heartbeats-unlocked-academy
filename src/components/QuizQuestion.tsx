
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export interface QuizQuestionProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  imageUrl?: string;
  onAnswer: (isCorrect: boolean) => void;
}

const QuizQuestion = ({
  question,
  options,
  correctAnswer,
  explanation,
  imageUrl,
  onAnswer,
}: QuizQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = selectedOption === correctAnswer;

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setSubmitted(true);
      onAnswer(isCorrect);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setSubmitted(false);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        {imageUrl && (
          <div className="my-4">
            <img
              src={imageUrl}
              alt="ECG"
              className="w-full rounded-md border"
            />
          </div>
        )}
        <RadioGroup
          value={selectedOption?.toString()}
          onValueChange={(value) => setSelectedOption(parseInt(value))}
          className="space-y-3"
          disabled={submitted}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 rounded-lg border p-3 ${
                submitted && index === selectedOption
                  ? isCorrect
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                  : submitted && index === correctAnswer
                  ? "bg-green-50 border-green-200"
                  : ""
              }`}
            >
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label
                htmlFor={`option-${index}`}
                className="flex-1 cursor-pointer"
              >
                {option}
              </Label>
              {submitted && index === selectedOption && (
                isCorrect ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <X className="h-5 w-5 text-red-600" />
                )
              )}
              {submitted && index === correctAnswer && index !== selectedOption && (
                <Check className="h-5 w-5 text-green-600" />
              )}
            </div>
          ))}
        </RadioGroup>

        {submitted && (
          <div className={`mt-4 p-3 rounded-lg ${isCorrect ? "bg-green-50" : "bg-red-50"}`}>
            <h4 className="font-medium">{isCorrect ? "Correct!" : "Incorrect"}</h4>
            <p className="text-sm mt-1">{explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {!submitted ? (
          <Button 
            onClick={handleSubmit}
            disabled={selectedOption === null}
          >
            Submit
          </Button>
        ) : (
          <Button onClick={handleNext}>Next Question</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizQuestion;
