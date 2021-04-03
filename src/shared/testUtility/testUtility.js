// eslint-disable-next-line import/no-extraneous-dependencies
import checkPropTypes from 'check-prop-types';
import { v4 as uuidv4 } from 'uuid';
import { fireEvent, waitFor } from '@testing-library/react';
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

export const createProductItem = (props = {}) => {
  const finalProps = {
    id: uuidv4(),
    sellerUsername: 'username',
    quantity: 1,
    price: 2,
    name: 'product name',
    photo: false,
    quantitySold: 0,
    buyerQuantity: 0,
    description: '',
    condition: productConditions.NEW,
    ...props,
  };

  return {
    _id: finalProps.id,
    name: finalProps.name,
    price: finalProps.price,
    quantity: finalProps.quantity,
    quantitySold: finalProps.quantitySold,
    buyerQuantity: finalProps.buyerQuantity,
    description: finalProps.description,
    condition: finalProps.condition,
    photo: finalProps.photo,
    seller: {
      username: finalProps.sellerUsername,
    },
    __v: 0,
    createdAt: '2021-02-10T19:10:38.872Z',
    updatedAt: '2021-02-10T19:10:38.872Z',
  };
};

export const createCartItem = (props = {}) => {
  const finalProps = {
    id: uuidv4(),
    sellerUsername: 'username',
    quantity: 1,
    productId: uuidv4(),
    price: 2,
    name: 'product name',
    productQuantity: 2,
    photo: false,
    ...props,
  };
  const product = createProductItem({
    id: finalProps.productId,
    sellerUsername: finalProps.sellerUsername,
    quantity: finalProps.productQuantity,
    price: finalProps.price,
    name: finalProps.name,
    photo: finalProps.photo,
  });

  return {
    _id: finalProps.id,
    quantity: finalProps.quantity,
    product,
  };
};

export const createTransactionAndOrderProdItem = (props = {}) => {
  const finalProps = {
    productId: uuidv4(),
    sellerUsername: 'username',
    quantity: 1,
    price: 2,
    name: 'product name',
    photo: false,
    ...props,
  };

  return {
    _id: finalProps.productId,
    name: finalProps.name,
    photo: finalProps.photo,
    price: finalProps.price,
    quantity: finalProps.quantity,
    seller: {
      username: finalProps.sellerUsername,
    },
  };
};

export const createOrder = (props = {}) => {
  const finalProps = {
    products: [createTransactionAndOrderProdItem()],
    id: uuidv4(),
    sellerUsername: undefined,
    buyerUsername: undefined,
    overallPrice: undefined,
    createdAt: undefined,
    sellerEmail: undefined,
    sellerPhone: undefined,
    ...props,
  };

  const seller = finalProps.sellerUsername
    ? {
        username: finalProps.sellerUsername,
        email: finalProps.sellerEmail,
        phone: finalProps.sellerPhone,
      }
    : null;

  const buyer = finalProps.buyerUsername
    ? {
        username: finalProps.buyerUsername,
      }
    : null;

  return {
    _id: finalProps.id,
    seller,
    buyer,
    products: finalProps.products,
    overallPrice: finalProps.overallPrice,
    deliveryAddress: defaultDeliveryAddress,
    createdAt: finalProps.createdAt,
    updatedAt: finalProps.createdAt,
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

export const clickAtSubmitButton = async (container) => {
  await waitFor(() => {
    fireEvent.click(container.querySelector('button[type="submit"]'));
  });
};
