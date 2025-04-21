
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// This is our mock tutorial data that matches what's in Tutorials.tsx
const tutorialsData = [
  {
    id: 1,
    title: "ECG Basics: Understanding the Components",
    description: "Learn about the fundamental components of an ECG reading and what each wave represents.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    duration: "15 min",
    difficulty: "Beginner" as const,
    category: "basics",
    content: `
      <h2>Understanding ECG Components</h2>
      <p>An electrocardiogram (ECG or EKG) is a test that records the electrical activity of your heart. It's used to detect heart problems and monitor heart health.</p>
      
      <h3>Basic Components of an ECG</h3>
      <p>An ECG has several components that represent different electrical events in your heart:</p>
      <ul>
        <li><strong>P wave</strong>: Represents atrial depolarization (contraction of the atria)</li>
        <li><strong>PR interval</strong>: Time from the beginning of the P wave to the beginning of the QRS complex</li>
        <li><strong>QRS complex</strong>: Represents ventricular depolarization (contraction of the ventricles)</li>
        <li><strong>ST segment</strong>: Time between the end of the QRS complex and the beginning of the T wave</li>
        <li><strong>T wave</strong>: Represents ventricular repolarization (relaxation of the ventricles)</li>
        <li><strong>QT interval</strong>: Time from the beginning of the QRS complex to the end of the T wave</li>
      </ul>
      
      <h3>Reading an ECG</h3>
      <p>When reading an ECG, healthcare professionals look at several key aspects:</p>
      <ol>
        <li>Heart rate</li>
        <li>Rhythm regularity</li>
        <li>Wave intervals and segments</li>
        <li>Axis deviation</li>
        <li>Abnormal waves or patterns</li>
      </ol>
      
      <p>This tutorial covers the basics of ECG interpretation, helping you understand what each component represents and how they relate to heart function.</p>
    `
  },
  {
    id: 2,
    title: "Identifying Normal Sinus Rhythm",
    description: "Learn how to identify a normal sinus rhythm and understand its characteristics.",
    image: "https://images.unsplash.com/photo-1576671414121-aa0c81c869e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    duration: "20 min",
    difficulty: "Beginner" as const,
    category: "rhythms",
    content: `
      <h2>Normal Sinus Rhythm</h2>
      <p>Normal sinus rhythm is the standard rhythm of a healthy heart, originating from the sinus node.</p>
      
      <h3>Characteristics of Normal Sinus Rhythm</h3>
      <ul>
        <li>Rate: 60-100 beats per minute</li>
        <li>Rhythm: Regular</li>
        <li>P waves: Present, upright, and preceding each QRS complex</li>
        <li>PR interval: 0.12-0.20 seconds (3-5 small squares)</li>
        <li>QRS complex: Less than 0.12 seconds (3 small squares)</li>
      </ul>
      
      <p>This tutorial will help you recognize normal sinus rhythm and distinguish it from abnormal heart rhythms.</p>
    `
  },
  // Adding content for the remaining tutorials
  {
    id: 3,
    title: "Common Arrhythmias and Their Patterns",
    description: "Explore various arrhythmia patterns and learn how to distinguish between them.",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    duration: "30 min",
    difficulty: "Intermediate" as const,
    category: "rhythms",
    content: `
      <h2>Common Arrhythmias</h2>
      <p>Arrhythmias are abnormal heart rhythms that can range from harmless to life-threatening.</p>
      
      <h3>Types of Arrhythmias</h3>
      <ol>
        <li><strong>Atrial Fibrillation</strong>: Irregular rhythm with no distinct P waves, irregular R-R intervals</li>
        <li><strong>Ventricular Tachycardia</strong>: Rapid rhythm originating in the ventricles, wide QRS complexes</li>
        <li><strong>Heart Block</strong>: Delayed or absent conduction between atria and ventricles</li>
        <li><strong>Sinus Bradycardia</strong>: Normal rhythm but rate below 60 bpm</li>
        <li><strong>Sinus Tachycardia</strong>: Normal rhythm but rate above 100 bpm</li>
      </ol>
      
      <p>This tutorial explores common arrhythmias and their characteristic ECG patterns.</p>
    `
  },
  {
    id: 4,
    title: "Myocardial Infarction ECG Changes",
    description: "Understand the typical ECG changes seen during different stages of a myocardial infarction.",
    image: "https://images.unsplash.com/photo-1618939304347-e91db72fae4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    duration: "25 min",
    difficulty: "Advanced" as const,
    category: "pathology",
    content: `
      <h2>Myocardial Infarction (MI) ECG Changes</h2>
      <p>Myocardial infarction (heart attack) causes characteristic changes on an ECG that evolve over time.</p>
      
      <h3>Evolution of ECG Changes in MI</h3>
      <ol>
        <li><strong>Hyperacute Phase</strong>: Tall, peaked T waves</li>
        <li><strong>Acute Phase</strong>: ST segment elevation, Q wave development</li>
        <li><strong>Subacute Phase</strong>: ST segment returns to baseline, T wave inversion</li>
        <li><strong>Chronic Phase</strong>: Persistent Q waves, resolution of T wave changes</li>
      </ol>
      
      <h3>Localization of MI</h3>
      <p>Different leads show changes depending on the location of the infarction:</p>
      <ul>
        <li><strong>Anterior:</strong> V1-V6</li>
        <li><strong>Inferior:</strong> II, III, aVF</li>
        <li><strong>Lateral:</strong> I, aVL, V5-V6</li>
        <li><strong>Posterior:</strong> Reciprocal changes in V1-V3</li>
      </ul>
      
      <p>This tutorial covers how to recognize ECG changes associated with myocardial infarction.</p>
    `
  },
  {
    id: 5,
    title: "ECG Lead Placement and Significance",
    description: "Learn about proper lead placement and what each lead can tell you about cardiac activity.",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    duration: "15 min",
    difficulty: "Beginner" as const,
    category: "basics",
    content: `
      <h2>ECG Lead Placement and Significance</h2>
      <p>Understanding the proper placement and significance of ECG leads is crucial for accurate interpretation.</p>
      
      <h3>Standard 12-Lead ECG</h3>
      <p>A standard ECG uses 12 leads that provide different views of the heart's electrical activity:</p>
      <ol>
        <li><strong>Limb Leads:</strong> I, II, III, aVR, aVL, aVF</li>
        <li><strong>Chest Leads:</strong> V1, V2, V3, V4, V5, V6</li>
      </ol>
      
      <h3>Lead Placement</h3>
      <ul>
        <li>Limb leads are placed on the extremities</li>
        <li>V1: 4th intercostal space, right sternal border</li>
        <li>V2: 4th intercostal space, left sternal border</li>
        <li>V4: 5th intercostal space, midclavicular line</li>
        <li>V3: Halfway between V2 and V4</li>
        <li>V5: 5th intercostal space, anterior axillary line</li>
        <li>V6: 5th intercostal space, midaxillary line</li>
      </ul>
      
      <p>This tutorial covers the importance of proper lead placement and what each lead can tell you about heart function.</p>
    `
  },
  {
    id: 6,
    title: "Advanced Interpretation Techniques",
    description: "Master complex ECG interpretation skills that go beyond basic pattern recognition.",
    image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", 
    duration: "40 min",
    difficulty: "Advanced" as const,
    category: "interpretation",
    content: `
      <h2>Advanced ECG Interpretation</h2>
      <p>This tutorial covers advanced techniques for ECG interpretation beyond the basics.</p>
      
      <h3>Topics Covered</h3>
      <ul>
        <li>Electrical axis determination</li>
        <li>Chamber enlargement assessment</li>
        <li>Bundle branch blocks and fascicular blocks</li>
        <li>Electrolyte abnormalities</li>
        <li>Drug effects on ECG</li>
        <li>Pericarditis vs. early repolarization</li>
        <li>Brugada syndrome patterns</li>
      </ul>
      
      <h3>Systematic Approach</h3>
      <p>Advanced interpretation requires a systematic approach:</p>
      <ol>
        <li>Rate and rhythm assessment</li>
        <li>PR, QRS, and QT interval measurement</li>
        <li>Axis determination</li>
        <li>P wave morphology analysis</li>
        <li>QRS complex analysis</li>
        <li>ST segment and T wave evaluation</li>
        <li>Integration and clinical correlation</li>
      </ol>
      
      <p>This tutorial will help you develop a comprehensive approach to ECG interpretation for complex cases.</p>
    `
  }
];

const TutorialDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState<typeof tutorialsData[0] | null>(null);
  
  useEffect(() => {
    // Find the tutorial with the matching ID
    const foundTutorial = tutorialsData.find(t => t.id === Number(id));
    
    if (foundTutorial) {
      setTutorial(foundTutorial);
      // You could log tutorial views here if connected to Supabase
    } else {
      // Handle tutorial not found
      console.error(`Tutorial with ID ${id} not found`);
    }
  }, [id]);
  
  if (!tutorial) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Tutorial not found</h1>
          <p className="mt-4 mb-6">The tutorial you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/tutorials")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tutorials
          </Button>
        </div>
      </div>
    );
  }
  
  const difficultyColor = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-blue-100 text-blue-800",
    Advanced: "bg-red-100 text-red-800",
  }[tutorial.difficulty];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="outline"
        onClick={() => navigate("/tutorials")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tutorials
      </Button>
      
      <div className="relative h-60 md:h-80 mb-6 rounded-lg overflow-hidden">
        <img
          src={tutorial.image}
          alt={tutorial.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold mb-3 md:mb-0">{tutorial.title}</h1>
        <div className="flex items-center space-x-4">
          <Badge className={difficultyColor}>{tutorial.difficulty}</Badge>
          <span className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            {tutorial.duration}
          </span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <p className="text-gray-700 mb-6">{tutorial.description}</p>
      </div>
      
      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: tutorial.content }} />
      </div>
    </div>
  );
};

export default TutorialDetail;
