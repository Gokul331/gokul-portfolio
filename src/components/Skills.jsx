import React, { useState, useEffect } from "react";
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
import { color } from "framer-motion";
const Skills = ({ bgColor }) => {
  const [pausedCategory, setPausedCategory] = useState(null);
  const [rotationAngles, setRotationAngles] = useState({
    Frontend: 0,
    Backend: 0,
    Tools: 0,
  });

  useEffect(() => {
    const animationIds = [];
    const rotationSpeed = 0.5; // degrees per frame

    const animate = (timestamp, lastTimestamp, category) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;

      if (pausedCategory !== category) {
        setRotationAngles((prev) => ({
          ...prev,
          [category]: (prev[category] + (rotationSpeed * deltaTime) / 16) % 360,
        }));
      }

      animationIds[category] = requestAnimationFrame((ts) =>
        animate(ts, timestamp, category)
      );
    };

    // Start animation for each category
    Object.keys(rotationAngles).forEach((category) => {
      animationIds[category] = requestAnimationFrame((ts) =>
        animate(ts, 0, category)
      );
    });

    return () => {
      // Clean up all animations
      Object.values(animationIds).forEach((id) => cancelAnimationFrame(id));
    };
  }, [pausedCategory]);

  const colorThemes = colorTheme;

  const currentTheme = colorThemes[bgColor] || colorThemes["bg-white"];

  const skillCategories = [
    {
      name: "Frontend",
      skills: [
        {
          name: "React",
          icon: <FaReact className="text-[#61DAFB]" size={28} />,
        },
        {
          name: "JavaScript",
          icon: <SiJavascript className="text-[#F7DF1E]" size={28} />,
        },
        {
          name: "HTML5",
          icon: <DiHtml5 className="text-[#E44D26]" size={28} />,
        },
        { name: "CSS3", icon: <DiCss3 className="text-[#2965F1]" size={28} /> },
        {
          name: "TypeScript",
          icon: <SiTypescript className="text-[#3178C6]" size={28} />,
        },
        {
          name: "Tailwind",
          icon: <SiTailwindcss className="text-[#06B6D4]" size={28} />,
        },
      ],
    },
    {
      name: "Backend",
      skills: [
        {
          name: "Node.js",
          icon: <FaNodeJs className="text-[#68A063]" size={28} />,
        },
        {
          name: "Python",
          icon: <FaPython className="text-[#3776AB]" size={28} />,
        },
        {
          name: "Express",
          icon: <SiExpress className="text-green-400" size={28} />,
        },
        {
          name: "MongoDB",
          icon: <SiMongodb className="text-[#47A248]" size={28} />,
        },
        {
          name: "MySQL",
          icon: <SiMysql className="text-[#336791]" size={28} />,
        },
        {
          name: "Django",
          icon: <SiDjango className="text-[#092E20]" size={28} />,
        },
      ],
    },
    {
      name: "Tools",
      skills: [
        {
          name: "Git",
          icon: <FaGitAlt className="text-[#F05032]" size={28} />,
        },
        {
          name: "Power BI",
          icon: <MdOutlineInsertChart className="text-[#F2C811]" size={28} />,
        },
        {
          name: "VS Code",
          icon: <DiVisualstudio className="text-[#007ACC]" size={28} />,
        },
        {
          name: "Figma",
          icon: <SiFigma className="text-[#F24E1E]" size={28} />,
        },
        {
          name: "Postman",
          icon: <SiPostman className="text-[#FF6C37]" size={28} />,
        },
        {
          name: "Jupyter Notebook",
          icon: <SiJupyter className="text-[#FF0000]" size={28} />,
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
    },
    {
      name: "Pega Certified System Architect (PCSA)",
      issuer: "PEGA",
      year: "2023",
      link: "https://accounts.pega.com/profile/GOKULP16763953/share/BPEGACPSA88V1-PEGACPSA88V1",
    },
    {
      name: "MySQL (Advanced)",
      issuer: "HackerRank",
      year: "2024",
      link: "https://www.hackerrank.com/certificates/118f1ad211db",
    },
    {
      name: "MS Excel",
      issuer: "GUVI",
      year: "2024",
      link: "https://www.guvi.in/share-certificate/k92G12918Cu17Jl4v5",
    },
  ];

  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br ${currentTheme.gradient} transition-colors duration-500`}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-3xl font-bold text-center ${currentTheme.textPrimary} mb-12`}
        >
          Skills & Certifications
        </h2>

        <div className="flex flex-wrap place-content-center gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className={`p-6 rounded-xl ${currentTheme.background} ${currentTheme.circleBorder} ${currentTheme.hover} flex flex-col items-center transition duration-500 hover:shadow-2xl hover:scale-105 border-2 `}
              onMouseEnter={() => setPausedCategory(category.name)}
              onMouseLeave={() => setPausedCategory(null)}
            >
              <h3
                className={`text-xl font-bold mb-12 text-center ${currentTheme.textPrimary}`}
              >
                {category.name}
              </h3>
              <div className="relative w-80 h-64 mx-auto">
                {/* Center circle */}
                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center rounded-full border-2 border-dashed ${currentTheme.inner_circle} opacity-30`}
                ></div>

                {/* Rotating skill icons */}
                {category.skills.map((skill, idx) => {
                  const count = category.skills.length;
                  const angle =
                    (2 * Math.PI * idx) / count +
                    (rotationAngles[category.name] * Math.PI) / 180;
                  const radius = 110;
                  const x = radius * Math.cos(angle);
                  const y = radius * Math.sin(angle);

                  return (
                    <div
                      key={skill.name}
                      className={`absolute flex flex-col items-center justify-center w-20 h-20 ${currentTheme.circleBg} border ${currentTheme.circleBorder} rounded-full shadow transition-all duration-300 hover:scale-105 cursor-pointer`}
                      style={{
                        left: `calc(50% + ${x}px - 2.5rem)`,
                        top: `calc(50% + ${y}px - 2.5rem)`,
                        zIndex: 10,
                        transition:
                          pausedCategory === category.name
                            ? "none"
                            : "all 0s ease-in-out",
                      }}
                    >
                      <div className="mb-1">{skill.icon}</div>
                      <span
                        className={`text-xs text-center ${currentTheme.textPrimary}`}
                      >
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div
          className={`mt-12 p-6 rounded-xl ${currentTheme.circleBg} shadow-lg`}
        >
          <h3
            className={`text-xl font-bold mb-6 text-center ${currentTheme.textPrimary}`}
          >
            Certifications
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <li
                key={index}
                role="listitem"
                className={`p-4 rounded-lg border ${currentTheme.circleBorder} hover:shadow-2xl transition-shadow cursor-pointer`}
                onClick={() => toggleCertExpand(index)}
                onKeyDown={(e) => e.key === "Enter" && toggleCertExpand(index)}
                tabIndex="0"
              >
                <div className="flex justify-between items-start">
                  <h4
                    className={`font-semibold ${currentTheme.textPrimary} flex-1`}
                  >
                    {cert.name}
                  </h4>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`View ${cert.name} certification`}
                  >
                    <div
                      className={`mt-2 text-sm ${currentTheme.textSecondary}`}
                    >
                      <button
                        className="mt-2 flex items-center"
                        onClick={() => window.open(cert.link, "_blank")}
                      >
                        <FaExternalLinkAlt className="ml-1" />
                      </button>
                    </div>
                  </a>
                </div>
                <div className="flex justify-between mt-2">
                  <span className={`text-sm ${currentTheme.textSecondary}`}>
                    {cert.issuer}
                  </span>
                  <span className={`text-sm ${currentTheme.textSecondary}`}>
                    {cert.year}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skills;
