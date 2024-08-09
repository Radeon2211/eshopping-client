import styled from 'styled-components';
import { NumberInputProps } from './NumberInput';

export const NumberInput = styled.input<Pick<NumberInputProps, 'size'>>`
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
