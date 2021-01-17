import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import ProductDetails from './ProductDetails';
import Loader from '../../components/UI/Loader';
import { checkProps } from '../../shared/testUtility';
import theme from '../../styled/theme';
import SideBySide from '../../components/UI/SideBySide';

const mockStore = configureMockStore([thunk]);

const defaultProps = {
  match: {
    params: { id: '123' },
  },
};

const defaultProductDetails = {
  _id: '1234',
  seller: { username: 'user1' },
  condition: 'not_applicable',
  price: 2.5,
  quantity: 5,
  name: 'testName',
  quantitySold: 0,
  buyerQuantity: 0,
};

const defaultProfile = { username: 'user1' };

const defaultCart = [{ _id: '123', product: 'productId', quantity: 1 }];

const defaultStore = {
  ui: { isDataLoading: false },
  auth: { profile: defaultProfile, cart: defaultCart },
  product: {
    productDetails: defaultProductDetails,
  },
};

const setUp = (store, props = defaultProps) => {
  const finalStore = store
    ? mockStore({
        ...defaultStore,
        ...store,
      })
    : mockStore(defaultStore);
  return mount(
    <Provider store={finalStore}>
      <Router>
        <ThemeProvider theme={theme}>
          <ProductDetails {...props} />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

describe('<ProductDetails />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(ProductDetails, defaultProps)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(ProductDetails, {})).not.toBe(null);
    });
  });

  describe('Check how everything renders', () => {
    describe('Check what renders if productDetails are and not', () => {
      it('Should render <Loader/> and NOT render <SideBySide />', () => {
        const store = { product: { productDetails: undefined } };
        const wrapper = setUp(store);
        expect(wrapper.find(Loader)).toHaveLength(1);
        expect(wrapper.find(SideBySide)).toHaveLength(0);
      });

      it('Should render not found <Heading /> and NOT render <SideBySide />', () => {
        const store = { product: { productDetails: null } };
        const wrapper = setUp(store);
        expect(wrapper.find('[data-test="not-found"]').length).toBeGreaterThan(0);
        expect(wrapper.find(SideBySide)).toHaveLength(0);
      });

      it('Should NOT render not found <Heading /> and should render <SideBySide />', () => {
        const wrapper = setUp();
        expect(wrapper.find('[data-test="not-found"]')).toHaveLength(0);
        expect(wrapper.find(SideBySide)).toHaveLength(1);
      });
    });

    describe('Check how description renders', () => {
      it('Should NOT render no description <Heading /> and should render description content', () => {
        const store = {
          product: { productDetails: { ...defaultProductDetails, description: 'testDescription' } },
        };
        const wrapper = setUp(store);
        expect(wrapper.find('[data-test="no-description"]')).toHaveLength(0);
        expect(wrapper.find('.description-content')).toHaveLength(1);
      });

      it('Should render no description <Heading /> and NOT render description content', () => {
        const wrapper = setUp();
        expect(wrapper.find('[data-test="no-description"]').length).toBeGreaterThan(1);
        expect(wrapper.find('.description-content')).toHaveLength(0);
      });
    });

    describe('Check how quantity sold node renders', () => {
      it('Should render quantity sold node - "2 people bought 3 units"', () => {
        const store = {
          product: {
            productDetails: { ...defaultProductDetails, buyerQuantity: 2, quantitySold: 3 },
          },
        };
        const wrapper = setUp(store);
        expect(wrapper.find('.quantity-sold').first().text()).toEqual('2 people bought 3 units');
      });

      it('Should render quantity sold node - "1 person bought 1 unit"', () => {
        const store = {
          product: {
            productDetails: { ...defaultProductDetails, buyerQuantity: 1, quantitySold: 1 },
          },
        };
        const wrapper = setUp(store);
        expect(wrapper.find('.quantity-sold').first().text()).toEqual('1 person bought 1 unit');
      });

      it('Should render quantity sold node - "1 person bought 5 units"', () => {
        const store = {
          product: {
            productDetails: { ...defaultProductDetails, buyerQuantity: 1, quantitySold: 5 },
          },
        };
        const wrapper = setUp(store);
        expect(wrapper.find('.quantity-sold').first().text()).toEqual('1 person bought 5 units');
      });

      it('Should NOT render quantity sold node', () => {
        const wrapper = setUp();
        expect(wrapper.find('.quantity-sold')).toHaveLength(0);
      });
    });

    describe('Check how buttons render', () => {
      it('Should render delete and edit button when user is owner', () => {
        const wrapper = setUp();
        expect(wrapper.find('[data-test="edit-button"]').length).toBeGreaterThan(0);
        expect(wrapper.find('[data-test="delete-button"]').length).toBeGreaterThan(0);
      });

      it('Should render delete and edit button when user is admin and owner', () => {
        const wrapper = setUp({ auth: { profile: { ...defaultProfile, isAdmin: true } } });
        expect(wrapper.find('[data-test="edit-button"]').length).toBeGreaterThan(0);
        expect(wrapper.find('[data-test="delete-button"]').length).toBeGreaterThan(0);
      });

      it('Should render delete button when user is admin', () => {
        const wrapper = setUp({
          auth: {
            profile: { ...defaultProfile, username: 'user2', isAdmin: true },
            cart: defaultCart,
          },
        });
        expect(wrapper.find('[data-test="delete-button"]').length).toBeGreaterThan(0);
      });

      it('Should NOT render edit and delete button when user is not admin and not owner', () => {
        const wrapper = setUp({
          auth: { profile: { ...defaultProfile, username: 'user2' }, cart: defaultCart },
        });
        expect(wrapper.find('[data-test="edit-button"]')).toHaveLength(0);
        expect(wrapper.find('[data-test="delete-button"]')).toHaveLength(0);
      });

      it('Should NOT render edit and delete button when user is logged out', () => {
        const wrapper = setUp({ auth: { profile: undefined, cart: defaultCart } });
        expect(wrapper.find('[data-test="edit-button"]')).toHaveLength(0);
        expect(wrapper.find('[data-test="delete-button"]')).toHaveLength(0);
      });
    });
  });
});
