import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.level3};

  & .buttons {
    display: flex;

    & > *:not(:last-child) {
      margin-right: ${({ theme }) => theme.spacings.level3};
    }
  }

  & .error {
    margin-top: ${({ theme }) => theme.spacings.level2};
  }

  & .input {
    display: none;
  }

  & .label {
    cursor: pointer;
    display: inline-block;

    & > button {
      pointer-events: none;
      transition: all 0.12s;
    }

    &:hover > button {
      background-color: ${({ theme }) => theme.colors.blueLight};
      border-color: ${({ theme }) => theme.colors.blueLight};
    }
  }
`;

export const Preview = styled.div`
  font-size: 1.3rem;
  margin-top: ${({ theme }) => theme.spacings.level2};

  & .file-data:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacings.level3};
  }
`;
