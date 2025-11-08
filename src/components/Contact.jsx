import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FiSend, FiUser, FiMail, FiMessageSquare, FiGithub, FiLinkedin, FiMapPin, FiPhone } from "react-icons/fi";
import { colorTheme } from "../theme";
import Footer from "./Footer";

const Contact = ({ bgColor }) => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [touched, setTouched] = useState({});

  // Get current theme settings
  const theme = colorTheme[bgColor] || colorTheme["bg-white"];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10) newErrors.message = "Message should be at least 10 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Mark all fields as touched to show errors
      setTouched({ name: true, email: true, message: true });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await emailjs.sendForm(
        "service_s39uy4r",
        "template_0q17pi7",
        form.current,
        "vAjvjyVdtGjJAsmi3"
      );
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTouched({});
    } catch (error) {
      console.error("Email sending failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    // Validate individual field on blur
    const fieldErrors = validate();
    if (fieldErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: "Email",
      value: "gokulece303@gmail.com",
      href: "mailto:gokulece303@gmail.com",
    },
    {
      icon: FiPhone,
      label: "Phone",
      value: "+91 93459 96310",
      href: "tel:+919345996310",
    },
    {
      icon: FiMapPin,
      label: "Location",
      value: "Coimbatore, India",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: FiGithub,
      label: "GitHub",
      href: "https://github.com/Gokul331",
      username: "@Gokul331",
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/gokul-palanisamy-422b6b363",
      username: "Gokul Palanisamy",
    },
  ];

  return (
    <section
      id="contact"
      className={`py-20 px-4 min-h-screen ${theme.background}`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <h2 className={`${theme.heading} text-4xl md:text-5xl font-bold mb-4`}>
            Let's <span className={theme.accentText}>Connect</span>
          </h2>
          <p className={`${theme.paragraph} text-lg max-w-2xl mx-auto leading-relaxed`}>
            Have a project in mind or want to chat? I'm always open to discussing new opportunities and creative ideas.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl mx-auto"
        >
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${theme.cardBg} rounded-2xl p-8 shadow-lg`}>
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium mb-2 ${theme.textPrimary}`}
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiUser className={`text-lg ${errors.name && touched.name ? "text-red-500" : theme.textSecondary}`} />
                      </div>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        aria-label="Your name"
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none ${
                          errors.name && touched.name
                            ? "border-red-500 focus:border-red-500"
                            : `${theme.input} focus:border-blue-500`
                        }`}
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.name && touched.name && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 text-sm text-red-500"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium mb-2 ${theme.textPrimary}`}
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiMail className={`text-lg ${errors.email && touched.email ? "text-red-500" : theme.textSecondary}`} />
                      </div>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        aria-label="Your email"
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none ${
                          errors.email && touched.email
                            ? "border-red-500 focus:border-red-500"
                            : `${theme.input} focus:border-blue-500`
                        }`}
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.email && touched.email && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 text-sm text-red-500"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium mb-2 ${theme.textPrimary}`}
                  >
                    Your Message
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-4">
                      <FiMessageSquare className={`text-lg ${errors.message && touched.message ? "text-red-500" : theme.textSecondary}`} />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project or just say hello..."
                      rows="6"
                      aria-label="Your message"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none resize-none ${
                        errors.message && touched.message
                          ? "border-red-500 focus:border-red-500"
                          : `${theme.input} focus:border-blue-500`
                      }`}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <AnimatePresence>
                      {errors.message && touched.message && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-sm text-red-500"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <span className={`text-xs ${theme.textSecondary}`}>
                      {formData.message.length}/500
                    </span>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-8 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-200 ${
                    isSubmitting 
                      ? "opacity-70 cursor-not-allowed" 
                      : "hover:shadow-lg"
                  } ${theme.button}`}
                >
                  <FiSend className="text-lg" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {isSubmitting && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                    />
                  )}
                </motion.button>
              </form>
            </div>

            {/* Contact Info Card */}
            <aside className={`rounded-2xl p-6 ${theme.cardBg} border ${theme.border}`}>
              <h3 className={`text-xl font-bold mb-6 ${theme.textPrimary}`}>
                Get in Touch
              </h3>
              
              <div className="space-y-4 mb-8">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 hover:bg-white/5 ${theme.textSecondary}`}
                  >
                    <div className={`p-2 rounded-lg ${theme.accentBg}`}>
                      <item.icon className="text-lg" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-sm">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="border-t pt-6">
                <h4 className={`text-lg font-semibold mb-4 ${theme.textPrimary}`}>
                  Follow Me
                </h4>
                <div className="space-y-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white/5 group ${theme.textSecondary}`}
                    >
                      <social.icon className="text-lg group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-sm font-medium">{social.label}</p>
                        <p className="text-xs opacity-75">{social.username}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <AnimatePresence>
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className={`mt-6 p-4 rounded-xl border-2 ${
                  submitStatus === "success"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-200 dark:border-emerald-700"
                    : "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-200 dark:border-red-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`text-xl ${submitStatus === "success" ? "🎉" : "⚠️"}`} />
                  <div>
                    <p className="font-medium">
                      {submitStatus === "success" 
                        ? "Message sent successfully!" 
                        : "Failed to send message"}
                    </p>
                    <p className="text-sm mt-1">
                      {submitStatus === "success" 
                        ? "Thank you for reaching out! I'll get back to you within 24 hours." 
                        : "Please try again later or contact me directly via email."}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <Footer bgColor={bgColor} />
    </section>
  );
};

export default Contact;