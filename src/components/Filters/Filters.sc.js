import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacings.level3};
  }

  & .select {
    font-size: ${({ theme }) => theme.fontSizes.level2};
    z-index: ${({ theme }) => theme.zIndexes.level2};
  }
`;

export const Checkboxes = styled.div`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacings.level1};
  }

  & .label {
    display: inline-block;
    font-size: ${({ theme }) => theme.fontSizes.level3};
  }

  @media only screen and (max-width: 56.25em) {
    & > *:not(:last-child) {
      margin-bottom: calc(1.5 * ${({ theme }) => theme.spacings.level2});
    }
  }
`;

export const CheckboxBox = styled.div`
  align-items: center;
  display: flex;

  & > input {
    cursor: pointer;
    height: 1.8rem;
    margin: 0;
    padding: 0;
    width: 1.8rem;
  }

  & > label {
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizes.level2};
    line-height: 1;
    padding: 0.2rem ${({ theme }) => theme.spacings.level1};
  }

  @media only screen and (max-width: 56.25em) {
    & > input {
      height: 2rem;
      width: 2rem;
    }
  }
`;
