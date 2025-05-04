
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, Activity, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { currentUser, userHealth } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  // Personal info form state
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  
  // Health info form state
  const [weight, setWeight] = useState(userHealth?.weight?.toString() || "");
  const [height, setHeight] = useState(userHealth?.height?.toString() || "");
  const [fitnessGoal, setFitnessGoal] = useState(userHealth?.fitnessGoal || "");
  const [calorieTarget, setCalorieTarget] = useState(userHealth?.dailyCalorieTarget?.toString() || "");
  
  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your personal information has been saved",
      });
      setSaving(false);
    }, 1000);
  };
  
  const handleSaveHealthInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Health info updated",
        description: "Your health information has been saved",
      });
      setSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>
      
      <Tabs defaultValue="profile">
        <TabsList className="grid grid-cols-4 w-full max-w-md mb-6">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" /> Profile
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center">
            <Activity className="h-4 w-4 mr-2" /> Goals
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center">
            <Palette className="h-4 w-4 mr-2" /> Appearance
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <form onSubmit={handleSavePersonalInfo}>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card>
            <form onSubmit={handleSaveHealthInfo}>
              <CardHeader>
                <CardTitle>Health Information</CardTitle>
                <CardDescription>
                  Update your health and fitness details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.1"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fitnessGoal">Fitness Goal</Label>
                    <Select value={fitnessGoal} onValueChange={setFitnessGoal}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="lose_weight">Lose Weight</SelectItem>
                          <SelectItem value="build_muscle">Build Muscle</SelectItem>
                          <SelectItem value="improve_fitness">Improve Fitness</SelectItem>
                          <SelectItem value="improve_flexibility">Improve Flexibility</SelectItem>
                          <SelectItem value="maintain_health">Maintain Health</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="calorieTarget">Daily Calorie Target</Label>
                    <Input
                      id="calorieTarget"
                      type="number"
                      value={calorieTarget}
                      onChange={(e) => setCalorieTarget(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Update your password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new">New Password</Label>
                  <Input id="new" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm New Password</Label>
                  <Input id="confirm" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fitness Goals</CardTitle>
              <CardDescription>
                Set your fitness targets and workout preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Daily Step Goal</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">5,000 steps</span>
                  <span className="text-sm text-muted-foreground">15,000 steps</span>
                </div>
                <Input type="range" min="5000" max="15000" step="500" defaultValue="10000" className="w-full" />
                <div className="text-center text-sm font-medium">10,000 steps</div>
              </div>
              
              <div className="space-y-2">
                <Label>Weekly Workout Goal</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">1 workout</span>
                  <span className="text-sm text-muted-foreground">7 workouts</span>
                </div>
                <Input type="range" min="1" max="7" step="1" defaultValue="3" className="w-full" />
                <div className="text-center text-sm font-medium">3 workouts per week</div>
              </div>
              
              <div className="space-y-2">
                <Label>Water Intake Goal (Liters)</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">1L</span>
                  <span className="text-sm text-muted-foreground">4L</span>
                </div>
                <Input type="range" min="1" max="4" step="0.1" defaultValue="2.5" className="w-full" />
                <div className="text-center text-sm font-medium">2.5 liters</div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Reminder Settings</CardTitle>
              <CardDescription>
                Configure when you want to receive reminders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Morning workout reminder</h3>
                    <p className="text-sm text-muted-foreground">Notify me every morning</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Water intake reminders</h3>
                    <p className="text-sm text-muted-foreground">Remind me to drink water</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Step count alerts</h3>
                    <p className="text-sm text-muted-foreground">Alert when I reach my step goal</p>
                  </div>
                  <Switch />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Weekly summary</h3>
                    <p className="text-sm text-muted-foreground">Send me a weekly summary of my progress</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="text-sm font-medium">Push Notifications</h4>
                      <p className="text-xs text-muted-foreground">
                        Receive push notifications in your browser
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="text-sm font-medium">Email Notifications</h4>
                      <p className="text-xs text-muted-foreground">
                        Get notified via email
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notification types</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Workout reminders</Label>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Meal tracking reminders</Label>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Streak alerts</Label>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Achievements unlocked</Label>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Goal progress updates</Label>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">System notifications</Label>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how FitStreak looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Color Theme</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="border rounded-md p-4 cursor-pointer flex flex-col items-center gap-2 bg-fitpurple-light border-fitpurple">
                      <div className="w-12 h-4 rounded-full bg-fitpurple"></div>
                      <span className="text-xs font-medium">Default</span>
                    </div>
                    <div className="border rounded-md p-4 cursor-pointer flex flex-col items-center gap-2">
                      <div className="w-12 h-4 rounded-full bg-blue-500"></div>
                      <span className="text-xs">Blue</span>
                    </div>
                    <div className="border rounded-md p-4 cursor-pointer flex flex-col items-center gap-2">
                      <div className="w-12 h-4 rounded-full bg-green-500"></div>
                      <span className="text-xs">Green</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Compact View</Label>
                    <Switch />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Display more information in less space
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Show Motivational Quotes</Label>
                    <Switch defaultChecked={true} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Display daily motivational fitness quotes
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Dashboard Layout</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="detailed">Detailed</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button>Save Appearance</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
