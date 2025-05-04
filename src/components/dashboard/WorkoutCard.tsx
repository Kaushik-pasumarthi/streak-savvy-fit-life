
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ChevronRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StreakCalendar from "./StreakCalendar";
import { toast } from "@/hooks/use-toast";

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
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  name,
  type,
  streak,
  lastActive,
  streakHistory: initialStreakHistory,
}) => {
  const [streakHistory, setStreakHistory] = useState(initialStreakHistory);
  const [currentStreak, setCurrentStreak] = useState(streak);

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

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{type}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-fitgreen-light text-fitgreen-dark border-0 flex items-center">
            <Flame className="h-3 w-3 mr-1" />
            <span>{currentStreak} day streak</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <StreakCalendar 
          days={streakHistory.slice(0, 7)} 
          onToggleDay={toggleDay}
          interactive={true}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Last active: {streakHistory[0]?.completed ? "Today" : lastActive}
        </p>
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
