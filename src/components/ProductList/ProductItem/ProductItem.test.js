import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from '../../../styled/theme';
import ProductItem from './ProductItem';
import { checkProps } from '../../../shared/testUtility';

const setUp = (data) => {
  const props = { data };
  return mount(
    <Router>
      <ThemeProvider theme={theme}>
        <ProductItem {...props} />
      </ThemeProvider>
    </Router>,
  );
};

describe('<ProductItem />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const expectedProps = {
        data: {
          _id: '123',
          name: 'testName',
          condition: 'used',
          photo: false,
        },
      };
      expect(checkProps(ProductItem, expectedProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      const expectedProps = {};
      expect(checkProps(ProductItem, expectedProps)).not.toBeNull();
    });
  });

  describe('Complete data object', () => {
    it('Should render correct name, condition, price without decimals, 1 buyer quantity', () => {
      const data = {
        _id: '123',
        name: 'testName',
        price: 3,
        condition: 'used',
        buyerQuantity: 1,
        photo: false,
      };
      const wrapper = setUp(data);
      expect(wrapper.find('[data-test="name"]').at(0).text()).toEqual('testName');
      expect(wrapper.find('[data-test="condition"]').at(0).text()).toEqual('Condition: Used');
      expect(wrapper.find('[data-test="price"]').at(0).text()).toEqual('$3');
      expect(wrapper.find('.buyer-quantity-box').text()).toEqual('1 person bought');
    });

    it('Should render correct name, condition, price with decimals, buyer quantity more than 1', () => {
      const data = {
        _id: '123',
        name: 'testName',
        price: 3.2,
        condition: 'used',
        buyerQuantity: 6,
        photo: false,
      };
      const wrapper = setUp(data);
      expect(wrapper.find('[data-test="price"]').at(0).text()).toEqual('$3.20');
      expect(wrapper.find('.buyer-quantity-box').text()).toEqual('6 people bought');
    });
  });

  describe('Incomplete data object', () => {
    const data = {
      _id: '123',
      name: 'testName',
      price: 3,
      condition: 'not_applicable',
      buyerQuantity: 0,
      photo: false,
    };
    const wrapper = setUp(data);

    it('Should NOT render condition and buyerQuantity', () => {
      expect(wrapper.find('[data-test="condition"]')).toHaveLength(0);
      expect(wrapper.find('.buyer-quantity-box')).toHaveLength(0);
    });
  });
});
