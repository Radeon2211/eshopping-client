import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > button:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacings.level2};
  }
`;
