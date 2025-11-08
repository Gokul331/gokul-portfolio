import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiFigma,
  SiPostman,
  SiDjango,
  SiJupyter,
} from "react-icons/si";
import { DiHtml5, DiCss3, DiVisualstudio } from "react-icons/di";
import { MdOutlineInsertChart } from "react-icons/md";
import { colorTheme } from "../theme";
import { FiAward, FiCalendar, FiUser } from "react-icons/fi";

const Skills = ({ bgColor }) => {
  const [pausedCategory, setPausedCategory] = useState(null);
  const [expandedCert, setExpandedCert] = useState(null);
  const [rotationAngles, setRotationAngles] = useState({
    Frontend: 0,
    Backend: 0,
    Tools: 0,
  });
  const animationRefs = useRef({});

  useEffect(() => {
    const rotationSpeed = 0.3; // degrees per frame

    const animate = (timestamp, lastTimestamp, category) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;

      if (pausedCategory !== category) {
        setRotationAngles((prev) => ({
          ...prev,
          [category]: (prev[category] + (rotationSpeed * deltaTime) / 16) % 360,
        }));
      }

      animationRefs.current[category] = requestAnimationFrame((ts) =>
        animate(ts, timestamp, category)
      );
    };

    // Start animation for each category
    Object.keys(rotationAngles).forEach((category) => {
      animationRefs.current[category] = requestAnimationFrame((ts) =>
        animate(ts, 0, category)
      );
    });

    return () => {
      // Clean up all animations
      Object.values(animationRefs.current).forEach((id) => cancelAnimationFrame(id));
    };
  }, [pausedCategory]);

  const colorThemes = colorTheme;
  const currentTheme = colorThemes[bgColor] || colorThemes["bg-white"];

  const skillCategories = [
    {
      name: "Frontend",
      color: "from-blue-500 to-cyan-500",
      skills: [
        {
          name: "React",
          icon: <FaReact className="text-[#61DAFB]" size={32} />,
          level: 90,
        },
        {
          name: "JavaScript",
          icon: <SiJavascript className="text-[#F7DF1E]" size={32} />,
          level: 85,
        },
        {
          name: "HTML5",
          icon: <DiHtml5 className="text-[#E44D26]" size={32} />,
          level: 95,
        },
        { 
          name: "CSS3", 
          icon: <DiCss3 className="text-[#2965F1]" size={32} />,
          level: 90,
        },
        {
          name: "Tailwind",
          icon: <SiTailwindcss className="text-[#06B6D4]" size={32} />,
          level: 88,
        },
      ],
    },
    {
      name: "Backend",
      color: "from-green-500 to-emerald-500",
      skills: [
        {
          name: "Python",
          icon: <FaPython className="text-[#3776AB]" size={32} />,
          level: 85,
        },
        {
          name: "MongoDB",
          icon: <SiMongodb className="text-[#47A248]" size={32} />,
          level: 80,
        },
        {
          name: "MySQL",
          icon: <SiMysql className="text-[#336791]" size={32} />,
          level: 82,
        },
        {
          name: "Django",
          icon: <SiDjango className="text-[#092E20]" size={32} />,
          level: 78,
        },
      ],
    },
    {
      name: "Tools",
      color: "from-purple-500 to-pink-500",
      skills: [
        {
          name: "Git",
          icon: <FaGitAlt className="text-[#F05032]" size={32} />,
          level: 88,
        },
        {
          name: "VS Code",
          icon: <DiVisualstudio className="text-[#007ACC]" size={32} />,
          level: 95,
        },
        {
          name: "Figma",
          icon: <SiFigma className="text-[#F24E1E]" size={32} />,
          level: 75,
        },
        {
          name: "Postman",
          icon: <SiPostman className="text-[#FF6C37]" size={32} />,
          level: 85,
        },
        {
          name: "Jupyter",
          icon: <SiJupyter className="text-[#FF0000]" size={32} />,
          level: 80,
        },
      ],
    },
  ];

  const certifications = [
    {
      name: "Pega Certified Senior System Architect (PCSSA)",
      issuer: "PEGA",
      year: "2024",
      link: "https://accounts.pega.com/profile/GOKULP16763953/share/BPEGACPSSA88V-PEGACPSSA88V1",
      description: "Advanced certification in Pega platform design and development",
    },
    {
      name: "Pega Certified System Architect (PCSA)",
      issuer: "PEGA",
      year: "2023",
      link: "https://accounts.pega.com/profile/GOKULP16763953/share/BPEGACPSA88V1-PEGACPSA88V1",
      description: "Foundation certification in Pega system architecture",
    },
    {
      name: "MySQL (Advanced)",
      issuer: "HackerRank",
      year: "2024",
      link: "https://www.hackerrank.com/certificates/118f1ad211db",
      description: "Advanced MySQL database management and optimization",
    },
    {
      name: "MS Excel",
      issuer: "GUVI",
      year: "2024",
      link: "https://www.guvi.in/share-certificate/k92G12918Cu17Jl4v5",
      description: "Advanced Excel functions and data analysis",
    },
  ];

  const toggleCertExpand = (index) => {
    setExpandedCert(expandedCert === index ? null : index);
  };

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
      id="skills"
      className={`py-20 px-4 sm:px-6 lg:px-8 min-h-screen ${currentTheme.background} transition-colors duration-500`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-4xl md:text-5xl font-bold ${currentTheme.textPrimary} mb-4`}>
            Skills & <span className={currentTheme.accentText}>Certifications</span>
          </h2>
          <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
            A showcase of my technical expertise and professional certifications
          </p>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              className={`relative p-8 rounded-2xl ${currentTheme.cardBg} border ${currentTheme.border} backdrop-blur-sm hover:shadow-2xl transition-all duration-500 group`}
              onMouseEnter={() => setPausedCategory(category.name)}
              onMouseLeave={() => setPausedCategory(null)}
              whileHover={{ y: -10 }}
            >
              {/* Category Header */}
              <div className="text-center mb-12">
                <h3 className={`text-2xl font-bold ${currentTheme.textPrimary} mb-2`}>
                  {category.name}
                </h3>
                <div className={`w-20 h-1 bg-gradient-to-r ${category.color} rounded-full mx-auto`} />
              </div>

              {/* Desktop: Rotating Layout */}
              <div className="hidden md:block relative w-full h-80 mx-auto">
                {/* Center Circle */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center rounded-full border-2 border-dashed border-white/20 opacity-30">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${category.color} opacity-60`} />
                </div>

                {/* Rotating Skill Icons */}
                {category.skills.map((skill, idx) => {
                  const count = category.skills.length;
                  const angle =
                    (2 * Math.PI * idx) / count +
                    (rotationAngles[category.name] * Math.PI) / 180;
                  const radius = 140;
                  const x = radius * Math.cos(angle);
                  const y = radius * Math.sin(angle);

                  return (
                    <motion.div
                      key={skill.name}
                      className={`absolute flex flex-col items-center justify-center w-24 h-24 ${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl shadow-lg backdrop-blur-sm cursor-pointer group/skill`}
                      style={{
                        left: `calc(50% + ${x}px - 3rem)`,
                        top: `calc(50% + ${y}px - 3rem)`,
                        zIndex: 10,
                      }}
                      whileHover={{ scale: 1.1, zIndex: 20 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="mb-2 group-hover/skill:scale-110 transition-transform duration-300">
                        {skill.icon}
                      </div>
                      <span className={`text-sm font-medium text-center ${currentTheme.textPrimary}`}>
                        {skill.name}
                      </span>
                      
                      {/* Skill Level Bar */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-300 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${category.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile: Static Grid */}
              <div className="md:hidden grid grid-cols-2 gap-4">
                {category.skills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    className={`flex flex-col items-center justify-center p-4 ${currentTheme.cardBg} border ${currentTheme.border} rounded-xl shadow-sm backdrop-blur-sm`}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="mb-2">{skill.icon}</div>
                    <span className={`text-sm font-medium text-center ${currentTheme.textPrimary}`}>
                      {skill.name}
                    </span>
                    <div className="w-full h-1 bg-gray-300 rounded-full mt-2 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${category.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`p-8 rounded-2xl ${currentTheme.cardBg} border ${currentTheme.border} backdrop-blur-sm`}
        >
          <div className="text-center mb-8">
            <h3 className={`text-3xl font-bold ${currentTheme.textPrimary} mb-4 flex items-center justify-center gap-3`}>
              <FiAward className={currentTheme.accentText} />
              Professional Certifications
            </h3>
            <p className={`${currentTheme.textSecondary} max-w-2xl mx-auto`}>
              Validating my expertise through industry-recognized certifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                  expandedCert === index 
                    ? `${currentTheme.accentBg} border-blue-500/50 shadow-2xl` 
                    : `${currentTheme.cardBg} ${currentTheme.border} hover:shadow-xl`
                }`}
                onClick={() => toggleCertExpand(index)}
                onKeyDown={(e) => e.key === "Enter" && toggleCertExpand(index)}
                tabIndex="0"
                whileHover={{ y: -5 }}
                layout
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h4 className={`font-bold text-lg mb-2 ${currentTheme.textPrimary}`}>
                      {cert.name}
                    </h4>
                    
                    <div className="flex items-center gap-4 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <FiUser className={currentTheme.textSecondary} />
                        <span className={currentTheme.textSecondary}>{cert.issuer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCalendar className={currentTheme.textSecondary} />
                        <span className={currentTheme.textSecondary}>{cert.year}</span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedCert === index && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className={`text-sm ${currentTheme.textSecondary} mb-4 leading-relaxed`}
                        >
                          {cert.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`View ${cert.name} certification`}
                    className={`p-3 rounded-lg border ${currentTheme.border} hover:bg-white/10 transition-colors`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaExternalLinkAlt className={currentTheme.textPrimary} />
                  </motion.a>
                </div>

                {/* Expand/Collapse Indicator */}
                <div className="flex justify-between items-center mt-4">
                  <motion.span
                    className={`text-xs font-medium ${
                      expandedCert === index ? currentTheme.accentText : currentTheme.textSecondary
                    }`}
                    animate={{ rotate: expandedCert === index ? 180 : 0 }}
                  >
                    {expandedCert === index ? "Show Less" : "Show More"}
                  </motion.span>
                  
                  <motion.div
                    animate={{ rotate: expandedCert === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-2 h-2 border-r-2 border-b-2 border-current transform rotate-45" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;