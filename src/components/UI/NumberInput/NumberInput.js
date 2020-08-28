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

  ${({ size }) => {
    if (size === 'small') {
      return `
        width: 5rem;
      `;
    }
    return `
      width: 7.2rem;
    `;
  }}

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }

  ${({ focusable, theme }) => {
    if (focusable) {
      return `
        margin: 1px;

        &:focus {
          border: 2px solid ${theme.colors.light4};
          margin: 0;
        }
      `;
    }
    return ``;
  }}
`;

const NumberInput = (props) => {
  const { name, value, changed, blured, floating, size, focusable } = props;

  const inputKeyDownHandle = (e) => {
    if (floating) {
      if (e.key === 'e' || e.key === 'E' || e.key === '-' || e.key === '.') {
        e.preventDefault();
      }
    } else if (e.key === 'e' || e.key === 'E' || e.key === '-' || e.key === '.' || e.key === ',') {
      e.preventDefault();
    }
  };

  const inputPressHandle = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  return (
    <SC.NumberInput
      type="number"
      size={size}
      name={name}
      value={value}
      onChange={changed}
      onKeyPress={inputPressHandle}
      onBlur={blured}
      onKeyDown={inputKeyDownHandle}
      focusable={focusable}
    />
  );
};

NumberInput.defaultProps = {
  value: '',
  floating: false,
  focusable: true,
  blured: () => {},
};

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  changed: PropTypes.func.isRequired,
  blured: PropTypes.func,
  floating: PropTypes.bool,
  focusable: PropTypes.bool,
};

export default NumberInput;
