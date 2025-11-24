import React from 'react';
import { Link } from 'react-router-dom';

const StudentLoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // No real auth logic - just UI
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header Area */}
        <div className="bg-gradient-to-b from-blue-50 to-white pt-10 pb-8 px-8 text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center">
            <span className="text-blue-600 text-2xl">🎓</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Student Login</h1>
          <p className="mt-2 text-sm text-gray-500">
            Access your courses and track your learning progress
          </p>
        </div>

        {/* Form Area */}
        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="mt-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/60 focus:border-gray-900/60"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="mt-2">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/60 focus:border-gray-900/60"
                />
              </div>
            </div>

            {/* Remember / Forgot Row */}
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                <label className="ml-2 text-gray-700">Remember me</label>
              </div>
              <button type="button" className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-gray-900 text-white text-sm font-semibold py-3 hover:bg-black transition"
            >
              Sign in as Student
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-3 text-xs text-gray-400">
            <hr className="flex-1 h-px bg-gray-200" />
            <span>Or continue with</span>
            <hr className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Buttons */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-yellow-500 flex items-center justify-center text-white text-xs font-bold">
                G
              </div>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-blue-600 hover:bg-gray-50">
              <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                f
              </div>
              Facebook
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-xs text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
              Sign up
            </Link>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link to="/" className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLoginPage;