import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  min-height: 14rem;
  position: relative;

  & .photo-box {
    align-items: center;
    display: flex;
    justify-content: center;
    height: 45rem;
    width: 100%;
    margin-right: ${({ theme }) => theme.spacings.level5};
  }

  & .photo {
    max-height: 100%;
    object-fit: cover;
    max-width: 100%;
  }

  & .data-box {
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
    text-transform: capitalize;
    margin-top: ${({ theme }) => theme.spacings.level2};
  }

  & .price {
    font-size: 2.6rem;
    letter-spacing: 1px;
    margin-top: ${({ theme }) => theme.spacings.level3};
  }

  & .quantity-sold {
    font-size: 1.4rem;
    margin-top: ${({ theme }) => theme.spacings.level3};
  }

  & .gray {
    color: ${({ theme }) => theme.colors.light4};
  }
`;
