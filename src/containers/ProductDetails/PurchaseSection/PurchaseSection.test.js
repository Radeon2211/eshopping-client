import React from 'react';
import { mount } from 'enzyme';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import PurchaseSection from './PurchaseSection';
import Button from '../../../components/UI/Button/Button';
import { checkProps } from '../../../shared/testUtility';
import theme from '../../../styled/theme';

const defaultProps = {
  onSetModal: jest.fn(),
  userProfile: { _id: '987' },
  productSellerId: '123',
  productQuantity: 5,
};

const setUp = (props) => {
  const finalProps = props
    ? {
        ...defaultProps,
        ...props,
      }
    : defaultProps;
  return mount(
    <Router>
      <ThemeProvider theme={theme}>
        <PurchaseSection {...finalProps} />
      </ThemeProvider>
    </Router>,
  );
};

describe('<PurchaseSection />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(PurchaseSection, defaultProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(PurchaseSection, {})).not.toBe(null);
    });
  });

  describe('Check how overall section renders', () => {
    it('Should render quantity box and two buttons when seller and current user are different', () => {
      const wrapper = setUp();
      expect(wrapper.find('.quantity-box')).toHaveLength(1);
      expect(wrapper.find(Button)).toHaveLength(2);
    });
    it('Should NOT render quantity box and two buttons & render .not-able-to-buy when seller and current user are the same', () => {
      const wrapper = setUp({ userProfile: { _id: '123' } });
      expect(wrapper.find('.quantity-box')).toHaveLength(0);
      expect(wrapper.find(Button)).toHaveLength(0);
      expect(wrapper.find('.not-able-to-buy')).toHaveLength(1);
    });
  });

  describe('Check how quantity number text renders', () => {
    it('Should render appropriate text when quantity is 1', () => {
      const wrapper = setUp({ productQuantity: 1 });
      expect(wrapper.find('.quantity-number').text()).toEqual('of 1 piece');
    });
    it('Should render appropriate text when quantity is 3', () => {
      const wrapper = setUp({ productQuantity: 3 });
      expect(wrapper.find('.quantity-number').text()).toEqual('of 3 pieces');
    });
  });

  describe('Check how buttons reacts on click', () => {
    it('Should buttons call onSetModal()', () => {
      const onSetModalFn = jest.fn();
      const wrapper = setUp({ userProfile: undefined, onSetModal: onSetModalFn });
      const addToCartBtn = wrapper.find(Button).first();
      const buyBtn = wrapper.find(Button).last();
      addToCartBtn.simulate('click');
      buyBtn.simulate('click');
      expect(onSetModalFn.mock.calls).toHaveLength(2);
    });
    it('Should NOT buttons call onSetModal()', () => {
      const onSetModalFn = jest.fn();
      const wrapper = setUp({ onSetModal: onSetModalFn });
      const addToCartBtn = wrapper.find(Button).first();
      const buyBtn = wrapper.find(Button).last();
      addToCartBtn.simulate('click');
      buyBtn.simulate('click');
      expect(onSetModalFn.mock.calls).toHaveLength(0);
    });
  });
});
