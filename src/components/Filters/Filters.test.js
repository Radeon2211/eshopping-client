import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import selectEvent from 'react-select-event';
import matchMediaPolyfill from 'mq-polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';
import Filters from './Filters';
import { sortProductsOptions, filtersActions } from '../../shared/constants';
import { filtersReducer, filtersInitialState } from './filtersReducer';
import { renderAppPart, testRouterPushCall } from '../../shared/testUtility/testUtility';
import { ProductCondition } from '../../shared/types/enums';

const mockStore = configureMockStore([thunk]);

const defaultStore = mockStore({
  product: {
    minPrice: 10,
    maxPrice: 100,
  },
});

const setUp = (isDataLoading = false, search = '?p=1', pushFn = jest.fn()) => {
  return {
    ...renderAppPart(<Filters isDataLoading={isDataLoading} />, {
      pathname: '/products',
      search,
      push: pushFn,
      store: defaultStore,
    }),
  };
};

beforeAll(() => {
  matchMediaPolyfill(window);
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
    }).dispatchEvent(new this.Event('resize'));
  };
});

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('<Filters />', () => {
  describe('check how renders', () => {
    it('should render filters panel and NOT render toggler', () => {
      act(() => {
        window.resizeTo(1920, 1080);
      });
      setUp();
      expect(screen.getByTestId('Filters')).toBeInTheDocument();
      expect(screen.queryByTestId('Filters-toggler')).not.toBeInTheDocument();
    });

    it('should render all sorting options', async () => {
      act(() => {
        window.resizeTo(1920, 1080);
      });
      setUp();
      await selectEvent.openMenu(screen.getByText(/default sorting/i));
      expect(screen.getByText(sortProductsOptions[1].label)).toBeInTheDocument();
      expect(screen.getByText(sortProductsOptions[2].label)).toBeInTheDocument();
      expect(screen.getByText(sortProductsOptions[3].label)).toBeInTheDocument();
      expect(screen.getByText(sortProductsOptions[4].label)).toBeInTheDocument();
    });

    it('should submit button be disabled', () => {
      setUp(true);
      expect(screen.getByTestId('Filters-submit-btn')).toBeDisabled();
    });
  });

  describe('check behaviour of controls', () => {
    it('should condition checkboxes be checked', () => {
      setUp(
        false,
        `?p=1&condition=${ProductCondition.NEW},${ProductCondition.USED},${ProductCondition.NOT_APPLICABLE}`,
      );
      expect(screen.getByTestId('Filters-checkbox-new')).toBeChecked();
      expect(screen.getByTestId('Filters-checkbox-used')).toBeChecked();
      expect(screen.getByTestId('Filters-checkbox-not-applicable')).toBeChecked();
    });

    it('should NOT condition checkboxes be checked', () => {
      setUp();
      expect(screen.getByTestId('Filters-checkbox-new')).not.toBeChecked();
      expect(screen.getByTestId('Filters-checkbox-used')).not.toBeChecked();
      expect(screen.getByTestId('Filters-checkbox-not-applicable')).not.toBeChecked();
    });

    it('should sort by price ascending', () => {
      setUp(false, '?p=1&sortBy=price:asc');
      expect(screen.getByText(sortProductsOptions[1].label)).toBeInTheDocument();
    });

    it('should sort by price descending', () => {
      setUp(false, '?p=1&sortBy=price:desc');
      expect(screen.getByText(sortProductsOptions[2].label)).toBeInTheDocument();
    });

    it('should sort by name ascending', () => {
      setUp(false, '?p=1&sortBy=name:asc');
      expect(screen.getByText(sortProductsOptions[3].label)).toBeInTheDocument();
    });

    it('should sort by name descending', () => {
      setUp(false, '?p=1&sortBy=name:desc');
      expect(screen.getByText(sortProductsOptions[4].label)).toBeInTheDocument();
    });

    it('should call push with correct path and params', async () => {
      act(() => {
        window.resizeTo(1920, 1080);
      });
      const pushFn = jest.fn();
      setUp(false, '?p=1', pushFn);

      fireEvent.click(screen.getByTestId('Filters-checkbox-new'));
      fireEvent.click(screen.getByTestId('Filters-checkbox-used'));
      fireEvent.change(screen.getByTestId('PriceSlider-price-range-max'), {
        target: { value: 50 },
      });
      fireEvent.change(screen.getByTestId('PriceSlider-price-range-min'), {
        target: { value: 20 },
      });
      await selectEvent.openMenu(screen.getByText(/default sorting/i));
      fireEvent.click(screen.getByText(/price - ascending/i));

      fireEvent.click(screen.getByTestId('Filters-submit-btn'));

      testRouterPushCall(
        pushFn,
        0,
        '/products',
        '?condition=new%2Cused&maxPrice=50&minPrice=20&p=1&sortBy=price%3Aasc',
      );
    });
  });

  describe('check filtersReducer', () => {
    it('should return default state', () => {
      expect(filtersReducer(undefined, {})).toEqual(filtersInitialState);
    });

    it('should return new state after INIT_STATE', () => {
      const payload = {
        sortBy: sortProductsOptions[1],
        minPrice: 10,
        maxPrice: 100,
        condition: {
          new: true,
          used: true,
          not_applicable: false,
        },
      };
      expect(
        filtersReducer(undefined, {
          type: filtersActions.INIT_STATE,
          payload,
        }),
      ).toEqual(payload);
    });

    it('should return new state after SET_SORT_BY', () => {
      expect(
        filtersReducer(undefined, {
          type: filtersActions.SET_SORT_BY,
          sortBy: sortProductsOptions[2],
        }),
      ).toEqual({
        ...filtersInitialState,
        sortBy: sortProductsOptions[2],
      });
    });

    it('should return new state after SET_MIN_PRICE', () => {
      expect(
        filtersReducer(undefined, {
          type: filtersActions.SET_MIN_PRICE,
          minPrice: 10,
        }),
      ).toEqual({
        ...filtersInitialState,
        minPrice: 10,
      });
    });

    it('should return new state after SET_MAX_PRICE', () => {
      expect(
        filtersReducer(undefined, {
          type: filtersActions.SET_MAX_PRICE,
          maxPrice: 100,
        }),
      ).toEqual({
        ...filtersInitialState,
        maxPrice: 100,
      });
    });

    it('should return new state after SET_CONDITION', () => {
      expect(
        filtersReducer(undefined, {
          type: filtersActions.SET_CONDITION,
          condition: {
            new: true,
          },
        }),
      ).toEqual({
        ...filtersInitialState,
        condition: {
          ...filtersInitialState.condition,
          new: true,
        },
      });
    });
  });
});
