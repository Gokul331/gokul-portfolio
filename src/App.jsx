import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colorTheme } from "./theme";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import { FiChevronUp, FiChevronDown, FiHome, FiUser, FiCode, FiAward, FiBook, FiMail } from "react-icons/fi";

function App() {
  const [currentBgColor, setCurrentBgColor] = useState("bg-white");
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [direction, setDirection] = useState("right");
  const [deviceType, setDeviceType] = useState(() => {
    const width = window.innerWidth;
    if (width >= 1024) return "desktop";
    if (width >= 768) return "tablet";
    return "mobile";
  });
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const sectionRefs = useRef([]);
  const scrollTimeoutRef = useRef(null);
  const wheelTimeoutRef = useRef(null);

  const sections = [
    {
      id: "home",
      name: "Home",
      icon: <FiHome size={16} />,
      component: (
        <Hero
          bgColor={currentBgColor}
          isDesktop={deviceType === "desktop"}
          handleScrollDown={() => handleSectionChange(1)}
        />
      ),
    },
    { 
      id: "about", 
      name: "About",
      icon: <FiUser size={16} />,
      component: <About bgColor={currentBgColor} /> 
    },
    { 
      id: "projects", 
      name: "Projects",
      icon: <FiCode size={16} />,
      component: <Projects bgColor={currentBgColor} /> 
    },
    { 
      id: "skills", 
      name: "Skills",
      icon: <FiAward size={16} />,
      component: <Skills bgColor={currentBgColor} /> 
    },
    { 
      id: "education", 
      name: "Education",
      icon: <FiBook size={16} />,
      component: <Education bgColor={currentBgColor} /> 
    },
    { 
      id: "contact", 
      name: "Contact",
      icon: <FiMail size={16} />,
      component: <Contact bgColor={currentBgColor} /> 
    },
  ];

  const handleColorChange = useCallback((color) => {
    setCurrentBgColor(color);
  }, []);

  const handleSectionChange = useCallback((idx) => {
    if (idx === activeSection || isScrolling) return;
    
    setDirection(idx > activeSection ? "right" : "left");
    setActiveSection(idx);
    setIsScrolling(true);

    if (deviceType === "desktop") {
      setTimeout(() => setIsScrolling(false), 1000);
      return;
    }

    const element = document.getElementById(sections[idx].id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setTimeout(() => setIsScrolling(false), 1000);
    }
  }, [activeSection, deviceType, sections, isScrolling]);

  // Check if current section is at bottom
  const checkIfAtBottom = useCallback(() => {
    if (deviceType !== "desktop") return;

    const currentSection = sectionRefs.current[activeSection];
    if (!currentSection) return false;

    const { scrollTop, scrollHeight, clientHeight } = currentSection;
    const isBottom = scrollHeight - scrollTop <= clientHeight + 10; // 10px tolerance
    
    setIsAtBottom(isBottom);
    return isBottom;
  }, [activeSection, deviceType]);

  // Enhanced desktop navigation with bottom detection
  useEffect(() => {
    if (deviceType !== "desktop") return;

    const handleWheel = (e) => {
      if (isScrolling) return;

      const currentSection = sectionRefs.current[activeSection];
      if (!currentSection) return;

      const { scrollTop, scrollHeight, clientHeight } = currentSection;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollHeight - scrollTop <= clientHeight + 10;

      // If scrolling down and not at bottom, scroll within current section
      if (e.deltaY > 0 && !isAtBottom) {
        e.preventDefault();
        currentSection.scrollBy({ top: e.deltaY, behavior: 'smooth' });
        return;
      }

      // If scrolling up and not at top, scroll within current section
      if (e.deltaY < 0 && !isAtTop) {
        e.preventDefault();
        currentSection.scrollBy({ top: e.deltaY, behavior: 'smooth' });
        return;
      }

      // Only change section when at boundaries
      if (e.deltaY > 0 && isAtBottom && activeSection < sections.length - 1) {
        e.preventDefault();
        setDirection("right");
        setIsScrolling(true);
        setActiveSection((prev) => prev + 1);
      } else if (e.deltaY < 0 && isAtTop && activeSection > 0) {
        e.preventDefault();
        setDirection("left");
        setIsScrolling(true);
        setActiveSection((prev) => prev - 1);
      }

      setTimeout(() => setIsScrolling(false), 800);
    };

    const handleKeyDown = (e) => {
      if (isScrolling) return;

      const currentSection = sectionRefs.current[activeSection];
      if (!currentSection) return;

      const { scrollTop, scrollHeight, clientHeight } = currentSection;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollHeight - scrollTop <= clientHeight + 10;

      if ((e.key === "ArrowDown" || e.key === " ") && !isAtBottom) {
        e.preventDefault();
        currentSection.scrollBy({ top: 100, behavior: 'smooth' });
      } else if ((e.key === "ArrowDown" || e.key === " ") && isAtBottom && activeSection < sections.length - 1) {
        e.preventDefault();
        setDirection("right");
        setIsScrolling(true);
        setActiveSection((prev) => prev + 1);
      } else if ((e.key === "ArrowUp" || e.key === "Shift") && !isAtTop) {
        e.preventDefault();
        currentSection.scrollBy({ top: -100, behavior: 'smooth' });
      } else if ((e.key === "ArrowUp" || e.key === "Shift") && isAtTop && activeSection > 0) {
        e.preventDefault();
        setDirection("left");
        setIsScrolling(true);
        setActiveSection((prev) => prev - 1);
      } else if (e.key >= "1" && e.key <= "6") {
        const sectionIndex = parseInt(e.key) - 1;
        if (sectionIndex < sections.length) {
          handleSectionChange(sectionIndex);
        }
      }

      setTimeout(() => setIsScrolling(false), 800);
    };

    // Add scroll event listener to each section
    const handleSectionScroll = (index) => {
      return () => {
        if (index === activeSection) {
          checkIfAtBottom();
        }
      };
    };

    // Attach scroll listeners to all sections
    sectionRefs.current.forEach((section, index) => {
      if (section) {
        section.addEventListener('scroll', handleSectionScroll(index));
      }
    });

    const options = { passive: false };
    window.addEventListener("wheel", handleWheel, options);
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      
      // Remove scroll listeners
      sectionRefs.current.forEach((section, index) => {
        if (section) {
          section.removeEventListener('scroll', handleSectionScroll(index));
        }
      });
    };
  }, [deviceType, activeSection, sections.length, isScrolling, handleSectionChange, checkIfAtBottom]);

  // Device type detection
  useEffect(() => {
    const updateDeviceType = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const width = window.innerWidth;
        if (width >= 1024) setDeviceType("desktop");
        else if (width >= 768) setDeviceType("tablet");
        else setDeviceType("mobile");
      }, 250);
    };

    window.addEventListener("resize", updateDeviceType);
    return () => {
      window.removeEventListener("resize", updateDeviceType);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Scroll tracking for mobile/tablet
  useEffect(() => {
    if (deviceType === "desktop") return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const navbarHeight = 80;

      setShowScrollButtons(scrollPosition > 100);

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollPosition - navbarHeight;
          const elementBottom = elementTop + rect.height;

          if (
            scrollPosition + windowHeight * 0.4 >= elementTop &&
            scrollPosition + windowHeight * 0.6 <= elementBottom
          ) {
            if (activeSection !== index) {
              setActiveSection(index);
            }
          }
        }
      });
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [deviceType, sections, activeSection]);

  // Scroll functions for mobile
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const currentTheme = colorTheme[currentBgColor] || colorTheme["bg-white"];

  const desktopVariants = {
    initial: (dir) => ({
      opacity: 0,
      x: dir === "right" ? 300 : -300,
      scale: 0.95,
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 25,
        duration: 0.8 
      },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir === "right" ? -300 : 300,
      scale: 0.95,
      transition: { 
        duration: 0.6,
        ease: "easeInOut"
      },
    }),
  };

  const progress = ((activeSection + 1) / sections.length) * 100;

  return (
    <div
      className={`min-h-screen w-screen transition-colors duration-500 bg-gradient-to-br ${
        currentTheme.gradient
      } ${deviceType === "desktop" ? "overflow-hidden" : "overflow-x-hidden"}`}
    >
      <Navbar
        parentToChild={handleColorChange}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        sections={sections}
        deviceType={deviceType}
      />

      {/* Progress Bar */}
      {deviceType === "desktop" && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/30 z-50">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}

      {/* Section Indicators */}
      <div className={`fixed right-4 top-1/2 z-40 flex flex-col gap-4 -translate-y-1/2 ${
        deviceType === "mobile" ? "hidden" : ""
      }`}>
        {sections.map((section, idx) => (
          <motion.button
            key={section.id}
            className={`group relative flex items-center justify-center w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              idx === activeSection
                ? "bg-blue-500 border-blue-500 scale-125"
                : "bg-transparent border-gray-400 hover:border-blue-400 hover:scale-110"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSectionChange(idx)}
            aria-label={`Go to ${section.name} section`}
          >
            {/* Tooltip */}
            <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {section.name}
              <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Scroll Down Indicator for Desktop */}
      {deviceType === "desktop" && !isAtBottom && activeSection < sections.length - 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 text-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-500 text-sm bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-lg"
          >
            Scroll down to continue
            <div className="text-xs mt-1">↓</div>
          </motion.div>
        </motion.div>
      )}

      {/* Mobile Scroll Buttons */}
      {deviceType !== "desktop" && showScrollButtons && (
        <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-2">
          <motion.button
            className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <FiChevronUp size={20} />
          </motion.button>
          <motion.button
            className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToBottom}
            aria-label="Scroll to bottom"
          >
            <FiChevronDown size={20} />
          </motion.button>
        </div>
      )}

      {/* Navigation Hint for Desktop */}
      {deviceType === "desktop" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="fixed left-4 bottom-4 z-40 text-sm text-gray-500 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-400/30"
        >
          <p>Use <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">↑↓</kbd> to navigate sections</p>
        </motion.div>
      )}

      {/* Main Content */}
      {deviceType === "desktop" ? (
        // Desktop: Scrollable sections with bottom detection
        <div className="relative h-screen w-screen overflow-hidden">
          <AnimatePresence custom={direction} mode="wait" initial={false}>
            <motion.div
              key={activeSection}
              custom={direction}
              variants={desktopVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute top-0 left-0 w-full h-full"
            >
              <div
                ref={el => sectionRefs.current[activeSection] = el}
                className="h-full w-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100"
                style={{ scrollBehavior: 'smooth' }}
              >
                {sections[activeSection].component}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        // Mobile/Tablet: Natural vertical scroll
        <div className="relative">
          {sections.map((section, idx) => (
            <section
              key={section.id}
              id={section.id}
              className={`min-h-screen w-full ${idx === 0 ? "pt-0" : "py-20"}`}
            >
              {section.component}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;