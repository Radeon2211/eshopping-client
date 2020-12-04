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

const createProps = (products, isDataLoading = false) => ({
  products,
  isDataLoading,
});

const defaultProps = createProps([{ id: 1 }]);

const simulateTogglerClick = (wrapper) => {
  const toggler = wrapper.find(SC.Toggler);
  toggler.simulate('click');
};

const setUp = (props, search = '', push = jest.fn()) => {
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
      expect(checkProps(Filters, defaultProps)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(Filters, {})).not.toBe(null);
    });
  });

  describe(`Check if renders correctly`, () => {
    it('Should render <SC.Wrapper /> and submit button should NOT be disabled', () => {
      const wrapper = setUp(defaultProps);
      simulateTogglerClick(wrapper);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
      expect(wrapper.find('[data-test="filters-submit-btn"]').first().prop('disabled')).toBe(false);
    });

    it('Should submit button be disabled', () => {
      const props = createProps([{ id: 1 }], true);
      const wrapper = setUp(props);
      simulateTogglerClick(wrapper);
      expect(wrapper.find('[data-test="filters-submit-btn"]').first().prop('disabled')).toBe(true);
    });

    it('Should NOT render <SC.Wrapper /> and unavailable heading', () => {
      const wrapper = setUp(defaultProps);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
      expect(wrapper.find('[data-test="unavailable-heading"]')).toHaveLength(0);
    });

    it('Should render unavailable heading', () => {
      const props = createProps([]);
      const wrapper = setUp(props);
      simulateTogglerClick(wrapper);
      expect(wrapper.find('[data-test="unavailable-heading"]').length).toBeGreaterThan(0);
    });

    it('Should NOT render unavailable heading if in url is p and sth else than name', () => {
      const props = createProps([]);
      const wrapper = setUp(props, '?p=1&minPrice=10');
      simulateTogglerClick(wrapper);
      expect(wrapper.find('[data-test="unavailable-heading"]')).toHaveLength(0);
    });

    it('Should render unavailable heading if in url is name', () => {
      const props = createProps([]);
      const wrapper = setUp(props, '?name=test-name');
      simulateTogglerClick(wrapper);
      expect(wrapper.find('[data-test="unavailable-heading"]').length).toBeGreaterThan(0);
    });

    it('Should NOT render unavailable heading if in url is sth expect p and name', () => {
      const props = createProps([]);
      const wrapper = setUp(props, '?minPrice=10');
      simulateTogglerClick(wrapper);
      expect(wrapper.find('[data-test="unavailable-heading"]')).toHaveLength(0);
    });
  });

  describe(`Check if controls' values are correct`, () => {
    it('Should condition checkboxes be checked', () => {
      const wrapper = setUp(defaultProps, '?p=1&condition=new,used,not_applicable');
      simulateTogglerClick(wrapper);
      expect(wrapper.find('#new').prop('checked')).toBe(true);
      expect(wrapper.find('#used').prop('checked')).toBe(true);
      expect(wrapper.find('#not_applicable').prop('checked')).toBe(true);
    });

    it('Should NOT condition checkboxes be checked', () => {
      const wrapper = setUp(defaultProps);
      simulateTogglerClick(wrapper);
      expect(wrapper.find('#new').prop('checked')).toBe(false);
      expect(wrapper.find('#used').prop('checked')).toBe(false);
      expect(wrapper.find('#not_applicable').prop('checked')).toBe(false);
    });

    it('Should sort by price ascending', () => {
      const wrapper = setUp(defaultProps, '?p=1&sortBy=price:asc');
      simulateTogglerClick(wrapper);
      expect(wrapper.find('.select').first().prop('value')).toBe(sortOptions[1]);
    });

    it('Should sort by price descending', () => {
      const wrapper = setUp(defaultProps, '?p=1&sortBy=price:desc');
      simulateTogglerClick(wrapper);
      expect(wrapper.find('.select').first().prop('value')).toBe(sortOptions[2]);
    });

    it('Should sort by name ascending', () => {
      const wrapper = setUp(defaultProps, '?p=1&sortBy=name:asc');
      simulateTogglerClick(wrapper);
      expect(wrapper.find('.select').first().prop('value')).toBe(sortOptions[3]);
    });

    it('Should sort by name descending', () => {
      const wrapper = setUp(defaultProps, '?p=1&sortBy=name:desc');
      simulateTogglerClick(wrapper);
      expect(wrapper.find('.select').first().prop('value')).toBe(sortOptions[4]);
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
