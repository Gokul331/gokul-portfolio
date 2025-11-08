import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { colorTheme } from "../theme";

const Navbar = ({
  parentToChild,
  activeSection,
  onSectionChange,
  sections,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedColor, setSelectedColor] = useState("bg-white");

  const navLinks = sections.map((section) => ({
    name: section.id.charAt(0).toUpperCase() + section.id.slice(1),
    id: section.id,
  }));

  const colors = [
    { name: "White", class: "bg-white", ring: "ring-gray-400" },
    { name: "Black", class: "bg-black", ring: "ring-gray-300" },
  ];

  const chooseColor = (colorClass) => {
    setSelectedColor(colorClass);
    parentToChild(colorClass);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentTheme = colorTheme[selectedColor] || colorTheme["bg-white"];

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md bg-white/10 shadow-lg" : currentTheme.navBg
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.h1
          className={`text-2xl font-bold tracking-wide cursor-pointer select-none ${currentTheme.textPrimary}`}
          whileHover={{ scale: 1.05 }}
          onClick={() => onSectionChange(0)}
        >
          Gokul<span className={`${currentTheme.accentText}`}>.dev</span>
        </motion.h1>

        {/* Desktop Navigation - centered */}
        <ul className="hidden md:flex gap-8 font-medium absolute left-1/2 transform -translate-x-1/2 z-20">
          {navLinks.map((link, idx) => (
            <li
              key={link.id}
              className={`relative cursor-pointer transition-all hover:scale-105 ${currentTheme.textPrimary}`}
              onClick={() => {
                onSectionChange(idx);
                setIsOpen(false);
              }}
            >
              {link.name}
              {activeSection === idx && (
                <motion.div
                  layoutId="underline"
                  className={`absolute left-0 right-0 h-[2px] bottom-[-4px] ${currentTheme.border}`}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Right side (Desktop): color picker + CTAs */}
        <div className="hidden md:flex items-center gap-5 ml-6">

          <a
            href="/Resume/Gokul_Palanisamy_Resume.pdf"
            download
            className={`hidden lg:inline-block px-4 py-2 rounded-md font-medium transition ${currentTheme.buttonOutline}`}
            aria-label="Download Resume"
            title="Download Resume"
          >
            Resume
          </a>

          <button
            onClick={() => {
              const idx = navLinks.findIndex((n) => n.id === "contact");
              onSectionChange(idx === -1 ? navLinks.length - 1 : idx);
            }}
            className={`px-4 py-2 rounded-md font-medium transition ${currentTheme.button}`}
            aria-label="Contact"
          >
            Contact
          </button>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color.class}
                onClick={() => chooseColor(color.class)}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === color.class
                    ? `${color.ring} ring-1 scale-110`
                    : "hover:scale-105"
                } ${color.class} transition-all duration-300`}
                title={`Set ${color.name} theme`}
                aria-label={`${color.name} theme`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Menu Button & Color Picker */}
        <div className="md:hidden flex items-center gap-3">
          {/* Color Picker (Mobile) */}
          <div className="flex mr-5">
            {colors.map((color) => (
              <button
                key={color.class}
                onClick={() => chooseColor(color.class)}
                className={`w-5 h-5 rounded-full border-2 mx-1 ${
                  selectedColor === color.class
                    ? `${color.ring} ring-2 scale-110`
                    : "hover:scale-105"
                } ${color.class} transition-all duration-300`}
                title={`Set ${color.name} theme`}
                aria-label={`${color.name} theme`}
              />
            ))}
          </div>
          {/* Hamburger Menu */}
          {isOpen ? (
            <FaTimes
              size={22}
              onClick={() => setIsOpen(false)}
              className="cursor-pointer"
            />
          ) : (
            <FaBars
              size={22}
              onClick={() => setIsOpen(true)}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden flex flex-col items-center gap-6 py-6 backdrop-blur-lg bg-white/30 shadow-lg w-full absolute top-full left-0"
          >
            {navLinks.map((link, idx) => (
              <li
                key={link.id}
                onClick={() => {
                  onSectionChange(idx);
                  setIsOpen(false);
                }}
                className={`relative cursor-pointer px-4 py-2 ${
                  activeSection === idx
                    ? "text-gray-500 font-semibold text-lg"
                    : currentTheme.textPrimary
                }`}
              >
                {link.name}
                {/* Mobile active indicator */}
                {activeSection === idx && (
                  <motion.div
                    layoutId="mobile-underline"
                    className={`absolute left-0 right-0 h-[2px] bottom-0 ${currentTheme.accentBg}`}
                  />
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
