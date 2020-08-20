import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.NumberInput = styled.input`
  background-color: ${({ theme }) => theme.colors.light1};
  border: 1px solid ${({ theme }) => theme.colors.light4};
  border-radius: 1px;
  box-sizing: content-box;
  font-size: 1.5rem;
  outline: none;
  padding: ${({ theme }) => theme.spacings.level1} 0;
  text-align: center;
  width: 7.2rem;
  margin: 1px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.light4};
    margin: 0;
  }
`;

const NumberInput = (props) => {
  const { name, value, changed, blured, floating } = props;

  const inputKeyDownHandle = (e) => {
    if (floating) {
      if (floating && (e.key === 'e' || e.key === 'E' || e.key === '-')) {
        e.preventDefault();
      }
    } else if (e.key === 'e' || e.key === 'E' || e.key === '.' || e.key === ',' || e.key === '-') {
      e.preventDefault();
    }
  };

  return (
    <SC.NumberInput
      type="number"
      name={name}
      value={value}
      onChange={changed}
      onBlur={blured}
      onKeyDown={inputKeyDownHandle}
    />
  );
};

NumberInput.defaultProps = {
  floating: false,
  blured: () => {},
};

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  changed: PropTypes.func.isRequired,
  blured: PropTypes.func,
  floating: PropTypes.bool,
};

export default NumberInput;
