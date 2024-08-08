import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.light1};
  box-shadow: ${({ theme }) => theme.level1};
  padding: ${({ theme }) => theme.spacings.level3};
  width: 100%;

  @media only screen and (max-width: 56.25em) {
    padding: ${({ theme }) => theme.spacings.level3} ${({ theme }) => theme.spacings.level2};
  }
`;

export default function PlainPanel(props: PropsWithChildren) {
  const { children } = props;
  return <Wrapper {...props}>{children}</Wrapper>;
}
