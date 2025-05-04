
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  Plus,
  Search,
  Filter,
  ChevronRight,
  Clock,
  Flame,
  BarChart2,
} from "lucide-react";
import StreakCalendar from "@/components/dashboard/StreakCalendar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Workouts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const workouts = [
    {
      id: "1",
      name: "Morning Run",
      type: "Cardio",
      duration: "30 min",
      calories: 320,
      difficulty: "Medium",
      description: "Steady-paced outdoor run to start the day",
      streak: 5,
      lastActive: "Today",
      streakHistory: [
        { date: "2025-05-04", completed: true, isToday: true },
        { date: "2025-05-03", completed: true },
        { date: "2025-05-02", completed: true },
        { date: "2025-05-01", completed: true },
        { date: "2025-04-30", completed: true },
        { date: "2025-04-29", completed: false },
        { date: "2025-04-28", completed: false },
      ],
    },
    {
      id: "2",
      name: "Core Strength",
      type: "Strength",
      duration: "20 min",
      calories: 180,
      difficulty: "Hard",
      description: "Focused on abs and lower back",
      streak: 3,
      lastActive: "Today",
      streakHistory: [
        { date: "2025-05-04", completed: true, isToday: true },
        { date: "2025-05-03", completed: true },
        { date: "2025-05-02", completed: true },
        { date: "2025-05-01", completed: false },
        { date: "2025-04-30", completed: false },
        { date: "2025-04-29", completed: true },
        { date: "2025-04-28", completed: true },
      ],
    },
    {
      id: "3",
      name: "Evening Yoga",
      type: "Flexibility",
      duration: "35 min",
      calories: 150,
      difficulty: "Easy",
      description: "Relaxing yoga routine before bed",
      streak: 0,
      lastActive: "3 days ago",
      streakHistory: [
        { date: "2025-05-04", completed: false, isToday: true },
        { date: "2025-05-03", completed: false },
        { date: "2025-05-02", completed: false },
        { date: "2025-05-01", completed: true },
        { date: "2025-04-30", completed: false },
        { date: "2025-04-29", completed: true },
        { date: "2025-04-28", completed: false },
      ],
    },
    {
      id: "4",
      name: "HIIT Circuit",
      type: "HIIT",
      duration: "25 min",
      calories: 350,
      difficulty: "Hard",
      description: "High intensity interval training",
      streak: 1,
      lastActive: "Yesterday",
      streakHistory: [
        { date: "2025-05-04", completed: false, isToday: true },
        { date: "2025-05-03", completed: true },
        { date: "2025-05-02", completed: false },
        { date: "2025-05-01", completed: false },
        { date: "2025-04-30", completed: true },
        { date: "2025-04-29", completed: false },
        { date: "2025-04-28", completed: true },
      ],
    },
  ];

  const filteredWorkouts = workouts.filter((workout) =>
    workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workout.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Workouts</h1>
        <Button className="bg-fitpurple hover:bg-fitpurple-dark">
          <Plus className="h-4 w-4 mr-2" /> Add Workout
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search workouts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs defaultValue="my-workouts">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-workouts">My Workouts</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-workouts" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredWorkouts.map((workout) => (
              <Card key={workout.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{workout.name}</CardTitle>
                      <CardDescription>{workout.type}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-1 rounded-md bg-fitpurple-light px-2 py-1 text-xs font-medium text-fitpurple-dark">
                      <Flame className="h-3 w-3" />
                      <span>{workout.streak} day streak</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-3">
                    <StreakCalendar days={workout.streakHistory} />
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{workout.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Flame className="h-4 w-4 mr-1 text-orange-500" />
                      <span>{workout.calories} cal</span>
                    </div>
                    <div className="flex items-center">
                      <BarChart2 className="h-4 w-4 mr-1 text-blue-500" />
                      <span>{workout.difficulty}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="p-0">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredWorkouts.length === 0 && (
            <div className="text-center py-12">
              <Activity className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <h3 className="text-lg font-medium">No workouts found</h3>
              <p className="text-muted-foreground">
                Try a different search term or create a new workout
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="discover" className="mt-4">
          <div className="text-center py-12">
            <Activity className="h-12 w-12 mx-auto mb-3 text-fitpurple" />
            <h3 className="text-lg font-medium">Discover new workouts</h3>
            <p className="text-muted-foreground mb-4">
              Browse our library of workouts or create a custom one
            </p>
            <Button className="bg-fitpurple hover:bg-fitpurple-dark">
              Browse Workouts
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Workouts;
