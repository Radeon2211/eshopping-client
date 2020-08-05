import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

const getCsrfToken = async () => {
  const { data } = await instance.get('/csrf-token');
  instance.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
};
getCsrfToken();

export default instance;