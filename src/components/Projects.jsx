import React, { useState, useEffect, useCallback } from "react";
import { FiGithub, FiExternalLink, FiPlay, FiPause } from "react-icons/fi";
import { colorTheme } from "../theme";
import { project } from "../data/projects";

const Projects = ({ bgColor }) => {
  const colorThemes = colorTheme;
  const currentTheme = colorThemes[bgColor] || colorThemes["bg-white"];
  const projects = project;

  // Image component with enhanced functionality
  const ProjectImage = ({ images, projectName }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [loadedImages, setLoadedImages] = useState(new Set());

    const imageArray = Array.isArray(images) ? images : [images].filter(Boolean);

    // Handle image loading
    const handleImageLoad = useCallback((index) => {
      setLoadedImages(prev => new Set(prev).add(index));
    }, []);

    // Auto-slide functionality
    useEffect(() => {
      if (!isPlaying || imageArray.length <= 1) return;

      const interval = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === imageArray.length - 1 ? 0 : prev + 1
        );
      }, 3000);

      return () => clearInterval(interval);
    }, [imageArray.length, isPlaying]);

    // Reset when images change
    useEffect(() => {
      setCurrentImageIndex(0);
      setLoadedImages(new Set());
    }, [images]);

    if (!imageArray.length) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <span className="text-gray-500">No image available</span>
        </div>
      );
    }

    return (
      <div className="relative w-full h-full">
        {/* Slideshow controls for multiple images */}
        {imageArray.length > 1 && (
          <div className="absolute top-2 right-2 z-10 flex gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-1 rounded-full ${currentTheme.overlay} backdrop-blur-sm`}
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? <FiPause size={14} /> : <FiPlay size={14} />}
            </button>
          </div>
        )}

        {/* Manual navigation dots */}
        {imageArray.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 flex gap-1">
            {imageArray.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setIsPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex 
                    ? 'bg-white' 
                    : 'bg-white/50'
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Images */}
        {imageArray.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`${projectName} - View ${index + 1}`}
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => handleImageLoad(index)}
              loading="lazy"
            />
            
            {/* Loading skeleton */}
            {!loadedImages.has(index) && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
          </div>
        ))}
      </div>
    );
  };

  // Fallback for missing links
  const handleLinkClick = (e, url, type) => {
    if (!url) {
      e.preventDefault();
      alert(`${type} link is not available for this project`);
    }
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
          <p className={`text-lg ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
            A collection of my recent work and personal projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const projectImages = project.images || project.image;
            const hasLinks = project.github || project.live;

            return (
              <div
                key={project.id}
                className={`relative rounded-xl overflow-hidden border ${currentTheme.border} group transition-all duration-300 h-64 sm:h-72 hover:shadow-xl hover:-translate-y-1`}
              >
                {/* Project Image */}
                <ProjectImage 
                  images={projectImages} 
                  projectName={project.name}
                />

                {/* Always visible title bar */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-4 ${currentTheme.overlay} backdrop-blur-sm`}
                >
                  <h3 className={`text-lg font-bold ${currentTheme.textPrimary}`}>
                    {project.name}
                  </h3>
                </div>

                {/* Hover overlay with project details */}
                <div
                  className={`absolute inset-0 ${currentTheme.overlay} backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-all duration-300 touch-manipulation`}
                >
                  <div className="overflow-y-auto">
                    <h3
                      className={`text-lg sm:text-xl font-bold ${currentTheme.textPrimary} mb-2`}
                    >
                      {project.name}
                    </h3>
                    
                    {/* Detailed description if available */}
                    <p
                      className={`text-xs sm:text-sm ${currentTheme.textSecondary} mb-3 sm:mb-4 leading-relaxed`}
                    >
                      {project.detailedDescription || project.description}
                    </p>

                    {/* Features list if available */}
                    {project.features && (
                      <div className="mb-3">
                        <h4 className={`text-xs font-semibold ${currentTheme.textPrimary} mb-2`}>
                          Key Features:
                        </h4>
                        <ul className={`text-xs ${currentTheme.textSecondary} space-y-1`}>
                          {project.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                          {project.features.length > 3 && (
                            <li className="text-xs opacity-75">
                              +{project.features.length - 3} more features
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Tools/Technologies */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tools.slice(0, 4).map((tool, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 ${currentTheme.tool} text-xs font-medium rounded-full border ${currentTheme.border}`}
                        >
                          {tool}
                        </span>
                      ))}
                      {project.tools.length > 4 && (
                        <span className={`px-2 py-1 text-xs ${currentTheme.textSecondary}`}>
                          +{project.tools.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  {hasLinks && (
                    <div className="flex justify-between pt-3 border-t ${currentTheme.border}">
                      <a
                        href={project.github || "#"}
                        onClick={(e) => handleLinkClick(e, project.github, "GitHub")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center px-3 py-2 rounded-lg transition-all ${
                          project.github 
                            ? `${currentTheme.textSecondary} hover:${currentTheme.textPrimary} hover:bg-white/10` 
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                        aria-label={project.github ? "View code on GitHub" : "GitHub link not available"}
                      >
                        <FiGithub className="mr-2" /> Code
                      </a>
                      <a
                        href={project.live || "#"}
                        onClick={(e) => handleLinkClick(e, project.live, "Live demo")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center px-3 py-2 rounded-lg transition-all ${
                          project.live 
                            ? `${currentTheme.textSecondary} hover:${currentTheme.textPrimary} hover:bg-white/10` 
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                        aria-label={project.live ? "View live demo" : "Live demo not available"}
                      >
                        <FiExternalLink className="mr-2" /> Site
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className={`text-lg ${currentTheme.textSecondary}`}>
              No projects to display at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;