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
import { filtersActions, sortProductsOptions } from '../../shared/constants';
import { getParamsWithoutPollution } from '../../shared/utility/utility';
import useWindowSize from '../../shared/hooks/useWindowSize';
import { ProductCondition } from '../../shared/types/enums';

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
          new: conditionParam.includes(ProductCondition.NEW),
          used: conditionParam.includes(ProductCondition.USED),
          not_applicable: conditionParam.includes(ProductCondition.NOT_APPLICABLE),
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
        <PlainText $size="level3">Condition</PlainText>
        <SC.CheckboxBox>
          <input
            type="checkbox"
            name={ProductCondition.NEW}
            id={ProductCondition.NEW}
            checked={filters.condition.new}
            onChange={checkboxChangeHandle}
            data-testid="Filters-checkbox-new"
          />
          <label htmlFor={ProductCondition.NEW}>new</label>
        </SC.CheckboxBox>
        <SC.CheckboxBox>
          <input
            type="checkbox"
            name={ProductCondition.USED}
            id={ProductCondition.USED}
            checked={filters.condition.used}
            onChange={checkboxChangeHandle}
            data-testid="Filters-checkbox-used"
          />
          <label htmlFor={ProductCondition.USED}>used</label>
        </SC.CheckboxBox>
        <SC.CheckboxBox>
          <input
            type="checkbox"
            name={ProductCondition.NOT_APPLICABLE}
            id={ProductCondition.NOT_APPLICABLE}
            checked={filters.condition.not_applicable}
            onChange={checkboxChangeHandle}
            data-testid="Filters-checkbox-not-applicable"
          />
          <label htmlFor={ProductCondition.NOT_APPLICABLE}>not applicable</label>
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
