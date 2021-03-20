import React from 'react';
import { render, cleanup, screen, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import PriceSlider from './PriceSlider';
import { checkProps } from '../../../shared/testUtility/testUtility';
import theme from '../../../styled/theme';
import { DEFAULT_PATH, sliderPositionsActions, filtersActions } from '../../../shared/constants';
import { sliderPositionsReducer, sliderPositionsInitialState } from './sliderPositionsReducer';

const mockStore = configureMockStore([thunk]);

const defaultStore = mockStore({
  product: {
    minPrice: 10,
    maxPrice: 100,
  },
});

const setUp = (search = '?p=1', replace = jest.fn(), dispatchFilters = jest.fn()) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products', search },
    replace,
  };

  return render(
    <Router history={history}>
      <Provider store={defaultStore}>
        <ThemeProvider theme={theme}>
          <PriceSlider dispatchFilters={dispatchFilters} />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

afterEach(cleanup);

describe('<PriceSlider />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(PriceSlider, { dispatchFilters: jest.fn() })).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(PriceSlider, {})).not.toBe(null);
    });
  });

  describe('Check how renders', () => {
    it('Should render everything correctly with default values', () => {
      const { asFragment } = setUp();
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should inputs have 20 and 80 values', () => {
      setUp('?p=1&minPrice=20&maxPrice=80');
      expect(screen.getByTestId('NumberInput-minPrice')).toHaveValue(20);
      expect(screen.getByTestId('PriceSlider-price-range-min')).toHaveValue('20');
      expect(screen.getByTestId('NumberInput-maxPrice')).toHaveValue(80);
      expect(screen.getByTestId('PriceSlider-price-range-max')).toHaveValue('80');
    });
  });

  describe('Check general behaviour', () => {
    it('Should call replace if min value is lower than in store', () => {
      const replaceFn = jest.fn();
      setUp('?p=1&minPrice=5', replaceFn);
      expect(replaceFn).toHaveBeenCalledWith(DEFAULT_PATH);
      expect(replaceFn).toHaveBeenCalledTimes(1);
    });

    it('Should call replace if max value is greater than in store', () => {
      const replaceFn = jest.fn();
      setUp('?p=1&maxPrice=120', replaceFn);
      expect(replaceFn).toHaveBeenCalledWith(DEFAULT_PATH);
      expect(replaceFn).toHaveBeenCalledTimes(1);
    });

    it('Should call dispatchFilters twice with correct values', () => {
      const dispatchFiltersFn = jest.fn();
      setUp('?p=1&minPrice=20&maxPrice=80', jest.fn(), dispatchFiltersFn);
      expect(dispatchFiltersFn).toHaveBeenNthCalledWith(1, {
        minPrice: 20,
        type: filtersActions.SET_MIN_PRICE,
      });
      expect(dispatchFiltersFn).toHaveBeenNthCalledWith(2, {
        maxPrice: 80,
        type: filtersActions.SET_MAX_PRICE,
      });
      expect(dispatchFiltersFn).toHaveBeenCalledTimes(2);
    });

    it('Should change range input values with correct values and call dispatchFilters (2 calls are by default in useEffect())', () => {
      const dispatchFiltersFn = jest.fn();
      setUp('?p=1', jest.fn(), dispatchFiltersFn);

      fireEvent.change(screen.getByTestId('PriceSlider-price-range-min'), {
        target: { value: 30 },
      });
      expect(dispatchFiltersFn).toHaveBeenNthCalledWith(3, {
        minPrice: 30,
        type: filtersActions.SET_MIN_PRICE,
      });

      fireEvent.change(screen.getByTestId('PriceSlider-price-range-max'), {
        target: { value: 70 },
      });
      expect(dispatchFiltersFn).toHaveBeenNthCalledWith(4, {
        maxPrice: 70,
        type: filtersActions.SET_MAX_PRICE,
      });

      expect(dispatchFiltersFn).toHaveBeenCalledTimes(4);
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
