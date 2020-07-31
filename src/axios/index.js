import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://radeon2211-eshopping.herokuapp.com',
});

export default instance;