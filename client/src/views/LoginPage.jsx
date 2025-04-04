import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { loginUser, clearError } from '../redux/slices/Auth/authSlice';
import GoogleLoginButton from '../components/GoogleLoginButton';

// Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    // Redirect to home page if login is successful
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const initialValues = {
    email: '',
    password: ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    dispatch(loginUser(values));
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
        <h2 className="text-2xl font-roobert mb-2">Register</h2>
        <h3 className="text-2xl font-roobert mb-6">Don't have an account yet?</h3>
        <p className="text-gray-600 mb-8">
          Once registered you'll be able to order items quickly, check and alter
          your measurements and find all your information in one place.
        </p>
        <Link
          to="/register"
          className="w-full md:w-80 px-6 py-3 border-2 border-black text-center text-black font-roobert hover:bg-black hover:text-white transition-colors duration-300"
        >
          Register
        </Link>
      </div>

      {/* Right Section (Login) */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-gray-50">
        <h2 className="text-sm font-roobert mb-2">Welcome back!</h2>
        <h3 className="text-2xl font-roobert mb-8">Login</h3>
        
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors: formErrors, touched, isSubmitting }) => (
            <Form className="space-y-6">
              {renderError(error)}
              
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

              <div className="text-right">
                <Link to="/forgot-password" className="text-gray-600 hover:text-black font-roobert text-sm">
                  Forgot your password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 font-roobert hover:bg-gray-900 transition-colors duration-300"
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
              
              <div className="my-4 flex items-center">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="px-3 text-gray-500 text-sm">OR</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>
              
              <GoogleLoginButton />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage; 