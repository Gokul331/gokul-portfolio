// components/Hero.js
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { colorTheme } from "../theme";

// ✅ Custom hook for typewriter effect
function useTypewriter(roles) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [pause, setPause] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex].title;

    if (pause) return;

    if (!isDeleting && typedRole.length < currentRole.length) {
      timeoutRef.current = setTimeout(() => {
        setTypedRole(currentRole.substring(0, typedRole.length + 1));
      }, 120);
    } else if (!isDeleting && typedRole.length === currentRole.length) {
      timeoutRef.current = setTimeout(() => {
        setPause(true);
        setTimeout(() => {
          setPause(false);
          setIsDeleting(true);
        }, 1200);
      }, 400);
    } else if (isDeleting && typedRole.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setTypedRole(typedRole.substring(0, typedRole.length - 1));
      }, 60);
    } else if (isDeleting && typedRole.length === 0) {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev === roles.length - 1 ? 0 : prev + 1));
    }

    return () => clearTimeout(timeoutRef.current);
  }, [typedRole, isDeleting, pause, currentRoleIndex, roles]);

  return { typedRole, isDeleting, pause, currentRoleIndex };
}

const Hero = ({ bgColor }) => {
  const roles = [
    {
      title: "Web Developer",
      desc: "I build responsive and interactive web applications.",
    },
    {
      title: "UI/UX Designer",
      desc: "I design user-friendly interfaces and experiences.",
    },
    {
      title: "Python Developer",
      desc: "I develop software solutions to solve complex problems.",
    },
  ];

  const colorThemes = colorTheme;
  const currentTheme = colorThemes[bgColor] || colorThemes["bg-white"];

  const { typedRole, isDeleting, pause, currentRoleIndex } =
    useTypewriter(roles);

  return (
    <div
      className={`min-h-screen my-auto bg-gradient-to-br ${currentTheme.gradient} flex items-center`}
      id="home"
    >
      <div className="container mx-auto px-4 pt-12">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Left Side */}
          <motion.div
            className="w-full lg:w-3/5 flex flex-col justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className={`text-4xl md:text-5xl font-bold ${currentTheme.textPrimary} mb-4`}
            >
              Hi, I'm Gokul Palanisamy
            </h1>
            <p
              className={`text-lg md:text-xl mb-6 ${currentTheme.textSecondary}`}
            >
              Turning ideas into scalable, high-performance web applications
              with clean code and stunning UI.
            </p>

            {/* Typewriter */}
            <div className="mb-4 h-12 flex items-center">
              <span
                className={`text-2xl md:text-3xl font-bold ${currentTheme.textPrimary}`}
              >
                {typedRole}
              </span>
              <span
                className={`ml-1 inline-block w-1 h-8 ${currentTheme.cursor} ${
                  !isDeleting && !pause ? "animate-blink" : ""
                }`}
              ></span>
            </div>
            <p
              className={`text-md md:text-lg ${currentTheme.textSecondary} mb-8`}
            >
              {roles[currentRoleIndex].desc}
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg ${currentTheme.button}`}
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View My Work
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg ${currentTheme.buttonOutline}`}
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact Me
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-5 mt-6">
              <a
                href="https://github.com/Gokul331"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={currentTheme.icon}
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://linkedin.com/in/gokul-palanisamy-422b6b363"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={currentTheme.icon}
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="mailto:gokulece303@gmail.com"
                aria-label="Email"
                className={currentTheme.icon}
              >
                <FaEnvelope size={24} />
              </a>
              <a
                href="https://www.leetcode.com/Gokul0331"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                className={currentTheme.icon}
              >
                <SiLeetcode size={24} />
              </a>
            </div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            className="w-full lg:w-2/5 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative rounded-xl p-6 md:p-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-blue-500/20 rounded-xl blur-2xl -z-10"></div>
              {/* ✅ Fixed image path */}
              <img
                src="/Projects/Project1/Ecommerce1.webp"
                alt="Profile showcasing a web project"
                className="rounded-lg shadow-xl w-full max-w-md"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-12">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className={`${currentTheme.textSecondary} cursor-pointer`}
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            ↓ Scroll Down
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
