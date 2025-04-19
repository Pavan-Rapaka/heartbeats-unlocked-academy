
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface TutorialCardProps {
  title: string;
  description: string;
  image: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  link: string;
}

const TutorialCard = ({
  title,
  description,
  image,
  duration,
  difficulty,
  link,
}: TutorialCardProps) => {
  const difficultyColor = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-blue-100 text-blue-800",
    Advanced: "bg-red-100 text-red-800",
  }[difficulty];

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge className={difficultyColor}>{difficulty}</Badge>
        </div>
        <CardDescription className="flex items-center text-sm">
          <Clock className="h-4 w-4 mr-1" />
          {duration}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={link} className="flex items-center justify-center">
            Begin Tutorial
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TutorialCard;
