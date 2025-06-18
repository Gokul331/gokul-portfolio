import { motion } from "framer-motion";
const education = [
  {
    institution: "M Kumarasamy College Of Engineering, Karur",
    year: "2024",
    degree: "BE - ECE | CGPA : 8.31",
    icon: "🎓",
  },
  {
    institution: "RGR Matic HR Sec School, Namakkal",
    year: "2020",
    degree: "HSC | Percentage : 77.7%",
    icon: "📚",
  },
  {
    institution: "RGR Matic HR Sec School, Namakkal",
    year: "2018",
    degree: "SSLC | Percentage : 94.6%",
    icon: "🏫",
  },
];

const Education = ({darkMode}) => {
  return (
    <section id="education" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className={`${darkMode ? "text-gray-200": "text-gray-800"} text-3xl md:text-4xl font-bold mb-4`}>
            Education Journey
          </h2>
          <p className={`${darkMode ? "text-gray-200": "text-gray-800"} max-w-2xl mx-auto`}>
            My academic background and qualifications that shaped my technical
            expertise.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>

          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative mb-8 ${
                index % 2 === 0
                  ? "pr-8 md:pr-0 md:pl-8 text-left md:text-right"
                  : "pl-8"
              }`}
            >
              <div
                className={`p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 relative ${
                  index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                }`}
              >
                <div
                  className={`absolute top-6 -m-2 w-4 h-4 rounded-full bg-blue-500 shadow-md ${
                    index % 2 === 0
                      ? "right-0 md:right-auto md:left-0 transform md:translate-x-1/2"
                      : "left-0 transform -translate-x-1/2"
                  }`}
                ></div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">{edu.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold">{edu.institution}</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {edu.degree}
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      {edu.year}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
