import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  FiMoon,
  FiSun,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiAward,
} from "react-icons/fi";
import { FaReact, FaJava, FaPython, FaDatabase } from "react-icons/fa";
import {
  SiPostman,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss3,
} from "react-icons/si";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Hero from "./components/Hero";

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState(null);

  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  useEffect(() => {
    setIsMounted(true);
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }

    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.classList.toggle("dark", darkMode);
    }
  }, [darkMode, isMounted]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };


  const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Custom cursor for interactive elements */}
      <motion.div
        className={`fixed hidden md:block w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference ${
          hoveredItem ? "bg-gray-500 w-8 h-8" : "bg-blue-500"
        }`}
        animate={{
          x: cursorPosition.x - 12,
          y: cursorPosition.y - 12,
          scale: hoveredItem ? 1.5 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 400 }}
      />

      {/* Floating background elements */}
      <motion.div
        style={{ opacity: backgroundOpacity }}
        className="fixed inset-0 overflow-hidden z-0"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
      </motion.div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Gokul P
          </motion.h1>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setActiveSection(item.id)}
                className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-blue-600 dark:text-blue-400 "
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.a>
            ))}
          </nav>

          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full focus:outline-none"
            aria-label="Toggle dark mode"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? (
              <FiSun className="h-6 w-6 text-yellow-400" />
            ) : (
              <FiMoon className="h-6 w-6 text-white" />
            )}
          </motion.button>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <Hero darkMode={darkMode}/>

        {/* Projects Section */}
        <Projects darkMode={darkMode}/>

        {/* Education Section */}
        <Education darkMode={darkMode}/>

        {/* Skills Section */}
        <Skills darkMode={darkMode}/>
        {/* Contact Section */}
        <Contact darkMode={darkMode} />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-300 mb-4 md:mb-0"
            >
              &copy; {new Date().getFullYear()} Gokul P. All rights reserved.
            </motion.p>
            <div className="flex space-x-6">
              <motion.a
                href="#"
                whileHover={{ y: -2 }}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FiLinkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -2 }}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FiGithub className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -2 }}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FiMail className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
