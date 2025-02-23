// import { useAuth } from "@/context/userContext";
import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useUser } from "../context/userContext";

const SignupForm = () => {

  const { darkTheme } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_APP_SERVER_URL;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.confirmPassword.trim()) 
      newErrors.confirmPassword = "Please confirm your password";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match!";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms and conditions";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      try {
        let loginFunc = await fetch(`${backendUrl}user/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        let res = await loginFunc.json();
        if (res.status) {
          navigate('/login');
          toast.success('Account created! Please login.');
        } else {
          toast.error(res.message);
        }
      } catch (e) {
        toast.error("Registration failed. Please try again.");
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
        className="w-full max-w-6xl">
        
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`lg:col-span-2 p-8 rounded-2xl shadow-2xl backdrop-blur-sm
              ${darkTheme 
                ? 'bg-gray-800/50 border border-gray-700' 
                : 'bg-white/70 border border-purple-100'}`}>
            
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-2 
                ${darkTheme ? 'text-white' : 'text-purple-900'}`}>
                Create Your Account
              </h2>
              <p className={`
                ${darkTheme ? 'text-gray-400' : 'text-purple-600'}`}>
                Join us and start your journey
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`block text-sm font-medium 
                    ${darkTheme ? 'text-gray-300' : 'text-purple-700'}`}>
                    Full Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-200
                      ${darkTheme 
                        ? 'bg-gray-700 border-gray-600 focus:border-purple-500 text-white' 
                        : 'bg-purple-50 border-purple-100 focus:border-purple-500'}
                      ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Enter your name"
                  />
                  {errors.name && 
                    <span className="text-red-500 text-xs">{errors.name}</span>
                  }
                </div>

                <div className="space-y-2">
                  <label className={`block text-sm font-medium 
                    ${darkTheme ? 'text-gray-300' : 'text-purple-700'}`}>
                    Email Address
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
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
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
                    placeholder="Create password"
                  />
                  {errors.password && 
                    <span className="text-red-500 text-xs">{errors.password}</span>
                  }
                </div>

                <div className="space-y-2">
                  <label className={`block text-sm font-medium 
                    ${darkTheme ? 'text-gray-300' : 'text-purple-700'}`}>
                    Confirm Password
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-200
                      ${darkTheme 
                        ? 'bg-gray-700 border-gray-600 focus:border-purple-500 text-white' 
                        : 'bg-purple-50 border-purple-100 focus:border-purple-500'}
                      ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && 
                    <span className="text-red-500 text-xs">{errors.confirmPassword}</span>
                  }
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className={`ml-2 text-sm
                    ${darkTheme ? 'text-gray-300' : 'text-purple-700'}`}>
                    I accept the{" "}
                    <Link to="/terms&condition" 
                      className={`font-medium hover:underline
                        ${darkTheme ? 'text-purple-400' : 'text-purple-600'}`}>
                      Terms and Conditions
                    </Link>
                  </span>
                </label>
                {errors.termsAccepted && 
                  <span className="text-red-500 text-xs block">{errors.termsAccepted}</span>
                }

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
                    'Create Account'
                  )}
                </motion.button>

                <p className={`text-center text-sm
                  ${darkTheme ? 'text-gray-400' : 'text-purple-600'}`}>
                  Already have an account?{" "}
                  <Link to="/login" 
                    className={`font-medium hover:underline
                      ${darkTheme ? 'text-purple-400' : 'text-purple-700'}`}>
                    Sign in
                  </Link>
                </p>
              </motion.div>
            </form>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className={`p-8 rounded-2xl flex flex-col justify-between
              ${darkTheme 
                ? 'bg-gray-800 text-white' 
                : 'bg-purple-600 text-white'}`}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Welcome to Our Platform</h3>
              <p className="text-sm opacity-90">
                Join thousands of users who trust our platform for their needs. 
                Create your account today and unlock all features.
              </p>
            </div>

            <div className="space-y-6 mt-8">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full 
                  ${darkTheme ? 'bg-purple-600' : 'bg-white/20'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Secure & Private</h4>
                  <p className="text-sm opacity-90">Your data is safe with us</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full 
                  ${darkTheme ? 'bg-purple-600' : 'bg-white/20'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Lightning Fast</h4>
                  <p className="text-sm opacity-90">Quick and easy setup</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupForm;

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { addUser } from "../redux/slices/userSlice";

// function SignupForm() {
//   const [loading,setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     firstName: "",
//     lastName: "",

//   });

  
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };


//   const handleSubmit = async(e) => {
//     setLoading(true);
//     e.preventDefault();
//     //console.log("Form Data:", formData);
    
//     try {
         
//     let loginFunc = await fetch(`${'http://localhost:8759/api/'}user/register`,{
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({name : formData.firstName + formData.lastName, ...formData})
//     });

//     let res = await loginFunc.json();
//     if(res.status)
//     {
//       dispatch(addUser(res.user));
//       // localStorage.setItem('authToken', res?.accessToken)
//       navigate('/')
//     }
//     else{
//       //console.log(res.message);
//     } 
//     } catch (e) {
//       //console.log("some error  occ")
//     }
//     finally{
//       setLoading(false);
//     }


    
//   };


//   return (
//     <div className="bg-pink-100 h-screen flex justify-center flex-col items-center absolute z-40 w-full">

//         <div className="text-center font-bold text-3xl w-fit m-3 ">Sign Up to GuruElectronics</div>
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-md mx-auto bg-pink-300 p-4 rounded-md border-2 border-black shadow-lg shadow-black hover:shadow-sm hover:border-red-500"
//       >
//         <div className="grid md:grid-cols-2 md:gap-6">
//           <div className="relative z-0 w-full mb-5 group">
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               className="block py-2.5 px-0 w-full text-lg text-black bg-transparent border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-white peer"
//               placeholder=" "
//               required
//             />
//             <label
//               htmlFor="firstName"
//               className="peer-focus:font-medium absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//             >
//               First name
//             </label>
//           </div>
//           <div className="relative z-0 w-full mb-5 group">
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               className="block py-2.5 px-0 w-full text-lg text-black bg-transparent border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-white peer"
//               placeholder=" "
//               required
//             />
//             <label
//               htmlFor="lastName"
//               className="peer-focus:font-medium absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//             >
//               Enter Last name
//             </label>
//           </div>
//         </div>
//         <div className="relative z-0 w-full mb-5 group">
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="block py-2.5 px-0 w-full text-lg text-black bg-transparent border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-white peer"
//             placeholder=" "
//             required
//           />
//           <label
//             htmlFor="email"
//             className="peer-focus:font-medium absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//           >
//             Email address
//           </label>
//         </div>
//         <div className="relative z-0 w-full mb-5 group">
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="block py-2.5 px-0 w-full text-lg text-black bg-transparent border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-white peer"
//             placeholder=" "
//             required
//           />
//           <label
//             htmlFor="password"
//             className="peer-focus:font-medium absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//           >
//             Password
//           </label>
//         </div>
//         <div className="relative z-0 w-full mb-5 group">
//           <input
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             className="block py-2.5 px-0 w-full text-lg text-black bg-transparent border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-white peer"
//             placeholder=" "
//             required
//           />
//           <label
//             htmlFor="confirmPassword"
//             className="peer-focus:font-medium absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//           >
//             Confirm password
//           </label>
//         </div>
        
//         {/* <div className="grid md:grid-cols-2 md:gap-6">
//           <div className="relative z-0 w-full mb-5 group">
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="block py-2.5 px-0 w-full text-lg text-black bg-transparent border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-white peer"
//               placeholder=" "
//               required
//             />
//             <label
//               htmlFor="phone"
//               className="peer-focus:font-medium absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//             >
//               Phone number (123-456-7890)
//             </label>
//           </div>
//           <div className="relative z-0 w-full mb-5 group">
//             <input
//               type="text"
//               name="company"
//               value={formData.company}
//               onChange={handleChange}
//               className="block py-2.5 px-0 w-full text-lg text-black bg-transparent border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-white peer"
//               placeholder=" "
//               required
//             />
//             <label
//               htmlFor="company"
//               className="peer-focus:font-medium absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//             >
//               Company (Ex. Google)
//             </label>
//           </div>
//         </div> */}
//        <div className="flex flex-col space-y-4">
//        <button
//         type="submit"
//         className={`w-full bg-pink-600 text-white py-2 rounded mt-4 hover:bg-pink-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//       >
//         {loading ? (
//           <div className="inline-block h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900 border-t-2 "></div>
//         ) : (
//           "Create a new Account"
//         )}
//       </button>
//        {/* <button
//           type="submit"
//           className="text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
//         >
//          Create a new Account
//         </button> */}
//         <div className="text-center">or</div>
//         <Link
//             to={'/login'}
          
//           className="text-blue-500 hover:bg-pink-200  focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
//         >
//           Sign In
//         </Link>
//        </div>
//       </form>
//     </div>
//   );
// }

// export default SignupForm;
