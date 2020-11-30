import axios from 'axios';
import adapter from 'axios/lib/adapters/http';

const serverURL = 'https://radeon2211-eshopping.herokuapp.com';
const localURL = 'http://192.168.1.109:4000';

export const baseURL = serverURL;

const instance = axios.create({
  baseURL,
  withCredentials: true,
  adapter,
});

const getCsrfToken = async () => {
  const { data } = await instance.get('/csrf-token');
  instance.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
};
getCsrfToken();

export default instance;
