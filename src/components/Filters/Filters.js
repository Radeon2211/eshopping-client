import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Select from 'react-select';
import * as SC from './Filters.sc';
import Heading from '../UI/Heading/Heading';
import Panel from '../UI/Panel/Panel';
import Button from '../UI/Button/Button';
import PriceSlider from './PriceSlider/PriceSlider';

const sortOptions = [
  {
    value: undefined,
    label: 'Default sorting',
  },
  {
    value: 'price:asc',
    label: `Price - ascending`,
  },
  {
    value: 'price:desc',
    label: 'Price - descending',
  },
  {
    value: 'name:asc',
    label: 'Name - A to Z',
  },
  {
    value: 'name:desc',
    label: 'Name - Z to A',
  },
];

const Filters = (props) => {
  const { products, isListLoading } = props;
  const history = useHistory();
  const {
    location: { search, pathname },
  } = history;

  const [controls, setControls] = useState({
    sortBy: sortOptions[0],
    minPrice: undefined,
    maxPrice: undefined,
    condition: {
      new: false,
      used: false,
      not_applicable: false,
    },
  });

  useEffect(() => {
    const parsedQueryParams = queryString.parse(search);
    const conditionParam = parsedQueryParams.condition
      ? parsedQueryParams.condition.split(',')
      : [];

    setControls({
      sortBy: sortOptions.find(({ value }) => value === parsedQueryParams.sortBy) || sortOptions[0],
      minPrice: parsedQueryParams.minPrice,
      maxPrice: parsedQueryParams.maxPrice,
      condition: {
        new: conditionParam.includes('new'),
        used: conditionParam.includes('used'),
        not_applicable: conditionParam.includes('not_applicable'),
      },
    });
  }, [search, setControls]);

  const btnClickHandle = () => {
    const filtersQueryParams = {};
    filtersQueryParams.sortBy = controls.sortBy.value;
    filtersQueryParams.minPrice = controls.minPrice;
    filtersQueryParams.maxPrice = controls.maxPrice;
    filtersQueryParams.condition =
      Object.entries(controls.condition)
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

  let filters = (
    <SC.Wrapper>
      <Select
        name="sortBy"
        options={sortOptions}
        className="select"
        value={controls.sortBy}
        placeholder="Default sorting"
        onChange={(change) => setControls((prevState) => ({ ...prevState, sortBy: change }))}
        isSearchable={false}
      />
      <PriceSlider setControls={setControls} />
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
        filters = <Heading variant="h4">Filters are unavailable</Heading>;
      }
    }
  }

  return <Panel>{filters}</Panel>;
};

Filters.defaultProps = {
  products: null,
};

Filters.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  isListLoading: PropTypes.bool.isRequired,
};

export default Filters;
