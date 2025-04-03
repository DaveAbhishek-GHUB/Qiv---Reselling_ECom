import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../redux/slices/Auth/authSlice';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return children;
};

export default AuthProvider; 