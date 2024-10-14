import { apiFetch, } from '~/helpers/utils/api';

export const registerApi = (userData) => apiFetch({
  url: 'auth/register',
  options: {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: userData,
  },
});

export const loginApi = credentials => apiFetch({
  url: 'auth/login',
  options: {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: credentials,
  },
});

export const updateUserApi = (data) => {
  const token = localStorage.getItem('token');
  return apiFetch({
    url: 'auth',
    options: {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: (data),
    },
  });
};

export const updatePasswordApi = (data) => {
  const token = localStorage.getItem('token');
  return apiFetch({
    url: 'auth/password',
    options: {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: (data),
    },
  });
};

export const deleteUserApi = () => {
  const token = localStorage.getItem('token');
  return apiFetch({
    url: 'auth',
    options: {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    },
  });
};

export const forgotPasswordApi = (email) => apiFetch({
  url: 'auth/forgot-password',
  options: {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: (email),
  },
});

export const resetPasswordApi = (data) => apiFetch({
  url: 'auth/reset-password',
  options: {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: (data),
  },
});

export const deletePhotoApi = (photoId) => {
  const token = localStorage.getItem('token');
  
  return apiFetch({
    url: `auth/photos/${photoId}`,
    options: {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    },
  });
};

export const getInfoApi = () => {
  const token = localStorage.getItem('token');
  return apiFetch({
    url: 'auth',
    options: {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    },
  });
};

export const googleApi = (data) => apiFetch({
  url: 'auth/google',
  queryParams: data,
});
