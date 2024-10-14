import { call, put, takeLatest, } from 'redux-saga/effects';
import { loginApi, googleApi, registerApi, updateUserApi, deleteUserApi, forgotPasswordApi, 
  resetPasswordApi, deletePhotoApi, getInfoApi,
  updatePasswordApi, } from './api.jsx';
import { loginRequestStart, loginRequestSuccess, loginRequestFailure,
  googleStart, registerRequestFailure, registerRequestSuccess, registerRequestStart,
  updateUserRequestFailure, updateUserRequestStart, updateUserRequestSuccess,
  deleteUserRequestFailure, deleteUserRequestSuccess, deleteUserRequestStart,
  forgotPasswordRequestSuccess, forgotPasswordRequestFailure, forgotPasswordRequestStart,
  resetPasswordRequestSuccess, resetPasswordRequestFailure, resetPasswordRequestStart,
  deletePhotoRequestSuccess, deletePhotoRequestFailure, deletePhotoRequestStart,
  getInfoRequestSuccess, getInfoRequestFailure, getInfoRequestStart, updatePasswordRequestFailure, updatePasswordRequestStart, updatePasswordRequestSuccess, } from './slice.jsx';
import { showSnackbar, } from '../snackbar/slice';

function* handleRegister(action) {
  try {
    const response = yield call(registerApi, action.payload);
    const { token, data, } = response;
    yield put(registerRequestSuccess({
      token, user: data, 
    }));
    localStorage.setItem('token', token);
    yield put(showSnackbar({
      message: 'Registration successful!', severity: 'success', 
    }));
  } catch(err) {
    yield put(registerRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Registration failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* handleUpdateUser(action) {
  try {
    const response = yield call(updateUserApi, action.payload);
    const { data, } = response;
    yield put(updateUserRequestSuccess(data));
    yield put(showSnackbar({
      message: 'Update successful!', severity: 'success', 
    }));
  } catch(err) {
    yield put(updateUserRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Update failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* handleUpdatePassword(action) {
  try {
    const response = yield call(updatePasswordApi, action.payload);
    const { data, } = response;
    yield put(updatePasswordRequestSuccess(data));
    yield put(showSnackbar({
      message: 'Update successful!', severity: 'success', 
    }));
  } catch(err) {
    yield put(updatePasswordRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Update failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* handleDeleteUser() {
  try {
    yield call(deleteUserApi);
    yield put(deleteUserRequestSuccess());
    yield put(showSnackbar({
      message: 'Delete successful!', severity: 'success', 
    }));
  } catch(err) {
    yield put(deleteUserRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Delete failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* handleForgotPassword(action) {
  try {
    const response = yield call(forgotPasswordApi, action.payload);
    yield put(forgotPasswordRequestSuccess(response.message));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  } catch(err) {
    yield put(forgotPasswordRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* handleResetPassword(action) {
  try {
    const response = yield call(resetPasswordApi, action.payload);
    yield put(resetPasswordRequestSuccess(response.message));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  } catch(err) {
    yield put(resetPasswordRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* handleDeletePhoto(action) {
  try {
    const response = yield call(deletePhotoApi, action.payload);
    yield put(deletePhotoRequestSuccess(response.data));
    yield put(showSnackbar({
      message: 'Delete successful!', severity: 'success', 
    }));
  } catch(err) {
    yield put(deletePhotoRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Delete failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* handleGetInfo() {
  try {
    const response = yield call(getInfoApi);
    yield put(getInfoRequestSuccess(response.data));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  } catch(err) {
    yield put(getInfoRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* handleLogin(action) {
  try {
    const response = yield call(loginApi, action.payload);
    const { token, } = response;
    localStorage.setItem('token', token);
    yield put(loginRequestSuccess(response));
    localStorage.setItem('token', token);
    yield put(showSnackbar({
      message: 'Login successful!', severity: 'success', 
    }));
  } catch (error) {
    yield put(loginRequestFailure(error.message));
    yield put(showSnackbar({
      message: `Login failed: ${error.message}`, severity: 'error', 
    }));
  }
}

function* handleGoogle(action) {
  try {
    const response = yield call(googleApi, action.payload);
    const { token, } = response;
    localStorage.setItem('token', token);
    yield put(loginRequestSuccess(response));
    yield put(showSnackbar({
      message: 'Login successful!', severity: 'success', 
    }));
  } catch (error) {
    yield put(loginRequestFailure(error.message));
    yield put(showSnackbar({
      message: `Login failed: ${error.message}`, severity: 'error', 
    }));
  }
}

export default function* watchAuthActions() {
  yield takeLatest(loginRequestStart.type, handleLogin);
  yield takeLatest(registerRequestStart.type, handleRegister);
  yield takeLatest(googleStart.type, handleGoogle);
  yield takeLatest(updateUserRequestStart.type, handleUpdateUser);
  yield takeLatest(updatePasswordRequestStart.type, handleUpdatePassword);
  yield takeLatest(deleteUserRequestStart.type, handleDeleteUser);
  yield takeLatest(forgotPasswordRequestStart.type, handleForgotPassword);
  yield takeLatest(resetPasswordRequestStart.type, handleResetPassword);
  yield takeLatest(deletePhotoRequestStart.type, handleDeletePhoto);
  yield takeLatest(getInfoRequestStart.type, handleGetInfo);
}
