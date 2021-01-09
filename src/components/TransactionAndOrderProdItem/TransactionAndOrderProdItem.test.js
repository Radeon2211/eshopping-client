import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import TransactionAndOrderProdItem from './TransactionAndOrderProdItem';
import ProductThumbnail from '../UI/ProductThumbnail/ProductThumbnail';
import * as SC from './TransactionAndOrderProdItem.sc';
import theme from '../../styled/theme';
import { checkProps, createTransactionAndOrderProdItem } from '../../shared/testUtility';
import { baseURL } from '../../axios';

const defaultHistory = {
  listen: jest.fn(),
  createHref: jest.fn(),
  location: { pathname: '/cart' },
};

const setUp = (data, orderId = '') => {
  const props = {
    data,
    orderId,
  };
  return mount(
    <Router history={defaultHistory}>
      <ThemeProvider theme={theme}>
        <TransactionAndOrderProdItem {...props} />
      </ThemeProvider>
    </Router>,
  );
};

describe('<TransactionAndOrderProdItem />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const props = {
        data: { _id: 'i1' },
      };
      expect(checkProps(TransactionAndOrderProdItem, props)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(TransactionAndOrderProdItem, {})).not.toBe(null);
    });
  });

  describe('Checks how everything render', () => {
    it('Should render correctly with full data', () => {
      const data = createTransactionAndOrderProdItem(
        'u1',
        'user1',
        'p1',
        2,
        9.9,
        'productName',
        true,
      );
      const wrapper = setUp(data);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
      expect(wrapper.find('[data-test="product-link"]').length).toBeGreaterThan(1);
      expect(
        wrapper.find('[data-test="product-link"]').every((link) => {
          return link.prop('to') === '/product/p1';
        }),
      );
      expect(wrapper.find(ProductThumbnail)).toHaveLength(1);
      expect(wrapper.find(SC.NameAndPrice)).toHaveLength(1);
      expect(wrapper.find('.name')).toHaveLength(1);
      expect(wrapper.find('.name').text()).toEqual('productName');
      expect(wrapper.find(SC.Price)).toHaveLength(1);
      expect(wrapper.find('.price-per-piece').length).toBeGreaterThan(1);
      expect(wrapper.find('.price-per-piece').first().text()).toEqual('2 x $9.90');
      expect(wrapper.find('.overall-price')).toHaveLength(1);
      expect(wrapper.find('.overall-price').text()).toEqual('$19.80');
    });

    it('Should render 1 x price per piece', () => {
      const data = createTransactionAndOrderProdItem(
        'u1',
        'user1',
        'p1',
        1,
        9.9,
        'productName',
        false,
      );
      const wrapper = setUp(data);
      expect(wrapper.find('.price-per-piece').first().text()).toEqual('1 x $9.90');
      expect(wrapper.find('.overall-price').text()).toEqual('$9.90');
    });
  });
});
