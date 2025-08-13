import { motion } from "framer-motion";
import { FiBook, FiAward, FiCalendar, FiMapPin } from "react-icons/fi";
import { colorTheme } from "../theme";

const Education = ({ bgColor }) => {
  // Define color themes matching your system
  const colorThemes = colorTheme;
  const currentTheme = colorThemes[bgColor] || colorThemes["bg-white"];

  const educationData = [
    {
      icon: <FiAward className={currentTheme.icon} />,
      institution: "M Kumarasamy College Of Engineering",
      location: "Karur, Tamil Nadu",
      degree: "BE - Electronics & Communication Engineering",
      score: "CGPA: 8.31",
      year: "August 2020 -- May 2024",
    },
    {
      icon: <FiBook className={currentTheme.icon} />,
      institution: "RGR Matic HR Sec School",
      location: "Namakkal, Tamil Nadu",
      degree: "Higher Secondary Certificate (HSC)",
      score: "Percentage: 77.7%",
      year: "June 2019 -- March 2020",
    },
    {
      icon: <FiBook className={currentTheme.icon} />,
      institution: "RGR Matic HR Sec School",
      location: "Namakkal, Tamil Nadu",
      degree: "Secondary School Leaving Certificate (SSLC)",
      score: "Percentage: 94.6%",
      year: "June 2017 -- April 2018",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-8 min-w-screen mx-auto bg-gradient-to-br ${currentTheme.gradient}`}
    >
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`text-3xl mx-auto font-bold text-center mb-12 ${currentTheme.textPrimary}`}
      >
        My <span className={currentTheme.textAccent}>Education</span>
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative max-w-4xl mx-auto"
      >
        {/* Timeline line */}
        <div
          className={`absolute left-8 top-0 h-full w-0.5 ${currentTheme.textPrimary}  transform -translate-x-1/2`}
        ></div>

        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ x: 5 }}
            className="relative pl-16 pb-10 last:pb-0 group"
          >
            {/* Timeline dot */}
            <div
              className={`absolute left-8 top-0 w-4 h-4 rounded-full ${currentTheme.textAccent} border-4 ${currentTheme.dotBorder} transform -translate-x-1/2 z-10`}
            ></div>

            <div
              className={`${currentTheme.circleBg} p-6 rounded-xl ${currentTheme.border} transition-all duration-300 group-hover:shadow-md cursor-pointer hover:scale-95 shadow-3xl `}
            >
              <div className="w-full flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg items-center ${currentTheme.edu_icon}`}
                >
                  {edu.icon}
                </div>
                <div className="w-full flex justify-between">
                  <div className="flex flex-col gap-3">
                    <h3
                      className={`text-lg font-semibold ${currentTheme.textPrimary}`}
                    >
                      {edu.institution}
                    </h3>
                    <p className={`${currentTheme.textSecondary}`}>
                      {edu.degree}
                    </p>

                    <span
                      className={`text-md font-bold ${currentTheme.yearBg} ${currentTheme.textSecondary}`}
                    >
                      {edu.score}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3 justify-self-end place-items-end">
                    <div
                      className={`flex items-center gap-1 mt-1 text-sm ${currentTheme.textSecondary}`}
                    >
                      <FiMapPin className={currentTheme.icon} />
                      {edu.location}
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center gap-1 text-sm ${currentTheme.yearBg} px-3 py-1 rounded-full ${currentTheme.textSecondary}`}
                      >
                        <FiCalendar className={currentTheme.textSecondary} />
                        {edu.year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Education;
