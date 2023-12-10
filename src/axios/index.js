import axios from 'axios';
import rateLimit from 'axios-rate-limit';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

const http = rateLimit(instance, { maxRPS: 7 });

export default http;
