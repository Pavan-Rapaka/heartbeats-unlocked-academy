
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, BookCheck, Award, Clock, TrendingUp } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Your Learning Dashboard</h1>
      
      {/* Overall Progress Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Tutorials Completed"
          value="6/20"
          icon={<BookOpen className="h-5 w-5" />}
          progress={30}
          description="30% of all tutorials completed"
        />
        <StatCard
          title="Quiz Score"
          value="78%"
          icon={<BookCheck className="h-5 w-5" />}
          progress={78}
          description="Average across all quizzes"
        />
        <StatCard
          title="Study Time"
          value="4.5 hrs"
          icon={<Clock className="h-5 w-5" />}
          description="Total time spent learning"
        />
        <StatCard
          title="Skill Level"
          value="Intermediate"
          icon={<TrendingUp className="h-5 w-5" />}
          description="Based on your performance"
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="progress">
        <TabsList className="mb-6">
          <TabsTrigger value="progress">Learning Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>
        
        {/* Progress Tab */}
        <TabsContent value="progress">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Tutorial Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ProgressItem
                      title="ECG Basics"
                      progress={100}
                      status="Completed"
                    />
                    <ProgressItem 
                      title="Normal Sinus Rhythm"
                      progress={100}
                      status="Completed"
                    />
                    <ProgressItem 
                      title="Common Arrhythmias"
                      progress={75}
                      status="In Progress"
                    />
                    <ProgressItem 
                      title="Myocardial Infarction"
                      progress={30}
                      status="In Progress"
                    />
                    <ProgressItem 
                      title="Advanced Interpretation"
                      progress={0}
                      status="Not Started"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Recent Quiz Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <QuizResultItem 
                      title="ECG Basics Quiz"
                      score={90}
                      date="2 days ago"
                    />
                    <QuizResultItem 
                      title="Arrhythmia Challenge"
                      score={75}
                      date="1 week ago"
                    />
                    <QuizResultItem 
                      title="Lead Placement Quiz"
                      score={85}
                      date="2 weeks ago"
                    />
                    <QuizResultItem 
                      title="Basic Interpretation"
                      score={70}
                      date="3 weeks ago"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Achievements Tab */}
        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AchievementCard 
              title="Fast Learner"
              description="Complete 5 tutorials in under 2 hours"
              icon={<Award className="h-10 w-10" />}
              unlocked={true}
            />
            <AchievementCard 
              title="Perfect Score"
              description="Score 100% on any quiz"
              icon={<Award className="h-10 w-10" />}
              unlocked={false}
            />
            <AchievementCard 
              title="ECG Master"
              description="Complete all tutorials and score over 90% on all quizzes"
              icon={<Award className="h-10 w-10" />}
              unlocked={false}
            />
            <AchievementCard 
              title="Dedicated Student"
              description="Study for more than 10 hours total"
              icon={<Award className="h-10 w-10" />}
              unlocked={false}
            />
            <AchievementCard 
              title="Quiz Champion"
              description="Complete 20 quizzes with an average score of 80% or higher"
              icon={<Award className="h-10 w-10" />}
              unlocked={false}
            />
            <AchievementCard 
              title="First Steps"
              description="Complete your first tutorial"
              icon={<Award className="h-10 w-10" />}
              unlocked={true}
            />
          </div>
        </TabsContent>
        
        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Top Performers This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-sm text-gray-500 border-b">
                      <th className="text-left py-3 px-4">Rank</th>
                      <th className="text-left py-3 px-4">Student</th>
                      <th className="text-right py-3 px-4">Quiz Score</th>
                      <th className="text-right py-3 px-4">Tutorials</th>
                      <th className="text-right py-3 px-4">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <LeaderboardRow 
                      rank={1}
                      name="Alex Johnson"
                      score={95}
                      tutorials={20}
                      points={2450}
                      isCurrentUser={false}
                    />
                    <LeaderboardRow 
                      rank={2}
                      name="Morgan Smith"
                      score={92}
                      tutorials={18}
                      points={2320}
                      isCurrentUser={false}
                    />
                    <LeaderboardRow 
                      rank={3}
                      name="Jamie Williams"
                      score={88}
                      tutorials={20}
                      points={2280}
                      isCurrentUser={true}
                    />
                    <LeaderboardRow 
                      rank={4}
                      name="Casey Brown"
                      score={85}
                      tutorials={19}
                      points={2230}
                      isCurrentUser={false}
                    />
                    <LeaderboardRow 
                      rank={5}
                      name="Taylor Davis"
                      score={82}
                      tutorials={17}
                      points={2140}
                      isCurrentUser={false}
                    />
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const StatCard = ({ 
  title, 
  value, 
  icon, 
  progress, 
  description 
}: { 
  title: string;
  value: string;
  icon: React.ReactNode;
  progress?: number;
  description: string;
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">{title}</span>
          <span className="bg-gray-100 p-1 rounded-full">{icon}</span>
        </div>
        <div className="text-2xl font-bold mb-1">{value}</div>
        {progress !== undefined && (
          <Progress value={progress} className="h-1 mb-2" />
        )}
        <p className="text-xs text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
};

const ProgressItem = ({ 
  title, 
  progress, 
  status 
}: { 
  title: string;
  progress: number;
  status: "Completed" | "In Progress" | "Not Started";
}) => {
  const statusColors = {
    "Completed": "text-green-600",
    "In Progress": "text-blue-600",
    "Not Started": "text-gray-500"
  };

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{title}</span>
        <span className={`text-xs ${statusColors[status]}`}>{status}</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

const QuizResultItem = ({ 
  title, 
  score, 
  date 
}: { 
  title: string;
  score: number;
  date: string;
}) => {
  return (
    <div className="flex justify-between items-center p-3 border rounded-md">
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
      <div className={`text-lg font-bold ${score >= 80 ? "text-green-600" : score >= 70 ? "text-blue-600" : "text-gray-600"}`}>
        {score}%
      </div>
    </div>
  );
};

const AchievementCard = ({ 
  title, 
  description, 
  icon, 
  unlocked 
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
}) => {
  return (
    <Card className={unlocked ? "border-medical-blue" : "opacity-70"}>
      <CardContent className="pt-6 flex items-center">
        <div className={`mr-4 ${unlocked ? "text-medical-blue" : "text-gray-400"}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
          <div className="mt-2">
            <span className={`text-xs px-2 py-1 rounded ${unlocked ? "bg-blue-50 text-medical-blue" : "bg-gray-100 text-gray-500"}`}>
              {unlocked ? "Unlocked" : "Locked"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const LeaderboardRow = ({ 
  rank, 
  name, 
  score, 
  tutorials, 
  points, 
  isCurrentUser 
}: {
  rank: number;
  name: string;
  score: number;
  tutorials: number;
  points: number;
  isCurrentUser: boolean;
}) => {
  return (
    <tr className={`border-b ${isCurrentUser ? "bg-blue-50" : ""}`}>
      <td className="py-4 px-4">
        <div className="flex items-center">
          <span className={`
            w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
            ${rank === 1 ? "bg-yellow-100 text-yellow-700" : 
              rank === 2 ? "bg-gray-200 text-gray-700" : 
              rank === 3 ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-700"}
          `}>
            {rank}
          </span>
        </div>
      </td>
      <td className="py-4 px-4 font-medium">
        {name} {isCurrentUser && <span className="text-xs text-blue-600 ml-2">(You)</span>}
      </td>
      <td className="py-4 px-4 text-right">{score}%</td>
      <td className="py-4 px-4 text-right">{tutorials}</td>
      <td className="py-4 px-4 text-right font-bold">{points}</td>
    </tr>
  );
};

export default Dashboard;
