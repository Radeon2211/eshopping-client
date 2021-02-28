import styled from 'styled-components';
import FlexWrapper from '../../UI/FlexWrapper';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled(FlexWrapper)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.light2};
  padding: ${({ theme }) => theme.spacings.level2};
  transition: background-color ${({ theme }) => theme.durations.level1}s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }

  & .buyer-quantity-box {
    flex-grow: 1;
    display: flex;
    margin-top: ${({ theme }) => theme.spacings.level2};
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
