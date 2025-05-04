
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ChevronRight, ChevronLeft } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const workoutTypes = [
  { id: "cardio", label: "Cardio" },
  { id: "strength", label: "Strength Training" },
  { id: "yoga", label: "Yoga & Flexibility" },
  { id: "hiit", label: "HIIT" },
  { id: "pilates", label: "Pilates" },
  { id: "cycling", label: "Cycling" },
  { id: "swimming", label: "Swimming" },
];

const fitnessGoals = [
  { value: "lose_weight", label: "Lose Weight" },
  { value: "build_muscle", label: "Build Muscle" },
  { value: "improve_fitness", label: "Improve Overall Fitness" },
  { value: "improve_flexibility", label: "Improve Flexibility" },
  { value: "increase_endurance", label: "Increase Endurance" },
  { value: "maintain_health", label: "Maintain Health" },
];

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [preferredWorkouts, setPreferredWorkouts] = useState<string[]>([]);
  const [dailyCalorieTarget, setDailyCalorieTarget] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { completeOnboarding } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleWorkoutToggle = (id: string) => {
    setPreferredWorkouts(prev => 
      prev.includes(id) 
        ? prev.filter(w => w !== id) 
        : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step === 1) {
      if (!age || !gender || !height || !weight) {
        toast({
          title: "Missing information",
          description: "Please fill in all fields to continue",
          variant: "destructive",
        });
        return;
      }
    }
    
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (preferredWorkouts.length === 0 || !fitnessGoal) {
      toast({
        title: "Missing information",
        description: "Please select at least one workout type and a fitness goal",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await completeOnboarding({
        age: parseInt(age),
        gender: gender as 'male' | 'female' | 'other',
        height: parseFloat(height),
        weight: parseFloat(weight),
        fitnessGoal,
        preferredWorkouts,
        dailyCalorieTarget: dailyCalorieTarget ? parseInt(dailyCalorieTarget) : undefined,
      });
      
      toast({
        title: "Profile completed!",
        description: "Welcome to FitStreak. Let's start your fitness journey!",
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Let's personalize your experience</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {step === 1 ? "Tell us about yourself" : "Set your fitness preferences"}
        </p>
      </div>
      
      {/* Progress indicator */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-fitpurple h-2.5 rounded-full transition-all duration-500" 
          style={{ width: step === 1 ? "50%" : "100%" }}
        ></div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 ? (
          /* Step 1: Basic Info */
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="13"
                  max="120"
                  placeholder="30"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  min="50"
                  max="300"
                  placeholder="175"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="30"
                  max="500"
                  placeholder="70"
                />
              </div>
            </div>
            
            <Button
              type="button"
              onClick={handleNext}
              className="w-full bg-fitpurple hover:bg-fitpurple-dark text-white"
            >
              Continue <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          /* Step 2: Fitness Preferences */
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="fitness-goal">Your primary fitness goal</Label>
              <Select value={fitnessGoal} onValueChange={setFitnessGoal}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {fitnessGoals.map((goal) => (
                      <SelectItem key={goal.value} value={goal.value}>
                        {goal.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Preferred workout types (select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2">
                {workoutTypes.map((workout) => (
                  <div key={workout.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={workout.id}
                      checked={preferredWorkouts.includes(workout.id)}
                      onCheckedChange={() => handleWorkoutToggle(workout.id)}
                    />
                    <label
                      htmlFor={workout.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {workout.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="calories" className="flex items-center justify-between">
                <span>Daily calorie target (optional)</span>
              </Label>
              <Input
                id="calories"
                type="number"
                value={dailyCalorieTarget}
                onChange={(e) => setDailyCalorieTarget(e.target.value)}
                min="500"
                max="10000"
                placeholder="e.g., 2000"
              />
              <p className="text-xs text-muted-foreground">
                If left blank, we'll calculate a recommended target for you
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button
                type="button"
                onClick={handleBack}
                variant="outline"
                className="flex-1"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              
              <Button
                type="submit"
                className="flex-1 bg-fitpurple hover:bg-fitpurple-dark text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                  </>
                ) : (
                  "Complete Profile"
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Onboarding;
