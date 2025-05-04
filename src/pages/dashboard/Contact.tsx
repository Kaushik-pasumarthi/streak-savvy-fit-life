
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Mail, Phone, Check, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !subject || !message) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Contact Support</h1>
        <p className="text-muted-foreground">
          Have questions or need help? We're here for you.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>
              We'll respond to your inquiry as soon as possible
            </CardDescription>
          </CardHeader>
          {isSubmitted ? (
            <CardContent className="py-6 flex flex-col items-center text-center">
              <div className="mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
              <p className="text-muted-foreground mb-4">
                Thank you for contacting us. We'll get back to you shortly.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false);
                  setName("");
                  setEmail("");
                  setSubject("");
                  setMessage("");
                }}
              >
                Send Another Message
              </Button>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={subject} onValueChange={setSubject} disabled={isSubmitting}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="account">Account Issues</SelectItem>
                      <SelectItem value="workouts">Workout Tracking</SelectItem>
                      <SelectItem value="meals">Meal Tracking</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    rows={6}
                    className="resize-none"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-fitpurple hover:bg-fitpurple-dark"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>
        
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Mail className="h-5 w-5 mr-2" />
                Email Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a 
                href="mailto:support@fitstreak.com" 
                className="text-fitpurple hover:underline"
              >
                support@fitstreak.com
              </a>
              <p className="text-sm text-muted-foreground mt-1">
                Response time: Within 24 hours
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Phone className="h-5 w-5 mr-2" />
                Call Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a 
                href="tel:+18001234567" 
                className="text-fitpurple hover:underline"
              >
                +1 (800) 123-4567
              </a>
              <p className="text-sm text-muted-foreground mt-1">
                Mon-Fri: 9AM - 5PM EST
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <MessageSquare className="h-5 w-5 mr-2" />
                Live Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full mt-2">
                Start Chat
              </Button>
              <p className="text-sm text-muted-foreground mt-1">
                Available: 24/7 for premium users
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-1">How do I reset my password?</h3>
            <p className="text-sm text-muted-foreground">
              Click on "Forgot Password" on the login screen and follow the instructions sent to your email address.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">How are streaks calculated?</h3>
            <p className="text-sm text-muted-foreground">
              Streaks are counted as consecutive days where you've completed a specific activity. Missing a day will reset your streak.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Can I sync data with other fitness apps?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! FitStreak integrates with popular fitness apps. Go to Settings → Integrations to connect your accounts.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">How do I customize my workout plan?</h3>
            <p className="text-sm text-muted-foreground">
              Visit the Workouts section and select "Create Custom Workout" to build your personalized routine.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
