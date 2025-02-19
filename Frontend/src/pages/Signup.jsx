// import { useAuth } from "@/context/userContext";
import React, { useEffect, useState } from "react";
import { useNavigate , Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";





const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmPassword: "",
    password: "",
    termsAccepted: false,
  });
  const navigate = useNavigate();
  // const { signup,user, isAuthenticated } = useAuth();

  // useEffect(()=>{
  //   //console.log("user from signup : ", user);
  // },[])

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
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
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "confirmPassword number is required";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Password do not match!";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms and conditions";
    return newErrors;
  };

  const handleSubmit = async(e) => {

    e.preventDefault();
    setLoading(true)
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
         
            let loginFunc = await fetch(`${backendUrl}user/register`,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            });
        
            let res = await loginFunc.json();
            if(res.status)
            {
              // dispatch(addUser(res.user));
              navigate('/login')
              toast.success('login here');
            }
            else{
              toast.error(res.message);
            } 
            } catch (e) {
              toast.error("some error occured!");
            }
            finally{
              setLoading(false);
            }
        
        
      //console.log("Form Submitted:", formData);
      // let res = await signup(formData);
      // navigate('/');
      setErrors({});
    }
  };

  // useEffect(()=>{
  //   if(isAuthenticated)
  //       navigate('/dashboard');
  // },[user, isAuthenticated])
  return (
    <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
      <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg font-semibold">Create Your Account</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
              Welcome to our registration page! Get started by creating your account.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Simple & Secure Registration</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
              Our registration process is designed to be straightforward and secure.
            </p>
          </div>
        </div>

        <form className="md:col-span-2 w-full py-6 px-6 sm:px-16" onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-gray-800 text-2xl font-bold">Create an account</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Name</label>
              <input
                name="name"
                type="text"
                className={`text-gray-800 bg-white border w-full text-sm px-4 py-2.5 rounded-md outline-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
              <input
                name="email"
                type="email"
                className={`text-gray-800 bg-white border w-full text-sm px-4 py-2.5 rounded-md outline-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

           

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <input
                name="password"
                type="password"
                className={`text-gray-800 bg-white border w-full text-sm px-4 py-2.5 rounded-md outline-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
              <input
                name="confirmPassword"
                type="text"
                className={`text-gray-800 bg-white border w-full text-sm px-4 py-2.5 rounded-md outline-blue-500 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm Password "
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-center">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              <label htmlFor="termsAccepted" className="ml-3 block text-sm text-gray-800">
                I accept the{" "}
                <Link to={'/terms&condition'} className="text-blue-600 font-semibold hover:underline ml-1">
                  Terms and Conditions
                </Link>
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-red-500 text-xs">{errors.termsAccepted}</p>
            )}
          </div>

          <div className="!mt-12">
          <button
                type="submit"
                className={`w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-gray-600 hover:bg-gray-700 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                 {loading ? (
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900 border-t-2 "></div>
                ) : (
                  "Create an account"
                )}
              </button>
          </div>

          <p className="text-gray-800 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link to={'/login'} className="text-blue-600 font-semibold hover:underline ml-1">
              Login here
            </Link>
          </p>
        </form>
      </div>
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
