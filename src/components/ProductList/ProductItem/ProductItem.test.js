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
    it('Should render condition and quantitySold', () => {
      const data = {
        _id: '123',
        name: 'testName',
        price: 3,
        condition: 'used',
        quantitySold: 1,
        photo: false,
      };
      const wrapper = setUp(data);
      expect(wrapper.find('.condition')).toHaveLength(1);
      expect(wrapper.find('.quantity-sold-box')).toHaveLength(1);
    });
  });

  describe('Incomplete data object', () => {
    const data = {
      _id: '123',
      name: 'testName',
      price: 3,
      condition: 'not_applicable',
      quantitySold: 0,
      photo: false,
    };
    const wrapper = setUp(data);
    it('Should NOT render condition and quantitySold', () => {
      expect(wrapper.find('.condition')).toHaveLength(0);
      expect(wrapper.find('.quantity-sold-box')).toHaveLength(0);
    });
  });
});
