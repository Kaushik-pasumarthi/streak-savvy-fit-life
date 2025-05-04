
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  HeartPulse, 
  ActivitySquare, 
  Droplets, 
  Weight, 
  TrendingUp,
  Clock,
  Calendar,
  Trophy,
  Star
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Import recharts components
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const Health = () => {
  // Mock data
  const heartRateData = [
    { time: "6AM", rate: 62 },
    { time: "8AM", rate: 70 },
    { time: "10AM", rate: 75 },
    { time: "12PM", rate: 80 },
    { time: "2PM", rate: 72 },
    { time: "4PM", rate: 75 },
    { time: "6PM", rate: 82 },
    { time: "8PM", rate: 66 },
  ];
  
  const weeklyActivity = [
    { day: "Mon", steps: 8200, calories: 420, water: 2.1, workout: 35 },
    { day: "Tue", steps: 9500, calories: 450, water: 2.3, workout: 45 },
    { day: "Wed", steps: 7800, calories: 380, water: 1.9, workout: 30 },
    { day: "Thu", steps: 10200, calories: 520, water: 2.5, workout: 60 },
    { day: "Fri", steps: 8500, calories: 390, water: 2.2, workout: 40 },
    { day: "Sat", steps: 11000, calories: 580, water: 2.7, workout: 75 },
    { day: "Sun", steps: 6500, calories: 340, water: 1.8, workout: 20 },
  ];
  
  const monthlyProgress = [
    { week: "Week 1", weight: 78, sleep: 6.5, stress: 65 },
    { week: "Week 2", weight: 77.5, sleep: 7.1, stress: 60 },
    { week: "Week 3", weight: 77, sleep: 7.3, stress: 55 },
    { week: "Week 4", weight: 76.2, sleep: 7.5, stress: 40 },
  ];
  
  const achievements = [
    { id: 1, name: "7-Day Streak", description: "Logged in for 7 consecutive days", icon: "🏆" },
    { id: 2, name: "Step Master", description: "Reached 10,000 steps for 3 days", icon: "👟" },
    { id: 3, name: "Hydration Hero", description: "Met water goal for 5 days in a row", icon: "💧" },
    { id: 4, name: "Workout Warrior", description: "Completed 10 workouts", icon: "💪" },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Your Health</h1>
        <p className="text-muted-foreground">
          Track your health metrics and progress
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-red-700">
              <HeartPulse className="h-5 w-5 mr-2" />
              Heart Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-700">72</div>
            <div className="text-sm text-red-600 mb-2">BPM</div>
            <div className="flex items-center">
              <div className="bg-red-500 h-1.5 w-1.5 rounded-full mr-1.5"></div>
              <span className="text-xs text-red-700">Normal resting rate</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-700">
              <Droplets className="h-5 w-5 mr-2" />
              Hydration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">1.8</div>
            <div className="text-sm text-blue-600 mb-2">of 2.5L</div>
            <Progress value={72} className="h-1.5 bg-blue-200" indicatorClassName="bg-blue-600" />
            <div className="text-xs text-blue-700 mt-1">72% of daily goal</div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-700">
              <ActivitySquare className="h-5 w-5 mr-2" />
              Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">8,465</div>
            <div className="text-sm text-green-600 mb-2">of 10,000</div>
            <Progress value={84.65} className="h-1.5 bg-green-200" indicatorClassName="bg-green-600" />
            <div className="text-xs text-green-700 mt-1">1,535 steps to go</div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-fitpurple-dark">
              <Weight className="h-5 w-5 mr-2" />
              Weight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-fitpurple-dark">76.2</div>
            <div className="text-sm text-fitpurple mb-2">kg</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>0.8kg decrease this month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="daily">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily" className="flex items-center">
            <Clock className="h-4 w-4 mr-2" /> Today
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" /> This Week
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center">
            <Trophy className="h-4 w-4 mr-2" /> Achievements
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Heart Rate Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={heartRateData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff6584" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ff6584" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="rate"
                      stroke="#ff4d6d"
                      fillOpacity={1}
                      fill="url(#colorRate)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <ActivitySquare className="h-4 w-4 mr-2 text-green-500" />
                        <span className="text-sm font-medium">Steps</span>
                      </div>
                      <span className="text-sm">8,465 / 10,000</span>
                    </div>
                    <Progress value={84.65} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm font-medium">Water Intake</span>
                      </div>
                      <span className="text-sm">1.8L / 2.5L</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-fitpurple" />
                        <span className="text-sm font-medium">Calories Burned</span>
                      </div>
                      <span className="text-sm">420 / 500</span>
                    </div>
                    <Progress value={84} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sleep Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-32 mb-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold">7.5</div>
                    <div className="text-sm text-muted-foreground">hours</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Deep sleep</span>
                    <span>2.3 hrs</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: "31%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span>Light sleep</span>
                    <span>4.1 hrs</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-blue-400 h-full rounded-full" style={{ width: "55%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span>REM sleep</span>
                    <span>1.1 hrs</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-purple-400 h-full rounded-full" style={{ width: "14%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyActivity}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" orientation="left" stroke="#9b87f5" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="steps" fill="#9b87f5" name="Steps (÷100)" />
                    <Bar yAxisId="right" dataKey="workout" fill="#82ca9d" name="Workout (min)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Weight Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyProgress}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="week" />
                      <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="#9b87f5"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center text-sm mt-2 text-green-600 font-medium">
                  -1.8kg lost this month
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sleep & Stress Correlation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyProgress}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="week" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="sleep"
                        stroke="#82ca9d"
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="stress"
                        stroke="#ff7d7d"
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-6 text-sm mt-2">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-[#82ca9d] mr-1"></div>
                    <span>Sleep (hrs)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-[#ff7d7d] mr-1"></div>
                    <span>Stress (0-100)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="achievements" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="overflow-hidden">
                <CardHeader className="bg-fitpurple-light pb-2">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center bg-white rounded-full h-10 w-10">
                      <span className="text-xl">{achievement.icon}</span>
                    </div>
                    <CardTitle className="text-fitpurple-dark">
                      {achievement.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-3">
                  <p className="text-sm">{achievement.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-current mr-1" />
                      <Star className="h-4 w-4 fill-current mr-1" />
                      <Star className="h-4 w-4 fill-current mr-1" />
                      <Star className="h-4 w-4 fill-current mr-1" />
                      <Star className="h-4 w-4" />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Earned on May 1, 2025
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Health;
