/* eslint-disable no-console */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import PriceSlider from './PriceSlider';
import { checkProps } from '../../../shared/testUtility';
import theme from '../../../styled/theme';
import { sliderPositionsActions } from '../../../shared/constants';
import { sliderPositionsReducer, sliderPositionsInitialState } from './sliderPositionsReducer';

const mockStore = configureMockStore([thunk]);

const defaultStore = mockStore({
  product: {
    minPrice: 10,
    maxPrice: 100,
  },
});

const defaultProps = {
  dispatchFilters: jest.fn(),
};

const setUp = (search = '', replace = jest.fn()) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products', search },
    replace,
  };
  return mount(
    <Router history={history}>
      <Provider store={defaultStore}>
        <ThemeProvider theme={theme}>
          <PriceSlider {...defaultProps} />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

describe('<PriceSlider />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(PriceSlider, defaultProps)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(PriceSlider, {})).not.toBe(null);
    });
  });

  describe(`Check if inputs' values are correct`, () => {
    it('Should min inputs have 10 and max inputs 100 by default', () => {
      const wrapper = setUp();
      expect(wrapper.find('[data-test="min-price-input"]').prop('value')).toBe(10);
      expect(wrapper.find('[data-test="min-price-range"]').prop('value')).toBe(10);
      expect(wrapper.find('[data-test="max-price-input"]').prop('value')).toBe(100);
      expect(wrapper.find('[data-test="max-price-range"]').prop('value')).toBe(100);
    });

    it('Should min inputs have 20 and max inputs 80 when these are set in url', () => {
      const wrapper = setUp('?minPrice=20&maxPrice=80');
      expect(wrapper.find('[data-test="min-price-input"]').prop('value')).toBe(20);
      expect(wrapper.find('[data-test="min-price-range"]').prop('value')).toBe(20);
      expect(wrapper.find('[data-test="max-price-input"]').prop('value')).toBe(80);
      expect(wrapper.find('[data-test="max-price-range"]').prop('value')).toBe(80);
    });

    it('Should call history.replace() when lower and higher than default are set in url', () => {
      const replaceFn = jest.fn();
      setUp('?p=1&minPrice=5&maxPrice=120', replaceFn);
      expect(replaceFn).toHaveBeenCalledWith('/products?p=1');
    });
  });

  describe('Check sliderPositionsReducer', () => {
    it('Should return default state', () => {
      expect(sliderPositionsReducer(undefined, {})).toEqual(sliderPositionsInitialState);
    });

    it('Should return new state after SET_BOTH', () => {
      const payload = {
        left: 10,
        right: 20,
      };
      expect(
        sliderPositionsReducer(undefined, {
          type: sliderPositionsActions.SET_BOTH,
          payload,
        }),
      ).toEqual(payload);
    });

    it('Should return new state after SET_LEFT', () => {
      expect(
        sliderPositionsReducer(undefined, {
          type: sliderPositionsActions.SET_LEFT,
          left: 10,
        }),
      ).toEqual({
        ...sliderPositionsInitialState,
        left: 10,
      });
    });

    it('Should return new state after SET_RIGHT', () => {
      expect(
        sliderPositionsReducer(undefined, {
          type: sliderPositionsActions.SET_RIGHT,
          right: 20,
        }),
      ).toEqual({
        ...sliderPositionsInitialState,
        right: 20,
      });
    });
  });
});
