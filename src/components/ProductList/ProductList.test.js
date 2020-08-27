import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import theme from '../../styled/theme';
import ProductList from './ProductList';
import ProductItem from './ProductItem/ProductItem';
import Heading from '../UI/Heading/Heading';
import { checkProps } from '../../shared/utility';
import { pages } from '../../shared/constants';
import LoadingOverlay from '../UI/LoadingOverlay/LoadingOverlay';

const createHistory = (search = '') => ({
  listen: jest.fn(),
  createHref: jest.fn(),
  location: { search },
});

const defaultHistory = createHistory();

const setUp = (props, history = defaultHistory) => {
  return mount(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <ProductList {...props} />
      </ThemeProvider>
    </Router>,
  );
};

const createProps = (isDataLoading, products, page = pages.ALL_PRODUCTS) => ({
  isDataLoading,
  products,
  page,
});

describe('<ProductItem />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const expectedProps = createProps(false);
      expect(checkProps(ProductList, expectedProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(ProductList, {})).not.toBeNull();
    });
  });

  describe('Check if renders correctly', () => {
    it('Should render <LoadingOverlay />', () => {
      const props = createProps(true, null);
      const wrapper = setUp(props);
      expect(wrapper.find(LoadingOverlay)).toHaveLength(1);
    });
    it('Should NOT render <LoadingOverlay />', () => {
      const props = createProps(false, null);
      const wrapper = setUp(props);
      expect(wrapper.find(LoadingOverlay)).toHaveLength(0);
    });
    it('Should render one <ProductItem />', () => {
      const props = createProps(false, [{ _id: '123', name: 'testName', price: 2 }]);
      const wrapper = setUp(props);
      expect(wrapper.find(ProductItem)).toHaveLength(1);
    });
    it('Should render <Heading /> and NOT render <ProductItem />', () => {
      const props = createProps(false, []);
      const wrapper = setUp(props);
      expect(wrapper.find(ProductItem)).toHaveLength(0);
      expect(wrapper.find(Heading)).toHaveLength(1);
    });
    it('Should render info about changing results', () => {
      const props = createProps(false, []);
      const history = createHistory('?p=1&name=testName&condition=new');
      const wrapper = setUp(props, history);
      expect(wrapper.find(Heading).text()).toBe(
        `We didn't find any matching results. Try to search something else or change filters`,
      );
    });
    it('Should render info about trying something else', () => {
      const props = createProps(false, []);
      const history = createHistory();
      const wrapper = setUp(props, history);
      expect(wrapper.find(Heading).text()).toBe(
        `We didn't find any matching results. Try search something else`,
      );
    });
  });
});
