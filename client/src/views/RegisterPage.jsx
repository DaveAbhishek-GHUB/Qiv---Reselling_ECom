import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { registerUser, clearError } from '../redux/slices/Auth/authSlice';

// Validation Schema
const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    // Redirect to home page if registration is successful
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    dispatch(registerUser(values));
    setSubmitting(false);
  };

  // Helper function to render error message
  const renderError = (errorMessage) => {
    if (!errorMessage) return null;
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {typeof errorMessage === 'string' ? errorMessage : 'An error occurred'}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section (Register) */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <h2 className="text-sm font-roobert mb-2">Register</h2>
        <h3 className="text-2xl font-roobert mb-8">Create account</h3>
        
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ errors: formErrors, touched, isSubmitting }) => (
            <Form className="space-y-6">
              {renderError(error)}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-0 font-roobert"
                  />
                  {formErrors.username && touched.username && (
                    <div className="text-red-500 text-sm mt-1">{formErrors.username}</div>
                  )}
                </div>
                
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-0 font-roobert"
                  />
                  {formErrors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">{formErrors.email}</div>
                  )}
                </div>
              </div>
              
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-0 font-roobert"
                />
                {formErrors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">{formErrors.password}</div>
                )}
              </div>
              
              <div>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-0 font-roobert"
                />
                {formErrors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 font-roobert hover:bg-gray-900 transition-colors duration-300"
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Right Section (Login) */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-gray-50">
        <h2 className="text-sm font-roobert mb-2">Already registered</h2>
        <h3 className="text-2xl font-roobert mb-6">Have an account?</h3>
        <p className="text-gray-600 mb-8">
          Click below to login.
        </p>
        <Link
          to="/login"
          className="w-full md:w-80 px-6 py-3 border-2 border-black text-center text-black font-roobert hover:bg-black hover:text-white transition-colors duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;