
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, Droplets, ActivitySquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface VitalsCardProps {
  heartRate: number;
  waterIntake: {
    consumed: number;
    target: number;
  };
  steps: {
    count: number;
    target: number;
  };
}

const VitalsCard: React.FC<VitalsCardProps> = ({
  heartRate,
  waterIntake,
  steps,
}) => {
  const waterProgress = Math.round((waterIntake.consumed / waterIntake.target) * 100);
  const stepsProgress = Math.round((steps.count / steps.target) * 100);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <HeartPulse className="h-5 w-5 mr-2" />
          Daily Health
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {/* Heart Rate */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
              <HeartPulse className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium">Heart Rate</div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">{heartRate}</span>
                <span className="text-sm ml-1">BPM</span>
              </div>
            </div>
          </div>
          
          {/* Water Intake */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <Droplets className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm font-medium">Water Intake</span>
              </div>
              <span className="text-sm">{waterIntake.consumed}/{waterIntake.target}L</span>
            </div>
            <Progress value={waterProgress} className="h-2" />
          </div>
          
          {/* Steps */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <ActivitySquare className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium">Steps</span>
              </div>
              <span className="text-sm">{steps.count.toLocaleString()}/{steps.target.toLocaleString()}</span>
            </div>
            <Progress value={stepsProgress} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VitalsCard;
