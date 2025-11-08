import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FiDownload } from "react-icons/fi";
import { colorTheme } from "../theme";

// ✅ Enhanced Custom hook for typewriter effect
function useTypewriter(roles) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [pause, setPause] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex].title;

    if (pause) return;

    if (!isDeleting && typedRole.length < currentRole.length) {
      timeoutRef.current = setTimeout(() => {
        setTypedRole(currentRole.substring(0, typedRole.length + 1));
        setCharIndex(prev => prev + 1);
      }, 120);
    } else if (!isDeleting && typedRole.length === currentRole.length) {
      timeoutRef.current = setTimeout(() => {
        setPause(true);
        setTimeout(() => {
          setPause(false);
          setIsDeleting(true);
        }, 1500);
      }, 500);
    } else if (isDeleting && typedRole.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setTypedRole(typedRole.substring(0, typedRole.length - 1));
        setCharIndex(prev => prev - 1);
      }, 60);
    } else if (isDeleting && typedRole.length === 0) {
      setIsDeleting(false);
      setCharIndex(0);
      setCurrentRoleIndex((prev) => (prev === roles.length - 1 ? 0 : prev + 1));
    }

    return () => clearTimeout(timeoutRef.current);
  }, [typedRole, isDeleting, pause, currentRoleIndex, roles]);

  return { typedRole, isDeleting, pause, currentRoleIndex, charIndex };
}

const Hero = ({ bgColor }) => {
  const roles = [
    {
      title: "Full-Stack Developer",
      desc: "I build responsive and interactive web applications with modern technologies.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "UI/UX Designer",
      desc: "I design user-friendly interfaces and engaging digital experiences.",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Python Developer",
      desc: "I develop efficient software solutions to solve complex problems.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const colorThemes = colorTheme;
  const currentTheme = colorThemes[bgColor] || colorThemes["bg-white"];
  const { typedRole, isDeleting, pause, currentRoleIndex, charIndex } = useTypewriter(roles);

  // Floating animation for background elements
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden bg-gradient-to-br ${currentTheme.gradient} flex items-center justify-center`}
      id="home"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-300/10 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Content */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Welcome Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              
            >
              <span className={`text-2xl sm:text-xl pl-1 font-semibold ${currentTheme.accentText}`}>
                Hello, I'm
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold ${currentTheme.textPrimary} mb-4 lg:mb-6 leading-tight`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Gokul <span className={currentTheme.accentText}>Palanisamy</span>
            </motion.h1>

            {/* Typewriter Section */}
            <motion.div
              className="mb-4 lg:mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-center lg:justify-start flex-wrap">
                <span className={`text-xl sm:text-2xl lg:text-3xl font-semibold ${currentTheme.textSecondary} mr-3`}>
                  I'm a
                </span>
                <div className="relative">
                  <span
                    className={`text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r ${roles[currentRoleIndex].color} bg-clip-text text-transparent`}
                  >
                    {typedRole}
                  </span>
                  <span
                    className={`ml-1 inline-block w-0.5 h-8 bg-gradient-to-b ${roles[currentRoleIndex].color} ${
                      !isDeleting && !pause ? "animate-pulse" : ""
                    }`}
                  ></span>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              className={`text-lg sm:text-xl lg:text-2xl ${currentTheme.textSecondary} mb-8 lg:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {roles[currentRoleIndex].desc}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.button
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-xl transition-all duration-300 ${currentTheme.button} group`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("projects")}
              >
                <span>View My Work</span>
                <FaArrowDown className="group-hover:translate-y-1 transition-transform duration-300" />
              </motion.button>

              <motion.button
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg border-2 ${currentTheme.border} ${currentTheme.textPrimary} hover:bg-white/10 transition-all duration-300 backdrop-blur-sm group`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
              >
                <span>Get In Touch</span>
              </motion.button>

              <motion.a
                href="/Resume/Resume.pdf"
                download
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold text-lg ${currentTheme.textPrimary} hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border ${currentTheme.border} group`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload className="text-lg group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Resume</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-6 justify-center lg:justify-start items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {[
                { icon: FaGithub, href: "https://github.com/Gokul331", label: "GitHub" },
                { icon: FaLinkedin, href: "https://linkedin.com/in/gokul-palanisamy-422b6b363", label: "LinkedIn" },
                { icon: FaEnvelope, href: "mailto:gokulece303@gmail.com", label: "Email" },
                { icon: SiLeetcode, href: "https://www.leetcode.com/Gokul0331", label: "LeetCode" },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`p-3 rounded-xl backdrop-blur-sm border ${currentTheme.border} ${currentTheme.icon} hover:scale-110 hover:shadow-lg transition-all duration-300 group`}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <social.icon className="text-xl group-hover:scale-110 transition-transform" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            className="w-full lg:w-1/2 flex justify-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <motion.img
                  src="/Projects/Project1/Ecommerce1.webp"
                  alt="Gokul Palanisamy - Web Developer"
                  className="w-80 h-80 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] object-cover rounded-3xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/20"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-2xl">🚀</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/20"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <div className="text-2xl">💻</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex justify-center mt-12 lg:mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            className={`flex flex-col items-center gap-2 ${currentTheme.textSecondary} hover:${currentTheme.textPrimary} transition-colors duration-300 group`}
            onClick={() => scrollToSection("about")}
            whileHover={{ y: 5 }}
          >
            <span className="text-sm font-medium">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className={`p-2 rounded-full border ${currentTheme.border} group-hover:scale-110 transition-transform`}
            >
              <FaArrowDown className="text-sm" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;