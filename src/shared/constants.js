import * as Yup from 'yup';
import { getCountries } from 'country-fns';

export const anyStringRule = Yup.string().min(1).required();

export const userRules = {
  email: Yup.string().email().max(320).trim().required(),
  hideEmail: Yup.bool(),
  username: Yup.string().min(3).max(20).trim().required(),
  password: Yup.string().min(7).max(64).trim().required(),
  firstName: Yup.string().max(60).trim().required(),
  lastName: Yup.string().max(80).trim().required(),
  phonePrefix: Yup.object()
    .shape({
      value: Yup.string().required(),
      label: Yup.string().required(),
    })
    .nullable()
    .required(),
  phoneNumber: Yup.string()
    .min(5)
    .max(15)
    .matches(/^[\d-]{5,15}$/)
    .trim()
    .required(),
  hidePhone: Yup.bool(),
  street: Yup.string().max(60).trim().required(),
  zipCode: Yup.string().max(12).trim().required(),
  city: Yup.string().max(100).trim().required(),
  country: Yup.object()
    .shape({
      value: Yup.string().required(),
      label: Yup.string().required(),
    })
    .nullable()
    .required(),
};

export const productConditions = {
  NEW: 'new',
  USED: 'used',
  NOT_APPLICABLE: 'not_applicable',
};

export const productRules = {
  name: Yup.string().max(150).trim().required(),
  price: Yup.number().min(0.01).max(1000000).required(),
  quantity: Yup.number().min(1).max(100000).required(),
  condition: Yup.string()
    .oneOf([productConditions.NEW, productConditions.USED, productConditions.NOT_APPLICABLE])
    .required(),
  description: Yup.string().max(600).trim(),
};

export const listOfAreaCodes = getCountries().map(({ name, dial }) => {
  const finalValue = `+${dial} ${name.split('(')[0].trim()}`;
  return {
    value: dial,
    label: finalValue,
  };
});

export const listOfCountries = getCountries().map(({ name }) => {
  const finalValue = name.split('(')[0].trim();
  return {
    value: finalValue,
    label: finalValue,
  };
});

export const productPages = {
  ALL_PRODUCTS: 'ALL_PRODUCTS',
  MY_PRODUCTS: 'MY_PRODUCTS',
  USER_PRODUCTS: 'USER_PRODUCTS',
};

export const itemTypes = {
  CART: 'CART',
  ORDER: 'ORDER',
  TRANSACTION: 'TRANSACTION',
};

export const listItemTypes = {
  PRODUCT: 'PRODUCT',
  ORDER: 'ORDER',
};

export const orderTypes = {
  PLACED_ORDERS: 'PLACED_ORDERS',
  SELL_HISTORY: 'SELL_HISTORY',
};

export const inputKinds = {
  INPUT: 'INPUT',
  TEXTAREA: 'TEXTAREA',
  SELECT: 'SELECT',
  RADIO: 'RADIO',
};

export const defaultProductsPerPage = 10;

export const defaultOrdersPerPage = 6;

export const defaultAppPath = '/products?p=1';

export const filtersActions = {
  INIT_STATE: 'INIT_STATE',
  SET_SORT_BY: 'SET_SORT_BY',
  SET_MIN_PRICE: 'SET_MIN_PRICE',
  SET_MAX_PRICE: 'SET_MAX_PRICE',
  SET_CONDITION: 'SET_CONDITION',
};

export const sliderPositionsActions = {
  SET_BOTH: 'SET_BOTH',
  SET_LEFT: 'SET_LEFT',
  SET_RIGHT: 'SET_RIGHT',
};

export const modalTypes = {
  ABOUT_WEBSITE: 'ABOUT_WEBSITE',
  ADD_ADMIN: 'ADD_ADMIN',
  ADD_PRODUCT: 'ADD_PRODUCT',
  BUY_PRODUCTS: 'BUY_PRODUCTS',
  CART_ITEM_ADDED: 'CART_ITEM_ADDED',
  CHANGE_NAME: 'CHANGE_NAME',
  CHANGE_EMAIL: 'CHANGE_EMAIL',
  CHANGE_USERNAME: 'CHANGE_USERNAME',
  CHANGE_PHONE_NUMBER: 'CHANGE_PHONE_NUMBER',
  CHANGE_ADDRESS: 'CHANGE_ADDRESS',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  CHANGE_CONTACTS: 'CHANGE_CONTACTS',
  CHANGE_DELIVERY_ADDRESS: 'CHANGE_DELIVERY_ADDRESS',
  CLEAR_CART: 'CLEAR_CART',
  DELETE_ACCOUNT: 'DELETE_ACCOUNT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  EDIT_PRODUCT: 'EDIT_PRODUCT',
  LOGIN: 'LOGIN',
  REMOVE_ADMIN: 'REMOVE_ADMIN',
  RESET_PASSWORD: 'RESET_PASSWORD',
  PENDING_USER_INFO: 'PENDING_USER_INFO',
  SEND_VERIFICATION_LINK: 'SEND_VERIFICATION_LINK',
  SIGNUP: 'SIGNUP',
};

export const sortProductsOptions = [
  { value: undefined, label: 'Default sorting' },
  { value: 'price:asc', label: `Price - ascending` },
  { value: 'price:desc', label: 'Price - descending' },
  { value: 'name:asc', label: 'Name - A to Z' },
  { value: 'name:desc', label: 'Name - Z to A' },
];

export const sortOrdersOptions = [
  { value: 'createdAt:desc', label: 'Date - from newest' },
  { value: 'createdAt:asc', label: 'Date - from oldest' },
  { value: 'overallPrice:asc', label: `Price - ascending` },
  { value: 'overallPrice:desc', label: 'Price - descending' },
];

export const singleInfoNames = {
  USERNAME: 'Username',
  NAME: 'Name',
  EMAIL: 'Email',
  PHONE_NUMBER: 'Phone number',
  ADDRESS: 'Address',
  CONTACTS: 'Contacts',
};

export const updateCartActions = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  NUMBER: 'NUMBER',
};

export const defaultErrorMessage = 'Something went wrong';

export const productsPerPageControllerOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
  { value: 25, label: '25' },
];

export const defaultScrollToConfig = {
  top: 0,
  left: 0,
  behavior: 'smooth',
};

export const userStatuses = {
  ACTIVE: 'active',
  PENDING: 'pending',
};
