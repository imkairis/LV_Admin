import { deleteImageRequestFailure, deleteImageRequestStart, deleteImageRequestSuccess, } from '~/Redux/product/slice.jsx';
import { deleteImageApi, } from '~/Redux/product/api.jsx';

import { call, put, takeLatest } from 'redux-saga/effects'
import { showSnackbar, } from '../snackbar/slice';
import {
  getProductsRequestSuccess,
  getProductsRequestFailure,
  getProductRequestSuccess,
  getProductRequestFailure,
  createProductRequestSuccess,
  createProductRequestFailure,
  updateProductRequestSuccess,
  updateProductRequestFailure,
  deleteProductRequestSuccess,
  deleteProductRequestFailure,
  getProductsRequestStart,
  getProductRequestStart,
  createProductRequestStart,
  updateProductRequestStart,
  deleteProductRequestStart,
} from'./slice.jsx';
import {
  getAllRequestApi,
  getOneRequestApi,
  createOneRequestApi,
  updateOneRequestApi,
  deleteOneRequestApi,
} from './api.jsx';

function* handleGetProductsRequest(action) {
  try {
    const response = yield call(getAllRequestApi, action.payload);
    const { data, meta, } = response;
    yield put(
      getProductsRequestSuccess({
        data,
        meta,
      })
    );
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getProductsRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleGetProductRequest(action) {
  try {
    const response = yield call(getOneRequestApi, action.payload);
    const { data, } = response;
    yield put(getProductRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getProductRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleCreateProductRequest(action) {
  try {
    const response = yield call(createOneRequestApi, action.payload);
    const { data, } = response;
    yield put(createProductRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Product created successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(createProductRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Product creation failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleUpdateProductRequest(action) {
  try {
    const response = yield call(
      updateOneRequestApi,
      action.payload.id,
      action.payload.data
    );
    const { data, } = response;
    yield put(updateProductRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Product updated successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(updateProductRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Product update failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleDeleteProductRequest(action) {
  try {
    yield call(deleteOneRequestApi, action.payload);
    yield put(deleteProductRequestSuccess());
    yield put(
      showSnackbar({
        message: 'Product deleted successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(deleteProductRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Product deletion failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleDeleteProductImageRequest(action) {
  try {
    const response = yield call(deleteImageApi, action.payload.id, action.payload.imageId);
    yield put(deleteImageRequestSuccess(response.data));
    yield put(showSnackbar({
      message: 'Deleted successfully!', severity: 'success',
    }));
  } catch (err) {
    yield put(deleteImageRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Delete failed: ${err.message}`, severity: 'error',
    }));
  }
}

export default function* watchProductActions() {
  yield takeLatest(getProductsRequestStart.type, handleGetProductsRequest);
  yield takeLatest(getProductRequestStart.type, handleGetProductRequest);
  yield takeLatest(createProductRequestStart.type, handleCreateProductRequest);
  yield takeLatest(updateProductRequestStart.type, handleUpdateProductRequest);
  yield takeLatest(deleteProductRequestStart.type, handleDeleteProductRequest);
  yield takeLatest(deleteImageRequestStart.type, handleDeleteProductImageRequest);
}
