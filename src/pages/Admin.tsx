
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Edit, Trash2, Search, Users, FileText, HelpCircle } from "lucide-react";

const Admin = () => {
  // Mock data for tutorial and quiz management
  const [tutorials, setTutorials] = useState([
    { id: 1, title: "ECG Basics: Understanding the Components", category: "basics", visible: true },
    { id: 2, title: "Identifying Normal Sinus Rhythm", category: "rhythms", visible: true },
    { id: 3, title: "Common Arrhythmias and Their Patterns", category: "rhythms", visible: true },
    { id: 4, title: "Myocardial Infarction ECG Changes", category: "pathology", visible: true },
  ]);

  const [quizQuestions, setQuizQuestions] = useState([
    { id: 1, question: "Which wave represents atrial depolarization?", difficulty: "beginner" },
    { id: 2, question: "What is the normal PR interval range?", difficulty: "beginner" },
    { id: 3, question: "Which of the following is a characteristic of a normal sinus rhythm?", difficulty: "intermediate" },
    { id: 4, question: "What condition is characterized by ST segment elevation?", difficulty: "advanced" },
  ]);

  // Search term state
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div>
          <span className="text-sm text-gray-500 mr-2">Logged in as:</span>
          <span className="font-medium">Administrator</span>
        </div>
      </div>
      
      {/* Admin Dashboard Tabs */}
      <Tabs defaultValue="tutorials">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="tutorials" className="flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Tutorial Management
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="flex items-center">
            <HelpCircle className="w-4 h-4 mr-2" />
            Quiz Management
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            User Management
          </TabsTrigger>
        </TabsList>
        
        {/* Tutorials Tab */}
        <TabsContent value="tutorials">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Tutorial Content</CardTitle>
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Tutorial
                </Button>
              </CardHeader>
              <CardContent>
                <div className="mb-6 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search tutorials..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-sm text-gray-500 border-b">
                        <th className="text-left py-3 px-4">Title</th>
                        <th className="text-left py-3 px-4">Category</th>
                        <th className="text-center py-3 px-4">Visible</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tutorials
                        .filter(tutorial => 
                          tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tutorial.category.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map(tutorial => (
                          <tr key={tutorial.id} className="border-b">
                            <td className="py-4 px-4 font-medium">{tutorial.title}</td>
                            <td className="py-4 px-4 capitalize">{tutorial.category}</td>
                            <td className="py-4 px-4">
                              <div className="flex justify-center">
                                <Switch checked={tutorial.visible} />
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tutorial Editor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Enter tutorial title..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basics">Basics</SelectItem>
                          <SelectItem value="rhythms">Rhythms</SelectItem>
                          <SelectItem value="pathology">Pathology</SelectItem>
                          <SelectItem value="interpretation">Interpretation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select>
                        <SelectTrigger id="difficulty">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Enter tutorial description..." />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" placeholder="Enter tutorial content..." className="min-h-[200px]" />
                  </div>
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input id="image" placeholder="Enter image URL..." />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="visible" />
                    <Label htmlFor="visible">Make tutorial visible to students</Label>
                  </div>
                  <Button className="w-full md:w-auto">Save Tutorial</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Quizzes Tab */}
        <TabsContent value="quizzes">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Quiz Questions</CardTitle>
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </CardHeader>
              <CardContent>
                <div className="mb-6 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search questions..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-sm text-gray-500 border-b">
                        <th className="text-left py-3 px-4">Question</th>
                        <th className="text-left py-3 px-4">Difficulty</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quizQuestions
                        .filter(q => 
                          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          q.difficulty.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map(question => (
                          <tr key={question.id} className="border-b">
                            <td className="py-4 px-4 font-medium">{question.question}</td>
                            <td className="py-4 px-4 capitalize">{question.difficulty}</td>
                            <td className="py-4 px-4">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Question Editor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="question">Question</Label>
                    <Input id="question" placeholder="Enter question text..." />
                  </div>
                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select>
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Options</Label>
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map(index => (
                        <div key={index} className="flex items-center gap-2">
                          <Switch id={`correct-${index}`} />
                          <Input placeholder={`Option ${index}...`} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="explanation">Explanation</Label>
                    <Textarea 
                      id="explanation" 
                      placeholder="Enter explanation for correct answer..." 
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">Image URL (optional)</Label>
                    <Input id="image" placeholder="Enter image URL..." />
                  </div>
                  <Button className="w-full md:w-auto">Save Question</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10"
                />
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-sm text-gray-500 border-b">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Role</th>
                      <th className="text-center py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <UserRow 
                      name="Alex Johnson"
                      email="alex@example.com"
                      role="Student"
                      active={true}
                    />
                    <UserRow 
                      name="Morgan Smith"
                      email="morgan@example.com"
                      role="Student"
                      active={true}
                    />
                    <UserRow 
                      name="Jamie Williams"
                      email="jamie@example.com"
                      role="Student"
                      active={true}
                    />
                    <UserRow 
                      name="Casey Brown"
                      email="casey@example.com"
                      role="Admin"
                      active={true}
                    />
                    <UserRow 
                      name="Taylor Davis"
                      email="taylor@example.com"
                      role="Student"
                      active={false}
                    />
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const UserRow = ({ 
  name, 
  email, 
  role, 
  active 
}: { 
  name: string;
  email: string;
  role: "Student" | "Admin";
  active: boolean;
}) => {
  return (
    <tr className="border-b">
      <td className="py-4 px-4 font-medium">{name}</td>
      <td className="py-4 px-4">{email}</td>
      <td className="py-4 px-4">
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          role === "Admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
        }`}>
          {role}
        </span>
      </td>
      <td className="py-4 px-4">
        <div className="flex justify-center">
          <span className={`flex items-center gap-1 text-xs font-medium ${
            active ? "text-green-600" : "text-gray-500"
          }`}>
            <span className={`h-2 w-2 rounded-full ${active ? "bg-green-600" : "bg-gray-400"}`}></span>
            {active ? "Active" : "Inactive"}
          </span>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default Admin;
