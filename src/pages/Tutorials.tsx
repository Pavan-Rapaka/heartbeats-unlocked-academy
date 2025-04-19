
import { useState } from "react";
import TutorialCard from "@/components/TutorialCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const tutorialsData = [
  {
    id: 1,
    title: "ECG Basics: Understanding the Components",
    description: "Learn about the fundamental components of an ECG reading and what each wave represents.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    duration: "15 min",
    difficulty: "Beginner" as const,
    category: "basics",
  },
  {
    id: 2,
    title: "Identifying Normal Sinus Rhythm",
    description: "Learn how to identify a normal sinus rhythm and understand its characteristics.",
    image: "https://images.unsplash.com/photo-1576671414121-aa0c81c869e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    duration: "20 min",
    difficulty: "Beginner" as const,
    category: "rhythms",
  },
  {
    id: 3,
    title: "Common Arrhythmias and Their Patterns",
    description: "Explore various arrhythmia patterns and learn how to distinguish between them.",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    duration: "30 min",
    difficulty: "Intermediate" as const,
    category: "rhythms",
  },
  {
    id: 4,
    title: "Myocardial Infarction ECG Changes",
    description: "Understand the typical ECG changes seen during different stages of a myocardial infarction.",
    image: "https://images.unsplash.com/photo-1618939304347-e91db72fae4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    duration: "25 min",
    difficulty: "Advanced" as const,
    category: "pathology",
  },
  {
    id: 5,
    title: "ECG Lead Placement and Significance",
    description: "Learn about proper lead placement and what each lead can tell you about cardiac activity.",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    duration: "15 min",
    difficulty: "Beginner" as const,
    category: "basics",
  },
  {
    id: 6,
    title: "Advanced Interpretation Techniques",
    description: "Master complex ECG interpretation skills that go beyond basic pattern recognition.",
    image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", 
    duration: "40 min",
    difficulty: "Advanced" as const,
    category: "interpretation",
  },
];

const Tutorials = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTutorials = tutorialsData.filter((tutorial) => {
    // Filter by search text
    const matchesSearch = tutorial.title.toLowerCase().includes(search.toLowerCase()) || 
                          tutorial.description.toLowerCase().includes(search.toLowerCase());
    
    // Filter by category
    const matchesCategory = activeCategory === "all" || tutorial.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">ECG Tutorials</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our comprehensive collection of ECG tutorials, from basic concepts to advanced interpretation techniques.
        </p>
      </div>
      
      {/* Search and filter */}
      <div className="mb-8">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search tutorials..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="rhythms">Rhythms</TabsTrigger>
            <TabsTrigger value="pathology">Pathology</TabsTrigger>
            <TabsTrigger value="interpretation">Interpretation</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Tutorial cards */}
      {filteredTutorials.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No tutorials match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              title={tutorial.title}
              description={tutorial.description}
              image={tutorial.image}
              duration={tutorial.duration}
              difficulty={tutorial.difficulty}
              link={`/tutorials/${tutorial.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tutorials;
