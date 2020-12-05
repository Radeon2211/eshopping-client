export const pages = {
  ALL_PRODUCTS: 'ALL_PRODUCTS',
  MY_PRODUCTS: 'MY_PRODUCTS',
  USER_PRODUCTS: 'USER_PRODUCTS',
};

export const listItemTypes = {
  PRODUCT: 'PRODUCT',
  ORDER: 'ORDER',
};

export const historyActions = {
  PUSH: 'PUSH',
  REPLACE: 'REPLACE',
};

export const inputKinds = {
  INPUT: 'INPUT',
  TEXTAREA: 'TEXTAREA',
  SELECT: 'SELECT',
  RADIO: 'RADIO',
};

export const MAX_QUANTITY_PER_PAGE = 2;

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
  SIGNUP: 'SIGNUP',
  LOGIN: 'LOGIN',
  ADD_PRODUCT: 'ADD_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  CHANGE_NAME: 'CHANGE_NAME',
  CHANGE_EMAIL: 'CHANGE_EMAIL',
  CHANGE_USERNAME: 'CHANGE_USERNAME',
  CHANGE_PHONE_NUMBER: 'CHANGE_PHONE_NUMBER',
  CHANGE_ADDRESS: 'CHANGE_ADDRESS',
  CHANGE_CONTACTS: 'CHANGE_CONTACTS',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  ABOUT_WEBSITE: 'ABOUT_WEBSITE',
};

export const sortOptions = [
  { value: undefined, label: 'Default sorting' },
  { value: 'price:asc', label: `Price - ascending` },
  { value: 'price:desc', label: 'Price - descending' },
  { value: 'name:asc', label: 'Name - A to Z' },
  { value: 'name:desc', label: 'Name - Z to A' },
];

export const singleInfoNames = {
  NAME: 'Name',
  EMAIL: 'Email',
  PHONE_NUMBER: 'Phone number',
  ADDRESS: 'Address',
  CONTACTS: 'Contacts',
  USERNAME: 'Username',
};
