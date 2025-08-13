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

function App() {
  const [currentBgColor, setCurrentBgColor] = useState("bg-white");
  const [activeSection, setActiveSection] = useState(0);
  const scrolling = useRef(false);
  const [direction, setDirection] = useState("right");
  const [deviceType, setDeviceType] = useState(() => {
    const width = window.innerWidth;
    if (width >= 1024) return "desktop";
    if (width >= 768) return "tablet";
    return "mobile";
  });

  const sections = [
    {
      id: "home",
      component: (
        <Hero
          bgColor={currentBgColor}
          isDesktop={deviceType === "desktop"}
          handleScrollDown={() => handleSectionChange(1)}
        />
      ),
    },
    { id: "about", component: <About bgColor={currentBgColor} /> },
    { id: "projects", component: <Projects bgColor={currentBgColor} /> },
    { id: "skills", component: <Skills bgColor={currentBgColor} /> },
    { id: "education", component: <Education bgColor={currentBgColor} /> },
    { id: "contact", component: <Contact bgColor={currentBgColor} /> },
  ];

  const handleColorChange = useCallback(
    (color) => setCurrentBgColor(color),
    []
  );

  const handleSectionChange = useCallback(
    (idx) => {
      if (idx === activeSection) return;
      setDirection(idx > activeSection ? "right" : "left");
      setActiveSection(idx);

      if (deviceType === "desktop") return;

      // For mobile/tablet, scroll to section with offset for navbar
      const element = document.getElementById(sections[idx].id);
      if (element) {
        const yOffset = -80; // Adjust for navbar height
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    [activeSection, deviceType, sections]
  );

  // Detect screen size change
  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      if (width >= 1024) setDeviceType("desktop");
      else if (width >= 768) setDeviceType("tablet");
      else setDeviceType("mobile");
    };

    window.addEventListener("resize", updateDeviceType);
    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

  // Navigation for desktop (wheel and keyboard)
  useEffect(() => {
    if (deviceType !== "desktop") return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (scrolling.current) return;

      if (e.deltaY > 0 && activeSection < sections.length - 1) {
        setDirection("right");
        scrolling.current = true;
        setActiveSection((prev) => prev + 1);
      } else if (e.deltaY < 0 && activeSection > 0) {
        setDirection("left");
        scrolling.current = true;
        setActiveSection((prev) => prev - 1);
      }

      setTimeout(() => (scrolling.current = false), 1500);
    };

    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" && activeSection < sections.length - 1) {
        e.preventDefault();
        setDirection("right");
        setActiveSection((prev) => prev + 1);
      } else if (e.key === "ArrowUp" && activeSection > 0) {
        e.preventDefault();
        setDirection("left");
        setActiveSection((prev) => prev - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [deviceType, activeSection, sections.length]);

  // Track scroll position for mobile/tablet to update active section
  useEffect(() => {
    if (deviceType === "desktop") return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const navbarHeight = 80; // Adjust based on your navbar height

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollPosition - navbarHeight;
          const elementBottom = elementTop + rect.height;

          // Check if element is in the middle third of the viewport
          if (
            scrollPosition + windowHeight * 0.33 >= elementTop &&
            scrollPosition + windowHeight * 0.66 <= elementBottom
          ) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [deviceType, sections]);

  const currentTheme = colorTheme[currentBgColor] || colorTheme["bg-white"];

  const desktopVariants = {
    initial: (dir) => ({
      opacity: 0,
      x: dir === "right" ? 100 : -100,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir === "right" ? -100 : 100,
    }),
  };

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
      />

      {/* Section indicators */}
      <div className="fixed right-6 top-1/2 z-40 flex flex-col gap-3 -translate-y-1/2">
        {sections.map((section, idx) => (
          <button
            key={section.id}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              idx === activeSection
                ? "bg-blue-500 border-blue-500 scale-125"
                : "bg-gray-300 border-gray-400"
            }`}
            aria-label={section.id}
            onClick={() => handleSectionChange(idx)}
          />
        ))}
      </div>

      {deviceType === "desktop" ? (
        // Desktop: Horizontal animation with wheel and keyboard nav
        <div className="relative h-screen w-screen overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeSection}
              custom={direction}
              variants={desktopVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute top-0 left-0 w-full h-full"
            >
              {sections[activeSection].component}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        // Mobile/Tablet: Natural vertical scroll with section tracking
        <div className="relative">
          {sections.map((section, idx) => (
            <section
              key={section.id}
              id={section.id}
              className={`min-h-screen w-full py-20 ${idx === 0 ? "pt-0" : ""}`}
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
