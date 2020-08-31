import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  align-items: center;
  display: flex;

  & .arrow {
    align-items: center;
    align-self: stretch;
    cursor: pointer;
    display: flex;
    padding: 0 ${({ theme }) => theme.spacings.level1};
  }

  & .form-number {
    margin: 0 ${({ theme }) => theme.spacings.level1};
  }

  & .of {
    font-size: ${({ theme }) => theme.fontSizes.level3};
    margin: 0 ${({ theme }) => theme.spacings.level1};
  }
`;
