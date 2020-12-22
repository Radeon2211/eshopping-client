import axios from 'axios';
import adapter from 'axios/lib/adapters/http';
import rateLimit from 'axios-rate-limit';

const serverURL = 'https://radeon2211-eshopping.herokuapp.com';
const localURL = 'http://192.168.1.109:4000';

export const baseURL = serverURL;

const instance = axios.create({
  baseURL,
  withCredentials: true,
  adapter,
});

const http = rateLimit(instance, { maxRPS: 7 });

export default http;
