import { useReducer, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import Select from 'react-select';
import * as SC from './Filters.sc';
import { filtersReducer, filtersInitialState } from './filtersReducer';
import PlainPanel from '../UI/Panels/PlainPanel';
import PlainText from '../UI/PlainText';
import Button from '../UI/Button/Button';
import PriceSlider from './PriceSlider/PriceSlider';
import MyIcon from '../UI/MyIcon';
import { ReactComponent as FiltersIcon } from '../../images/icons/filters.svg';
import { ReactComponent as ArrowIcon } from '../../images/icons/arrow.svg';
import { filtersActions, sortProductsOptions, productConditions } from '../../shared/constants';
import { getParamsWithoutPollution } from '../../shared/utility/utility';
import useWindowSize from '../../shared/hooks/useWindowSize';

export default function Filters({ isDataLoading }) {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const [filters, dispatchFilters] = useReducer(filtersReducer, filtersInitialState);
  const [isVisible, setIsVisible] = useState(false);

  const windowSize = useWindowSize();

  useEffect(() => {
    const correctQueryParams = getParamsWithoutPollution(search);
    const conditionParam = correctQueryParams.condition
      ? correctQueryParams.condition.split(',')
      : [];

    dispatchFilters({
      type: filtersActions.INIT_STATE,
      payload: {
        sortBy:
          sortProductsOptions.find(({ value }) => value === correctQueryParams.sortBy) ||
          sortProductsOptions[0],
        minPrice: correctQueryParams.minPrice,
        maxPrice: correctQueryParams.maxPrice,
        condition: {
          new: conditionParam.includes(productConditions.NEW),
          used: conditionParam.includes(productConditions.USED),
          not_applicable: conditionParam.includes(productConditions.NOT_APPLICABLE),
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
    const currentQueryParams = getParamsWithoutPollution(search);
    const newQueryParams = {
      ...currentQueryParams,
      ...filtersQueryParams,
      p: 1,
    };
    const stringifiedNewQueryParams = queryString.stringify(newQueryParams);
    navigate(`${pathname}?${stringifiedNewQueryParams}`);
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
  if (windowSize.width <= 1200) {
    filtersToggler = (
      <SC.Toggler
        onClick={() => setIsVisible((prevState) => !prevState)}
        data-testid="Filters-toggler"
      >
        <MyIcon $size="small">
          <FiltersIcon />
        </MyIcon>
        <span className="label">Filters</span>
        <MyIcon $size="small" $rotation={isVisible ? -90 : 90}>
          <ArrowIcon />
        </MyIcon>
      </SC.Toggler>
    );
  }

  const filtersWrapper = (
    <SC.Wrapper>
      <Select
        name="sortBy"
        options={sortProductsOptions}
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
        <PlainText $size="3">Condition</PlainText>
        <SC.CheckboxBox>
          <input
            type="checkbox"
            name={productConditions.NEW}
            id={productConditions.NEW}
            checked={filters.condition.new}
            onChange={checkboxChangeHandle}
            data-testid="Filters-checkbox-new"
          />
          <label htmlFor={productConditions.NEW}>new</label>
        </SC.CheckboxBox>
        <SC.CheckboxBox>
          <input
            type="checkbox"
            name={productConditions.USED}
            id={productConditions.USED}
            checked={filters.condition.used}
            onChange={checkboxChangeHandle}
            data-testid="Filters-checkbox-used"
          />
          <label htmlFor={productConditions.USED}>used</label>
        </SC.CheckboxBox>
        <SC.CheckboxBox>
          <input
            type="checkbox"
            name={productConditions.NOT_APPLICABLE}
            id={productConditions.NOT_APPLICABLE}
            checked={filters.condition.not_applicable}
            onChange={checkboxChangeHandle}
            data-testid="Filters-checkbox-not-applicable"
          />
          <label htmlFor={productConditions.NOT_APPLICABLE}>not applicable</label>
        </SC.CheckboxBox>
      </SC.Checkboxes>
      <Button
        $filled
        clicked={btnClickHandle}
        isLoading={isDataLoading}
        data-testid="Filters-submit-btn"
      >
        Filter
      </Button>
    </SC.Wrapper>
  );

  let filtersPanel = null;
  if (isVisible || windowSize.width >= 1200) {
    filtersPanel = <PlainPanel data-testid="Filters">{filtersWrapper}</PlainPanel>;
  }

  return (
    <>
      {filtersToggler}
      {filtersPanel}
    </>
  );
}

Filters.propTypes = {
  isDataLoading: PropTypes.bool.isRequired,
};
