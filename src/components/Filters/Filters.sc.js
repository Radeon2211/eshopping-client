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
