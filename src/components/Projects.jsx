import React, { useState, useEffect } from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { colorTheme } from "../theme"; 
import { project } from "../data/projects";

const Projects = ({ bgColor }) => {
  const colorThemes = colorTheme;
  const currentTheme = colorThemes[bgColor] || colorThemes["bg-white"];

  const projects = project;
  // Component to handle image slideshow
  const ProjectImage = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
      if (!Array.isArray(images)) return;

      const interval = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }, [images]);

    // If images is a string (single image), just display it
    if (typeof images === "string") {
      return (
        <img
          src={images}
          alt="Project"
          className="w-full h-full object-cover absolute inset-0  group-hover:scale-110 transition-opacity duration-1000 opacity-100"
          loading="lazy"
        />
      );
    }

    // If images is an array, display the slideshow
    return (
      <>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Project"
            className={`w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-opacity duration-500 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
          />
        ))}
      </>
    );
  };

  return (
    <section
      className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500`}
      id="projects"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold ${currentTheme.title} mb-2`}>
            My Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`relative rounded-xl overflow-hidden border ${currentTheme.border} group transition-all duration-300 h-72`}
            >
              {/* Project Image - now handles both single images and slideshows */}
              <ProjectImage images={project.images || project.image} />

              {/* Title (always visible) */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-4 ${currentTheme.overlay}`}
              >
                <h3 className={`text-lg font-bold ${currentTheme.textPrimary}`}>
                  {project.name}
                </h3>
              </div>

              {/* Hidden content that appears on hover */}
              <div
                className={`absolute inset-0 ${currentTheme.overlay} flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              >
                <div>
                  <h3
                    className={`text-xl font-bold ${currentTheme.textPrimary} mb-2`}
                  >
                    {project.name}
                  </h3>
                  <p className={`text-sm ${currentTheme.textSecondary} mb-4`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 ${currentTheme.tool} text-xs font-medium rounded-full`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center ${currentTheme.textSecondary} hover:${currentTheme.textPrimary} transition-colors`}
                    aria-label="View code on GitHub"
                  >
                    <FiGithub className="mr-2" /> Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center ${currentTheme.textSecondary} hover:${currentTheme.textPrimary} transition-colors`}
                    aria-label="View live demo"
                  >
                    <FiExternalLink className="mr-2" /> Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
