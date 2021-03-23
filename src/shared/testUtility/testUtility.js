// eslint-disable-next-line import/no-extraneous-dependencies
import checkPropTypes from 'check-prop-types';
import { v4 as uuidv4 } from 'uuid';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../store/reducers/rootReducer';
import { productConditions } from '../constants';

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
  _id: 'userId',
  username: 'username',
  email: 'email@domain.com',
  status: 'active',
  contacts: {
    email: true,
    phone: true,
  },
  createdAt: '2021-02-10T19:10:38.872Z',
};

export const checkProps = (component, expectedProps) => {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  return checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
};

export const createHistoryPageNumber = (pageNumber = 1, push = jest.fn()) => ({
  listen: jest.fn(),
  location: { pathname: '/products', search: `?p=${pageNumber}` },
  createHref: jest.fn(),
  push,
});

export const createPaginationProps = (itemQuantity = 5) => ({
  itemQuantity,
  isDataLoading: false,
  quantityPerPage: 2,
});

export const createProductItem = (
  productId,
  sellerUsername = 'username',
  quantity = 1,
  price = 2,
  name = 'product name',
  photo = false,
  quantitySold = 0,
  buyerQuantity = 0,
  description = '',
  condition = productConditions.NEW,
) => ({
  _id: productId || uuidv4(),
  name,
  price,
  quantity,
  quantitySold,
  buyerQuantity,
  description,
  condition,
  photo,
  seller: {
    username: sellerUsername,
  },
  __v: 0,
  createdAt: '2021-02-10T19:10:38.872Z',
  updatedAt: '2021-02-10T19:10:38.872Z',
});

export const createCartItem = (
  sellerUsername = 'username',
  quantity = 1,
  productId,
  price = 2,
  name = 'product name',
  productQuantity = 2,
  photo = false,
) => {
  const product = createProductItem(
    productId || uuidv4(),
    sellerUsername,
    productQuantity,
    price,
    name,
    photo,
  );

  return {
    _id: uuidv4(),
    quantity,
    product,
  };
};

export const createTransactionAndOrderProdItem = (
  productId,
  sellerUsername = 'username',
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
  products = [createTransactionAndOrderProdItem()],
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
    deliveryAddress: defaultDeliveryAddress,
    createdAt,
    updatedAt: createdAt,
    __v: 0,
  };
};

export const testStore = (initialAuth = {}, initialProduct = {}, initialUI = {}) => {
  const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  const defaultState = createStoreWithMiddleware(rootReducer).getState();

  const finalState = {
    auth: {
      ...defaultState.auth,
      ...initialAuth,
    },
    product: {
      ...defaultState.product,
      ...initialProduct,
    },
    ui: {
      ...defaultState.ui,
      ...initialUI,
    },
  };
  const finalStore = createStoreWithMiddleware(rootReducer, finalState);

  return {
    store: finalStore,
    initialState: finalStore.getState(),
  };
};

export const checkReqMethodAndURL = (moxiosInstance, method, url, reqNumber = 0) => {
  if (reqNumber) {
    const requests = moxiosInstance.requests.__items;
    const prevRequest = requests[reqNumber - 1];
    return method === prevRequest.config.method && url === prevRequest.config.url;
  }
  const lastRequest = moxiosInstance.requests.mostRecent();
  return method === lastRequest.config.method && url === lastRequest.config.url;
};

export const createExpectedState = (
  initialState,
  expectedAuth = {},
  expectedProduct = {},
  expectedUI = {},
) => {
  const newState = {
    auth: {
      ...initialState.auth,
      ...expectedAuth,
    },
    product: {
      ...initialState.product,
      ...expectedProduct,
    },
    ui: {
      ...initialState.ui,
      ...expectedUI,
    },
  };

  return newState;
};

export const setUpStoreWithDefaultProfile = (auth = {}, product = {}, ui = {}) => {
  return testStore(
    {
      profile: defaultUserProfile,
      deliveryAddress: defaultDeliveryAddress,
      cart: [],
      ...auth,
    },
    product,
    ui,
  );
};
