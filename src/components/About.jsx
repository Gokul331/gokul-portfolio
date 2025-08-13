// components/About.jsx
import React from "react";
import { color, motion } from "framer-motion";
import { colorTheme } from "../theme";

const About = ({ bgColor }) => {
  const colorThemes = colorTheme;
  const currentTheme = colorThemes[bgColor] || colorThemes["bg-white"];

  const skills = [
    "JavaScript (ES6+)",
    "React + Vite",
    "Tailwind CSS",
    "Framer Motion",
    "Python",
    "Git & GitHub",
    "REST APIs",
    "UI/UX Design",
  ];

  return (
    <section
      id="about"
      className={`min-h-screen flex items-center my-auto overflow-hidden bg-gradient-to-br ${currentTheme.gradient} px-6 lg:px-16`}
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-pink-300/20 via-blue-300/20 to-purple-300/20 blur-3xl"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      ></motion.div>

      <div className="container relative z-10 mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center gap-12">
        {/* Profile Image */}
        <motion.div
          className="w-full lg:w-1/3 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="../public/Projects/Project1/Ecommerce1.webp"
            alt="Gokul Palanisamy"
            className="rounded-2xl shadow-xl w-72 h-72 object-cover border-4 border-white/30"
          />
        </motion.div>

        {/* About Content */}
        <motion.div
          className="w-full lg:w-2/3"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${currentTheme.textPrimary}`}
          >
            About Me
          </h2>
          <p className={`mb-6 leading-relaxed ${currentTheme.textSecondary}`}>
            I'm a passionate web developer with experience building modern,
            responsive, and user-friendly applications. My focus is on crafting
            performant solutions with clean code and engaging UI/UX. I thrive on
            learning new technologies and solving challenging problems.
          </p>

          {/* Skills */}
          <div className="mb-6">
            <h3
              className={`text-xl font-semibold mb-4 ${currentTheme.textPrimary}`}
            >
              Skills & Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${currentTheme.accentBg} ${currentTheme.textPrimary} shadow-md`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Resume Button */}
          <a
            href="../public/Resume/Resume.pdf"
            download
            className={`inline-block px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 ${currentTheme.button}`}
          >
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
