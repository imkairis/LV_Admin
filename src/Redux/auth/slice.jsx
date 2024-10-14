import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  user: null,
  token: null,
  message: null,
  resetPasswordSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerRequestStart: state => {
      state.loading = true;
      state.error = null;
    },
    registerRequestSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    registerRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    loginRequestStart: state => {
      state.loading = true;
      state.error = null;
    },
    loginRequestSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    loginRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: state => {
      state.token = null;
      state.user = null;
    },
    updateUserRequestStart: state => {
      state.loading = true;
      state.error = null;
    },
    updateUserRequestSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    updateUserRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordRequestStart: state => {
      state.loading = true;
      state.error = null;
    },
    updatePasswordRequestSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    updatePasswordRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteUserRequestStart: state => {
      state.loading = true;
      state.error = null;
    },
    deleteUserRequestSuccess: state => {
      state.loading = false;
      state.user = null;
    },
    deleteUserRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    forgotPasswordRequestStart: state => {
      state.loading = true;
      state.error = null;
    },
    forgotPasswordRequestSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.resetPasswordSuccess = null;
    },
    forgotPasswordRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetPasswordRequestStart: state => {
      state.loading = true;
      state.error = null;
      state.resetPasswordSuccess = null;
    },
    resetPasswordRequestSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.resetPasswordSuccess = true;
    },
    resetPasswordRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.resetPasswordSuccess = false;
    },

    deletePhotoRequestStart: state => {
      state.loading = true;
      state.error = null;
    },
    deletePhotoRequestSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    deletePhotoRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getInfoRequestStart: state => {
      state.loading = true;
      state.error = null;
    },
    getInfoRequestSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    getInfoRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    googleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const {
  registerRequestStart, registerRequestSuccess, registerRequestFailure,
  loginRequestStart, loginRequestSuccess, loginRequestFailure, logout,
  updateUserRequestStart, updateUserRequestSuccess, updateUserRequestFailure,
  deleteUserRequestStart, deleteUserRequestSuccess, deleteUserRequestFailure,
  forgotPasswordRequestStart, forgotPasswordRequestSuccess, forgotPasswordRequestFailure,
  resetPasswordRequestStart, resetPasswordRequestSuccess, resetPasswordRequestFailure,
  deletePhotoRequestStart, deletePhotoRequestSuccess, deletePhotoRequestFailure,
  getInfoRequestStart, getInfoRequestSuccess, getInfoRequestFailure, googleStart, updatePasswordRequestFailure, updatePasswordRequestStart, updatePasswordRequestSuccess,
} = authSlice.actions;

export default authSlice.reducer;
