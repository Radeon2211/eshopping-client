import styled from 'styled-components';
import FlexWrapper from '../../UI/FlexWrapper';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled(FlexWrapper)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.light2};
  padding: ${({ theme }) => theme.spacings.level2};
  transition: background-color ${({ theme }) => theme.durations.level1}s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
    cursor: pointer;
  }

  & .name {
    font-size: ${({ theme }) => theme.fontSizes.level3};
  }

  & .condition {
    font-size: ${({ theme }) => theme.fontSizes.level1};
    margin-top: ${({ theme }) => theme.spacings.level1};
    text-transform: capitalize;
  }

  & .price {
    font-size: ${({ theme }) => theme.fontSizes.level5};
    margin-top: ${({ theme }) => theme.spacings.level2};
  }

  & .quantity-sold-box {
    flex-grow: 1;
    display: flex;
    margin-top: ${({ theme }) => theme.spacings.level2};
  }

  & .quantity-sold {
    align-self: flex-end;
    font-size: ${({ theme }) => theme.fontSizes.level1};
  }

  @media only screen and (max-width: 24.5em) {
    & .photo-box {
      max-height: 13rem;
      min-width: 10rem;
      width: 10rem;
    }
  }

  @media only screen and (max-width: 22.5em) {
    & .photo-box {
      max-height: 11rem;
      min-width: 8rem;
      width: 8rem;
    }
  }
`;
