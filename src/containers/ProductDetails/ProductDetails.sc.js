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

  @media only screen and (max-width: 56.25em) {
    & .photo-section {
      margin-right: ${({ theme }) => theme.spacings.level3};
    }
  }
`;
