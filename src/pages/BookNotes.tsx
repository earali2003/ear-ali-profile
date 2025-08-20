import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BookNotes = () => {
  const books = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      summary: "Comprehensive notes on building good habits and breaking bad ones through small, incremental changes.",
      keyTakeaways: ["1% better every day", "Systems vs Goals", "Habit Stacking"],
    },
    {
      title: "Deep Work",
      author: "Cal Newport",
      summary: "Essential strategies for focusing without distraction on cognitively demanding tasks.",
      keyTakeaways: ["Attention Residue", "Batching Tasks", "Digital Minimalism"],
    },
    {
      title: "The 7 Habits of Highly Effective People",
      author: "Stephen Covey", 
      summary: "Timeless principles for personal and professional effectiveness.",
      keyTakeaways: ["Be Proactive", "Begin with End in Mind", "First Things First"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-gradient mb-6">
            Book Notes
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Detailed summaries and key insights from the books that have 
            shaped my thinking and approach to productivity.
          </p>
        </motion.div>

        <div className="space-y-8">
          {books.map((book, index) => (
            <motion.div
              key={index}
              className="bg-card p-8 rounded-2xl shadow-lg border border-border"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    {book.title}
                  </h2>
                  <p className="text-primary font-medium">by {book.author}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    Coming Soon
                  </span>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">
                {book.summary}
              </p>
              
              <div>
                <h3 className="font-semibold mb-3">Key Takeaways:</h3>
                <div className="flex flex-wrap gap-2">
                  {book.keyTakeaways.map((takeaway, idx) => (
                    <span
                      key={idx}
                      className="bg-highlight/20 text-highlight-foreground px-3 py-1 rounded-lg text-sm"
                    >
                      {takeaway}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-card p-8 rounded-2xl shadow-lg border border-border max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Detailed Notes Coming Soon</h2>
            <p className="text-muted-foreground">
              I'm working on comprehensive book summaries and actionable insights. 
              Subscribe to be notified when they're ready.
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default BookNotes;