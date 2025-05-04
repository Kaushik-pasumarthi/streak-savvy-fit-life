
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Check } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Link 
        to="/login" 
        className="inline-flex items-center text-sm text-fitpurple hover:text-fitpurple-dark"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to login
      </Link>
      
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Reset your password</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {isSubmitted 
            ? "We've sent you an email with recovery instructions" 
            : "Enter your email and we'll send you instructions"}
        </p>
      </div>
      
      {isSubmitted ? (
        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <p>We've sent an email to <span className="font-medium">{email}</span></p>
          <p className="text-sm text-muted-foreground">
            Please check your inbox and follow the instructions to reset your password
          </p>
          <div className="pt-2">
            <Link 
              to="/login" 
              className="text-fitpurple hover:text-fitpurple-dark text-sm hover:underline"
            >
              Return to login
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-fitpurple hover:bg-fitpurple-dark text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Send reset instructions"
            )}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
