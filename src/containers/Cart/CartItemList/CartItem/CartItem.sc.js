import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  padding: calc(1.5 * ${({ theme }) => theme.spacings.level2}) 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.light2};
  }

  &:last-child {
    padding-bottom: calc(0.5 * ${({ theme }) => theme.spacings.level2});
  }

  & .photo-and-name {
    align-items: center;
    display: flex;
  }

  & .photo-box {
    align-items: center;
    display: flex;
    justify-content: center;
    max-height: 7rem;
    min-width: 7rem;
    overflow: hidden;
    width: 7rem;
  }

  & .photo {
    max-height: 7rem;
    max-width: 7rem;
    object-fit: cover;
  }

  & .name {
    font-size: ${({ theme }) => theme.fontSizes.level3};
    margin-left: ${({ theme }) => theme.spacings.level3};
    width: 31rem;

    & > a {
      transition: color ${({ theme }) => theme.durations.level1}s;

      &:hover {
        color: ${({ theme }) => theme.colors.green};
      }
    }
  }

  & .mobile-lower-row {
    align-items: center;
    display: flex;
    justify-content: space-between;
    flex: 1;
  }

  & .choose-quantity-box {
    align-items: center;
    display: flex;
  }

  & .quantity-number {
    font-size: ${({ theme }) => theme.fontSizes.level2};
    margin-left: ${({ theme }) => theme.spacings.level1};
  }

  & .price-box {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    height: ${({ theme }) => theme.spacings.level4};
    justify-content: center;
  }

  & .overall-price {
    font-size: 2.2rem;
  }

  & .price-per-piece {
    font-size: ${({ theme }) => theme.fontSizes.level2};
    text-align: right;
  }

  & .remove-icon {
    cursor: pointer;
    justify-self: right;
    margin-left: ${({ theme }) => theme.spacings.level2};
    padding: calc(0.5 * ${({ theme }) => theme.spacings.level1});
  }

  @media only screen and (max-width: 56.25em) {
    & .mobile-lower-row {
      margin-top: ${({ theme }) => theme.spacings.level2};
      min-width: 100%;
      order: 1;
    }

    & .name {
      width: auto;
    }

    & .remove-icon {
      margin-left: auto;
      padding-left: calc(
        0.5 * ${({ theme }) => theme.spacings.level1} + ${({ theme }) => theme.spacings.level1}
      );
    }
  }

  @media only screen and (max-width: 37.5em) {
    & .name {
      margin-left: ${({ theme }) => theme.spacings.level2};
    }
  }
`;
