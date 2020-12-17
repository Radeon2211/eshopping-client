import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const ProductPreview = styled.div`
  display: flex;

  & .photo-box {
    align-items: center;
    display: flex;
    justify-content: center;
    max-height: 11rem;
    margin-right: ${({ theme }) => theme.spacings.level3};
    width: 8rem;
  }

  & .photo {
    max-height: 100%;
    max-width: 100%;
    object-fit: cover;
  }

  & .data-box {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
  }

  & .name {
    font-size: ${({ theme }) => theme.fontSizes.level3};
    margin-top: ${({ theme }) => theme.spacings.level1};
  }

  & .quantity {
    font-size: ${({ theme }) => theme.fontSizes.level2};
  }

  & .price {
    font-size: 2.2rem;
  }

  & .total-in-cart {
    font-size: ${({ theme }) => theme.fontSizes.level2};
  }
`;
