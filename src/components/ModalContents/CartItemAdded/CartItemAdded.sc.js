import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const ProductPreview = styled.div`
  display: flex;

  & .photo-box {
    align-items: center;
    display: flex;
    justify-content: center;
    max-height: 11rem;
    width: 8rem;
    margin-right: ${({ theme }) => theme.spacings.level3};
  }

  & .photo {
    max-height: 100%;
    object-fit: cover;
    max-width: 100%;
  }

  & .data-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  & .name {
    font-size: ${({ theme }) => theme.fontSizes.level3};
    margin-top: ${({ theme }) => theme.spacings.level1};
  }

  & .price {
    font-size: 2.2rem;
  }

  & .total-in-cart {
    font-size: ${({ theme }) => theme.fontSizes.level2};
  }
`;
