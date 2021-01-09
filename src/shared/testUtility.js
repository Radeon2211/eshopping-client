// eslint-disable-next-line import/no-extraneous-dependencies
import checkPropTypes from 'check-prop-types';
import { v4 as uuidv4 } from 'uuid';

export const checkProps = (component, expectedProps) => {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  return checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
};

export const historyPageNum = (pageNumber) => ({
  listen: jest.fn(),
  location: { search: `?p=${pageNumber}` },
  createHref: jest.fn(),
  push: jest.fn(),
});

export const propsPagination = (itemQuantity = 5) => ({
  itemQuantity,
  isDataLoading: false,
  quantityPerPage: 2,
});

export const createCartItem = (
  sellerId = uuidv4(),
  sellerUsername = 'username',
  quantity = 1,
  productId,
  price = 2,
  name = 'product name',
  productQuantity = 2,
  photo = false,
) => ({
  _id: uuidv4(),
  product: {
    _id: productId || uuidv4(),
    name,
    photo,
    price,
    quantity: productQuantity,
    seller: {
      _id: sellerId,
      username: sellerUsername,
    },
  },
  quantity,
});

export const createTransactionAndOrderProdItem = (
  sellerId = uuidv4(),
  sellerUsername = 'username',
  productId,
  quantity = 1,
  price = 2,
  name = 'product name',
  photo = false,
) => ({
  _id: productId || uuidv4(),
  name,
  photo,
  price,
  quantity,
  seller: {
    _id: sellerId,
    username: sellerUsername,
  },
});

export const createOrder = (
  products,
  orderId = uuidv4(),
  sellerUsername = 'seller',
  buyerUsername = 'buyer',
  overallPrice,
  createdAt,
) => {
  return {
    _id: orderId,
    seller: {
      _id: uuidv4(),
      username: sellerUsername,
    },
    buyer: {
      _id: uuidv4(),
      username: buyerUsername,
    },
    products,
    overallPrice,
    createdAt,
  };
};
