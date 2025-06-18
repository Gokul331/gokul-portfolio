import { FiDownload } from "react-icons/fi";
import { motion } from "framer-motion";

import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiAward,
} from "react-icons/fi";

const fadeInUp = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};
const Hero = ({ darkMode }) => {
  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">
              Full Stack Developer & PEGA Specialist
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${
              darkMode ? "text-white" : "text-gray-500"
            }`}
          >
            Building{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Digital Experiences
            </span>{" "}
            That Matter
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className={`text-xl max-w-2xl mx-auto mb-10 ${
              darkMode ? "text-gray-300" : "text-gray-600 "
            }`}
          >
            Expertise in Full-stack web development (React, Java, Python) and
            PEGA low-code automation (PCSA & PCSSA Certified).
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              href="#projects"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Me
            </motion.a>
            <motion.a
              href="/RESUME.pdf"
              download="Gokul_Resume.pdf"
              className="px-6 py-3 flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiDownload className="mr-2" />
              Download Resume
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all"
          >
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                <FiMail className="text-blue-600 dark:text-blue-400" />
              </span>
              Contact
            </h3>
            <ul className="space-y-3 text-gray-100">
              <li className="flex items-center ">
                <FiPhone className="mr-3 text-gray-100" />
                +91 87786 35855
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3 text-gray-100" />
                gokulece303@gmail.com
              </li>
              <li className="flex items-center">
                <FiMapPin className="mr-3 text-gray-100" />
                Namakkal, Tamil Nadu – 637018
              </li>
            </ul>
            <div className="mt-6 flex space-x-4">
              <motion.a
                href="#"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiLinkedin className="text-blue-600 dark:text-blue-400" />
              </motion.a>
              <motion.a
                href="#"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiGithub className="text-gray-800 dark:text-gray-200" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all"
          >
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3">
                <FiAward className="text-purple-600 dark:text-purple-400" />
              </span>
              Career Objective
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Passionate about building responsive web applications and
              optimizing workflows. Seeking to contribute technical skills to
              innovative projects while growing professionally.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                React
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                Java
              </span>
              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-xs font-medium">
                Python
              </span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium">
                PEGA
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
