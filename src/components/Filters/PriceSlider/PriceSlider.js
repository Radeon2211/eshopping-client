import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as SC from './PriceSlider.sc';

const PriceSlider = (props) => {
  const { setControls } = props;
  const {
    location: { search },
  } = useHistory();

  const { minPrice: minPriceState, maxPrice: maxPriceState } = useSelector(
    (state) => state.product,
  );

  const [values, setValues] = useState({
    minPrice: 0,
    maxPrice: 0,
  });
  const [positions, setPositions] = useState({
    left: 0,
    right: 0,
  });

  useEffect(() => {
    const { minPrice, maxPrice } = queryString.parse(search);

    let leftPercentValue = (100 / maxPriceState) * (minPrice || minPriceState);
    let rightPercentValue = 100 - (100 / maxPriceState) * (maxPrice || minPriceState);
    if (leftPercentValue < 0) leftPercentValue = 0;
    if (leftPercentValue > 100) leftPercentValue = 100;
    if (rightPercentValue < 0) rightPercentValue = 0;
    if (rightPercentValue > 100) rightPercentValue = 100;

    setValues({
      minPrice: +minPrice || minPriceState,
      maxPrice: +maxPrice || maxPriceState,
    });
    setPositions({
      left: leftPercentValue,
      right: rightPercentValue,
    });
  }, [minPriceState, maxPriceState, setValues, search]);

  const inputChangeHandle = (e) => {
    e.persist();

    let parsedValue = Number.parseFloat((+e.target.value).toFixed(2));
    const percentValue = (100 / maxPriceState) * parsedValue;

    if (
      (e.target.name === 'minPrice' && parsedValue > values.maxPrice) ||
      (e.target.name === 'maxPrice' && parsedValue < values.minPrice)
    ) {
      return;
    }

    if (e.target.name === 'minPrice' && parsedValue - minPriceState <= 0.5) {
      parsedValue = minPriceState;
    } else if (e.target.name === 'maxPrice' && maxPriceState - parsedValue <= 0.5) {
      parsedValue = maxPriceState;
    }

    setPositions((prevState) => ({
      left: e.target.name === 'minPrice' ? percentValue : prevState.left,
      right: e.target.name === 'maxPrice' ? 100 - percentValue : prevState.right,
    }));
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: parsedValue,
    }));
    setControls((prevState) => ({
      ...prevState,
      [e.target.name]: parsedValue,
    }));
  };

  return (
    <SC.Wrapper positions={positions}>
      <input
        type="range"
        name="minPrice"
        min={minPriceState}
        max={maxPriceState}
        value={values.minPrice}
        onChange={inputChangeHandle}
        className="input min"
      />
      <input
        type="range"
        name="maxPrice"
        min={minPriceState}
        max={maxPriceState}
        value={values.maxPrice}
        onChange={inputChangeHandle}
        className="input max"
      />
      <SC.Slider positions={positions}>
        <div className="track" />
        <div className="range" />
        <div className="thumb left" />
        <div className="thumb right" />
      </SC.Slider>
    </SC.Wrapper>
  );
};

export default PriceSlider;
