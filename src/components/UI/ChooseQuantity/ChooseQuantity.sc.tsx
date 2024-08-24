import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: stretch;
  display: flex;

  & .button {
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.light4};
    border-radius: 1px;
    cursor: pointer;
    outline: none;
    padding: 0 ${({ theme }) => theme.spacings.level2};

    &[disabled] {
      cursor: default;
    }

    &.minus {
      border-right: 0;
    }

    &.plus {
      border-left: 0;
    }
  }
`;
