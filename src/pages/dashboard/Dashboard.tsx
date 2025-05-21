
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import WorkoutCard from "@/components/dashboard/WorkoutCard";
import MealTracker from "@/components/dashboard/MealTracker";
import AchievementsCard from "@/components/dashboard/AchievementsCard";
import ChatbotCard from "@/components/dashboard/ChatbotCard";

const Dashboard = () => {
  const { currentUser } = useAuth();
  
  // Mock data for dashboard
  const workouts = [
    {
      id: "1",
      name: "Morning Cardio",
      type: "Running",
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
      type: "Strength Training",
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
  ];

  const meals = {
    consumed: 1450,
    target: 2000,
    items: [
      { name: "Breakfast", calories: 420, time: "8:30 AM" },
      { name: "Lunch", calories: 650, time: "12:45 PM" },
      { name: "Afternoon Snack", calories: 180, time: "3:30 PM" },
      { name: "Dinner", calories: 200, time: "7:00 PM" },
    ],
  };

  const achievements = [
    {
      id: "1",
      title: "Early Bird",
      description: "Complete 5 workouts before 8 AM",
      icon: "🌅",
      earned: true,
      date: "2025-04-28",
    },
    {
      id: "2",
      title: "Streak Master",
      description: "Maintain a 7-day workout streak",
      icon: "🔥",
      earned: false,
    },
    {
      id: "3",
      title: "Hydration Hero",
      description: "Meet water intake goals for 5 days straight",
      icon: "💧",
      earned: true,
      date: "2025-05-01",
    },
    {
      id: "4",
      title: "Step Champion",
      description: "Reach 10,000 steps for 7 days straight",
      icon: "👟",
      earned: false,
    },
    {
      id: "5",
      title: "Protein Pro",
      description: "Meet protein goals for 7 days",
      icon: "🥩",
      earned: true,
      date: "2025-04-25",
    },
    {
      id: "6",
      title: "Super Consistent",
      description: "Log in for 14 days straight",
      icon: "📊",
      earned: false,
    },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {currentUser?.name || "User"}!</h1>
        <p className="text-muted-foreground">
          Here's your fitness summary for today
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Today's Workouts</h2>
          <div className="space-y-4">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                name={workout.name}
                type={workout.type}
                streak={workout.streak}
                lastActive={workout.lastActive}
                streakHistory={workout.streakHistory}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-3">Nutrition</h2>
          <div className="space-y-4">
            <MealTracker
              consumed={meals.consumed}
              target={meals.target}
              meals={meals.items}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AchievementsCard achievements={achievements} />
        <ChatbotCard />
      </div>
    </div>
  );
};

export default Dashboard;
