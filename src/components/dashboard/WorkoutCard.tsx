
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ChevronRight, Flame, Info, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StreakCalendar from "./StreakCalendar";
import { toast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface WorkoutCardProps {
  name: string;
  type: string;
  streak: number;
  lastActive: string;
  streakHistory: {
    date: string;
    completed: boolean;
    isToday?: boolean;
  }[];
  description?: string;
  duration?: string; 
  calories?: number;
  difficulty?: string;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  name,
  type,
  streak,
  lastActive,
  streakHistory: initialStreakHistory,
  description,
  duration = "30 min",
  calories = 0,
  difficulty = "Medium"
}) => {
  const [streakHistory, setStreakHistory] = useState(initialStreakHistory);
  const [currentStreak, setCurrentStreak] = useState(streak);
  const [expanded, setExpanded] = useState(false);

  const toggleDay = (index: number) => {
    const newHistory = [...streakHistory];
    newHistory[index].completed = !newHistory[index].completed;

    // Update streak count
    let newStreak = currentStreak;
    if (newHistory[index].completed) {
      if (index === 0) { // Today
        newStreak += 1;
        toast({
          title: "Workout logged!",
          description: `You've logged ${name} for today. Keep it up!`,
        });
      }
    } else {
      if (index === 0) { // Today
        newStreak = newStreak > 0 ? newStreak - 1 : 0;
      }
    }

    setStreakHistory(newHistory);
    setCurrentStreak(newStreak);
  };

  const handleLogWorkout = () => {
    // If today is not marked as completed, mark it
    if (streakHistory[0] && !streakHistory[0].completed) {
      toggleDay(0);
    } else {
      toast({
        title: "Already logged",
        description: "You've already logged this workout for today!",
      });
    }
  };

  const getBestStreak = () => {
    let bestStreak = 0;
    let currentBest = 0;
    
    for (const day of streakHistory) {
      if (day.completed) {
        currentBest++;
        bestStreak = Math.max(bestStreak, currentBest);
      } else {
        currentBest = 0;
      }
    }
    
    return bestStreak;
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{type}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Badge variant="outline" className="bg-fitgreen-light text-fitgreen-dark border-0 flex items-center">
              <Flame className="h-3 w-3 mr-1" />
              <span>{currentStreak} day streak</span>
            </Badge>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full p-0"
                    onClick={() => setExpanded(!expanded)}>
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm space-y-1">
                    <p>Duration: {duration}</p>
                    <p>Calories: ~{calories}</p>
                    <p>Difficulty: {difficulty}</p>
                    <p>Best Streak: {getBestStreak()} days</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 space-y-3">
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>Last active: {streakHistory[0]?.completed ? "Today" : lastActive}</span>
          </div>
          
          <div className="overflow-x-auto pb-2">
            <StreakCalendar 
              days={streakHistory} 
              onToggleDay={toggleDay}
              interactive={true}
              maxDaysToShow={28}
            />
          </div>
        </div>

        {expanded && (
          <div className="pt-2 border-t">
            <div className="text-sm text-muted-foreground">
              <div className="flex justify-between mb-1">
                <span>This Month:</span>
                <span>{streakHistory.filter(d => d.completed).length} workouts</span>
              </div>
              <div className="flex justify-between">
                <span>Best Streak:</span>
                <span>{getBestStreak()} days</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="outline" size="sm" onClick={handleLogWorkout}>
          <Activity className="h-4 w-4 mr-1" />
          Log workout
        </Button>
        <Link to="/workouts">
          <Button variant="ghost" size="sm">
            <span className="sr-only">View details</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;
