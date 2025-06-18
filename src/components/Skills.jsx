import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaJava, FaPython, FaDatabase } from "react-icons/fa";
import {
  SiPostman,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss3,
} from "react-icons/si";
const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};
const skills = {
  frontend: [
    { name: "HTML5", icon: <SiHtml5 className="text-orange-500" /> },
    { name: "CSS3", icon: <SiCss3 className="text-blue-500" /> },
    {
      name: "JavaScript",
      icon: <SiJavascript className="text-yellow-500" />,
    },
    { name: "React", icon: <FaReact className="text-blue-400" /> },
    {
      name: "TailwindCSS",
      icon: <SiTailwindcss className="text-cyan-500" />,
    },
  ],
  backend: [
    { name: "Python", icon: <FaPython className="text-blue-600" /> },
    { name: "Java", icon: <FaJava className="text-red-500" /> },
    { name: "MySQL", icon: <FaDatabase className="text-blue-500" /> },
    { name: "REST APIs", icon: "🌐" },
  ],
  tools: [
    { name: "Pega", icon: <SiPostman className="text-purple-600" /> },
    { name: "Git", icon: "🐙" },
    { name: "Figma", icon: "🎨" },
    { name: "Excel", icon: "📊" },
    { name: "Power BI", icon: "📈" },
  ],
  certifications: [
    "Java Full Stack Certification",
    "MySQL - HackerRank",
    "CSA | CSSSA – PEGA",
  ],
};
const Skills = ({darkMode}) => {
  return (
    <section
      id="skills"
      className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & Expertise
          </h2>
          <p className={`${darkMode ? "text-gray-200": "text-gray-800"} max-w-2xl mx-auto`}>
            The technologies and tools I work with to create exceptional
            solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <FaReact className="text-blue-500 mr-3" />
              Frontend Development
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.frontend.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="mr-3 text-xl">{skill.icon}</div>
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <FaDatabase className="text-green-500 mr-3" />
              Backend & Databases
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.backend.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="mr-3 text-xl">{skill.icon}</div>
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <SiPostman className="text-purple-500 mr-3" />
              Tools & Certifications
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {skills.tools.map((tool, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="mr-3 text-xl">{tool.icon}</div>
                    <span>{tool.name}</span>
                  </motion.div>
                ))}
              </div>
              <div>
                <h4 className="font-medium mb-3">Certifications</h4>
                <ul className="space-y-3">
                  {skills.certifications.map((cert, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-start"
                    >
                      <span className="text-yellow-500 mr-2">•</span>
                      <span>{cert}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
