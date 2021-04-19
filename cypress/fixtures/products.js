import { productConditions } from '../../src/shared/constants';
import { userOne } from './users';

// eslint-disable-next-line import/prefer-default-export
export const productOne = {
  name: 'Product One',
  description: 'Cool product',
  price: 15.5,
  quantity: 10,
  seller: {
    username: userOne.username,
  },
  condition: productConditions.NEW,
};
