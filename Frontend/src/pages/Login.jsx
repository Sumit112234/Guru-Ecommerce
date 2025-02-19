// import { useAuth } from "@/context/userContext";
import React, { useEffect, useState } from "react";
import { useNavigate , Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const {user, login,isAuthenticated} = useAuth();

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
    if (!formData.email.trim()) {
      newErrors.email = "email is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      //console.log("Form Data:", formData);
      setErrors({});
      setLoading(true);
      try {
            let loginFunc = await fetch(`${backendUrl}user/login`,{
              method: 'POST',
              credentials: "include",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            });
        
            let res = await loginFunc.json();
            if(res?.success)
            {
           
              dispatch(addUser(res.user));
              
              navigate('/')
              
            }
            else{
              toast.error(res.message);
            }
        
           } catch (e) {
              //console.log("some error occured in login", e)    
           }
           finally{
            setLoading(false);
           }
      
      
  
    }
  };
  
    // useEffect(()=>{
    //   //console.log("user from login : ", user);
    //   if(isAuthenticated)
    //       navigate('/dashboard');
    // },[isAuthenticated,user])

  return (
    <div className="font-[sans-serif] min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
        <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
              <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                Sign in to your account and explore a world of possibilities. Your journey begins here.
              </p>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block"> Email</label>
              <div className="relative flex flex-col items-start">
                <input
                  name="email"
                  type="email"
                  className={`w-full text-sm text-gray-800 border px-4 py-3 rounded-lg outline-blue-600 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter user name"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <div className="relative flex flex-col items-start">
                <input
                  name="password"
                  type="password"
                  className={`w-full text-sm text-gray-800 border px-4 py-3 rounded-lg outline-blue-600 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="text-blue-600 hover:underline font-semibold">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="!mt-8">
            {/* <button
            type="submit"
            className={`w-full bg-pink-600 text-white py-2 rounded mt-4 hover:bg-pink-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
            {loading ? (
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900 border-t-2 "></div>
            ) : (
              "Login"
            )}
            </button> */}
              <button
                type="submit"
                className={`w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                 {loading ? (
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900 border-t-2 "></div>
                ) : (
                  "Login"
                )}
              </button>
            </div>

            <p className="text-sm !mt-8 text-center text-gray-800">
              Don't have an account?{" "}
              <Link to={'/signup'} className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                Register here
              </Link>
            </p>
          </form>
        </div>
        <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
          <img
            src="https://readymadeui.com/login-image.webp"
            className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
            alt="Dining Experience"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { addUser } from "../redux/slices/userSlice";


// function Login() {

//   const navigate = useNavigate();

//   const [loading,setLoading] = useState(false);
  
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "", 
//   });
  

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
    

    



//    try {
//     let loginFunc = await fetch(`${'http://localhost:8759/api/'}user/login`,{
//       method: 'POST',
//       credentials: "include",
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(formData)
//     });

//     let res = await loginFunc.json();
//     if(res?.success)
//     {
//       // redux mai store krna h user ko
//       //console.log(res.user);
//       dispatch(addUser(res.user));
//       // localStorage.setItem('authToken', res?.accessToken)
//       navigate('/')
//       //console.log('hello ji')
//     }
//     else{
//       //console.log(res.message);
//     }

//    } catch (e) {
//       //console.log("some error occured in login", e)    
//    }
//    finally{
//     setLoading(false);
//    }

    
//   };

//   return (
//     <div className="bg-pink-100 h-screen w-full flex justify-center flex-col items-center z-40 absolute">

//         <div className="text-center font-bold text-3xl w-fit m-3  ">Enter details to Login</div>
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-md mx-auto bg-pink-300 p-10 gap-5 rounded-md border-2 border-black "
//       >
        
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
//             Enter Email
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
//             Enter Password
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
//        <div className="flex flex-col space-y-2 mt-12">
//        <button
//         type="submit"
//         className={`w-full bg-pink-600 text-white py-2 rounded mt-4 hover:bg-pink-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//       >
//         {loading ? (
//           <div className="inline-block h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900 border-t-2 "></div>
//         ) : (
//           "Login"
//         )}
//       </button>

//         <div className="flex justify-between space-x-2">
            
//             <span>Don't have an account?</span>
//             <Link to={'/otp'} className="text-blue-500 hover:underline">forgot password</Link>

//         </div>
//         <Link
//             to={'/signup'}
//             className="text-blue-500 hover:bg-pink-200  focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
//         >
//           Sign Up
//         </Link>
//        </div>
//       </form>
//     </div>
//   );
// }

// export default Login;
