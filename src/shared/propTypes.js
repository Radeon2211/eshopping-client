import PropTypes from 'prop-types';

export const deliveryAddressStrings = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  phonePrefix: PropTypes.string,
  phoneNumber: PropTypes.string,
  street: PropTypes.string,
  zipCode: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
};

export const userProfile = {
  _id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  contacts: PropTypes.shape({
    email: PropTypes.bool.isRequired,
    phone: PropTypes.bool.isRequired,
  }).isRequired,
  ...deliveryAddressStrings,
};

export const fullProductItem = {
  _id: PropTypes.string.isRequired,
  quantitySold: PropTypes.number.isRequired,
  buyerQuantity: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
  photo: PropTypes.bool.isRequired,
  seller: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export const cartItem = {
  _id: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  product: PropTypes.shape(fullProductItem).isRequired,
};

export const orderItem = {
  _id: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      photo: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  seller: PropTypes.shape({
    username: PropTypes.string.isRequired,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
  buyer: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  deliveryAddress: PropTypes.shape(deliveryAddressStrings).isRequired,
  overallPrice: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
};

export const signupErrors = {
  email: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  ...deliveryAddressStrings,
};

export const signupTouched = {
  email: PropTypes.bool,
  username: PropTypes.bool,
  password: PropTypes.bool,
  firstName: PropTypes.bool,
  lastName: PropTypes.bool,
  phonePrefix: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  phoneNumber: PropTypes.bool,
  street: PropTypes.bool,
  zipCode: PropTypes.bool,
  city: PropTypes.bool,
  country: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  'react-select-3-input': PropTypes.bool,
  'react-select-4-input': PropTypes.bool,
};

export const signupValues = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  phonePrefix: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  phoneNumber: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  zipCode: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
};
