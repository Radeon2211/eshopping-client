import { updateObject } from '../../shared/utility';
import { filtersActions, sortProductsOptions } from '../../shared/constants';

export const filtersInitialState = {
  sortBy: sortProductsOptions[0],
  minPrice: undefined,
  maxPrice: undefined,
  condition: {
    new: false,
    used: false,
    not_applicable: false,
  },
};

export const filtersReducer = (state = filtersInitialState, action) => {
  switch (action.type) {
    case filtersActions.INIT_STATE:
      return updateObject(state, action.payload);
    case filtersActions.SET_SORT_BY:
      return updateObject(state, { sortBy: action.sortBy });
    case filtersActions.SET_MIN_PRICE:
      return updateObject(state, { minPrice: action.minPrice });
    case filtersActions.SET_MAX_PRICE:
      return updateObject(state, { maxPrice: action.maxPrice });
    case filtersActions.SET_CONDITION:
      return updateObject(state, { condition: { ...state.condition, ...action.condition } });
    default:
      return state;
  }
};
