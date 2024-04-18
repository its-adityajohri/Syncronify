import axios from 'axios';
import dotenv from 'dotenv';
// config
const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;