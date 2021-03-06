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
    margin: 0 ${({ theme }) => theme.spacings.level1};
  }

  & .hide-arrow {
    opacity: 0;
    pointer-events: none;
  }

  & .form-number {
    margin: 0 ${({ theme }) => theme.spacings.level1};
  }
`;
