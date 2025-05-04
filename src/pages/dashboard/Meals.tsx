
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardFooter,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Utensils, 
  Plus,
  Search, 
  Clock, 
  CalendarDays,
  PieChart,
  ArrowRight,
  Coffee,
  Salad,
  UtensilsCrossed
} from "lucide-react";
import { cn } from "@/lib/utils";

const Meals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data
  const todaysCalories = 1450;
  const calorieGoal = 2000;
  const caloriesRemaining = calorieGoal - todaysCalories;
  const progress = Math.round((todaysCalories / calorieGoal) * 100);
  
  const macros = {
    protein: { consumed: 65, goal: 120 },
    carbs: { consumed: 180, goal: 250 },
    fat: { consumed: 40, goal: 65 },
  };
  
  const meals = [
    {
      id: "1",
      name: "Breakfast",
      time: "8:30 AM",
      calories: 420,
      items: [
        { name: "Oatmeal with berries", calories: 280 },
        { name: "Coffee with milk", calories: 40 },
        { name: "Banana", calories: 100 },
      ],
      icon: Coffee,
    },
    {
      id: "2",
      name: "Lunch",
      time: "12:45 PM",
      calories: 650,
      items: [
        { name: "Grilled chicken salad", calories: 450 },
        { name: "Whole grain bread", calories: 120 },
        { name: "Orange juice", calories: 80 },
      ],
      icon: Salad,
    },
    {
      id: "3",
      name: "Snack",
      time: "3:30 PM",
      calories: 180,
      items: [
        { name: "Greek yogurt", calories: 100 },
        { name: "Mixed nuts", calories: 80 },
      ],
      icon: UtensilsCrossed,
    },
    {
      id: "4",
      name: "Dinner",
      time: "7:00 PM",
      calories: 200,
      items: [
        { name: "Grilled salmon", calories: 200 },
      ],
      icon: Utensils,
    },
  ];
  
  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meal.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Nutrition Tracker</h1>
        <Button className="bg-fitpurple hover:bg-fitpurple-dark">
          <Plus className="h-4 w-4 mr-2" /> Log Food
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Today's Calories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <div>
                <span className="text-2xl font-bold">{todaysCalories}</span>
                <span className="text-sm text-muted-foreground ml-1">consumed</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-green-600">{caloriesRemaining}</span>
                <span className="text-sm text-muted-foreground ml-1">remaining</span>
              </div>
            </div>
            
            <Progress value={progress} className="h-3" />
            
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0</span>
              <span>Goal: {calorieGoal}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="space-y-1">
                <div className="text-sm font-medium">Protein</div>
                <Progress value={(macros.protein.consumed / macros.protein.goal) * 100} className="h-2" />
                <div className="flex justify-between text-xs">
                  <span>{macros.protein.consumed}g</span>
                  <span className="text-muted-foreground">{macros.protein.goal}g</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">Carbs</div>
                <Progress value={(macros.carbs.consumed / macros.carbs.goal) * 100} className="h-2" />
                <div className="flex justify-between text-xs">
                  <span>{macros.carbs.consumed}g</span>
                  <span className="text-muted-foreground">{macros.carbs.goal}g</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">Fat</div>
                <Progress value={(macros.fat.consumed / macros.fat.goal) * 100} className="h-2" />
                <div className="flex justify-between text-xs">
                  <span>{macros.fat.consumed}g</span>
                  <span className="text-muted-foreground">{macros.fat.goal}g</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-2" />
              Weekly Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 7 }).map((_, i) => {
                const day = new Date();
                day.setDate(day.getDate() - i);
                const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
                const randomPercentage = Math.floor(Math.random() * 100);
                
                return (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-12 text-sm">{dayName}</div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            randomPercentage > 90 ? "bg-green-500" : 
                            randomPercentage > 70 ? "bg-fitpurple" : "bg-blue-400"
                          )}
                          style={{ width: `${randomPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-12 text-xs text-right">
                      {Math.round(randomPercentage * 20)}cal
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search meals and foods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 mb-4"
          />
        </div>
        
        <Tabs defaultValue="today">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="space-y-4">
            {filteredMeals.map((meal) => (
              <Card key={meal.id}>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 h-8 w-8 rounded-full bg-fitpurple-light flex items-center justify-center text-fitpurple">
                      <meal.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{meal.name}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {meal.time}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{meal.calories}</div>
                    <div className="text-xs text-muted-foreground">calories</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {meal.items.map((item, index) => (
                      <li key={index} className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span>{item.calories} cal</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="ml-auto flex items-center">
                    Edit <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="history">
            <div className="text-center py-12">
              <CalendarDays className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <h3 className="text-lg font-medium">Meal History</h3>
              <p className="text-muted-foreground">
                View and analyze your past meals and nutrition patterns
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="recipes">
            <div className="text-center py-12">
              <Utensils className="h-12 w-12 mx-auto mb-3 text-fitpurple" />
              <h3 className="text-lg font-medium">Recipe Collection</h3>
              <p className="text-muted-foreground mb-4">
                Find healthy recipes tailored to your nutrition goals
              </p>
              <Button className="bg-fitpurple hover:bg-fitpurple-dark">
                Browse Recipes
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Meals;
