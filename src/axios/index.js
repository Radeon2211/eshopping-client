import axios from 'axios';
import adapter from 'axios/lib/adapters/http';
import rateLimit from 'axios-rate-limit';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  adapter,
});

const http = rateLimit(instance, { maxRPS: 7 });

export default http;
