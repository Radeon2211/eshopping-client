import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Select from 'react-select';
import * as SC from './Filters.sc';
import Heading from '../UI/Heading/Heading';
import Panel from '../UI/Panel/Panel';
import Button from '../UI/Button/Button';
import PriceSlider from './PriceSlider/PriceSlider';
import { updateObject } from '../../shared/utility';
import { filtersActions } from '../../shared/constants';

const sortOptions = [
  { value: undefined, label: 'Default sorting' },
  { value: 'price:asc', label: `Price - ascending` },
  { value: 'price:desc', label: 'Price - descending' },
  { value: 'name:asc', label: 'Name - A to Z' },
  { value: 'name:desc', label: 'Name - Z to A' },
];

const filtersInitialState = {
  sortBy: sortOptions[0],
  minPrice: undefined,
  maxPrice: undefined,
  condition: {
    new: false,
    used: false,
    not_applicable: false,
  },
};

const filtersReducer = (state = filtersInitialState, action) => {
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

const Filters = (props) => {
  const { products, isListLoading, isVisible } = props;
  const history = useHistory();
  const {
    location: { search, pathname },
  } = history;

  const [filters, dispatchFilters] = useReducer(filtersReducer, filtersInitialState);

  useEffect(() => {
    const parsedQueryParams = queryString.parse(search);
    const conditionParam = parsedQueryParams.condition
      ? parsedQueryParams.condition.split(',')
      : [];

    dispatchFilters({
      type: filtersActions.INIT_STATE,
      payload: {
        sortBy:
          sortOptions.find(({ value }) => value === parsedQueryParams.sortBy) || sortOptions[0],
        minPrice: parsedQueryParams.minPrice,
        maxPrice: parsedQueryParams.maxPrice,
        condition: {
          new: conditionParam.includes('new'),
          used: conditionParam.includes('used'),
          not_applicable: conditionParam.includes('not_applicable'),
        },
      },
    });
  }, [search, dispatchFilters]);

  const btnClickHandle = () => {
    const filtersQueryParams = {};
    filtersQueryParams.sortBy = filters.sortBy.value;
    filtersQueryParams.minPrice = filters.minPrice;
    filtersQueryParams.maxPrice = filters.maxPrice;
    filtersQueryParams.condition =
      Object.entries(filters.condition)
        .filter(([, value]) => value)
        .map(([key]) => key)
        .join(',') || undefined;
    const currentQueryParams = queryString.parse(search);
    const newQueryParams = {
      ...currentQueryParams,
      ...filtersQueryParams,
      p: 1,
    };
    const stringifiedNewQueryParams = queryString.stringify(newQueryParams);
    history.push(`${pathname}?${stringifiedNewQueryParams}`);
  };

  const checkboxChangeHandle = (e) => {
    dispatchFilters({
      type: filtersActions.SET_CONDITION,
      condition: {
        [e.target.name]: e.target.checked,
      },
    });
  };

  let filtersWrapper = (
    <SC.Wrapper>
      <Select
        name="sortBy"
        options={sortOptions}
        className="select"
        value={filters.sortBy}
        placeholder="Default sorting"
        onChange={(change) => {
          dispatchFilters({ type: filtersActions.SET_SORT_BY, sortBy: change });
        }}
        isSearchable={false}
      />
      <PriceSlider dispatchFilters={dispatchFilters} />
      <SC.Checkboxes>
        <span className="label">Condition</span>
        <SC.CheckboxBox>
          <input
            type="checkbox"
            name="new"
            id="new"
            checked={filters.condition.new}
            onChange={checkboxChangeHandle}
          />
          <label htmlFor="new">new</label>
        </SC.CheckboxBox>
        <SC.CheckboxBox>
          <input
            type="checkbox"
            name="used"
            id="used"
            checked={filters.condition.used}
            onChange={checkboxChangeHandle}
          />
          <label htmlFor="used">used</label>
        </SC.CheckboxBox>
        <SC.CheckboxBox>
          <input
            type="checkbox"
            name="not_applicable"
            id="not_applicable"
            checked={filters.condition.not_applicable}
            onChange={checkboxChangeHandle}
          />
          <label htmlFor="not_applicable">not applicable</label>
        </SC.CheckboxBox>
      </SC.Checkboxes>
      <Button filled size="small" clicked={btnClickHandle} disabled={isListLoading}>
        Filter
      </Button>
    </SC.Wrapper>
  );

  if (products) {
    if (products.length <= 0) {
      const queryParams = queryString.parse(search);
      if (queryParams.p) {
        delete queryParams.p;
      }
      const queryParamsKeys = Object.keys(queryParams);
      if (
        queryParamsKeys.length <= 0 ||
        (queryParamsKeys.length === 1 && queryParamsKeys.includes('name'))
      ) {
        filtersWrapper = <Heading variant="h4">Filters are unavailable</Heading>;
      }
    }
  }

  return isVisible && <Panel>{filtersWrapper}</Panel>;
};

Filters.defaultProps = {
  products: null,
};

Filters.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  isListLoading: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default Filters;
