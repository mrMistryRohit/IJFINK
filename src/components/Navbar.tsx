import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/ink-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Research", href: "/research" },
  { label: "Editorial Board", href: "/editorial-board" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;

  const isHeroPage = location.pathname === "/";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        scrolled || mobileOpen
          ? "shadow-lg shadow-slate-200/60 border-b border-slate-100"
          : "shadow-md shadow-slate-100/40"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-[72px] px-4">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src={logo} alt="Ink Your Journal" className="h-9 w-auto max-w-[160px] object-contain" />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  active
                    ? "text-primary bg-primary/8"
                    : "text-slate-700 hover:text-primary hover:bg-primary/6"
                }`}
              >
                {link.label}
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/submit"
            className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-95"
          >
            Submit Paper
          </Link>
        </div> */}

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/login"
            className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-95"
          >
            Login
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors text-slate-700 hover:bg-slate-100`}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive(link.href)
                      ? "text-primary bg-primary/8"
                      : "text-slate-700 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 mt-1 border-t border-slate-100">
                <Link
                  to="/submit"
                  onClick={() => setMobileOpen(false)}
                  className="block bg-primary text-white px-4 py-3 rounded-xl text-sm font-bold text-center hover:bg-primary/90 transition-colors"
                >
                  Submit Paper
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
