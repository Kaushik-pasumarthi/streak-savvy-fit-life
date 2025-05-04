
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Workouts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddWorkoutOpen, setIsAddWorkoutOpen] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [newWorkoutType, setNewWorkoutType] = useState("Cardio");
  const [newWorkoutDuration, setNewWorkoutDuration] = useState("30");
  const [newWorkoutDifficulty, setNewWorkoutDifficulty] = useState("Medium");
  const [newWorkoutDescription, setNewWorkoutDescription] = useState("");
  
  const [workouts, setWorkouts] = useState([
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
        { date: "2025-04-27", completed: true },
        { date: "2025-04-26", completed: true },
        { date: "2025-04-25", completed: false },
        { date: "2025-04-24", completed: false },
        { date: "2025-04-23", completed: true },
        { date: "2025-04-22", completed: true },
        { date: "2025-04-21", completed: false },
        { date: "2025-04-20", completed: true },
        { date: "2025-04-19", completed: true },
        { date: "2025-04-18", completed: false },
        { date: "2025-04-17", completed: true },
        { date: "2025-04-16", completed: false },
        { date: "2025-04-15", completed: true },
        { date: "2025-04-14", completed: true },
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
        { date: "2025-04-27", completed: false },
        { date: "2025-04-26", completed: true },
        { date: "2025-04-25", completed: false },
        { date: "2025-04-24", completed: false },
        { date: "2025-04-23", completed: true },
        { date: "2025-04-22", completed: false },
        { date: "2025-04-21", completed: false },
        { date: "2025-04-20", completed: true },
        { date: "2025-04-19", completed: true },
        { date: "2025-04-18", completed: false },
        { date: "2025-04-17", completed: true },
        { date: "2025-04-16", completed: false },
        { date: "2025-04-15", completed: true },
        { date: "2025-04-14", completed: false },
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
        { date: "2025-04-27", completed: true },
        { date: "2025-04-26", completed: false },
        { date: "2025-04-25", completed: true },
        { date: "2025-04-24", completed: false },
        { date: "2025-04-23", completed: true },
        { date: "2025-04-22", completed: false },
        { date: "2025-04-21", completed: true },
        { date: "2025-04-20", completed: false },
        { date: "2025-04-19", completed: true },
        { date: "2025-04-18", completed: false },
        { date: "2025-04-17", completed: true },
        { date: "2025-04-16", completed: false },
        { date: "2025-04-15", completed: true },
        { date: "2025-04-14", completed: false },
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
        { date: "2025-04-27", completed: false },
        { date: "2025-04-26", completed: true },
        { date: "2025-04-25", completed: false },
        { date: "2025-04-24", completed: true },
        { date: "2025-04-23", completed: false },
        { date: "2025-04-22", completed: true },
        { date: "2025-04-21", completed: false },
        { date: "2025-04-20", completed: true },
        { date: "2025-04-19", completed: false },
        { date: "2025-04-18", completed: true },
        { date: "2025-04-17", completed: false },
        { date: "2025-04-16", completed: true },
        { date: "2025-04-15", completed: false },
        { date: "2025-04-14", completed: true },
      ],
    },
  ]);

  const filteredWorkouts = workouts.filter((workout) =>
    workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workout.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddWorkout = () => {
    if (!newWorkoutName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a workout name",
        variant: "destructive",
      });
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    
    // Generate streakHistory for the past 28 days
    const streakHistory = [];
    for (let i = 0; i < 28; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      streakHistory.push({
        date: dateString,
        completed: i === 0 ? true : Math.random() > 0.5, // Random past completion for demo
        isToday: i === 0,
      });
    }
    
    const newWorkout = {
      id: `${workouts.length + 1}`,
      name: newWorkoutName,
      type: newWorkoutType,
      duration: `${newWorkoutDuration} min`,
      calories: Math.floor(Number(newWorkoutDuration) * 6), // Rough estimate
      difficulty: newWorkoutDifficulty,
      description: newWorkoutDescription || `Custom ${newWorkoutType} workout`,
      streak: 1, // Start with a streak of 1 since today is marked complete
      lastActive: "Today",
      streakHistory,
    };

    setWorkouts([newWorkout, ...workouts]);
    setIsAddWorkoutOpen(false);
    
    // Reset form
    setNewWorkoutName("");
    setNewWorkoutType("Cardio");
    setNewWorkoutDuration("30");
    setNewWorkoutDifficulty("Medium");
    setNewWorkoutDescription("");
    
    toast({
      title: "Workout added",
      description: `${newWorkoutName} has been added to your workouts!`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Workouts</h1>
        <Dialog open={isAddWorkoutOpen} onOpenChange={setIsAddWorkoutOpen}>
          <DialogTrigger asChild>
            <Button className="bg-fitpurple hover:bg-fitpurple-dark">
              <Plus className="h-4 w-4 mr-2" /> Add Workout
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Workout</DialogTitle>
              <DialogDescription>
                Create a custom workout to track your progress and build streaks.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="workout-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="workout-name"
                  value={newWorkoutName}
                  onChange={(e) => setNewWorkoutName(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g., Pushups, Morning Jog"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="workout-type" className="text-right">
                  Type
                </Label>
                <Select value={newWorkoutType} onValueChange={setNewWorkoutType}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cardio">Cardio</SelectItem>
                    <SelectItem value="Strength">Strength</SelectItem>
                    <SelectItem value="Flexibility">Flexibility</SelectItem>
                    <SelectItem value="HIIT">HIIT</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="workout-duration" className="text-right">
                  Duration
                </Label>
                <div className="col-span-3 flex items-center">
                  <Input
                    id="workout-duration"
                    value={newWorkoutDuration}
                    onChange={(e) => setNewWorkoutDuration(e.target.value)}
                    type="number"
                    min="1"
                    className="mr-2"
                  />
                  <span>minutes</span>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="workout-difficulty" className="text-right">
                  Difficulty
                </Label>
                <Select value={newWorkoutDifficulty} onValueChange={setNewWorkoutDifficulty}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="workout-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="workout-description"
                  value={newWorkoutDescription}
                  onChange={(e) => setNewWorkoutDescription(e.target.value)}
                  className="col-span-3"
                  placeholder="Optional description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddWorkoutOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-fitpurple hover:bg-fitpurple-dark" onClick={handleAddWorkout}>
                Add Workout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                    <StreakCalendar 
                      days={workout.streakHistory} 
                      maxDaysToShow={14}
                    />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "5K Running Plan", type: "Cardio", level: "Beginner", duration: "8 weeks" },
              { name: "Full Body Strength", type: "Strength", level: "Intermediate", duration: "4 weeks" },
              { name: "Yoga for Flexibility", type: "Yoga", level: "All levels", duration: "Ongoing" },
              { name: "HIIT Fat Burner", type: "HIIT", level: "Advanced", duration: "6 weeks" },
              { name: "Daily Core Challenge", type: "Core", level: "All levels", duration: "30 days" },
              { name: "Bodyweight Basics", type: "Calisthenics", level: "Beginner", duration: "Ongoing" },
            ].map((program, idx) => (
              <Card key={idx} className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer">
                <div className={`h-32 bg-gradient-to-r ${
                  idx % 3 === 0 ? "from-blue-400 to-blue-600" :
                  idx % 3 === 1 ? "from-fitpurple to-fitpurple-dark" : "from-fitgreen to-fitgreen-dark"
                } flex items-center justify-center`}>
                  <Activity className="h-12 w-12 text-white" />
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-lg">{program.name}</h3>
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>{program.type}</span>
                    <span>{program.level}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm">{program.duration}</span>
                    <Button variant="outline" size="sm">
                      Add to My Workouts
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Workouts;
