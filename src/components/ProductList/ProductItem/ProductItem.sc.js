import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.article`
  border-bottom: 1px solid ${({ theme }) => theme.colors.light2};
  display: flex;
  padding: ${({ theme }) => theme.spacings.level3} ${({ theme }) => theme.spacings.level2};
  transition: background-color 0.12s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
    cursor: pointer;
  }

  & .photo-box {
    align-items: center;
    display: flex;
    justify-content: center;
    max-height: 17rem;
    max-width: 13rem;
    margin-right: ${({ theme }) => theme.spacings.level3};
  }

  & .photo {
    height: 100%;
    object-fit: cover;
    width: 100%;
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

  & .quantity-sold {
    font-size: 1.3rem;
    margin-top: auto;
  }

  & .gray {
    color: ${({ theme }) => theme.colors.light4};
  }
`;
