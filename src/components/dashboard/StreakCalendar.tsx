
import React from "react";
import { cn } from "@/lib/utils";

interface StreakCalendarProps {
  days: {
    date: string;
    completed: boolean;
    isToday?: boolean;
  }[];
  size?: "sm" | "md" | "lg";
}

const StreakCalendar: React.FC<StreakCalendarProps> = ({ 
  days,
  size = "md"
}) => {
  const boxSizeClass = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className="flex flex-wrap gap-1">
      {days.map((day, index) => (
        <div 
          key={index}
          className={cn(
            "rounded-sm transition-all duration-300",
            boxSizeClass[size],
            day.completed ? "bg-fitpurple" : "bg-gray-200",
            day.isToday && "ring-2 ring-fitpurple-dark"
          )}
          title={day.date}
        />
      ))}
    </div>
  );
};

export default StreakCalendar;
