import styled from 'styled-components';
import { ButtonProps } from './Button';

// eslint-disable-next-line import/prefer-default-export
export const Button = styled.button<{
  $size: ButtonProps['$size'];
  $stretch: ButtonProps['$stretch'];
  $filled: ButtonProps['$filled'];
  $color: ButtonProps['$color'];
}>`
  box-shadow: ${({ theme }) => theme.shadows.level1};
  border-radius: 1px;
  cursor: pointer;
  font-weight: 700;
  line-height: ${({ theme }) => theme.lineHeights.level3};
  letter-spacing: 2px;
  outline: none;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  transition: all ${({ theme }) => theme.durations.level1}s;

  ${({ $size, theme }) => {
    if ($size === 'big') {
      return `
        font-size: ${theme.fontSizes.level4};
        padding: ${theme.spacings.level2} ${theme.spacings.level3};
      `;
    }
    return `
    font-size: ${theme.fontSizes.level2};
        padding: ${theme.spacings.level1} ${theme.spacings.level2};
    `;
  }}

  ${({ $stretch }) => {
    return $stretch ? `width: 100%;` : ``;
  }}

  ${({ $color, $filled, theme }) => {
    if ($color === 'blue') {
      if ($filled) {
        return `
          background-color: ${theme.colors.blue};
          border: 2px solid ${theme.colors.blue};
          color: #fff;

          &:hover {
            background-color: ${theme.colors.blueLight};
            border-color: ${theme.colors.blueLight};
          }
        `;
      }
      return `
        background-color: transparent;
        border: 2px solid ${theme.colors.blue};
        color: ${theme.colors.blue};

        &:hover {
          border-color: ${theme.colors.blueLight};
          color: ${theme.colors.blueLight};
        }
      `;
    }
    if ($filled) {
      return `
        background-color: ${theme.colors.red};
        border: 2px solid ${theme.colors.red};
        color: #fff;

        &:hover {
          background-color: ${theme.colors.redLight};
          border-color: ${theme.colors.redLight};
        }
      `;
    }
    return `
      background-color: transparent;
      border: 2px solid ${theme.colors.red};
      color: ${theme.colors.red};

      &:hover {
        border-color: ${theme.colors.redLight};
        color: ${theme.colors.redLight};
      }
    `;
  }}

  ${({ disabled, $color, $filled, theme }) => {
    if (disabled) {
      if ($color === 'blue') {
        if ($filled) {
          return `
            background-color: ${theme.colors.blueDark};
            border-color: ${theme.colors.blueDark};
            color: ${theme.colors.light1};
            cursor: not-allowed;

            &:hover {
              background-color: ${theme.colors.blueDark};
              border-color: ${theme.colors.blueDark};
              color: ${theme.colors.light1};
            }
          `;
        }
        return `
          border-color: ${theme.colors.blueDark};
          color: ${theme.colors.blueDark};
          cursor: not-allowed;

          &:hover {
            border-color: ${theme.colors.blueDark};
            color: ${theme.colors.blueDark};
          }
        `;
      }
      if ($filled) {
        return `
          background-color: ${theme.colors.redDark};
          border-color: ${theme.colors.redDark};
          color: ${theme.colors.light1};
          cursor: not-allowed;

          &:hover {
            background-color: ${theme.colors.redDark};
            border-color: ${theme.colors.redDark};
            color: ${theme.colors.light1};
          }
        `;
      }
      return `
        border-color: ${theme.colors.redDark};
        color: ${theme.colors.redDark};
        cursor: not-allowed;

        &:hover {
          border-color: ${theme.colors.redDark};
          color: ${theme.colors.redDark};
        }
      `;
    }
    return ``;
  }}
`;
