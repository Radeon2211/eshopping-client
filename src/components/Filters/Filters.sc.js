import styled from 'styled-components';

export const Wrapper = styled.div`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacings.level3};
  }

  & .select {
    font-size: ${({ theme }) => theme.fontSizes.level2};
    z-index: ${({ theme }) => theme.zIndexes.level2};
  }
`;

export const Toggler = styled.div`
  align-self: flex-end;
  border: 1px solid ${({ theme }) => theme.colors.light4};
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.level2};
  margin-bottom: ${({ theme }) => theme.spacings.level3};
  padding: ${({ theme }) => theme.spacings.level1} ${({ theme }) => theme.spacings.level2};

  & .label {
    margin: 0 ${({ theme }) => theme.spacings.level2} 0 ${({ theme }) => theme.spacings.level1};
  }
`;

export const Checkboxes = styled.div`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacings.level2};
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

  & > label {
    cursor: pointer;
    display: inline-block;
    font-size: ${({ theme }) => theme.fontSizes.level2};
    line-height: ${({ theme }) => theme.lineHeights.level6};
    padding: 0 0 0
      calc(${({ theme }) => theme.spacings.level3} + ${({ theme }) => theme.spacings.level1});
    position: relative;

    &::before {
      align-items: center;
      border-radius: 5px;
      border: 2px solid ${({ theme }) => theme.colors.blue};
      content: '';
      color: ${({ theme }) => theme.colors.blue};
      display: flex;
      height: ${({ theme }) => theme.spacings.level3};
      font-size: ${({ theme }) => theme.fontSizes.level4};
      font-weight: 700;
      justify-content: center;
      left: 0;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: ${({ theme }) => theme.spacings.level3};
    }
  }

  & > input {
    height: 0
    opacity: 0;
    margin: 0;
    width: 0;

    &:checked + label::before {
      content: '✗';
    }
  }
`;
