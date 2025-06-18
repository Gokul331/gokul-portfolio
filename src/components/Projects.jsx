import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaDatabase } from "react-icons/fa";
import { SiPostman } from "react-icons/si";
const projects = [
  {
    title: "E-Commerce Website",
    technologies: ["React", "TailwindCSS", "Fetch API"],
    description:
      "Developed using React, TailwindCSS and API's for product listings and cart management. Integrated REST APIs for real-time data fetching.",
    icon: <FaReact className="text-blue-500 text-3xl" />,
  },
  {
    title: "Canteen Automation System",
    technologies: ["PEGA"],
    description:
      "Designed a low-code workflow automation system for order management. Reducing manual effort by 40%.",
    icon: <SiPostman className="text-purple-500 text-3xl" />,
  },
  {
    title: "IoT-Based Smart Irrigation System",
    technologies: ["IoT", "Cloud"],
    description:
      "Engineered an automated irrigation system using soil moisture sensors and cloud data logging. Optimized water usage by 30% for agricultural applications.",
    icon: <FaDatabase className="text-green-500 text-3xl" />,
  },
];
const Projects = ({darkMode}) => {
  return (
    <section
      id="projects"
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
            Featured Projects
          </h2>
          <p className={`${darkMode ?"text-gray-200": "text-gray-700"} max-w-2xl mx-auto`}>
            A selection of my recent work showcasing my skills in web
            development and automation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">{project.icon}</div>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {project.description}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
