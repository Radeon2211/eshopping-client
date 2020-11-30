import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

export const SC = {};
SC.Wrapper = styled.div`
  align-items: center;
  display: flex;

  & .label {
    font-size: ${({ theme }) => theme.fontSizes.level3};
    margin-right: ${({ theme }) => theme.spacings.level2};
  }

  & .select {
    font-size: ${({ theme }) => theme.fontSizes.level2};
    z-index: ${({ theme }) => theme.zIndexes.level2};
  }
`;

const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: '25px',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: '0.6rem',
  }),
  valueContainer: () => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0 0.7rem',
  }),
  singleValue: () => ({
    width: '1.8rem',
    textAlign: 'center',
  }),
};

const quantityOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
  { value: 25, label: '25' },
];

const QuantityPerPageController = (props) => {
  const { maxQuantityPerPage } = props;

  const defaultOption = quantityOptions.find(({ value }) => value === maxQuantityPerPage);
  const [option, setOption] = useState(defaultOption);

  const history = useHistory();

  const dispatch = useDispatch();
  const onChangeMaxQuantityPerPage = useCallback(
    (quantity, currentHistory) =>
      dispatch(actions.changeMaxQuantityPerPage(quantity, currentHistory)),
    [dispatch],
  );

  const optionChangeHandle = (change) => {
    if (change.value === option.value) return;
    setOption(change);
    onChangeMaxQuantityPerPage(change.value, history);
  };

  return (
    <SC.Wrapper>
      <label htmlFor="option" className="label">
        Per page
      </label>
      <Select
        options={quantityOptions}
        value={option}
        onChange={optionChangeHandle}
        isSearchable={false}
        styles={customStyles}
        className="select"
      />
    </SC.Wrapper>
  );
};

QuantityPerPageController.propTypes = {
  maxQuantityPerPage: PropTypes.number.isRequired,
};

export default QuantityPerPageController;
