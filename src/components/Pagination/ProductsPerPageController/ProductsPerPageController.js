import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import { productsPerPageControllerOptions } from '../../../shared/constants';

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

export default function ProductsPerPageController({ quantityPerPage }) {
  const defaultOption = productsPerPageControllerOptions.find(
    ({ value }) => value === quantityPerPage,
  );
  const [option, setOption] = useState(defaultOption);

  const history = useHistory();

  const dispatch = useDispatch();
  const onChangeProductsPerPage = useCallback(
    (quantity, currentHistory) => dispatch(actions.changeProductsPerPage(quantity, currentHistory)),
    [dispatch],
  );

  const optionChangeHandle = (change) => {
    if (change.value === option.value) return;
    setOption(change);
    onChangeProductsPerPage(change.value, history);
  };

  return (
    <SC.Wrapper data-testid="ProductsPerPageController">
      <label htmlFor="perPageQuantity" className="label">
        Per page
      </label>
      <Select
        options={productsPerPageControllerOptions}
        value={option}
        onChange={optionChangeHandle}
        isSearchable={false}
        styles={customStyles}
        id="perPageQuantity"
        className="select"
      />
    </SC.Wrapper>
  );
}

ProductsPerPageController.propTypes = {
  quantityPerPage: PropTypes.number.isRequired,
};
