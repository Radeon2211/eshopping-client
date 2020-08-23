import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.article`
  border-bottom: 1px solid ${({ theme }) => theme.colors.light2};
  display: flex;
  padding: ${({ theme }) => theme.spacings.level2};
  transition: background-color 0.12s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
    cursor: pointer;
  }

  & .photo-box {
    align-items: center;
    display: flex;
    justify-content: center;
    max-height: 16rem;
    width: 13rem;
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
  }

  & .name {
    font-size: 1.5rem;
  }

  & .condition {
    font-size: 1.3rem;
    text-transform: capitalize;
    margin-top: ${({ theme }) => theme.spacings.level1};
  }

  & .price {
    font-size: 2.4rem;
    margin-top: ${({ theme }) => theme.spacings.level2};
  }

  & .quantity-sold-box {
    flex-grow: 1;
    display: flex;
    margin-top: 1.2rem;
  }

  & .quantity-sold {
    align-self: flex-end;
    font-size: 1.3rem;
  }

  & .gray {
    color: ${({ theme }) => theme.colors.light4};
  }
`;
