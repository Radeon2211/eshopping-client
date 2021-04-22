import { productConditions } from '../../src/shared/constants';
import { adminUser, activeUser } from './users';

export const productOne = {
  name: 'Product One',
  description: 'Cool product',
  price: 15.5,
  quantity: 10,
  seller: {
    username: adminUser.username,
  },
  condition: productConditions.NEW,
  buyerQuantity: 0,
  quantitySold: 0,
};

export const productTwo = {
  name: 'Product Two',
  description: 'Another awesome product',
  price: 120,
  quantity: 50,
  seller: {
    username: activeUser.username,
  },
  condition: productConditions.USED,
  buyerQuantity: 0,
  quantitySold: 0,
};
