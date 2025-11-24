import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRoleSelectionModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  if (!open) return null;

  const handleRoleSelect = (role) => {
    onClose();
    navigate(`/login/${role}`);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full mx-4 p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center">Login</h2>
        <p className="mt-2 text-sm text-gray-500 text-center">
          Select your role to sign in
        </p>

        {/* Role Buttons */}
        <div className="mt-6 space-y-4">
          {/* Student Button */}
          <button
            onClick={() => handleRoleSelect('student')}
            className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-xl">
                🎓
              </div>
              <span className="text-base font-medium text-gray-900">Student</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Instructor Button */}
          <button
            onClick={() => handleRoleSelect('instructor')}
            className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 text-xl">
                👨‍🏫
              </div>
              <span className="text-base font-medium text-gray-900">Instructor</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Admin Button */}
          <button
            onClick={() => handleRoleSelect('admin')}
            className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-green-500 text-xl">
                🛡️
              </div>
              <span className="text-base font-medium text-gray-900">Admin</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRoleSelectionModal;