import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, // or your deployed Flask URL
});

export const setAuthToken = token => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
/*
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 403 && data.PremiumExpired) {
        window.location.href = "/premiumexpired"; 
      }
    }

    return Promise.reject(error);
  }
);*/
export default api;
