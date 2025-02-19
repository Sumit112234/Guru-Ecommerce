import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OtpVerificationWithEmail() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [stage, setStage] = useState("email"); 
  const backendUrl = import.meta.env.VITE_APP_SERVER_URL;
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleEmailSubmit = async(e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    setError("");
    

    try {
      let forgotPass = await fetch(`${backendUrl}user/forgotPass`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    });

       let data = await forgotPass.json();

        //console.log(data);

      
    } catch (error) {
      //console.log("some internal server error from otp verification.");
    }

    //console.log(`OTP sent to ${email}`);


    setStage("otp");
  };

 
  const handleKeyDown = (e) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Backspace" || e.key === "Delete") {
      const index = inputRefs.current.indexOf(e.target);
      if (index > 0) {
        setOtp((prevOtp) => [
          ...prevOtp.slice(0, index),
          "",
          ...prevOtp.slice(index + 1),
        ]);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  
  const handleInput = (e) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);
    if (target.value) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        target.value,
        ...prevOtp.slice(index + 1),
      ]);
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
      return;
    }
    const digits = text.split("");
    setOtp(digits);
  };

  // Handle OTP submission
  const handleOtpSubmit = async(e) => {
    e.preventDefault();
    if (otp.includes("")) {
      setError("Please fill out all fields.");
      return;
    }
    setError("");
    // Simulate OTP verification
    const enteredOtp = otp.join("");
    //console.log(`Entered OTP: ${enteredOtp}`);

    
    
    try {
      let forgotPass = await fetch(`${'http://localhost:8759/api/'}user/verify-otp`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, otp : enteredOtp})
    });

       let data = await forgotPass.json();

       
        //console.log(data);

      if(data.status)
      {
        //console.log("Opt matches.");
        setStage("success");
        navigate(`/set-password?email=${email}`);
      }
      else{
        setError("Incorrect OTP. Please try again.");
          //console.log("Not matches.")
      }

      
    } catch (error) {
      //console.log("some internal server error from otp verification.");
    }

  };

  return (
    <section className="flex h-screen items-center justify-center bg-pink-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {stage === "email" && (
          <>
            <h1 className="text-2xl font-bold text-pink-600 text-center mb-4">
              Enter Your Email
            </h1>
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-pink-300 p-2 text-pink-600 outline-none focus:ring-2 focus:ring-pink-400"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-lg bg-pink-500 py-2 text-white font-medium shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                Submit
              </button>
            </form>
          </>
        )}

        {stage === "otp" && (
          <>
            <h1 className="text-2xl font-bold text-pink-600 text-center mb-4">
              OTP Verification
            </h1>
            <p className="mb-4 text-center text-sm text-pink-500">
              Please enter the 4-digit code sent to {email}.
            </p>
            <form
              onSubmit={handleOtpSubmit}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onPaste={handlePaste}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="flex h-14 w-14 items-center justify-center rounded-lg border border-pink-300 bg-pink-50 text-center text-2xl font-medium text-pink-600 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                ))}
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-pink-500 py-2 text-white font-medium shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                Submit OTP
              </button>
            </form>
          </>
        )}

        {stage === "success" && (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-pink-600 mb-4">
              Verification Successful!
            </h1>
            <p className="text-pink-500">
              You have successfully verified your OTP. Redirecting to the next
              page...
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
