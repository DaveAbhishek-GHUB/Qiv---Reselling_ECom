import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Enable sending and receiving cookies
});

// Helper function to extract error message
const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error.response?.data?.message) return error.response.data.message;
  if (error.response?.data && typeof error.response.data === 'string') return error.response.data;
  if (error.message) return error.message;
  return 'Something went wrong';
};

// Helper function to handle auth response
const handleAuthResponse = (response) => {
  const { data } = response;
  // Store any additional auth data if needed
  return data;
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', {
      username: userData?.username,
      email: userData?.email,
      password: userData?.password, 
      confirmPassword: userData?.confirmPassword
    });
    return handleAuthResponse(response);
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post('/users/login', {
      email: userData?.email,
      password: userData?.password
    });
    return handleAuthResponse(response);
  } catch (error) {
    throw getErrorMessage(error);
  }
};

// Add a function to check auth status
export const checkAuth = async () => {
  try {
    const response = await api.get('/users/me');
    return handleAuthResponse(response);
  } catch (error) {
    throw getErrorMessage(error);
  }
};
