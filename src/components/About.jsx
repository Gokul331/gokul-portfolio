import React from "react";
import { motion } from "framer-motion";
import { colorTheme } from "../theme";
import { FiDownload, FiCode, FiTool, FiAward } from "react-icons/fi";

const About = ({ bgColor }) => {
  const colorThemes = colorTheme;
  const currentTheme = colorThemes[bgColor] || colorThemes["bg-white"];

  const skills = [
    { name: "JavaScript (ES6+)", category: "frontend" },
    { name: "React + Vite", category: "frontend" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "Framer Motion", category: "frontend" },
    { name: "Python", category: "backend" },
    { name: "MongoDB", category: "backend" },
    { name: "REST APIs", category: "backend" },
    { name : "Jupyter Notebook", category : "tools"},
    { name : "Pega", category : "tools"},
    { name: "Git & GitHub", category: "tools" },
    { name: "UI/UX Design", category: "tools" },
    { name: "Responsive Design", category: "frontend" },
   
  ];

  const stats = [
    { number: "10+", label: "Projects Completed" },
    { number: "2+", label: "Years Learning" },
    { number: "5+", label: "Technologies" },
    { number: "100%", label: "Passionate" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="about"
      className={`min-h-screen flex items-center relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8`}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${i % 3 === 0 ? 'bg-blue-400/20' : i % 3 === 1 ? 'bg-purple-400/20' : 'bg-pink-400/20'}`}
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Profile Image Section */}
          <motion.div
            className="lg:col-span-5 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Main Profile Image */}
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/Projects/Project1/Ecommerce1.webp"
                  alt="Gokul Palanisamy"
                  className="w-80 h-80 object-cover rounded-2xl border-4 border-white/20 backdrop-blur-sm"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                
                {/* Status Indicator */}
                <motion.div
                  className="absolute bottom-4 right-4 flex items-center gap-2 bg-green-500/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                  Available for work
                </motion.div>
              </motion.div>

              {/* Floating Tech Icons */}
              <motion.div
                className="absolute -top-4 -left-4 bg-white/10 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <FiCode className="text-2xl text-blue-400" />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <FiTool className="text-2xl text-purple-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="lg:col-span-7 space-y-8"
            variants={itemVariants}
          >
            {/* Header */}
            <div>
              <motion.h2
                className={`text-4xl md:text-5xl font-bold mb-4 ${currentTheme.textPrimary}`}
                variants={itemVariants}
              >
                About <span className={currentTheme.accentText}>Me</span>
              </motion.h2>
              
              <motion.p
                className={`text-lg leading-relaxed mb-6 ${currentTheme.textSecondary}`}
                variants={itemVariants}
              >
                I'm a passionate <span className="font-semibold text-blue-400">Full-Stack Developer</span> with expertise in building modern, responsive, and user-friendly applications. I specialize in creating performant solutions with clean code and engaging UI/UX experiences.
              </motion.p>
              
             
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={`text-center p-4 rounded-xl ${currentTheme.cardBg} border ${currentTheme.border} backdrop-blur-sm`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`text-2xl font-bold ${currentTheme.accentText} mb-1`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm ${currentTheme.textSecondary}`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Skills */}
            <motion.div variants={itemVariants}>
              <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${currentTheme.textPrimary}`}>
                <FiAward className={currentTheme.accentText} />
                Skills & Technologies
              </h3>
              
              <div className="space-y-4">
                {['frontend', 'backend', 'tools'].map((category) => (
                  <div key={category}>
                    <h4 className={`text-sm font-semibold mb-2 uppercase tracking-wider ${currentTheme.textSecondary} opacity-70`}>
                      {category}
                    </h4>
                    <div className={`flex flex-wrap gap-2 mb-4 ${currentTheme.textPrimary}`}>
                      {skills
                        .filter(skill => skill.category === category)
                        .map((skill, index) => (
                          <motion.span
                            key={index}
                            className={`px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm border ${currentTheme.border} ${currentTheme.cardBg} hover:shadow-lg transition-all duration-300`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {skill.name}
                          </motion.span>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <motion.a
                href="/Resume/Resume.pdf"
                download
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${currentTheme.button}`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload className="text-lg" />
                Download Resume
              </motion.a>
              
              <motion.a
                href="#contact"
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold border-2 ${currentTheme.border} ${currentTheme.textPrimary} hover:bg-white/10 transition-all duration-300 backdrop-blur-sm`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;