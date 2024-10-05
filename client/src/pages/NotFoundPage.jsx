import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NotFoundPage() {
  return (
    <motion.div
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-6xl font-bold text-white mb-4 text-center">404</h1>
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
        Page Not Found
      </h2>
      <p className="text-gray-300 mb-8 text-center">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex justify-center">
        <Link to="/">
          <motion.button
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Return to Home
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

export default NotFoundPage;
