import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FiSend, FiUser, FiMail, FiMessageSquare } from "react-icons/fi";
import { colorTheme } from "../theme"; // Import your theme file
import Footer from "./Footer"; // Import your Footer component
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
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await emailjs.sendForm(
        "service_s39uy4r", // Replace with your EmailJS service ID
        "template_0q17pi7", // Replace with your EmailJS template ID
        form.current,
        "vAjvjyVdtGjJAsmi3" // Replace with your EmailJS public key
      );
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <section
      id="contact"
      className={`min-h-screen py-20 px-4 bg-gradient-to-br ${theme.gradient}`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 "
        >
          <h2 className={`${theme.heading} text-4xl mb-4`}>
            Let's <span className={theme.accentText}>Connect</span>
          </h2>
          <p className={`${theme.paragraph} max-w-2xl mx-auto`}>
            Have a project in mind or want to chat? Drop me a message and I'll
            get back to you soon.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <form ref={form} onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser
                  className={errors.name ? "text-red-500" : theme.textSecondary}
                />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className={`w-full pl-10 pr-4 py-3 rounded-lg ${
                  theme.input
                } outline-none ${errors.name ? "border-red-500" : ""}`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail
                  className={
                    errors.email ? "text-red-500" : theme.textSecondary
                  }
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className={`w-full pl-10 pr-4 py-3 rounded-lg outline-none ${
                  theme.input
                } ${errors.email ? "border-red-500" : ""}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <div className="absolute top-3 left-3">
                <FiMessageSquare
                  className={
                    errors.message ? "text-red-500" : theme.textSecondary
                  }
                />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                className={`w-full pl-10 pr-4 py-3 rounded-lg outline-none ${
                  theme.input
                } ${errors.message ? "border-red-500" : ""}`}
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition ${
                theme.button
              } ${isSubmitting ? "opacity-80 cursor-not-allowed" : ""}`}
            >
              <FiSend className="text-lg" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </form>

          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-lg border ${
                submitStatus === "success"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-200 dark:border-emerald-700"
                  : "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-200 dark:border-red-700"
              }`}
            >
              {submitStatus === "success" ? (
                <p>
                  🎉 Your message has been sent successfully! I'll respond as
                  soon as possible.
                </p>
              ) : (
                <p>
                  ⚠️ Oops! Something went wrong. Please try again later or email
                  me directly.
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer bgColor={bgColor} />
    </section>
  );
};

export default Contact;
