import axios from 'axios';

export const baseURL = 'https://radeon2211-eshopping.herokuapp.com';

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

const getCsrfToken = async () => {
  const { data } = await instance.get('/csrf-token');
  instance.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
};
getCsrfToken();

export default instance;
