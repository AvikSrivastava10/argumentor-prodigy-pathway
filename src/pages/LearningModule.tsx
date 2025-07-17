
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  CheckCircle, 
  Clock, 
  Target,
  Brain,
  MessageSquare,
  BookOpen,
  Video
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const LearningModule = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  const moduleData = {
    title: "Debate Fundamentals",
    description: "Master the basics of argumentation and debate structure",
    totalSections: 5,
    estimatedTime: "45 minutes",
    difficulty: "Beginner",
    sections: [
      {
        title: "What is Debate?",
        type: "video",
        content: "Introduction to debate as an art form and skill",
        duration: "8 min"
      },
      {
        title: "Argument Structure",
        type: "interactive",
        content: "Learn the basic components of a strong argument",
        duration: "12 min"
      },
      {
        title: "Types of Evidence",
        type: "reading",
        content: "Understanding different forms of evidence and their strength",
        duration: "10 min"
      },
      {
        title: "Practice Exercise",
        type: "quiz",
        content: "Test your understanding with interactive exercises",
        duration: "10 min"
      },
      {
        title: "AI Feedback Session",
        type: "ai-chat",
        content: "Get personalized feedback from our AI debate coach",
        duration: "5 min"
      }
    ]
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'interactive': return Target;
      case 'reading': return BookOpen;
      case 'quiz': return Brain;
      case 'ai-chat': return MessageSquare;
      default: return Play;
    }
  };

  const handleSectionComplete = (sectionIndex: number) => {
    if (!completedSections.includes(sectionIndex)) {
      setCompletedSections([...completedSections, sectionIndex]);
    }
    if (sectionIndex < moduleData.sections.length - 1) {
      setCurrentSection(sectionIndex + 1);
    }
  };

  const progress = (completedSections.length / moduleData.totalSections) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Section Navigation */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">{moduleData.title}</CardTitle>
                <CardDescription>{moduleData.description}</CardDescription>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">{moduleData.difficulty}</Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {moduleData.estimatedTime}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  {moduleData.sections.map((section, index) => {
                    const SectionIcon = getSectionIcon(section.type);
                    const isCompleted = completedSections.includes(index);
                    const isCurrent = index === currentSection;
                    
                    return (
                      <div
                        key={index}
                        onClick={() => setCurrentSection(index)}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          isCurrent 
                            ? 'bg-indigo-100 border-2 border-indigo-300' 
                            : isCompleted
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCompleted 
                              ? 'bg-green-500 text-white' 
                              : isCurrent
                              ? 'bg-indigo-500 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <SectionIcon className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">
                              {section.title}
                            </h4>
                            <p className="text-xs text-gray-500">{section.duration}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {React.createElement(getSectionIcon(moduleData.sections[currentSection].type), {
                        className: "w-6 h-6 text-indigo-600"
                      })}
                      {moduleData.sections[currentSection].title}
                    </CardTitle>
                    <CardDescription>
                      Section {currentSection + 1} of {moduleData.totalSections} • {moduleData.sections[currentSection].duration}
                    </CardDescription>
                  </div>
                  <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    {moduleData.sections[currentSection].type}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    <TabsTrigger value="ai-help">AI Assistant</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content">
                    {/* Content based on section type */}
                    {moduleData.sections[currentSection].type === 'video' && (
                      <div className="space-y-6">
                        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                          <div className="text-center text-white">
                            <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                            <p className="text-lg">Video: {moduleData.sections[currentSection].title}</p>
                            <p className="text-sm opacity-80">Click to play</p>
                          </div>
                        </div>
                        <div className="prose max-w-none">
                          <h3>What You'll Learn</h3>
                          <ul>
                            <li>The definition and purpose of formal debate</li>
                            <li>Different debate formats and their applications</li>
                            <li>The role of debate in education and society</li>
                            <li>Key skills developed through debating</li>
                          </ul>
                        </div>
                      </div>
                    )}
                    
                    {moduleData.sections[currentSection].type === 'interactive' && (
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold mb-4">Interactive Exercise: Build an Argument</h3>
                          <p className="text-gray-700 mb-4">
                            Drag and drop the components to build a strong argument structure:
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium">Available Components:</h4>
                              <div className="space-y-2">
                                {['Claim', 'Evidence', 'Warrant', 'Impact'].map((component) => (
                                  <div key={component} className="p-3 bg-white border border-gray-200 rounded-lg cursor-move hover:shadow-md transition-shadow">
                                    {component}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-medium">Argument Structure:</h4>
                              <div className="min-h-40 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                                <p className="text-gray-500 text-center">Drop components here</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {moduleData.sections[currentSection].type === 'reading' && (
                      <div className="prose max-w-none">
                        <h3>Types of Evidence in Debate</h3>
                        <p>Understanding different types of evidence is crucial for building compelling arguments...</p>
                        
                        <h4>1. Statistical Evidence</h4>
                        <p>Numbers, percentages, and data that support your claims. This type of evidence is particularly powerful when discussing policy proposals or social issues.</p>
                        
                        <h4>2. Expert Testimony</h4>
                        <p>Quotes and insights from credible authorities in the relevant field. The credibility of the expert directly impacts the strength of your argument.</p>
                        
                        <h4>3. Historical Examples</h4>
                        <p>Past events that illustrate patterns or provide precedent for your argument. Historical evidence can be very persuasive when properly contextualized.</p>
                        
                        <h4>4. Logical Reasoning</h4>
                        <p>Step-by-step logical progression that leads to your conclusion. This includes deductive and inductive reasoning.</p>
                      </div>
                    )}
                    
                    {moduleData.sections[currentSection].type === 'quiz' && (
                      <div className="space-y-6">
                        <div className="bg-yellow-50 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold mb-4">Knowledge Check</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-medium mb-2">Question 1: What are the main components of a strong argument?</p>
                              <div className="space-y-2">
                                {['Claim, Evidence, Warrant, Impact', 'Introduction, Body, Conclusion', 'Topic, Opinion, Facts', 'Statement, Proof, Summary'].map((option, index) => (
                                  <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                    <input type="radio" name="q1" value={option} className="text-indigo-600" />
                                    <span>{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {moduleData.sections[currentSection].type === 'ai-chat' && (
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Brain className="w-5 h-5 text-purple-600" />
                            AI Debate Coach
                          </h3>
                          <p className="text-gray-700 mb-4">
                            I'm here to help you practice and improve your debate skills. Ask me anything about the concepts you've learned!
                          </p>
                          <div className="bg-white p-4 rounded-lg border min-h-32">
                            <p className="text-gray-500 italic">AI chat interface would be implemented here...</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="notes">
                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Your Notes</h3>
                      <textarea 
                        className="w-full h-40 p-3 border border-gray-300 rounded-lg resize-none"
                        placeholder="Take notes about this section..."
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ai-help">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                        Need Help?
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Our AI assistant can help clarify concepts, provide examples, or answer questions about this section.
                      </p>
                      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        Ask AI Assistant
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
                
                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                    disabled={currentSection === 0}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  <Button
                    onClick={() => handleSectionComplete(currentSection)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    {currentSection === moduleData.sections.length - 1 ? 'Complete Module' : 'Next Section'}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningModule;
