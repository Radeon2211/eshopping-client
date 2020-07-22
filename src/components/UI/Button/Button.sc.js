import styled from 'styled-components';

export const Button = styled.button`
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.colors.blue};
  border-radius: 1px;
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 2px;
  outline: none;
  padding: ${({ theme }) => theme.spacings.level1} ${({ theme }) => theme.spacings.level2};
  text-transform: uppercase;
  transition: all .1s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.blueLight};
    color: ${({ theme }) => theme.colors.blueLight};
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
  }}

  ${({ disabled, theme }) => {
    if (disabled) {
      return `
        background-color: ${theme.colors.blueDark};
        border-color: ${theme.colors.blueDark};
        color: ${theme.colors.light1};
        cursor: default;

        &:hover {
          background-color: ${theme.colors.blueDark};
          border-color: ${theme.colors.blueDark};
        }
      `;
    }
  }}
`;