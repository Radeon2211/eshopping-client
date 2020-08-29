import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  min-height: 14rem;
  position: relative;

  & .photo-box {
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

  & .data-box {
    align-self: stretch;
    display: flex;
    flex-direction: column;
  }

  & .name {
    font-size: 1.7rem;
    font-weight: 700;
  }

  & .seller {
    font-size: 1.4rem;
    margin-top: ${({ theme }) => theme.spacings.level2};
  }

  & .seller-link {
    color: ${({ theme }) => theme.colors.green};
    font-size: 1.4rem;
  }

  & .condition {
    font-size: 1.4rem;
    margin-top: ${({ theme }) => theme.spacings.level2};
  }

  & .price {
    font-size: 2.7rem;
    letter-spacing: 1px;
    margin: ${({ theme }) => theme.spacings.level3} 0;
  }

  & .quantity-sold {
    font-size: 1.4rem;
    margin-bottom: ${({ theme }) => theme.spacings.level3};
  }

  & .description-box {
    display: flex;
    flex-direction: column;
    margin-top: ${({ theme }) => theme.spacings.level3};
  }

  & .description-heading {
    display: inline-block;
    font-size: 1.7rem;
    font-weight: 700;
    margin-bottom: ${({ theme }) => theme.spacings.level1};
  }

  & .description-content {
    font-size: 1.5rem;
  }

  & .delete-btn-box {
    margin-top: ${({ theme }) => theme.spacings.level5};
    text-align: center;
  }

  & .gray {
    color: ${({ theme }) => theme.colors.light4};
  }

  @media only screen and (max-width: 56.25em) {
    & .photo-box {
      margin-right: ${({ theme }) => theme.spacings.level3};
    }
  }
`;
