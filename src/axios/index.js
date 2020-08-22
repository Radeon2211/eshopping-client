import axios from 'axios';

export const baseURL = 'http://localhost:4000';

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
