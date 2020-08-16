import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from '../../../styled/theme';
import ProductItem from './ProductItem';
import { checkProps } from '../../../shared/utility';

const setUpWrapper = (props) => {
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
          name: 'testName',
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
    let wrapper;
    beforeEach(() => {
      const data = {
        name: 'testName',
        price: 3,
        condition: 'used',
        quantitySold: 1,
      };
      wrapper = setUpWrapper({ data });
    });
    it('Should render condition node', () => {
      expect(wrapper.find('.condition')).toHaveLength(1);
    });
    it('Should render quantitySold node', () => {
      expect(wrapper.find('.quantity-sold-box')).toHaveLength(1);
    });
  });

  describe('Incomplete data object', () => {
    let wrapper;
    beforeEach(() => {
      const data = {
        name: 'testName',
        price: 3,
        condition: 'not_applicable',
        quantitySold: 0,
      };
      wrapper = setUpWrapper({ data });
    });
    it('Should NOT render condition node', () => {
      expect(wrapper.find('.condition')).toHaveLength(0);
    });
    it('Should NOT render quantitySold node', () => {
      expect(wrapper.find('.quantity-sold-box')).toHaveLength(0);
    });
  });
});
