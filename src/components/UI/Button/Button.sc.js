import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Button = styled.button`
  border-radius: 1px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.level2};
  font-weight: 700;
  letter-spacing: 2px;
  outline: none;
  padding: ${({ theme }) => theme.spacings.level1} ${({ theme }) => theme.spacings.level2};
  text-transform: uppercase;
  transition: all ${({ theme }) => theme.durations.level1}s;

  ${({ color, filled, theme }) => {
    if (color === 'blue') {
      if (filled) {
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
    if (filled) {
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

  ${({ disabled, color, filled, theme }) => {
    if (disabled) {
      if (color === 'blue') {
        if (filled) {
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
      if (filled) {
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
