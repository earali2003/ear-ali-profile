import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.nav 
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gradient">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  Free Resources
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border shadow-lg">
                <DropdownMenuItem asChild>
                  <Link to="/articles" className="underline-effect">Articles</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/book-notes" className="underline-effect">Book Notes</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/videos" className="underline-effect">Videos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/podcast" className="underline-effect">Podcast</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/newsletter" className="underline-effect">Newsletter</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/about" className="underline-effect">
              About Me
            </Link>
            
            <Link to="/contact" className="underline-effect">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card rounded-xl m-4 shadow-lg">
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-semibold text-muted-foreground px-3 py-2">
                    Free Resources
                  </span>
                  <Link
                    to="/articles"
                    className="block px-6 py-2 text-sm underline-effect"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Articles
                  </Link>
                  <Link
                    to="/book-notes"
                    className="block px-6 py-2 text-sm underline-effect"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Book Notes
                  </Link>
                  <Link
                    to="/videos"
                    className="block px-6 py-2 text-sm underline-effect"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Videos
                  </Link>
                  <Link
                    to="/podcast"
                    className="block px-6 py-2 text-sm underline-effect"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Podcast
                  </Link>
                  <Link
                    to="/newsletter"
                    className="block px-6 py-2 text-sm underline-effect"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Newsletter
                  </Link>
                </div>
                <div className="border-t border-border pt-4">
                  <Link
                    to="/about"
                    className="block px-3 py-2 text-sm underline-effect"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About Me
                  </Link>
                  <Link
                    to="/contact"
                    className="block px-3 py-2 text-sm underline-effect"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;