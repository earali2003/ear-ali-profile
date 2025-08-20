import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";
import { Mail, CheckCircle, Users, Calendar } from "lucide-react";

const Newsletter = () => {
  const features = [
    {
      icon: Mail,
      title: "Weekly Insights",
      description: "Every Sunday, get actionable productivity tips and strategies delivered to your inbox.",
    },
    {
      icon: CheckCircle,
      title: "Curated Content",
      description: "Hand-picked articles, tools, and resources that actually make a difference.",
    },
    {
      icon: Users,
      title: "Community Access",
      description: "Join a community of like-minded individuals focused on growth and productivity.",
    },
    {
      icon: Calendar,
      title: "Exclusive Events",
      description: "Early access to webinars, workshops, and other educational content.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content: "The weekly newsletter has completely transformed how I approach my work. The insights are practical and immediately actionable.",
    },
    {
      name: "Michael Rodriguez",
      role: "Entrepreneur",
      content: "I look forward to Sunday mornings just to read the latest edition. It's become an essential part of my weekly routine.",
    },
    {
      name: "Emma Thompson",
      role: "Designer",
      content: "Finally, a newsletter that doesn't waste my time. Every issue is packed with valuable, real-world advice.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-gradient mb-6">
            Weekly Newsletter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of readers who get actionable productivity tips, 
            practical life advice, and book insights delivered every Sunday.
          </p>
          
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-card p-6 rounded-2xl shadow-lg border border-border"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Sample Content */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">What You'll Get</h2>
          <div className="bg-card p-8 rounded-2xl shadow-lg border border-border max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Issue #42: The Power of Systems Thinking
              </h3>
              <p className="text-sm text-muted-foreground">Published Sunday, March 15th</p>
            </div>
            
            <div className="space-y-4 text-left">
              <div>
                <h4 className="font-semibold mb-2">📚 This Week's Insight</h4>
                <p className="text-muted-foreground">
                  Why building systems beats setting goals every time, and how to design 
                  systems that actually stick in your daily life.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">🛠 Tool of the Week</h4>
                <p className="text-muted-foreground">
                  Notion's new AI features for automated task management - how I use them 
                  to save 2 hours per week.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">📖 Book Highlight</h4>
                <p className="text-muted-foreground">
                  Key insights from "Atomic Habits" chapter 4: The surprising truth about 
                  motivation and how to work with your brain, not against it.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">What Readers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-2xl shadow-lg border border-border"
              >
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-gradient-to-br from-secondary/20 to-highlight/20 p-8 rounded-2xl shadow-lg border border-border max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Join over 10,000 readers and start your journey to a more productive 
              and intentional life.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterForm />
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Newsletter;