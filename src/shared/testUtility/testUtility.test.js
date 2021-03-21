import validateUUID from 'uuid-validate';
import * as testUtility from './testUtility';
import { modalTypes, productConditions } from '../constants';

describe('createHistoryPageNumber()', () => {
  it('should create history with default values', () => {
    const history = testUtility.createHistoryPageNumber();
    expect(history.listen).toEqual(expect.any(Function));
    expect(history.createHref).toEqual(expect.any(Function));
    expect(history.location).toEqual({ pathname: '/products', search: `?p=1` });
    expect(history.push).toEqual(expect.any(Function));
  });

  it('should create history with given page number and push function', () => {
    const pushFn = jest.fn();
    pushFn('/cart');
    const history = testUtility.createHistoryPageNumber(3, pushFn);
    expect(history.listen).toEqual(expect.any(Function));
    expect(history.createHref).toEqual(expect.any(Function));
    expect(history.location).toEqual({ pathname: '/products', search: `?p=3` });
    expect(history.push).toEqual(pushFn);
    expect(history.push).toHaveBeenCalledWith('/cart');
  });
});

describe('createPaginationProps()', () => {
  it('should create props with default value', () => {
    const props = testUtility.createPaginationProps();
    expect(props).toEqual({
      itemQuantity: 5,
      isDataLoading: false,
      quantityPerPage: 2,
    });
  });

  it('should create props with given itemQuantity', () => {
    const props = testUtility.createPaginationProps(10);
    expect(props).toEqual({
      itemQuantity: 10,
      isDataLoading: false,
      quantityPerPage: 2,
    });
  });
});

describe('createProductItem()', () => {
  it('should create product item with default values', () => {
    const productItem = testUtility.createProductItem();
    expect(productItem).toEqual({
      _id: productItem._id,
      quantity: 1,
      price: 2,
      name: 'product name',
      photo: false,
      quantitySold: 0,
      buyerQuantity: 0,
      description: '',
      condition: productConditions.NEW,
      seller: {
        username: 'username',
      },
      __v: 0,
      createdAt: '2021-02-10T19:10:38.872Z',
      updatedAt: '2021-02-10T19:10:38.872Z',
    });
    expect(validateUUID(productItem._id, 4)).toEqual(true);
  });

  it('should create product item with given values', () => {
    const productItem = testUtility.createProductItem(
      'p1',
      'johnsmith',
      15,
      100.1,
      'Wellingtons',
      true,
      10,
      5,
      'Cool wellingtons',
      productConditions.NOT_APPLICABLE,
    );
    expect(productItem).toEqual({
      _id: 'p1',
      quantity: 15,
      price: 100.1,
      name: 'Wellingtons',
      photo: true,
      quantitySold: 10,
      buyerQuantity: 5,
      description: 'Cool wellingtons',
      condition: productConditions.NOT_APPLICABLE,
      seller: {
        username: 'johnsmith',
      },
      __v: 0,
      createdAt: '2021-02-10T19:10:38.872Z',
      updatedAt: '2021-02-10T19:10:38.872Z',
    });
  });
});

describe('createCartItem()', () => {
  it('should create cart item with default values', () => {
    const cartItem = testUtility.createCartItem();
    expect(cartItem).toEqual({
      _id: cartItem._id,
      quantity: 1,
      product: {
        _id: cartItem.product._id,
        quantity: 2,
        price: 2,
        name: 'product name',
        photo: false,
        quantitySold: 0,
        buyerQuantity: 0,
        description: '',
        condition: productConditions.NEW,
        seller: {
          username: 'username',
        },
        __v: 0,
        createdAt: '2021-02-10T19:10:38.872Z',
        updatedAt: '2021-02-10T19:10:38.872Z',
      },
    });
    expect(validateUUID(cartItem._id, 4)).toEqual(true);
    expect(validateUUID(cartItem.product._id, 4)).toEqual(true);
  });

  it('should create cart item with given values', () => {
    const cartItem = testUtility.createCartItem(
      'johnsmith',
      5,
      'p1',
      10.2,
      'Wellingtons',
      10,
      true,
    );
    expect(cartItem).toEqual({
      _id: cartItem._id,
      quantity: 5,
      product: {
        _id: cartItem.product._id,
        quantity: 10,
        price: 10.2,
        name: 'Wellingtons',
        photo: true,
        quantitySold: 0,
        buyerQuantity: 0,
        description: '',
        condition: productConditions.NEW,
        seller: {
          username: 'johnsmith',
        },
        __v: 0,
        createdAt: '2021-02-10T19:10:38.872Z',
        updatedAt: '2021-02-10T19:10:38.872Z',
      },
    });
    expect(validateUUID(cartItem._id, 4)).toEqual(true);
  });
});

describe('createTransactionAndOrderProdItem()', () => {
  it('should create transactionAndOrderProdItem with default values', () => {
    const transactionAndOrderProdItem = testUtility.createTransactionAndOrderProdItem();
    expect(transactionAndOrderProdItem).toEqual({
      _id: transactionAndOrderProdItem._id,
      name: 'product name',
      photo: false,
      price: 2,
      quantity: 1,
      seller: {
        username: 'username',
      },
    });
    expect(validateUUID(transactionAndOrderProdItem._id, 4)).toEqual(true);
  });

  it('should create transactionAndOrderProdItem with given values', () => {
    const transactionAndOrderProdItem = testUtility.createTransactionAndOrderProdItem(
      'item1',
      'johnsmith',
      6,
      104.7,
      'Wellingtons',
      true,
    );
    expect(transactionAndOrderProdItem).toEqual({
      _id: 'item1',
      name: 'Wellingtons',
      photo: true,
      price: 104.7,
      quantity: 6,
      seller: {
        username: 'johnsmith',
      },
    });
  });
});

describe('createOrder()', () => {
  it('should create order with default values', () => {
    const order = testUtility.createOrder();
    expect(order).toEqual({
      _id: order._id,
      seller: null,
      buyer: null,
      products: [
        {
          ...testUtility.createTransactionAndOrderProdItem(),
          _id: order.products[0]._id,
        },
      ],
      overallPrice: undefined,
      deliveryAddress: testUtility.defaultDeliveryAddress,
      createdAt: undefined,
      updatedAt: undefined,
      __v: 0,
    });
    expect(validateUUID(order._id, 4)).toEqual(true);
    expect(validateUUID(order.products[0]._id, 4)).toEqual(true);
  });

  it('should create order with given values', () => {
    const products = [
      testUtility.createTransactionAndOrderProdItem(),
      testUtility.createTransactionAndOrderProdItem(),
    ];
    const order = testUtility.createOrder(
      products,
      'o1',
      'johnsmith',
      'adamsmith',
      120.54,
      '2021-02-10T19:10:38.872Z',
      'john@domain.com',
      '+48 123456789',
    );
    expect(order).toEqual({
      _id: 'o1',
      seller: {
        username: 'johnsmith',
        email: 'john@domain.com',
        phone: '+48 123456789',
      },
      buyer: {
        username: 'adamsmith',
      },
      products,
      overallPrice: 120.54,
      deliveryAddress: testUtility.defaultDeliveryAddress,
      createdAt: '2021-02-10T19:10:38.872Z',
      updatedAt: '2021-02-10T19:10:38.872Z',
      __v: 0,
    });
  });
});

describe('testStore()', () => {
  it('should create store with default state', () => {
    const { store, initialState } = testUtility.testStore();
    expect(store.dispatch).toEqual(expect.any(Function));
    expect(initialState).toEqual({
      auth: {
        profile: undefined,
        deliveryAddress: undefined,
        cart: undefined,
        transaction: undefined,
        placedOrders: undefined,
        sellHistory: undefined,
        orderDetails: undefined,
        orderCount: undefined,
        otherUser: undefined,
      },
      product: {
        products: undefined,
        productCount: undefined,
        productDetails: undefined,
        minPrice: 0,
        maxPrice: 0,
      },
      ui: {
        isFormLoading: false,
        formError: '',
        isDataLoading: false,
        isCartLoading: false,
        message: '',
        isModalOpen: false,
        modalContent: '',
        productsPerPage: 10,
      },
    });
  });

  it('should create store using given state', () => {
    const products = [testUtility.createProductItem()];
    const { store, initialState } = testUtility.testStore(
      {
        profile: testUtility.defaultUserProfile,
        deliveryAddress: testUtility.defaultDeliveryAddress,
        cart: [],
      },
      {
        products,
        productCount: 1,
        minPrice: products[0].price,
        maxPrice: products[0].price,
      },
      {
        message: 'test message',
        isFormLoading: true,
        modalContent: modalTypes.CHANGE_EMAIL,
      },
    );
    expect(store.dispatch).toEqual(expect.any(Function));
    expect(initialState).toEqual({
      auth: {
        profile: testUtility.defaultUserProfile,
        deliveryAddress: testUtility.defaultDeliveryAddress,
        cart: [],
        transaction: undefined,
        placedOrders: undefined,
        sellHistory: undefined,
        orderDetails: undefined,
        orderCount: undefined,
        otherUser: undefined,
      },
      product: {
        products,
        productCount: 1,
        productDetails: undefined,
        minPrice: products[0].price,
        maxPrice: products[0].price,
      },
      ui: {
        message: 'test message',
        isFormLoading: true,
        modalContent: modalTypes.CHANGE_EMAIL,
        formError: '',
        isDataLoading: false,
        isCartLoading: false,
        isModalOpen: false,
        productsPerPage: 10,
      },
    });
  });
});

describe('checkReqMethodAndURL()', () => {
  describe('mostRecent()', () => {
    const createMoxiosInstance = (method, url) => ({
      requests: {
        mostRecent: () => ({
          config: {
            method,
            url,
          },
        }),
      },
    });

    it('should return true if both are correct', () => {
      const moxiosInstance = createMoxiosInstance('get', '/users/me');
      expect(testUtility.checkReqMethodAndURL(moxiosInstance, 'get', '/users/me')).toEqual(true);
    });

    it('should return false if method is incorrect', () => {
      const moxiosInstance = createMoxiosInstance('delete', '/users/me');
      expect(testUtility.checkReqMethodAndURL(moxiosInstance, 'get', '/users/me')).toEqual(false);
    });

    it('should return false if url is incorrect', () => {
      const moxiosInstance = createMoxiosInstance('get', '/users/user1');
      expect(testUtility.checkReqMethodAndURL(moxiosInstance, 'get', '/users/me')).toEqual(false);
    });

    it('should return false if method and url is incorrect', () => {
      const moxiosInstance = createMoxiosInstance('post', '/users/login');
      expect(testUtility.checkReqMethodAndURL(moxiosInstance, 'get', '/users/me')).toEqual(false);
    });
  });

  describe('previous request', () => {
    const createMoxiosInstance = (method, url) => ({
      requests: {
        __items: [
          {
            config: {
              method,
              url,
            },
          },
          {
            config: {
              method: 'get',
              url: '/cart',
            },
          },
        ],
      },
    });

    it('should return true if both are correct', () => {
      const moxiosInstance = createMoxiosInstance('get', '/users/me');
      expect(testUtility.checkReqMethodAndURL(moxiosInstance, 'get', '/users/me', true)).toEqual(
        true,
      );
    });

    it('should return false if method is incorrect', () => {
      const moxiosInstance = createMoxiosInstance('delete', '/users/me');
      expect(testUtility.checkReqMethodAndURL(moxiosInstance, 'get', '/users/me', true)).toEqual(
        false,
      );
    });

    it('should return false if url is incorrect', () => {
      const moxiosInstance = createMoxiosInstance('get', '/users/user1');
      expect(testUtility.checkReqMethodAndURL(moxiosInstance, 'get', '/users/me', true)).toEqual(
        false,
      );
    });

    it('should return false if method and url is incorrect', () => {
      const moxiosInstance = createMoxiosInstance('post', '/users/login');
      expect(testUtility.checkReqMethodAndURL(moxiosInstance, 'get', '/users/me', true)).toEqual(
        false,
      );
    });
  });
});

describe('createExpectedState()', () => {
  it('should create the same state as given', () => {
    const { initialState } = testUtility.testStore();
    const newState = testUtility.createExpectedState(initialState);
    expect(newState).toEqual(initialState);
  });

  it('should create the state with updated auth, product and ui', () => {
    const { initialState } = testUtility.testStore();
    const products = [testUtility.createProductItem()];

    const newState = testUtility.createExpectedState(
      initialState,
      {
        profile: testUtility.defaultUserProfile,
        deliveryAddress: testUtility.defaultDeliveryAddress,
        cart: [],
      },
      {
        products,
        productCount: 1,
        minPrice: products[0].price,
        maxPrice: products[0].price,
      },
      {
        message: 'test message',
        isFormLoading: true,
        modalContent: modalTypes.CHANGE_EMAIL,
      },
    );
    expect(newState).toEqual({
      auth: {
        profile: testUtility.defaultUserProfile,
        deliveryAddress: testUtility.defaultDeliveryAddress,
        cart: [],
        transaction: undefined,
        placedOrders: undefined,
        sellHistory: undefined,
        orderDetails: undefined,
        orderCount: undefined,
        otherUser: undefined,
      },
      product: {
        products,
        productCount: 1,
        productDetails: undefined,
        minPrice: products[0].price,
        maxPrice: products[0].price,
      },
      ui: {
        message: 'test message',
        isFormLoading: true,
        modalContent: modalTypes.CHANGE_EMAIL,
        formError: '',
        isDataLoading: false,
        isCartLoading: false,
        isModalOpen: false,
        productsPerPage: 10,
      },
    });
  });
});

describe('setUpStoreWithDefaultProfile()', () => {
  it('should create store with default data', () => {
    const { initialState } = testUtility.setUpStoreWithDefaultProfile();
    expect(initialState).toEqual({
      auth: {
        profile: testUtility.defaultUserProfile,
        deliveryAddress: testUtility.defaultDeliveryAddress,
        cart: [],
        transaction: undefined,
        placedOrders: undefined,
        sellHistory: undefined,
        orderDetails: undefined,
        orderCount: undefined,
        otherUser: undefined,
      },
      product: {
        products: undefined,
        productCount: undefined,
        productDetails: undefined,
        minPrice: 0,
        maxPrice: 0,
      },
      ui: {
        isFormLoading: false,
        formError: '',
        isDataLoading: false,
        isCartLoading: false,
        message: '',
        isModalOpen: false,
        modalContent: '',
        productsPerPage: 10,
      },
    });
  });

  it('should create store with additional data', () => {
    const products = [testUtility.createProductItem()];
    const { initialState } = testUtility.setUpStoreWithDefaultProfile(
      {
        transaction: [],
        placedOrders: [],
        sellHistory: [],
        orderCount: 0,
      },
      {
        products,
        productCount: 1,
        minPrice: products[0].price,
        maxPrice: products[0].price,
      },
      {
        message: 'test message',
      },
    );
    expect(initialState).toEqual({
      auth: {
        profile: testUtility.defaultUserProfile,
        deliveryAddress: testUtility.defaultDeliveryAddress,
        cart: [],
        transaction: [],
        placedOrders: [],
        sellHistory: [],
        orderDetails: undefined,
        orderCount: 0,
        otherUser: undefined,
      },
      product: {
        products,
        productCount: 1,
        productDetails: undefined,
        minPrice: products[0].price,
        maxPrice: products[0].price,
      },
      ui: {
        isFormLoading: false,
        formError: '',
        isDataLoading: false,
        isCartLoading: false,
        message: 'test message',
        isModalOpen: false,
        modalContent: '',
        productsPerPage: 10,
      },
    });
  });
});
