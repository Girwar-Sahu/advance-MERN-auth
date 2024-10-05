import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForgotPasswordMutation } from "../redux/api/apiSlice";
import { ArrowLeft, Mail, Loader } from "lucide-react";
import Input from "../components/Input";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      setIsSubmitted(true);
    } catch (error) {
      console.log(error?.data?.message);
      setError(error?.data?.message);
    }
  };
  return (
    <motion.div
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Forgot Password
        </h2>
        {isSubmitted ? (
          <div className="text-center">
            <motion.div className="w-16 h-16 bg-green-500 rounded-full flex justify-center items-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </motion.div>
            <p className="text-gray-300 mb-6">
              If account exists for {email} you will receive a password reset
              link sortly on your email id
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-gray-300 mb-6 text-center">
              Enter your email and we'll send you a link to reset your password.
            </p>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="text-red-500">{error}</p>}
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
                "Send Reset Link"
              )}
            </motion.button>
          </form>
        )}
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center ">
        <Link
          to="/signin"
          className="text-sm text-green-400 hover:underline flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to SignIn
        </Link>
      </div>
    </motion.div>
  );
}

export default ForgotPasswordPage;
