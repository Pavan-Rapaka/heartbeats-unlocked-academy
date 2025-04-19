
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, BookCheck, BarChart3 } from "lucide-react";
import ECGVisualizer from "@/components/ECGVisualizer";

const Index = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* Hero Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-medical-blue-light opacity-50 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                Learn ECG Interpretation <span className="text-medical-red">Interactively</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-lg">
                Master electrocardiogram reading with our comprehensive learning platform. 
                Interactive tutorials, quizzes, and visual tools help you understand cardiac rhythms.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/tutorials">Begin Learning</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/quiz">Test Your Skills</Link>
                </Button>
              </div>
            </div>
            <div className="h-full">
              <ECGVisualizer />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How MyECGProject Helps You Learn</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BookOpen className="h-8 w-8 text-medical-blue" />}
              title="Interactive Tutorials"
              description="Learn ECG concepts through visual, step-by-step tutorials with clear explanations and examples."
            />
            <FeatureCard 
              icon={<BookCheck className="h-8 w-8 text-medical-blue" />}
              title="Practice Quizzes"
              description="Test your knowledge with randomized quiz questions that challenge your understanding."
            />
            <FeatureCard 
              icon={<BarChart3 className="h-8 w-8 text-medical-blue" />}
              title="Progress Tracking"
              description="Track your learning journey with detailed performance analytics and statistics."
            />
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-medical-blue to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Master ECG Interpretation?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Start your journey to become confident in reading and interpreting electrocardiograms.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/tutorials">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
    <div className="mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Index;
