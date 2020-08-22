import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacings.level3};
  }

  & .select {
    font-size: 1.4rem;
    z-index: ${({ theme }) => theme.zIndexes.level2};
  }
`;

export const Checkboxes = styled.div`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacings.level1};
  }

  & .label {
    display: inline-block;
    font-size: 1.5rem;
  }
`;

export const CheckboxBox = styled.div`
  align-items: center;
  display: flex;

  & > input {
    height: 1.8rem;
    margin: 0 ${({ theme }) => theme.spacings.level1} 0 0;
    padding: 0;
    width: 1.8rem;
  }

  & > label {
    font-size: 1.4rem;
    line-height: 1;
  }
`;
