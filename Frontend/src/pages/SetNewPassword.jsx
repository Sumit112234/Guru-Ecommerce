import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const SetNewPassword = () => {
 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const backendUrl = import.meta.env.VITE_APP_SERVER_URL;

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  // //console.log(Qemail);
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!acceptedTerms) {
      setError("You must accept the terms and conditions.");
      return;
    }
    setError("");
   
    

    try {
      let forgotPass = await fetch(`${backendUrl}user/reset-pass`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email , newPassword : password})
    });

      let data = await forgotPass.json();

      if(data.status)
      {
        //console.log("password reset succesfully.");
        navigate('/login');
      }
      else{
        //console.log("some internal server error occured.")
      }
    } catch (error) {
      //console.log("some internal server error from forgot Password.");
    }
  };

  return (
    <section className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Left Panel */}
      <div className="flex flex-col items-center justify-center w-1/2 px-6 py-8">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          GuruElectronics
        </a>
        <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md dark:bg-gray-800 sm:p-8">
          <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
            Change Password
          </h2>
          <form
            className="mt-4 space-y-4"
            onSubmit={handleSubmit}
          >
            
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Email
              </label>

              <input
                type="email"
                name="email"
                id="email"
                value={email}
                disabled 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 text-sm bg-gray-50 border rounded-lg dark:bg-gray-700"               
              />

             
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 text-sm bg-gray-50 border rounded-lg dark:bg-gray-700"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2.5 text-sm bg-gray-50 border rounded-lg dark:bg-gray-700"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                  className="w-4 h-4 bg-gray-50 border rounded dark:bg-gray-700"
                  required
                />
              </div>
              <label
                htmlFor="terms"
                className="ml-3 text-sm text-gray-500 dark:text-gray-300"
              >
                I accept the{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full py-2.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
      {/* Right Panel */}
      <div className="hidden w-1/2 md:flex items-center justify-center">
        <img
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg"
          alt="Illustration"
          className="w-3/4"
        />
      </div>
    </section>
  );
};

export default SetNewPassword;
