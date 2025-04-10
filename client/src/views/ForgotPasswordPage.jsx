import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { 
  requestPasswordReset, 
  verifyOTPAndResetPassword, 
  clearError, 
  clearPasswordResetState 
} from '../redux/slices/Auth/authSlice';

// Email Validation Schema
const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

// OTP and Password Validation Schema
const ResetPasswordSchema = Yup.object().shape({
  otp: Yup.string()
    .required('OTP is required')
    .matches(/^[0-9]{6}$/, 'OTP must be 6 digits'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character'
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { 
    isLoading, 
    error, 
    passwordResetSuccess, 
    passwordResetEmail, 
    passwordResetMessage, 
    isAuthenticated 
  } = useSelector((state) => state.auth);

  // Clear any existing errors when component mounts
  useEffect(() => {
    dispatch(clearError());
    return () => {
      dispatch(clearPasswordResetState());
    };
  }, [dispatch]);

  // Redirect to home if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Handle email submission
  const handleEmailSubmit = async (values, { setSubmitting }) => {
    await dispatch(requestPasswordReset(values.email));
    setSubmitting(false);
  };

  // Handle OTP and new password submission
  const handleResetSubmit = async (values, { setSubmitting }) => {
    await dispatch(verifyOTPAndResetPassword({
      email: passwordResetEmail,
      otp: values.otp,
      newPassword: values.newPassword
    }));
    setSubmitting(false);
  };

  // Helper function to render error message
  const renderError = (errorMessage) => {
    if (!errorMessage) return null;
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {typeof errorMessage === 'string' ? errorMessage : 'An error occurred'}
      </div>
    );
  };

  // Helper function to render success message
  const renderSuccess = (successMessage) => {
    if (!successMessage) return null;
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        {successMessage}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-roobert mb-6 text-center">Forgot Password</h2>
        
        {renderError(error)}
        {renderSuccess(passwordResetMessage)}
        
        {!passwordResetSuccess ? (
          // Step 1: Email form
          <Formik
            initialValues={{ email: '' }}
            validationSchema={EmailSchema}
            onSubmit={handleEmailSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-0 font-roobert rounded"
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 px-6 font-roobert hover:bg-gray-900 transition-colors duration-300 rounded"
                  disabled={isLoading || isSubmitting}
                >
                  {isLoading ? 'Sending...' : 'Send Reset OTP'}
                </button>
                
                <div className="text-center mt-4">
                  <Link to="/login" className="text-gray-600 hover:text-black font-roobert text-sm">
                    Back to Login
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          // Step 2: OTP and new password form
          <Formik
            initialValues={{ otp: '', newPassword: '', confirmPassword: '' }}
            validationSchema={ResetPasswordSchema}
            onSubmit={handleResetSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <p className="mb-4 text-sm text-gray-600">
                    We've sent a 6-digit OTP to <strong>{passwordResetEmail}</strong>. 
                    Please enter it below along with your new password.
                  </p>
                  
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">OTP Code</label>
                  <Field
                    type="text"
                    name="otp"
                    placeholder="Enter 6-digit OTP"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-0 font-roobert rounded"
                  />
                  {errors.otp && touched.otp && (
                    <div className="text-red-500 text-sm mt-1">{errors.otp}</div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <Field
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-0 font-roobert rounded"
                  />
                  {errors.newPassword && touched.newPassword && (
                    <div className="text-red-500 text-sm mt-1">{errors.newPassword}</div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-0 font-roobert rounded"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 px-6 font-roobert hover:bg-gray-900 transition-colors duration-300 rounded"
                  disabled={isLoading || isSubmitting}
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>
                
                <div className="text-center mt-4">
                  <button 
                    type="button" 
                    onClick={() => dispatch(clearPasswordResetState())}
                    className="text-gray-600 hover:text-black font-roobert text-sm"
                  >
                    Resend OTP or Change Email
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 