import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaHeart } from "react-icons/fa";
import { SiLeetcode, SiReact, SiTailwindcss, SiFramer } from "react-icons/si";
import { colorTheme } from "../theme";
import { useState, useEffect } from "react";

const Footer = ({ bgColor }) => {
  const theme = colorTheme[bgColor] || colorTheme["bg-white"];
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    {
      icon: <FaGithub className="text-xl" />,
      url: "https://github.com/Gokul331",
      label: "GitHub",
      color: "hover:text-gray-700 dark:hover:text-gray-300",
    },
    {
      icon: <FaLinkedin className="text-xl" />,
      url: "https://www.linkedin.com/in/gokul-palanisamy-422b6b363/",
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
    {
      icon: <FaEnvelope className="text-xl" />,
      url: "mailto:gokulece303@gmail.com",
      label: "Email",
      color: "hover:text-red-500",
    },
    {
      icon: <SiLeetcode className="text-xl" />,
      url: "https://www.leetcode.com/Gokul0331",
      label: "LeetCode",
      color: "hover:text-orange-500",
    },
  ];

  const techStack = [
    { icon: <SiReact className="text-lg" />, name: "React", color: "text-cyan-400" },
    { icon: <SiTailwindcss className="text-lg" />, name: "Tailwind CSS", color: "text-sky-400" },
    { icon: <SiFramer className="text-lg" />, name: "Framer Motion", color: "text-purple-400" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl border ${theme.button} backdrop-blur-sm`}
            aria-label="Scroll to top"
          >
            <FaArrowUp className="text-lg" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className={`mt-24 md:mt-48 border-t ${theme.border} ${theme.background} backdrop-blur-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="text-center md:text-left">
              <h3 className={`text-xl font-bold ${theme.textPrimary} mb-4`}>
                Gokul Palanisamy
              </h3>
              <p className={`${theme.textSecondary} leading-relaxed max-w-md`}>
                Full-stack developer passionate about creating beautiful, functional, 
                and user-friendly web applications.
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="text-center">
              <h4 className={`text-lg font-semibold ${theme.textPrimary} mb-4`}>
                Let's Connect
              </h4>
              <div className="flex justify-center space-x-6">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    whileHover={{ 
                      y: -4,
                      scale: 1.1,
                      transition: { type: "spring", stiffness: 400 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 rounded-2xl border ${theme.border} ${theme.textSecondary} ${link.color} transition-all duration-300 backdrop-blur-sm hover:shadow-lg`}
                    aria-label={link.label}
                    title={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div variants={itemVariants} className="text-center md:text-right">
              <h4 className={`text-lg font-semibold ${theme.textPrimary} mb-4`}>
                Built With
              </h4>
              <div className="flex justify-center md:justify-end space-x-4">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className={tech.color}>{tech.icon}</span>
                    <span className={`text-sm ${theme.textSecondary} hidden sm:inline`}>
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className={`h-px w-full ${theme.border} my-8`}
          />

          {/* Bottom Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            {/* Copyright */}
            <div className={`text-center md:text-left ${theme.textSecondary}`}>
              <p className="flex items-center justify-center md:justify-start space-x-1">
                <span>© {new Date().getFullYear()} Gokul Palanisamy.</span>
                <span>All rights reserved.</span>
              </p>
            </div>

            {/* Made with love */}
            <div className={`flex items-center space-x-2 ${theme.textSecondary}`}>
              <span className="text-sm">Made with</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaHeart className="text-red-500" />
              </motion.div>
              <span className="text-sm">and lots of coffee</span>
            </div>

            {/* Quick Links */}
            <div className="flex space-x-6 text-sm">
              <motion.a
                href="#home"
                className={`${theme.textSecondary} hover:${theme.textPrimary} transition-colors duration-200`}
                whileHover={{ y: -2 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Home
              </motion.a>
              <motion.a
                href="#contact"
                className={`${theme.textSecondary} hover:${theme.textPrimary} transition-colors duration-200`}
                whileHover={{ y: -2 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact
              </motion.a>
            </div>
          </motion.div>

          {/* Attribution */}
          <motion.div
            variants={itemVariants}
            className={`mt-8 text-center text-sm ${theme.textSecondary} opacity-75`}
          >
            <p>Designed and developed with modern web technologies</p>
          </motion.div>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;