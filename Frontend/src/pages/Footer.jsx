import React, { useState } from 'react'
import { useUser } from '../context/userContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Footer = () => {
  const { darkTheme } = useUser()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setEmail('')
      setIsSubmitting(false)
    }, 1500)
  }

  const media = [
    {"name": 'LinkedIn', link: 'https://www.linkedin.com/in/sumit-baghel-463512205/'},
    {"name": 'GitHub', link: 'https://github.com/sumit112234/'},
  ]

  const company = [
    {"name": 'About', link: '/about'},
    {"name": 'Privacy Policy', link: '/terms&condition'},
    {"name": 'Terms & Conditions', link: '/terms&condition'},
  ]

  const quickLinks = [
    {"name": 'Products', link: '/productlist'},
    {"name": 'Checkout', link: '/checkout'}, // Fixed typo in route name
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const hoverVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  }

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${
        darkTheme
          ? "bg-gradient-to-r from-[#080d1c] via-[#101a3a] to-[#080d1c]"
          : "bg-gradient-to-r from-gray-100 via-white to-gray-100"
      } pt-8 sm:pt-12 pb-6 px-4 sm:px-10 font-sans tracking-wide relative`}
    >
      <div className="max-w-screen-xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <motion.div variants={itemVariants}>
            <h2
              className={`text-sm uppercase font-semibold mb-4 ${
                darkTheme ? "text-white" : "text-gray-900"
              }`}
            >
              Quick Links
            </h2>
            <ul className="space-y-3">
              {quickLinks.map((item, idx) => (
                <motion.li 
                  key={idx}
                  variants={hoverVariants}
                  whileHover="hover"
                >
                  <Link
                    to={item.link}
                    className={`text-sm transition-all ${
                      darkTheme
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2
              className={`text-sm uppercase font-semibold mb-4 ${
                darkTheme ? "text-white" : "text-gray-900"
              }`}
            >
              Follow Us
            </h2>
            <ul className="space-y-3">
              {media.map((item, idx) => (
                <motion.li 
                  key={idx}
                  variants={hoverVariants}
                  whileHover="hover"
                >
                  <a
                    href={`${item.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm transition-all ${
                      darkTheme
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2
              className={`text-sm uppercase font-semibold mb-4 ${
                darkTheme ? "text-white" : "text-gray-900"
              }`}
            >
              Company
            </h2>
            <ul className="space-y-3">
              {company.map((item, idx) => (
                <motion.li 
                  key={idx}
                  variants={hoverVariants}
                  whileHover="hover"
                >
                  <Link
                    to={item.link}
                    className={`text-sm transition-all ${
                      darkTheme
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4
              className={`text-lg font-bold ${
                darkTheme ? "text-white" : "text-gray-900"
              }`}
            >
              Stay Connected and Grab the Deals!
            </h4>
            <form onSubmit={handleSubscribe} className="mt-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center border px-4 py-2.5 rounded transition-all ${
                  darkTheme
                    ? "border-gray-600 hover:border-blue-600 focus-within:border-blue-600"
                    : "border-gray-400 hover:border-blue-800 focus-within:border-blue-800"
                }`}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`flex-1 outline-none bg-transparent text-sm ${
                    darkTheme ? "text-gray-300" : "text-gray-800"
                  }`}
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 cursor-pointer fill-current ${
                        darkTheme ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                      }`}
                      viewBox="0 0 492.004 492.004"
                    >
                      <path d="M382.678 226.804 163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z" />
                    </svg>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>

        <motion.hr
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-8 sm:mt-12 mb-6 ${darkTheme ? "border-gray-700" : "border-gray-300"}`}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:justify-between items-center gap-4"
        >
          <div className="flex space-x-5">
            {[
              { platform: 'facebook', icon: 'M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z' },
              { platform: 'twitter', icon: 'M23.64 4.54c-.77.36-1.6.58-2.48.7.9-.53 1.58-1.37 1.9-2.38-.84.5-1.78.87-2.77 1.06C19.54 3.07 18.33 2.5 17 2.5c-2.6 0-4.7 2.1-4.7 4.7 0 .36.03.72.1 1.07-3.9-.2-7.37-2.07-9.7-4.9-.4.67-.63 1.45-.63 2.3 0 1.6.82 3.02 2.07 3.88-.76-.02-1.48-.23-2.1-.58v.06c0 2.25 1.6 4.12 3.73 4.55-.4.1-.82.15-1.25.15-.3 0-.6-.03-.9-.08.6 1.84 2.32 3.18 4.37 3.22-1.6 1.25-3.62 2-5.8 2-.38 0-.75-.02-1.12-.07 2.07 1.32 4.53 2.1 7.17 2.1 8.6 0 13.3-7.15 13.3-13.3 0-.2 0-.4-.02-.6.9-.66 1.7-1.48 2.32-2.4z' },
              { platform: 'linkedin', icon: 'M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z' }
            ].map((item) => (
              <motion.a
                key={item.platform}
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={`text-sm transition-all ${
                  darkTheme
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    className={`fill-current ${
                      darkTheme ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                    }`}
                    d={item.icon}
                  />
                </svg>
              </motion.a>
            ))}
          </div>

          <p
            className={`text-sm text-center sm:text-right ${
              darkTheme ? "text-gray-400" : "text-gray-600"
            }`}
          >
            ©2025 GURU ELECTRONICS. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer