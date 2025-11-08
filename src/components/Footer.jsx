import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { colorTheme } from "../theme"; // Import your theme file

const Footer = ({ bgColor }) => {
  const theme = colorTheme[bgColor] || colorTheme["bg-white"];

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
    },
    {
      icon: <FaLinkedin className="text-xl" />,
      url: "https://www.linkedin.com/in/gokul-palanisamy-422b6b363/",
      label: "LinkedIn",
    },

    {
      icon: <FaEnvelope className="text-xl" />,
      url: "mailto:gokulece303@gmail.com",
      label: "Email",
    },
    {
      icon: <SiLeetcode className="text-xl" />,
      url: "https://www.leetcode.com/Gokul0331",
      label: "LeetCode",
    },
  ];

  return (
    <footer
      className={`mt-24 md:mt-48 bg-gradient-to-br ${theme.navBg} border-t `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Social Links */}
          <div className="flex space-x-6 mb-6 md:mb-0">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`${theme.textSecondary} hover:${theme.textAccent} transition-colors duration-200`}
                aria-label={link.label}
                title={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div
            className={`text-center md:text-left ${theme.textSecondary} mb-6 md:mb-0`}
          >
            <p>
              © {new Date().getFullYear()} Gokul Palanisamy. All rights
              reserved.
            </p>
          </div>
        </div>

        {/* Attribution (optional) */}
        <div className={`mt-8 text-center text-sm ${theme.textSecondary}`}>
          <p>Built with React, Tailwind CSS, and Framer Motion</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
