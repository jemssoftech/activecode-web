"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  PaperAirplaneIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

// Validation Schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(val),
      "Please enter a valid phone number",
    ),
  subject: z.string().min(1, "Please select a subject"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: EnvelopeIcon,
    title: "Email Us",
    value: "jemssofech@gmail.com",
    href: "mailto:jemssofech@gmail.com",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: PhoneIcon,
    title: "Call Us",
    value: "+91 94094 27142",
    href: "tel:+919409427142",
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
  {
    icon: MapPinIcon,
    title: "Location",
    value: "110, Iscone Plaza, Amroli, Surat, Gujarat",
    href: "https://maps.google.com",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
];

const subjects = [
  { value: "", label: "Select a subject" },
  { value: "web", label: "🌐 Web Development" },
  { value: "mobile", label: "📱 Mobile App Development" },
  { value: "design", label: "🎨 UI/UX Design" },
  { value: "consulting", label: "💼 Consulting" },
  { value: "other", label: "📝 Other" },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const API = process.env.NEXT_PUBLIC_API;
 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, dirtyFields },
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const messageLength = watch("message")?.length || 0;

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    const payload = {
      type: "jemssoft_user", 
      name: data.name,
      email: data.email,
      mobile: data.phone,
      message: data.message,
      other_data: { subjects: data.subject },
    };
    try {
      const res = await fetch(`${API}/web/inquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-client-app':"on1tap_pos_backend"
        },
        body: JSON.stringify(payload),
      });

      // Check if response is ok
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();

      // Check API response
      if (result.status===1) {
        setSubmitStatus("success");
        reset();

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName: keyof ContactFormData) => `
    w-full px-4 py-3.5 bg-white/[0.03] border rounded-xl
    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
    transition-all duration-300 placeholder:text-white/30
    ${
      errors[fieldName]
        ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
        : dirtyFields[fieldName]
          ? "border-green-500/30"
          : "border-white/10 hover:border-white/20"
    }
  `;

  return (
    <main className="pt-32 pb-20 min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container xl:max-w-[1320px] mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            Contact Us
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? Let&apos;s discuss how we can help bring your
            vision to life with cutting-edge technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.href}
                target={info.title === "Location" ? "_blank" : undefined}
                rel={
                  info.title === "Location" ? "noopener noreferrer" : undefined
                }
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  block p-6 rounded-2xl border border-white/10 
                  bg-gradient-to-br ${info.color} backdrop-blur-sm
                  hover:border-white/20 transition-all duration-300
                  group cursor-pointer
                `}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`
                    p-3 rounded-xl bg-white/5 ${info.iconColor}
                    group-hover:scale-110 transition-transform duration-300
                  `}
                  >
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {info.title}
                    </h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {info.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Quick Response Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-400">
                  Quick Response
                </span>
              </div>
              <p className="text-white/60 text-sm">
                We typically respond within 24 hours. For urgent inquiries, give
                us a call!
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm relative overflow-hidden"
            >
              {/* Form Background Pattern */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                {/* Success/Error Messages */}
                <AnimatePresence>
                  {submitStatus !== "idle" && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`
                        mb-6 p-4 rounded-xl flex items-center gap-3
                        ${
                          submitStatus === "success"
                            ? "bg-green-500/10 border border-green-500/20 text-green-400"
                            : "bg-red-500/10 border border-red-500/20 text-red-400"
                        }
                      `}
                    >
                      {submitStatus === "success" ? (
                        <>
                          <CheckCircleIcon className="w-6 h-6 flex-shrink-0" />
                          <div>
                            <p className="font-medium">
                              Message sent successfully!
                            </p>
                            <p className="text-sm opacity-80">
                              We&apos;ll get back to you within 24 hours.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <ExclamationCircleIcon className="w-6 h-6 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Something went wrong</p>
                            <p className="text-sm opacity-80">
                              Please try again or contact us directly.
                            </p>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      className={inputClasses("name")}
                      placeholder="John Doe"
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-400 text-xs flex items-center gap-1"
                        >
                          <ExclamationCircleIcon className="w-3.5 h-3.5" />
                          {errors.name.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className={inputClasses("email")}
                      placeholder="john@example.com"
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-400 text-xs flex items-center gap-1"
                        >
                          <ExclamationCircleIcon className="w-3.5 h-3.5" />
                          {errors.email.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">
                      Phone <span className="text-white/40">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      {...register("phone")}
                      className={inputClasses("phone")}
                      placeholder="+1 (555) 000-0000"
                    />
                    <AnimatePresence>
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-400 text-xs flex items-center gap-1"
                        >
                          <ExclamationCircleIcon className="w-3.5 h-3.5" />
                          {errors.phone.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <select
                      {...register("subject")}
                      className={`${inputClasses("subject")} appearance-none cursor-pointer`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: "right 0.75rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                      }}
                    >
                      {subjects.map((subject) => (
                        <option
                          key={subject.value}
                          value={subject.value}
                          className="bg-gray-900 text-white"
                        >
                          {subject.label}
                        </option>
                      ))}
                    </select>
                    <AnimatePresence>
                      {errors.subject && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-400 text-xs flex items-center gap-1"
                        >
                          <ExclamationCircleIcon className="w-3.5 h-3.5" />
                          {errors.subject.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Message Field */}
                <div className="mb-6 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-white/80">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <span
                      className={`text-xs ${
                        messageLength > 900
                          ? "text-red-400"
                          : messageLength > 700
                            ? "text-yellow-400"
                            : "text-white/40"
                      }`}
                    >
                      {messageLength}/1000
                    </span>
                  </div>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className={`${inputClasses("message")} resize-none`}
                    placeholder="Tell us about your project, goals, and timeline..."
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-400 text-xs flex items-center gap-1"
                      >
                        <ExclamationCircleIcon className="w-3.5 h-3.5" />
                        {errors.message.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                  className={`
                    w-full py-4 rounded-xl font-medium transition-all duration-300
                    flex items-center justify-center gap-2 group
                    ${
                      isSubmitting || !isValid
                        ? "bg-white/10 text-black/40 cursor-not-allowed"
                        : "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-black shadow-lg shadow-primary/20 hover:shadow-primary/30"
                    }
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <ArrowPathIcon className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <PaperAirplaneIcon className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                {/* Privacy Note */}
                <p className="mt-4 text-center text-xs text-white/40">
                  By submitting this form, you agree to our{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </a>
                </p>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Map Section (Optional Enhancement) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <div className="p-1 rounded-2xl bg-gradient-to-r from-primary/50 via-purple-500/50 to-primary/50">
            <div className="rounded-2xl overflow-hidden h-[300px] bg-gray-900">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2205.6097291293604!2d72.84678923876007!3d21.24022429512313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04ed6f10c03d9%3A0x7f6ccacae2c6e8fd!2sNew%20Escon%20plaza!5e1!3m2!1sen!2sin!4v1768992273259!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
              
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
