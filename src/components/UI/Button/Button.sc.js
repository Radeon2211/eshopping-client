import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Button = styled.button`
  border: 2px solid ${({ theme }) => theme.colors.blue};
  border-radius: 1px;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 2px;
  outline: none;
  padding: ${({ theme }) => theme.spacings.level1} ${({ theme }) => theme.spacings.level2};
  text-transform: uppercase;
  transition: all 0.1s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.blueLight};
  }

  ${({ filled, theme }) => {
    if (filled) {
      return `
        background-color: ${theme.colors.blue};
        color: #fff;

        &:hover {
          background-color: ${theme.colors.blueLight};
          color: #fff;
        }
      `;
    }
    return `
      background-color: transparent;
      color: ${theme.colors.blue};

      &:hover {
        color: ${theme.colors.blueLight};
      }
    `;
  }}

  ${({ disabled, filled, theme }) => {
    if (disabled && filled) {
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
    if (disabled && !filled) {
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
    return ``;
  }}
`;
