import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import ProductDetails from './ProductDetails';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import Heading from '../../components/UI/Heading/Heading';
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
  seller: { _id: '123' },
  condition: 'not_applicable',
  price: 2.5,
  quantity: 5,
  name: 'testName',
  quantitySold: 0,
};

const defaultProfile = { _id: '123' };

const defaultStore = {
  ui: { isDataLoading: false },
  auth: { profile: defaultProfile },
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

  describe('Check how <LoadingOverlay /> renders', () => {
    it('Should NOT render <LoadingOverlay />', () => {
      const wrapper = setUp();
      expect(wrapper.find(LoadingOverlay)).toHaveLength(0);
    });
    it('Should NOT render <LoadingOverlay />', () => {
      const store = { ui: { isDataLoading: true } };
      const wrapper = setUp(store);
      expect(wrapper.find(LoadingOverlay)).toHaveLength(1);
    });
  });

  describe('Check how everything renders', () => {
    describe('Check what renders if productDetails are and not', () => {
      it('Should render <Heading /> and NOT render <SideBySide />', () => {
        const store = { product: { productDetails: null } };
        const wrapper = setUp(store);
        expect(wrapper.find(Heading)).toHaveLength(1);
        expect(wrapper.find(SideBySide)).toHaveLength(0);
      });
      it('Should NOT render <LoadingOverlay /> and render <SideBySide />', () => {
        const wrapper = setUp();
        expect(wrapper.find(Heading)).toHaveLength(0);
        expect(wrapper.find(SideBySide)).toHaveLength(1);
      });
    });

    describe('Check how description renders', () => {
      it('Should render description heading and heading content', () => {
        const store = {
          product: { productDetails: { ...defaultProductDetails, description: 'testDescription' } },
        };
        const wrapper = setUp(store);
        expect(wrapper.find('.description-heading')).toHaveLength(1);
        expect(wrapper.find('.description-content')).toHaveLength(1);
      });
      it('Should render description heading and NOT render heading content', () => {
        const wrapper = setUp();
        expect(wrapper.find('.description-heading')).toHaveLength(1);
        expect(wrapper.find('.description-content')).toHaveLength(0);
      });
    });

    describe('Check how quantity sold node renders', () => {
      it('Should render quantity sold node - "3 people bought"', () => {
        const store = {
          product: { productDetails: { ...defaultProductDetails, quantitySold: 3 } },
        };
        const wrapper = setUp(store);
        const quantitySoldNode = wrapper.find('.quantity-sold');
        expect(quantitySoldNode).toHaveLength(1);
        expect(quantitySoldNode.text()).toEqual('3 people bought');
      });
      it('Should render quantity sold node - "1 person bought"', () => {
        const store = {
          product: { productDetails: { ...defaultProductDetails, quantitySold: 1 } },
        };
        const wrapper = setUp(store);
        const quantitySoldNode = wrapper.find('.quantity-sold');
        expect(quantitySoldNode).toHaveLength(1);
        expect(quantitySoldNode.text()).toEqual('1 person bought');
      });
      it('Should NOT render quantity sold node', () => {
        const wrapper = setUp();
        expect(wrapper.find('.quantity-sold')).toHaveLength(0);
      });
    });

    describe('Check how delete button renders', () => {
      it('Should render delete button when user is owner', () => {
        const wrapper = setUp();
        expect(wrapper.find('.delete-btn-box')).toHaveLength(1);
      });
      it('Should render delete button when user is admin and owner', () => {
        const wrapper = setUp({ auth: { profile: { ...defaultProfile, isAdmin: true } } });
        expect(wrapper.find('.delete-btn-box')).toHaveLength(1);
      });
      it('Should render delete button when user is admin', () => {
        const wrapper = setUp({
          auth: { profile: { ...defaultProfile, _id: '987', isAdmin: true } },
        });
        expect(wrapper.find('.delete-btn-box')).toHaveLength(1);
      });
      it('Should NOT render delete button when user not admin and not owner', () => {
        const wrapper = setUp({
          auth: { profile: { ...defaultProfile, _id: '987' } },
        });
        expect(wrapper.find('.delete-btn-box')).toHaveLength(0);
      });
      it('Should NOT render delete button when user is logged out', () => {
        const wrapper = setUp({ auth: { profile: undefined } });
        expect(wrapper.find('.delete-btn-box')).toHaveLength(0);
      });
    });
  });
});
