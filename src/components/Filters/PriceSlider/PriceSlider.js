import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as SC from './PriceSlider.sc';
import NumberInput from '../../UI/NumberInput/NumberInput';

const PriceSlider = (props) => {
  const { setControls } = props;
  const history = useHistory();
  const {
    location: { search },
  } = history;

  const { minPrice: minPriceState, maxPrice: maxPriceState } = useSelector(
    (state) => state.product,
  );

  const [inputValues, setInputValues] = useState({
    minPrice: 0,
    maxPrice: 0,
  });
  const [rangeValues, setRangeValues] = useState({
    minPrice: 0,
    maxPrice: 0,
  });
  const [positions, setPositions] = useState({
    left: 0,
    right: 0,
  });

  useEffect(() => {
    const parsedQueryParams = queryString.parse(search);
    const { minPrice, maxPrice } = parsedQueryParams;
    let queryMinPrice = Number.parseFloat((+minPrice).toFixed(2));
    let queryMaxPrice = Number.parseFloat((+maxPrice).toFixed(2));

    let changeQueryParams = false;
    if (queryMaxPrice && (queryMaxPrice >= maxPriceState || queryMaxPrice <= minPriceState)) {
      queryMaxPrice = maxPriceState;
      delete parsedQueryParams.maxPrice;
      changeQueryParams = true;
    }
    if (
      queryMinPrice &&
      (queryMinPrice >= (queryMaxPrice || maxPriceState) || queryMinPrice < minPriceState)
    ) {
      queryMinPrice = minPriceState;
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

    setPositions({
      left: leftPercentValue,
      right: rightPercentValue,
    });
    setInputValues({
      minPrice: queryMinPrice || minPriceState,
      maxPrice: queryMaxPrice || maxPriceState,
    });
    setRangeValues({
      minPrice: queryMinPrice || minPriceState,
      maxPrice: queryMaxPrice || maxPriceState,
    });
    setControls((prevState) => ({
      ...prevState,
      minPrice: queryMinPrice || minPriceState,
      maxPrice: queryMaxPrice || maxPriceState,
    }));
  }, [minPriceState, maxPriceState, setRangeValues, setControls, history, search]);

  const inputChangeHandle = (e) => {
    e.persist();

    setInputValues((prevState) => ({
      ...prevState,
      [e.target.name]: +e.target.value,
    }));
  };

  const validateInputValue = (e) => {
    e.persist();

    let value = +e.target.value;
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
      setPositions((prevState) => ({
        ...prevState,
        left: percentValue,
      }));
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
      setPositions((prevState) => ({
        ...prevState,
        right: percentValue,
      }));
    }

    setInputValues((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
    setRangeValues((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
    setControls((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
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
      setPositions((prevState) => ({
        ...prevState,
        left: percentValue,
      }));
    } else {
      if (maxPriceState - parsedValue <= maxPriceState / 1000) {
        parsedValue = maxPriceState;
      }
      const maxValueToCalculate = (parsedValue || maxPriceState) - minPriceState;
      if (maxPriceStateToCalculate !== 0) {
        percentValue = 100 - (100 / maxPriceStateToCalculate) * maxValueToCalculate;
      }
      setPositions((prevState) => ({
        ...prevState,
        right: percentValue,
      }));
    }

    setInputValues((prevState) => ({
      ...prevState,
      [e.target.name]: parsedValue,
    }));
    setRangeValues((prevState) => ({
      ...prevState,
      [e.target.name]: parsedValue,
    }));
    setControls((prevState) => ({
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
            floating
          />
          <span className="inputs-gap">&mdash;</span>
          <NumberInput
            name="maxPrice"
            value={inputValues.maxPrice}
            changed={inputChangeHandle}
            blured={validateInputValue}
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
  setControls: PropTypes.func.isRequired,
};

export default PriceSlider;
