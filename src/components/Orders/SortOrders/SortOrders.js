import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
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

export default function SortOrders() {
  const [option, setOption] = useState(sortOrdersOptions[0]);

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const optionChangeHandle = (change) => {
    if (change.value === option.value) return;
    setOption(change);
    const parsedQueryParams = getParamsWithoutPollution(search);
    parsedQueryParams.sortBy = change.value;
    const updatedQueryParams = queryString.stringify(parsedQueryParams);
    navigate(`${pathname}?${updatedQueryParams}`, { replace: true });
  };

  useEffect(() => {
    // Search for sort param in URL and set this a value of select input; if param invalid remove it from URL
    const parsedQueryParams = getParamsWithoutPollution(search);
    if (parsedQueryParams.sortBy) {
      const foundSortOption = sortOrdersOptions.find(
        (sortOption) => sortOption.value === parsedQueryParams.sortBy,
      );
      if (foundSortOption) {
        setOption(foundSortOption);
      } else {
        delete parsedQueryParams.sortBy;
        const updatedQueryParams = queryString.stringify(parsedQueryParams);
        navigate(`${pathname}?${updatedQueryParams}`, { replace: true });
      }
    }
  }, []);

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
}
