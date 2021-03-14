import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import queryString from 'query-string';
import { sortOrdersOptions } from '../../../shared/constants';
import { getParamsWithoutPollution } from '../../../shared/utility/utility';

export const SC = {};
SC.Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  margin-right: ${({ theme }) => theme.spacings.level2};

  & .label {
    font-size: ${({ theme }) => theme.fontSizes.level3};
    margin-right: ${({ theme }) => theme.spacings.level2};
  }

  & .select {
    font-size: ${({ theme }) => theme.fontSizes.level2};
    flex: 1;
    max-width: 22rem;
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
};

const SortOrders = () => {
  const [option, setOption] = useState(sortOrdersOptions[0]);

  const history = useHistory();
  const { search, pathname } = history.location;

  const optionChangeHandle = (change) => {
    if (change.value === option.value) return;
    setOption(change);
    const parsedQueryParams = getParamsWithoutPollution(search);
    parsedQueryParams.sortBy = change.value;
    const updatedQueryParams = queryString.stringify(parsedQueryParams);
    history.replace(`${pathname}?${updatedQueryParams}`);
  };

  return (
    <SC.Wrapper>
      <label htmlFor="sortOption" className="label">
        Sort
      </label>
      <Select
        options={sortOrdersOptions}
        value={option}
        onChange={optionChangeHandle}
        isSearchable={false}
        styles={customStyles}
        id="sortOption"
        className="select"
      />
    </SC.Wrapper>
  );
};

export default SortOrders;
