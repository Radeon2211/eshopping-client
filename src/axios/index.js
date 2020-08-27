import axios from 'axios';
import adapter from 'axios/lib/adapters/http';

export const baseURL = 'https://radeon2211-eshopping.herokuapp.com';

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
