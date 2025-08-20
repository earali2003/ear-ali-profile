import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Mail, CheckCircle } from "lucide-react";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call (since we don't have a real backend)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log the email (as requested in requirements)
      console.log("Newsletter subscription:", email);
      
      setIsSubscribed(true);
      setEmail("");
      
      toast({
        title: "Successfully Subscribed!",
        description: "Welcome to the newsletter. You'll receive weekly insights.",
      });
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <motion.div
        className="bg-card p-6 rounded-2xl shadow-lg border border-border max-w-md mx-auto lg:mx-0"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 text-primary">
          <CheckCircle className="h-6 w-6" />
          <span className="font-semibold">You're subscribed!</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Check your email for a welcome message.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-card p-6 rounded-2xl shadow-lg border border-border max-w-md mx-auto lg:mx-0"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Mail className="h-6 w-6 text-primary" />
        <h3 className="text-lg font-semibold">Join the Newsletter</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          disabled={isLoading}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-2xl py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
          disabled={isLoading}
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
      
      <p className="text-sm text-muted-foreground mt-4 italic">
        "Each week, I share actionable productivity tips, practical life advice, 
        and highlights from my favourite books, directly to your inbox."
      </p>
    </motion.div>
  );
};

export default NewsletterForm;