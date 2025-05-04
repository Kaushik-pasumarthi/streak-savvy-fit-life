
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Utensils, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface Meal {
  name: string;
  calories: number;
  time: string;
  protein?: number;
  carbs?: number;
  fat?: number;
}

interface MealTrackerProps {
  consumed: number;
  target: number;
  meals: Meal[];
}

const MealTracker: React.FC<MealTrackerProps> = ({
  consumed: initialConsumed,
  target,
  meals: initialMeals,
}) => {
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [consumed, setConsumed] = useState<number>(initialConsumed);
  const [newFoodItem, setNewFoodItem] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const progress = Math.min(Math.round((consumed / target) * 100), 100);

  const handleAddFood = async () => {
    if (!newFoodItem.trim()) {
      toast({
        title: "Error",
        description: "Please enter a food item",
        variant: "destructive",
      });
      return;
    }

    // Here we would normally call a real API like NutrientsAPI
    // For now, we'll simulate with a mock API call
    try {
      toast({
        title: "Searching...",
        description: `Looking up nutrition info for ${newFoodItem}`,
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      const mockCalories = Math.floor(Math.random() * 400) + 50;
      const mockProtein = Math.floor(Math.random() * 20) + 2;
      const mockCarbs = Math.floor(Math.random() * 30) + 5;
      const mockFat = Math.floor(Math.random() * 15) + 1;
      
      const newMeal: Meal = {
        name: newFoodItem,
        calories: mockCalories,
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        protein: mockProtein,
        carbs: mockCarbs,
        fat: mockFat,
      };
      
      setMeals([newMeal, ...meals]);
      setConsumed(consumed + mockCalories);
      setNewFoodItem("");
      setIsAdding(false);
      
      toast({
        title: "Food logged",
        description: `Added ${newFoodItem}: ${mockCalories} calories`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get nutrition information",
        variant: "destructive",
      });
    }
  };

  const removeMeal = (index: number) => {
    const mealToRemove = meals[index];
    const newMeals = [...meals];
    newMeals.splice(index, 1);
    setMeals(newMeals);
    setConsumed(consumed - mealToRemove.calories);
    
    toast({
      title: "Meal removed",
      description: `Removed ${mealToRemove.name} (${mealToRemove.calories} cal)`,
    });
  };

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
          
          {/* Macronutrients Summary (if available) */}
          {meals.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="text-center p-2 bg-gray-50 rounded-md">
                <p className="text-xs text-muted-foreground">Protein</p>
                <p className="font-medium">
                  {meals.reduce((sum, meal) => sum + (meal.protein || 0), 0)}g
                </p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded-md">
                <p className="text-xs text-muted-foreground">Carbs</p>
                <p className="font-medium">
                  {meals.reduce((sum, meal) => sum + (meal.carbs || 0), 0)}g
                </p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded-md">
                <p className="text-xs text-muted-foreground">Fat</p>
                <p className="font-medium">
                  {meals.reduce((sum, meal) => sum + (meal.fat || 0), 0)}g
                </p>
              </div>
            </div>
          )}
          
          {isAdding ? (
            <div className="flex items-center space-x-2">
              <Input 
                value={newFoodItem}
                onChange={(e) => setNewFoodItem(e.target.value)}
                placeholder="Enter food item..."
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleAddFood()}
              />
              <Button size="sm" onClick={handleAddFood}>Add</Button>
              <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full" 
              onClick={() => setIsAdding(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Log food item
            </Button>
          )}
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Today's meals</h4>
            {meals.length === 0 ? (
              <p className="text-xs text-muted-foreground py-2">No meals logged today</p>
            ) : (
              meals.map((meal, index) => (
                <div key={index} className="flex justify-between items-center text-sm py-1 border-b last:border-0">
                  <div>
                    <p className="font-medium">{meal.name}</p>
                    <p className="text-xs text-muted-foreground">{meal.time}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3">{meal.calories} Cal</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0" 
                      onClick={() => removeMeal(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealTracker;
