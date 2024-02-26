import PropTypes from 'prop-types';
import styled from 'styled-components';

const SC = {};
SC.NumberInput = styled.input`
  background-color: ${({ theme }) => theme.colors.light1};
  border: 1px solid ${({ theme }) => theme.colors.light4};
  border-radius: 1px;
  box-sizing: content-box;
  font-size: ${({ theme }) => theme.fontSizes.level3};
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
`;

export default function NumberInput({ name, value, changed, blured, focused, floating, size }) {
  const inputKeyDownHandle = (e) => {
    if (
      e.key === 'e' ||
      e.key === 'E' ||
      e.key === '-' ||
      e.key === '.' ||
      (!floating && e.key === ',')
    ) {
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
      onFocus={focused}
      data-testid={`NumberInput-${name}`}
    />
  );
}

NumberInput.defaultProps = {
  value: '',
  size: 'big',
  floating: false,
  blured: () => {},
  focused: () => {},
};

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  changed: PropTypes.func.isRequired,
  blured: PropTypes.func,
  focused: PropTypes.func,
  floating: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'big']),
};
