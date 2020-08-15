import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  align-items: center;
  display: flex;

  & .arrow {
    cursor: pointer;
    padding: 0 ${({ theme }) => theme.spacings.level2};
  }

  & .input-number {
    background-color: ${({ theme }) => theme.colors.light1};
    border: 1px solid ${({ theme }) => theme.colors.light4};
    border-radius: 1px;
    box-sizing: content-box;
    font-size: 1.5rem;
    outline: none;
    padding: ${({ theme }) => theme.spacings.level1} 0;
    text-align: center;
    width: 5.5rem;
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
  }

  & .of {
    font-size: 1.5rem;
    margin-left: ${({ theme }) => theme.spacings.level2};
  }
`;
