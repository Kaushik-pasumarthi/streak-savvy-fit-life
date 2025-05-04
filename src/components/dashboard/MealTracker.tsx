
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Utensils } from "lucide-react";

interface MealTrackerProps {
  consumed: number;
  target: number;
  meals: {
    name: string;
    calories: number;
    time: string;
  }[];
}

const MealTracker: React.FC<MealTrackerProps> = ({
  consumed,
  target,
  meals,
}) => {
  const progress = Math.min(Math.round((consumed / target) * 100), 100);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Utensils className="h-5 w-5 mr-2" />
          Calorie Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1 text-sm">
              <span>{consumed} Cal</span>
              <span className="text-muted-foreground">Target: {target} Cal</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {target - consumed > 0 
                ? `${target - consumed} calories remaining` 
                : "Daily target reached"}
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Today's meals</h4>
            {meals.map((meal, index) => (
              <div key={index} className="flex justify-between items-center text-sm py-1 border-b last:border-0">
                <div>
                  <p className="font-medium">{meal.name}</p>
                  <p className="text-xs text-muted-foreground">{meal.time}</p>
                </div>
                <span>{meal.calories} Cal</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealTracker;
