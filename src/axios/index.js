import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://radeon2211-eshopping.herokuapp.com',
});

const getCsrfToken = async () => {
  const { data } = await instance.get('/csrf-token');
  instance.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
};
getCsrfToken();

export default instance;