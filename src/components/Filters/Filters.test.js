import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import Filters from './Filters';
import * as SC from './Filters.sc';
import { checkProps } from '../../shared/testUtility';
import theme from '../../styled/theme';
import { sortOptions, filtersActions } from '../../shared/constants';
import { filtersReducer, filtersInitialState } from './filtersReducer';

const mockStore = configureMockStore([thunk]);

const defaultStore = mockStore({
  product: {
    minPrice: 10,
    maxPrice: 100,
  },
});

const simulateTogglerClick = (wrapper) => {
  const toggler = wrapper.find(SC.Toggler);
  toggler.simulate('click');
};

const setUp = (isDataLoading = false, search = '', push = jest.fn()) => {
  const props = { isDataLoading };
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products', search },
    push,
  };
  return mount(
    <Router history={history}>
      <Provider store={defaultStore}>
        <ThemeProvider theme={theme}>
          <Filters {...props} />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

describe('<Filters />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(Filters, { isDataLoading: false })).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(Filters, {})).not.toBe(null);
    });
  });

  describe(`Check if renders correctly`, () => {
    it('Should render <SC.Wrapper /> and submit button should NOT be loading', () => {
      const wrapper = setUp();
      simulateTogglerClick(wrapper);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
      expect(wrapper.find('[data-test="filters-submit-btn"]').first().prop('isLoading')).toEqual(
        false,
      );
    });

    it('Should submit button be disabled', () => {
      const wrapper = setUp(true);
      simulateTogglerClick(wrapper);
      expect(wrapper.find('[data-test="filters-submit-btn"]').first().prop('isLoading')).toEqual(true);
    });
  });

  describe(`Check if controls' values are correct`, () => {
    it('Should condition checkboxes be checked', () => {
      const wrapper = setUp(true, '?p=1&condition=new,used,not_applicable');
      simulateTogglerClick(wrapper);
      expect(wrapper.find('#new').prop('checked')).toEqual(true);
      expect(wrapper.find('#used').prop('checked')).toEqual(true);
      expect(wrapper.find('#not_applicable').prop('checked')).toEqual(true);
    });

    it('Should NOT condition checkboxes be checked', () => {
      const wrapper = setUp(true);
      simulateTogglerClick(wrapper);
      expect(wrapper.find('#new').prop('checked')).toEqual(false);
      expect(wrapper.find('#used').prop('checked')).toEqual(false);
      expect(wrapper.find('#not_applicable').prop('checked')).toEqual(false);
    });

    it('Should sort by price ascending', () => {
      const wrapper = setUp(true, '?p=1&sortBy=price:asc');
      simulateTogglerClick(wrapper);
      expect(wrapper.find('.select').first().prop('value')).toEqual(sortOptions[1]);
    });

    it('Should sort by price descending', () => {
      const wrapper = setUp(true, '?p=1&sortBy=price:desc');
      simulateTogglerClick(wrapper);
      expect(wrapper.find('.select').first().prop('value')).toEqual(sortOptions[2]);
    });

    it('Should sort by name ascending', () => {
      const wrapper = setUp(true, '?p=1&sortBy=name:asc');
      simulateTogglerClick(wrapper);
      expect(wrapper.find('.select').first().prop('value')).toEqual(sortOptions[3]);
    });

    it('Should sort by name descending', () => {
      const wrapper = setUp(true, '?p=1&sortBy=name:desc');
      simulateTogglerClick(wrapper);
      expect(wrapper.find('.select').first().prop('value')).toEqual(sortOptions[4]);
    });
  });

  describe('Check filtersReducer', () => {
    it('Should return default state', () => {
      expect(filtersReducer(undefined, {})).toEqual(filtersInitialState);
    });

    it('Should return new state after INIT_STATE', () => {
      const payload = {
        sortBy: sortOptions[1],
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

    it('Should return new state after SET_SORT_BY', () => {
      expect(
        filtersReducer(undefined, {
          type: filtersActions.SET_SORT_BY,
          sortBy: sortOptions[2],
        }),
      ).toEqual({
        ...filtersInitialState,
        sortBy: sortOptions[2],
      });
    });

    it('Should return new state after SET_MIN_PRICE', () => {
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

    it('Should return new state after SET_MAX_PRICE', () => {
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

    it('Should return new state after SET_CONDITION', () => {
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
