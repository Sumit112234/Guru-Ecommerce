import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useUser } from '../context/userContext';

const Login = () => {

  const {darkTheme} = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const backendUrl = import.meta.env.VITE_APP_SERVER_URL;
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setLoading(true);
      try {
        let loginFunc = await fetch(`${backendUrl}user/login`, {
          method: 'POST',
          credentials: "include",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        let res = await loginFunc.json();
        if(res?.success) {
          dispatch(addUser(res.user));
          navigate('/');
        } else {
          toast.error(res.message);
        }
      } catch (e) {
        toast.error("Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 
      ${darkTheme 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-purple-50 to-white text-gray-800'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`p-8 rounded-2xl shadow-2xl backdrop-blur-sm 
            ${darkTheme 
              ? 'bg-gray-800/50 border border-gray-700' 
              : 'bg-white/70 border border-purple-100'}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-2 
                ${darkTheme ? 'text-white' : 'text-purple-900'}`}>
                Welcome Back
              </h2>
              <p className={`
                ${darkTheme ? 'text-gray-400' : 'text-purple-600'}`}>
                Sign in to continue your journey
              </p>
            </motion.div>

            <div className="space-y-4">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-2">
                <label className={`block text-sm font-medium 
                  ${darkTheme ? 'text-gray-300' : 'text-purple-700'}`}>
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-200
                    ${darkTheme 
                      ? 'bg-gray-700 border-gray-600 focus:border-purple-500 text-white' 
                      : 'bg-purple-50 border-purple-100 focus:border-purple-500'}
                    ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter your email"
                />
                {errors.email && 
                  <span className="text-red-500 text-xs">{errors.email}</span>
                }
              </motion.div>

              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-2">
                <label className={`block text-sm font-medium 
                  ${darkTheme ? 'text-gray-300' : 'text-purple-700'}`}>
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-200
                    ${darkTheme 
                      ? 'bg-gray-700 border-gray-600 focus:border-purple-500 text-white' 
                      : 'bg-purple-50 border-purple-100 focus:border-purple-500'}
                    ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Enter your password"
                />
                {errors.password && 
                  <span className="text-red-500 text-xs">{errors.password}</span>
                }
              </motion.div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className={`ml-2 text-sm 
                  ${darkTheme ? 'text-gray-300' : 'text-purple-700'}`}>
                  Remember me
                </span>
              </label>
              <Link to="/forgot-password" 
                className={`text-sm font-medium hover:underline
                  ${darkTheme ? 'text-purple-400' : 'text-purple-600'}`}>
                Forgot password?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200
                ${darkTheme 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white'}
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                </div>
              ) : (
                'Sign In'
              )}
            </motion.button>

            <p className={`text-center text-sm
              ${darkTheme ? 'text-gray-400' : 'text-purple-600'}`}>
              Don't have an account?{" "}
              <Link to="/signup" 
                className={`font-medium hover:underline
                  ${darkTheme ? 'text-purple-400' : 'text-purple-700'}`}>
                Sign up now
              </Link>
            </p>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="hidden lg:block">
          <img
            src={`login-lock${darkTheme ? '' : '-light'}.png`}
            className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
            alt="Login illustration"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;