import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  & .photo-section {
    align-items: center;
    display: flex;
    height: 45rem;
    justify-content: center;
    margin-right: ${({ theme }) => theme.spacings.level5};
    padding: ${({ theme }) => theme.spacings.level1} ${({ theme }) => theme.spacings.level2};
    width: 100%;
  }

  & .photo {
    object-fit: cover;
    max-height: 100%;
    max-width: 100%;
  }

  & .data-section {
    align-self: stretch;
    display: flex;
    flex-direction: column;
  }

  & .name {
    font-size: ${({ theme }) => theme.fontSizes.level4};
    font-weight: 700;
  }

  & .seller {
    font-size: ${({ theme }) => theme.fontSizes.level2};
    margin-top: ${({ theme }) => theme.spacings.level2};
  }

  & .condition {
    font-size: ${({ theme }) => theme.fontSizes.level2};
    margin-top: ${({ theme }) => theme.spacings.level2};
  }

  & .price {
    font-size: 2.7rem;
    letter-spacing: 1px;
    margin: ${({ theme }) => theme.spacings.level3} 0;
  }

  & .quantity-sold {
    font-size: ${({ theme }) => theme.fontSizes.level2};
    margin-bottom: ${({ theme }) => theme.spacings.level3};
  }

  & .description-content {
    font-size: ${({ theme }) => theme.fontSizes.level3};
    line-height: 1.35;
  }

  @media only screen and (max-width: 56.25em) {
    & .photo-section {
      margin-right: ${({ theme }) => theme.spacings.level3};
    }
  }
`;
