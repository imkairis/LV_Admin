import { apiFetch, } from '~/helpers/utils/api';

export const getAllRequestApi = (query) => apiFetch({
  url: 'products',
  queryParams: query,
});

export const getOneRequestApi = (id) => apiFetch({
  url: `products/${id}`,
  options: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export const createOneRequestApi = (data) => apiFetch({
  url: 'products/admin/pbook',
  options: {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: data,
  },
});

export const updateOneRequestApi = (id, data) => apiFetch({
  url: `products/admin/${id}`,
  options: {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: data,
  },
});

export const deleteOneRequestApi = (id) => apiFetch({
  url: `products/admin/${id}`,
  options: {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export const deleteImageApi = (productId, imageId) => {
  const token = localStorage.getItem('token');

  return apiFetch({
    url: `products/admin/${productId}/images/${imageId}`,
    options: {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    },
  });
};