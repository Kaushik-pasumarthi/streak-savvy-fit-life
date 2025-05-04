
import React from "react";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StreakCalendarProps {
  days: {
    date: string;
    completed: boolean;
    isToday?: boolean;
  }[];
  size?: "sm" | "md" | "lg";
  onToggleDay?: (index: number) => void;
  interactive?: boolean;
}

const StreakCalendar: React.FC<StreakCalendarProps> = ({ 
  days,
  size = "md",
  onToggleDay,
  interactive = false,
}) => {
  const boxSizeClass = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const handleDayClick = (index: number) => {
    if (interactive && onToggleDay) {
      onToggleDay(index);
    }
  };

  return (
    <div className="flex flex-wrap gap-1">
      {days.map((day, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                onClick={() => handleDayClick(index)}
                className={cn(
                  "rounded-sm transition-all duration-300 flex items-center justify-center",
                  boxSizeClass[size],
                  day.completed ? "bg-fitpurple" : "bg-gray-200",
                  day.isToday && "ring-2 ring-fitpurple-dark",
                  interactive && "cursor-pointer hover:opacity-80"
                )}
                aria-label={day.completed ? `Completed on ${day.date}` : `Not completed on ${day.date}`}
              >
                {day.completed && size !== "sm" && (
                  <Flame className="h-3 w-3 text-white" />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{new Date(day.date).toLocaleDateString()}</p>
              <p>{day.completed ? "Completed" : "Not completed"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default StreakCalendar;
