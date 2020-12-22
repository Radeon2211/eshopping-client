import styled from 'styled-components';

export const PayBox = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacings.level2};

  & .to-pay-text {
    font-size: ${({ theme }) => theme.fontSizes.level4};
  }

  & .to-pay-value {
    font-size: 2.6rem;
    letter-spacing: 1px;
    margin-left: ${({ theme }) => theme.spacings.level1};
  }
`;

export const Summary = styled.div`
  width: 100%;
  position: sticky;
  top: 9rem;

  & > *:first-child {
    transition: padding ${({ theme }) => theme.durations.level2}s;
  }

  &.is-sticky {
    border-top: 1px solid ${({ theme }) => theme.colors.light3};
  }

  @media only screen and (max-width: 75em) {
    bottom: -1px;
    padding-bottom: 1px;

    & > *:first-child {
      padding: ${({ theme }) => theme.spacings.level2};
      transition: width ${({ theme }) => theme.durations.level2}s;
    }
  }
`;

export const EmptyCart = styled.div`
  text-align: center;

  & .empty-cart-image {
    max-width: 100%;
    width: 50rem;
  }
`;
