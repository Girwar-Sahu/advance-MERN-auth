import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useVerifyEmailMutation } from "../redux/api/apiSlice.js";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/auth/authSlice.js";

function VerifyEmailPage() {
  const [code, setCode] = useState(new Array(6).fill("")); // Initialize with 6 empty fields
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [error, setError] = useState("");

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]?$/.test(value)) {
      // Only allow numeric input
      const updatedCode = [...code];
      updatedCode[index] = value;
      setCode(updatedCode);
      if (value && index < 5) e.target.nextSibling?.focus(); // Focus next input
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      e.target.previousSibling?.focus(); // Focus previous input on backspace
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6); // Get only 6 digits
    if (/^\d{1,6}$/.test(paste)) {
      // Validate paste input as numbers
      const updatedCode = paste
        .split("")
        .concat(new Array(6).fill(""))
        .slice(0, 6);
      setCode(updatedCode);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const varificationCode = code.join("");
    try {
      const result = await verifyEmail({ varificationCode }).unwrap();
      dispatch(setUser(result.user));
      navigate("/");
    } catch (error) {
      console.log("faild to verify email", error);
      setError(error?.data?.message);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <motion.div
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
        Verify Your Email
      </h2>
      <p className="text-center text-gray-300 mb-3">
        Enter the 6-digit code sent to your email address
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined} // Only handle paste on the first input
              className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-500 rounded-lg focus:border-green-500 focus:outline-none"
            />
          ))}
        </div>
        {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
        <motion.button
          type="submit"
          className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="w-6 h-6 animate-spin text-center mx-auto" />
          ) : (
            "Verify Email"
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default VerifyEmailPage;
