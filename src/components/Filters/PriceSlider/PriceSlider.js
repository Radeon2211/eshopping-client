import React, { useState, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as SC from './PriceSlider.sc';
import NumberInput from '../../UI/NumberInput/NumberInput';
import { filtersActions } from '../../../shared/constants';
import { updateObject } from '../../../shared/utility';

const positionsActions = {
  SET_BOTH: 'SET_BOTH',
  SET_LEFT: 'SET_LEFT',
  SET_RIGHT: 'SET_RIGHT',
};

const positionsInitialState = {
  left: 0,
  right: 0,
};

const positionsReducer = (state = positionsInitialState, action) => {
  switch (action.type) {
    case positionsActions.SET_BOTH:
      return { ...action.payload };
    case positionsActions.SET_LEFT:
      return updateObject(state, { left: action.left });
    case positionsActions.SET_RIGHT:
      return updateObject(state, { right: action.right });
    default:
      return state;
  }
};

const PriceSlider = (props) => {
  const { dispatchFilters } = props;
  const history = useHistory();
  const {
    location: { search },
  } = history;

  const { minPrice: minPriceState, maxPrice: maxPriceState } = useSelector(
    (state) => state.product,
  );

  const [positions, dispatchPositions] = useReducer(positionsReducer, positionsInitialState);
  const [inputValues, setInputValues] = useState({
    minPrice: 0,
    maxPrice: 0,
  });
  const [rangeValues, setRangeValues] = useState({
    minPrice: 0,
    maxPrice: 0,
  });

  useEffect(() => {
    if (minPriceState === 0 || maxPriceState === 0) return;

    const parsedQueryParams = queryString.parse(search);
    const { minPrice, maxPrice } = parsedQueryParams;
    const queryMinPrice = Number.parseFloat((+minPrice).toFixed(2));
    let queryMaxPrice = Number.parseFloat((+maxPrice).toFixed(2));

    let changeQueryParams = false;
    if (queryMaxPrice && (queryMaxPrice > maxPriceState || queryMaxPrice <= minPriceState)) {
      queryMaxPrice = maxPriceState;
      delete parsedQueryParams.maxPrice;
      changeQueryParams = true;
    }
    if (
      queryMinPrice &&
      (queryMinPrice >= (queryMaxPrice || maxPriceState) || queryMinPrice < minPriceState)
    ) {
      delete parsedQueryParams.minPrice;
      changeQueryParams = true;
    }
    if (changeQueryParams) {
      const stringifiedQueryParams = queryString.stringify(parsedQueryParams);
      history.replace(`${history.location.pathname}?${stringifiedQueryParams}`);
      return;
    }

    const minValueToCalculate = (queryMinPrice || minPriceState) - minPriceState;
    const maxValueToCalculate = (queryMaxPrice || maxPriceState) - minPriceState;
    const maxPriceStateToCalculate = maxPriceState - minPriceState;

    let leftPercentValue = 0;
    let rightPercentValue = 0;
    if (maxPriceStateToCalculate > 0) {
      leftPercentValue = (100 / maxPriceStateToCalculate) * minValueToCalculate;
      rightPercentValue = 100 - (100 / maxPriceStateToCalculate) * maxValueToCalculate;
      if (leftPercentValue < 0) leftPercentValue = 0;
      if (leftPercentValue > 100) leftPercentValue = 100;
      if (rightPercentValue < 0) rightPercentValue = 0;
      if (rightPercentValue > 100) rightPercentValue = 100;
    }

    dispatchPositions({
      type: positionsActions.SET_BOTH,
      payload: { left: leftPercentValue, right: rightPercentValue },
    });
    setInputValues({
      minPrice: queryMinPrice || minPriceState,
      maxPrice: queryMaxPrice || maxPriceState,
    });
    setRangeValues({
      minPrice: queryMinPrice || minPriceState,
      maxPrice: queryMaxPrice || maxPriceState,
    });
    dispatchFilters({
      type: filtersActions.SET_MIN_PRICE,
      minPrice: queryMinPrice || minPriceState,
    });
    dispatchFilters({
      type: filtersActions.SET_MAX_PRICE,
      maxPrice: queryMaxPrice || maxPriceState,
    });
  }, [minPriceState, maxPriceState, setRangeValues, dispatchFilters, history, search]);

  const inputChangeHandle = (e) => {
    e.persist();

    setInputValues((prevState) => ({
      ...prevState,
      [e.target.name]: +e.target.value || '',
    }));
  };

  const validateInputValue = (e) => {
    e.persist();

    let value = Number.parseFloat((+e.target.value).toFixed(2));
    const { name } = e.target;

    const maxPriceStateToCalculate = maxPriceState - minPriceState;
    let percentValue = 0;
    if (name === 'minPrice') {
      if (value < minPriceState) {
        value = minPriceState;
      } else if (value > rangeValues.maxPrice) {
        value = rangeValues.maxPrice;
      }
      const minValueToCalculate = (value || minPriceState) - minPriceState;
      if (maxPriceStateToCalculate !== 0) {
        percentValue = (100 / maxPriceStateToCalculate) * minValueToCalculate;
      }
      dispatchPositions({ type: positionsActions.SET_LEFT, left: percentValue });
      dispatchFilters({ type: filtersActions.SET_MIN_PRICE, minPrice: value });
    } else {
      if (value > maxPriceState) {
        value = maxPriceState;
      } else if (value < rangeValues.minPrice) {
        value = rangeValues.minPrice;
      }
      const maxValueToCalculate = (value || maxPriceState) - minPriceState;
      if (maxPriceStateToCalculate !== 0) {
        percentValue = 100 - (100 / maxPriceStateToCalculate) * maxValueToCalculate;
      }
      dispatchPositions({ type: positionsActions.SET_RIGHT, right: percentValue });
      dispatchFilters({ type: filtersActions.SET_MAX_PRICE, maxPrice: value });
    }

    setInputValues((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
    setRangeValues((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  const inputPressHandle = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const rangeChangeHandle = (e) => {
    e.persist();

    let parsedValue = Number.parseFloat((+e.target.value).toFixed(2));

    if (
      (e.target.name === 'minPrice' && parsedValue >= rangeValues.maxPrice) ||
      (e.target.name === 'maxPrice' && parsedValue <= rangeValues.minPrice)
    ) {
      return;
    }

    const maxPriceStateToCalculate = maxPriceState - minPriceState;
    let percentValue = 0;
    if (e.target.name === 'minPrice') {
      if (parsedValue - minPriceState <= maxPriceState / 1000) {
        parsedValue = minPriceState;
      }
      const minValueToCalculate = (parsedValue || minPriceState) - minPriceState;
      if (maxPriceStateToCalculate !== 0) {
        percentValue = (100 / maxPriceStateToCalculate) * minValueToCalculate;
      }
      dispatchPositions({ type: positionsActions.SET_LEFT, left: percentValue });
      dispatchFilters({ type: filtersActions.SET_MIN_PRICE, minPrice: parsedValue });
    } else {
      if (maxPriceState - parsedValue <= maxPriceState / 1000) {
        parsedValue = maxPriceState;
      }
      const maxValueToCalculate = (parsedValue || maxPriceState) - minPriceState;
      if (maxPriceStateToCalculate !== 0) {
        percentValue = 100 - (100 / maxPriceStateToCalculate) * maxValueToCalculate;
      }
      dispatchPositions({ type: positionsActions.SET_RIGHT, right: percentValue });
      dispatchFilters({ type: filtersActions.SET_MAX_PRICE, maxPrice: parsedValue });
    }

    setInputValues((prevState) => ({
      ...prevState,
      [e.target.name]: parsedValue,
    }));
    setRangeValues((prevState) => ({
      ...prevState,
      [e.target.name]: parsedValue,
    }));
  };

  return (
    <SC.Wrapper>
      <SC.LabelAndInputs>
        <span className="label">Price ($)</span>
        <div className="inputs">
          <NumberInput
            name="minPrice"
            value={inputValues.minPrice}
            changed={inputChangeHandle}
            blured={validateInputValue}
            pressed={inputPressHandle}
            floating
          />
          <span className="inputs-gap">&mdash;</span>
          <NumberInput
            name="maxPrice"
            value={inputValues.maxPrice}
            changed={inputChangeHandle}
            blured={validateInputValue}
            pressed={inputPressHandle}
            floating
          />
        </div>
      </SC.LabelAndInputs>
      <SC.Slider positions={positions}>
        <input
          type="range"
          name="minPrice"
          min={minPriceState}
          max={maxPriceState}
          step={maxPriceState / 1000}
          value={rangeValues.minPrice}
          onChange={rangeChangeHandle}
          className="input min"
        />
        <input
          type="range"
          name="maxPrice"
          min={minPriceState}
          max={maxPriceState}
          step={maxPriceState / 1000}
          value={rangeValues.maxPrice}
          onChange={rangeChangeHandle}
          className="input max"
        />
        <div className="track" />
        <div className="range" />
        <div className="thumb left" />
        <div className="thumb right" />
      </SC.Slider>
    </SC.Wrapper>
  );
};

PriceSlider.propTypes = {
  dispatchFilters: PropTypes.func.isRequired,
};

export default PriceSlider;
