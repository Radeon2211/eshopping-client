import React, { useReducer, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useWindowWidth } from '@react-hook/window-size';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Select from 'react-select';
import * as SC from './Filters.sc';
import { filtersReducer, filtersInitialState } from './filtersReducer';
import Heading from '../UI/Heading/Heading';
import Panel from '../UI/Panel';
import Button from '../UI/Button/Button';
import PriceSlider from './PriceSlider/PriceSlider';
import { filtersActions, sortOptions } from '../../shared/constants';
import MyIcon from '../UI/MyIcon';
import { ReactComponent as FiltersIcon } from '../../images/SVG/filters.svg';
import { ReactComponent as ArrowIcon } from '../../images/SVG/arrow.svg';

const Filters = (props) => {
  const { products, isDataLoading } = props;
  const history = useHistory();
  const {
    location: { search, pathname },
  } = history;

  const [filters, dispatchFilters] = useReducer(filtersReducer, filtersInitialState);
  const [isVisible, setIsVisible] = useState(false);

  const windowWidth = useWindowWidth();

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

  let filtersToggler = null;
  if (windowWidth <= 1200) {
    filtersToggler = (
      <SC.Toggler onClick={() => setIsVisible((prevState) => !prevState)}>
        <MyIcon size="small">
          <FiltersIcon />
        </MyIcon>
        <span className="label">Filters</span>
        <MyIcon size="small" rotation={isVisible ? -90 : 90}>
          <ArrowIcon />
        </MyIcon>
      </SC.Toggler>
    );
  }

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
      <Button
        filled
        clicked={btnClickHandle}
        disabled={isDataLoading}
        data-test="filters-submit-btn"
      >
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
        filtersWrapper = (
          <Heading variant="h4" data-test="unavailable-heading">
            Filters are unavailable
          </Heading>
        );
      }
    }
  }

  let filtersPanel = null;
  if (isVisible || windowWidth >= 1200) {
    filtersPanel = <Panel>{filtersWrapper}</Panel>;
  }

  return (
    <>
      {filtersToggler}
      {filtersPanel}
    </>
  );
};

Filters.defaultProps = {
  products: null,
};

Filters.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  isDataLoading: PropTypes.bool.isRequired,
};

export default Filters;
