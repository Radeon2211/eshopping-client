import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import TransactionItem from './TransactionItem';
import theme from '../../../styled/theme';
import { checkProps, createTransactionItem } from '../../../shared/testUtility';
import { baseURL } from '../../../axios';
import noPhoto from '../../../images/no-photo.png';

const defaultHistory = {
  listen: jest.fn(),
  createHref: jest.fn(),
  location: { pathname: '/cart' },
};

const setUp = (data) => {
  const props = {
    data,
  };
  return mount(
    <Router history={defaultHistory}>
      <ThemeProvider theme={theme}>
        <TransactionItem {...props} />
      </ThemeProvider>
    </Router>,
  );
};

describe('<TransactionItem />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const props = {
        data: { _id: 'i1' },
      };
      expect(checkProps(TransactionItem, props)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(TransactionItem, {})).not.toBe(null);
    });
  });

  describe('Checks how everything render', () => {
    it('Should render correctly with full data', () => {
      const data = createTransactionItem('u1', 'user1', 'p1', 2, 9.9, 'productName', true);
      const wrapper = setUp(data);
      expect(
        wrapper.find('[data-test="product-link"]').every((link) => {
          return link.prop('to') === '/products/p1';
        }),
      );
      expect(wrapper.find('img').prop('src')).toEqual(`${baseURL}/products/p1/photo`);
      expect(wrapper.find('.name').text()).toEqual('productName');
      expect(wrapper.find('.price-per-piece').first().text()).toEqual('2 x $9.90');
      expect(wrapper.find('.overall-price').text()).toEqual('$19.80');
    });

    it('Should render 1 x price per piece and default photo', () => {
      const data = createTransactionItem('u1', 'user1', 'p1', 1, 9.9, 'productName', false);
      const wrapper = setUp(data);
      expect(wrapper.find('img').prop('src')).toBe(noPhoto);
      expect(wrapper.find('.price-per-piece').first().text()).toEqual('1 x $9.90');
      expect(wrapper.find('.overall-price').text()).toEqual('$9.90');
    });
  });
});
