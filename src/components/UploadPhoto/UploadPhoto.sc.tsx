import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.level3};

  & .input {
    display: none;
  }

  & .label {
    cursor: pointer;
    display: inline-block;

    & > button {
      pointer-events: none;
      transition: all ${({ theme }) => theme.durations.level1}s;
    }

    &:hover > button {
      background-color: ${({ theme }) => theme.colors.blueLight};
      border-color: ${({ theme }) => theme.colors.blueLight};
    }
  }
`;
