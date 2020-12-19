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
  maxQuantityPerPage: 2,
});

export const createCartItem = (
  sellerId = uuidv4(),
  sellerUsername = 'username',
  quantity = 1,
  productId,
  price = 2,
  name = 'product name',
  productQuantity = 2,
  photo,
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
