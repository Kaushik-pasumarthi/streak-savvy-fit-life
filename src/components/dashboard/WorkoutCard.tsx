
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StreakCalendar from "./StreakCalendar";

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
  streakHistory,
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{type}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-fitgreen-light text-fitgreen-dark border-0">
            {streak} day streak
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <StreakCalendar days={streakHistory.slice(0, 7)} />
        <p className="text-xs text-muted-foreground mt-2">
          Last active: {lastActive}
        </p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="outline" size="sm">
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
