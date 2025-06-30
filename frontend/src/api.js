import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.REACT_APP_API_URL}`, // or your deployed Flask URL
});

export const setAuthToken = token => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
