import styled from 'styled-components';
import { Link } from 'react-router-dom';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacings.level3};
  grid-template-columns: repeat(3, 1fr);

  & .change-passwd-btn {
    grid-area: 3 / 2 / 3 / 3;
  }

  & .actions {
    grid-column: 1 / -1;
  }

  @media only screen and (max-width: 37.5em) {
    grid-template-columns: repeat(2, 1fr);

    & .change-passwd-btn {
      grid-area: 4 / 1 / 4 / 3;
    }

    & .actions > * {
      flex: 1;
    }
  }
`;

export const PendingUserLogoutBtn = styled(Link)`
  @media only screen and (max-width: 37.5em) {
    & > * {
      width: 100%;
    }
  }
`;
