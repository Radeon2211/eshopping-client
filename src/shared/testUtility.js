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
      username: sellerUsername,
    },
  },
  quantity,
});

export const createTransactionAndOrderProdItem = (
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
    username: sellerUsername,
  },
});

export const createOrder = (
  products,
  orderId = uuidv4(),
  sellerUsername,
  buyerUsername,
  overallPrice,
  createdAt,
  sellerEmail,
  sellerPhone,
) => {
  const seller = sellerUsername
    ? {
        username: sellerUsername,
        email: sellerEmail,
        phone: sellerPhone,
      }
    : null;

  const buyer = buyerUsername
    ? {
        username: buyerUsername,
      }
    : null;

  return {
    _id: orderId,
    seller,
    buyer,
    products,
    overallPrice,
    createdAt,
  };
};

export const defaultDeliveryAddress = {
  firstName: 'firstName',
  lastName: 'lastName',
  street: 'street',
  zipCode: 'zipCode',
  city: 'city',
  country: 'country',
  phone: 'phone',
};

export const defaultUserProfile = {
  ...defaultDeliveryAddress,
  _id: 'id',
  username: 'username',
  email: 'email',
  status: 'active',
  contacts: {
    email: true,
    phone: true,
  },
  createdAt: 'createdAt',
};
