import styled from 'styled-components';
import { PropsWithChildren } from '../../shared/types/types';

const Wrapper = styled.main`
  margin: 0 auto;
  max-width: 120rem;
  min-height: 100vh;
  padding: 8.7rem ${({ theme }) => theme.spacings.level2} ${({ theme }) => theme.spacings.level3};

  @media only screen and (max-width: 37.5em) {
    padding-top: 13.6rem;
  }
`;

export default function Main(props: PropsWithChildren) {
  const { children } = props;
  return <Wrapper {...props}>{children}</Wrapper>;
}
