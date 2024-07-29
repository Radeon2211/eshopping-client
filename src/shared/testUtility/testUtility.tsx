/* eslint-disable import/no-extraneous-dependencies */
import { ReactElement } from 'react';
import { Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { MockStoreEnhanced } from 'redux-mock-store';
import { fireEvent, waitFor, render } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import moxios from 'moxios';
import rootReducer from '../../store/reducers/rootReducer';
import theme from '../../styled/theme';
import {
  CartItem,
  DeliveryAddress,
  Order,
  OrderProductItem,
  Product,
  Profile,
  ProfileStatus,
} from '../types/types';
import { ProductCondition } from '../types/enums';

export const defaultDeliveryAddress: DeliveryAddress = {
  firstName: 'firstName',
  lastName: 'lastName',
  street: 'street',
  zipCode: 'zipCode',
  city: 'city',
  country: 'country',
  phone: 'phone',
};

export const defaultUserProfile: Profile = {
  ...defaultDeliveryAddress,
  _id: 'userId',
  username: 'username',
  email: 'email@domain.com',
  status: ProfileStatus.ACTIVE,
  contacts: {
    email: true,
    phone: true,
  },
  createdAt: '2021-02-10T19:10:38.872Z',
};

export const createPaginationProps = (itemQuantity = 5) => ({
  itemQuantity,
  isDataLoading: false,
  quantityPerPage: 2,
});

export const createProductItem = (props: Partial<Product> = {}): Product => {
  return {
    _id: uuidv4(),
    quantity: 1,
    price: 2,
    name: 'product name',
    photo: false,
    quantitySold: 0,
    buyerQuantity: 0,
    description: '',
    condition: ProductCondition.NEW,
    seller: {
      username: 'username',
    },
    createdAt: '2021-02-10T19:10:38.872Z',
    updatedAt: '2021-02-10T19:10:38.872Z',
    __v: 0,
    ...props,
  };
};

export const createCartItem = (props = {}): CartItem => {
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
    _id: finalProps.productId,
    quantity: finalProps.productQuantity,
    price: finalProps.price,
    name: finalProps.name,
    photo: finalProps.photo,
    seller: {
      username: finalProps.sellerUsername,
    },
  });

  return {
    _id: finalProps.id,
    quantity: finalProps.quantity,
    product,
  };
};

export const createTransactionAndOrderProdItem = (
  props: Partial<OrderProductItem> = {},
): OrderProductItem => {
  return {
    _id: uuidv4(),
    quantity: 1,
    price: 2,
    name: 'product name',
    photo: false,
    seller: {
      username: 'username',
    },
    ...props,
  };
};

export const createOrder = (props: Partial<Order> = {}): Order => {
  return {
    _id: uuidv4(),
    overallPrice: 100,
    seller: null,
    buyer: null,
    products: [createTransactionAndOrderProdItem()],
    deliveryAddress: defaultDeliveryAddress,
    createdAt: '2021-02-10T19:10:38.872Z',
    updatedAt: '2021-02-10T19:10:38.872Z',
    __v: 0,
    ...props,
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
      ...(defaultState.product as object),
      ...initialProduct,
    },
    ui: {
      ...(defaultState.ui as object),
      ...initialUI,
    },
  };
  // @ts-expect-error TBF after redux upgrade
  const finalStore = createStoreWithMiddleware(rootReducer, finalState);

  return {
    store: finalStore,
    initialState: finalStore.getState(),
  };
};

type MoxiosRequestsItems = { config: { method: string; url: string } }[];
type MockedMoxiosInstance = {
  requests: {
    __items?: MoxiosRequestsItems;
    mostRecent?: () => { config: { method: string; url: string } };
  };
};
type DefaultMoxiosInstance = Omit<typeof moxios, 'requests'> & {
  requests: typeof moxios.requests & {
    __items?: MoxiosRequestsItems;
  };
};
export const checkReqMethodAndURL = (
  moxiosInstance: MockedMoxiosInstance | DefaultMoxiosInstance,
  method: string,
  url: string,
  reqNumber = 0,
) => {
  if (reqNumber) {
    const requests = moxiosInstance.requests.__items;
    const prevRequest = requests?.[reqNumber - 1];
    return prevRequest && method === prevRequest.config.method && url === prevRequest.config.url;
  }
  if (!moxiosInstance.requests.mostRecent) return false;
  const lastRequest = moxiosInstance.requests.mostRecent();
  return method === lastRequest.config.method && url === lastRequest.config.url;
};

export const createExpectedState = (
  initialState: {
    auth?: object;
    product?: object;
    ui?: object;
  },
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

export const clickAtSubmitButton = async (container: Element) => {
  await waitFor(() => {
    const submitBtn = container.querySelector('button[type="submit"]');
    if (submitBtn) {
      fireEvent.click(submitBtn);
    }
  });
};

export const testRouterPushCall = (
  pushFn: ReturnType<typeof jest.fn>,
  callIdx: number,
  expectedPathname: string,
  expectedSearch = '',
) => {
  expect(pushFn.mock.calls[callIdx][0].pathname).toEqual(expectedPathname);
  expect(pushFn.mock.calls[callIdx][0].search).toEqual(expectedSearch);
};

type RenderAppPartOptions = {
  push?: ReturnType<typeof jest.fn>;
  pathname?: string;
  search?: string;
  withoutThemeProvider?: boolean;
  withoutRouter?: boolean;
  store?: MockStoreEnhanced<object, object>;
  onlyReturnWrappedElement?: boolean;
};

export const renderAppPart = (element: ReactElement, options: RenderAppPartOptions = {}) => {
  const navigator = {
    createHref: jest.fn(),
    push: options.push || jest.fn(),
    go: jest.fn(),
    replace: jest.fn(),
  };

  const location = {
    pathname: options.pathname || '/',
    search: options.search || '',
  };

  let content = element;
  if (!options.withoutThemeProvider) {
    content = <ThemeProvider theme={theme}>{element}</ThemeProvider>;
  }
  if (options.store) {
    content = <Provider store={options.store}>{content}</Provider>;
  }
  if (!options.withoutRouter) {
    content = (
      <Router location={location} navigator={navigator}>
        {content}
      </Router>
    );
  }

  return options.onlyReturnWrappedElement ? content : render(content);
};
