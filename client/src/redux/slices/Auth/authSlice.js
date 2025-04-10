import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  registerUser as registerUserAPI, 
  loginUser as loginUserAPI, 
  checkAuth as checkAuthAPI,
  requestPasswordReset as requestPasswordResetAPI,
  verifyOTPAndResetPassword as verifyOTPAndResetPasswordAPI
} from '../../API/Auth/api';

// Create async thunk for registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserAPI(userData);
      return response;
    } catch (error) {
      return rejectWithValue(
        typeof error === 'string' ? error : 'Registration failed'
      );
    }
  }
);

// Create async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI(userData);
      return response;
    } catch (error) {
      return rejectWithValue(
        typeof error === 'string' ? error : 'Login failed'
      );
    }
  }
);

// Create async thunk for checking auth status
export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkAuthAPI();
      return response;
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

// Create async thunk for requesting password reset (send OTP)
export const requestPasswordReset = createAsyncThunk(
  'auth/requestPasswordReset',
  async (email, { rejectWithValue }) => {
    try {
      const response = await requestPasswordResetAPI(email);
      return response;
    } catch (error) {
      return rejectWithValue(
        typeof error === 'string' ? error : 'Password reset request failed'
      );
    }
  }
);

// Create async thunk for verifying OTP and resetting password
export const verifyOTPAndResetPassword = createAsyncThunk(
  'auth/verifyOTPAndResetPassword',
  async (resetData, { rejectWithValue }) => {
    try {
      const response = await verifyOTPAndResetPasswordAPI(resetData);
      return response;
    } catch (error) {
      return rejectWithValue(
        typeof error === 'string' ? error : 'Password reset verification failed'
      );
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  passwordResetEmail: null,
  passwordResetSuccess: false,
  passwordResetMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
    },
    clearPasswordResetState: (state) => {
      state.passwordResetEmail = null;
      state.passwordResetSuccess = false;
      state.passwordResetMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'An error occurred during registration';
        state.isAuthenticated = false;
      })
      
      // Login user cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'An error occurred during login';
        state.isAuthenticated = false;
      })
      
      // Check auth cases
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      
      // Request password reset cases
      .addCase(requestPasswordReset.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.passwordResetSuccess = false;
        state.passwordResetMessage = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state, action) => {
        state.isLoading = false;
        state.passwordResetEmail = action.payload.email;
        state.passwordResetSuccess = true;
        state.passwordResetMessage = action.payload.message;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.passwordResetSuccess = false;
      })
      
      // Verify OTP and reset password cases
      .addCase(verifyOTPAndResetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOTPAndResetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.isAuthenticated = true;
        state.passwordResetSuccess = true;
        state.passwordResetMessage = action.payload.message;
        state.passwordResetEmail = null;
      })
      .addCase(verifyOTPAndResetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, logout, clearPasswordResetState } = authSlice.actions;
export default authSlice.reducer;
