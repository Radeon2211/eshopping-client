import { ProductCondition } from '../../src/shared/types/enums';
import { adminUser, activeUser } from './users';

export const productOne = {
  name: 'Product One',
  description: 'Cool product',
  price: 120,
  quantity: 10,
  seller: {
    username: adminUser.username,
  },
  condition: ProductCondition.NEW,
  buyerQuantity: 0,
  quantitySold: 0,
};

export const productTwo = {
  name: 'Product Two',
  description: 'Another awesome product',
  price: 15.5,
  quantity: 50,
  seller: {
    username: activeUser.username,
  },
  condition: ProductCondition.USED,
  buyerQuantity: 0,
  quantitySold: 0,
};

export const productThree = {
  name: 'Product Three',
  description: 'Other super cool product',
  price: 179.49,
  quantity: 100,
  seller: {
    username: activeUser.username,
  },
  condition: ProductCondition.NOT_APPLICABLE,
  buyerQuantity: 0,
  quantitySold: 0,
};

// sorted by save date ascending
export const allProducts = [productThree, productTwo, productOne];
