
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatbotCard from "@/components/dashboard/ChatbotCard";
import { BookOpen, FileText, ChevronRight } from "lucide-react";

const Health = () => {
  const [activeTab, setActiveTab] = useState("assistant");

  // Mock health articles
  const healthArticles = [
    {
      id: 1,
      title: "The Benefits of High-Intensity Interval Training",
      excerpt: "HIIT workouts can help you burn more calories in less time while improving cardiovascular health.",
      date: "May 15, 2025",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Nutrition Tips for Muscle Recovery",
      excerpt: "Learn about the best foods to eat after a workout to optimize muscle repair and growth.",
      date: "May 12, 2025",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "How Sleep Affects Your Fitness Goals",
      excerpt: "Discover the crucial role that quality sleep plays in achieving your fitness objectives.",
      date: "May 8, 2025",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Understanding Macronutrients for Beginners",
      excerpt: "A simple guide to proteins, carbohydrates, and fats—and why they matter for your diet.",
      date: "May 5, 2025",
      readTime: "8 min read", 
    },
    {
      id: 5,
      title: "The Science Behind Effective Warm-ups",
      excerpt: "Why warming up properly is essential for performance and injury prevention.",
      date: "May 1, 2025",
      readTime: "4 min read",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Health & Wellness</h1>
        <p className="text-muted-foreground">
          Track your health metrics and get personalized advice
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assistant">AI Health Assistant</TabsTrigger>
          <TabsTrigger value="resources">Health Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assistant" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <ChatbotCard />
          </div>
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" /> 
                  Health Articles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {healthArticles.map((article) => (
                      <div key={article.id} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{article.title}</h3>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">{article.excerpt}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <FileText className="h-3 w-3" />
                          <span>{article.readTime}</span>
                          <span className="text-muted-foreground/50">•</span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Health;
