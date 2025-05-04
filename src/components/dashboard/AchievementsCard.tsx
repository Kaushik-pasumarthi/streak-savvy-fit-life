
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  date?: string;
}

interface AchievementsCardProps {
  achievements: Achievement[];
}

const AchievementsCard: React.FC<AchievementsCardProps> = ({
  achievements,
}) => {
  const earnedAchievements = achievements.filter(a => a.earned);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Trophy className="h-5 w-5 mr-2" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {earnedAchievements.length > 0 ? (
            <>
              <p className="text-sm mb-3">
                You've earned {earnedAchievements.length} out of {achievements.length} badges
              </p>
              <div className="grid grid-cols-3 gap-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center p-2 transition-all ${
                      achievement.earned 
                        ? "bg-fitpurple-light text-fitpurple-dark" 
                        : "bg-gray-100 text-gray-400"
                    }`}
                    title={achievement.description}
                  >
                    <div className="text-xl mb-1">{achievement.icon}</div>
                    <div className="text-xs text-center font-medium leading-tight">
                      {achievement.title}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <Trophy className="h-10 w-10 mx-auto mb-2 text-gray-300" />
              <p className="text-sm text-muted-foreground">
                Complete activities to earn achievements
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsCard;
