import { motion } from "framer-motion";
import { Loader, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "../redux/api/apiSlice.js";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/auth/authSlice.js";

function SigninPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSingin = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn({ email, password }).unwrap();
      dispatch(setUser(result.user));
      navigate("/");
    } catch (error) {
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
          Welcome Back
        </h2>
        <form onSubmit={handleSingin}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center mb-5">
            <Link
              to="/forgot-password"
              className="text-sm text-green-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
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
              "SignIn"
            )}
          </motion.button>
        </form>
      </div>
      <div className="p-4 bg-gray-900 flex justify-center">
        <p className="text-sm text-gray-400">
          Don't hove an account?
          <Link to="/signup" className="text-green-500 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default SigninPage;
