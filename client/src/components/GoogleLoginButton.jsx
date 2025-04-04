import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    // Redirect to server's Google auth endpoint
    window.location.href = 'http://localhost:3000/api/auth/google';
  };

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-3 px-6 font-roobert hover:bg-gray-50 transition-colors duration-300 mt-4"
    >
      <FcGoogle size={20} />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton; 