import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  meta: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductsRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProductsRequestSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.data;
      state.meta = action.payload.meta;
    },
    getProductsRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getProductRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProductRequestSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    getProductRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createProductRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = false;
    },
    createProductRequestSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.createSuccess = true;
    },
    createProductRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updateProductRequestSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.updateSuccess = true;
    },
    updateProductRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProductRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deleteProductRequestSuccess: (state) => {
      state.loading = false;
      state.deleteSuccess = true;
    },
    deleteProductRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteImageRequestStart: state => {
      state.loading = true;
      state.error = null;
    },
    deleteImageRequestSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    deleteImageRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createProductRequestFailure,
  createProductRequestStart,
  createProductRequestSuccess,
  deleteProductRequestFailure,
  deleteProductRequestStart,
  deleteProductRequestSuccess,
  getProductRequestFailure,
  getProductRequestStart,
  getProductRequestSuccess,
  getProductsRequestFailure,
  getProductsRequestStart,
  getProductsRequestSuccess,
  updateProductRequestFailure,
  updateProductRequestStart,
  updateProductRequestSuccess,
  deleteImageRequestStart,
  deleteImageRequestFailure,
  deleteImageRequestSuccess,
} = productSlice.actions;

export default productSlice.reducer;
