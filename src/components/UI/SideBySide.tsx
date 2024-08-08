import styled from 'styled-components';
import { PropsWithChildren } from '../../shared/types/types';

interface SideBySideProps {
  $proportion: string;
  $makeVerticalWhen?: number;
}

const Wrapper = styled.div<SideBySideProps>`
  align-items: start;
  display: flex;
  width: 100%;

  ${({ $proportion, theme }) => {
    const [first, second] = $proportion.split('/');
    return `
      & > *:first-child {
        flex: ${first};
        margin-right: ${theme.spacings.level3};
      }
      & > *:last-child {
        flex: ${second};
      }
    `;
  }}

  ${({ $makeVerticalWhen, theme }) => {
    if ($makeVerticalWhen) {
      return `
        @media only screen and (max-width: ${$makeVerticalWhen / 16}em) {
          flex-direction: column;

          & > *:not(:last-child) {
            margin-right: 0;
            margin-bottom: ${theme.spacings.level3};
          }
        }
      `;
    }
    return ``;
  }}
`;

export default function SideBySide(props: PropsWithChildren<SideBySideProps>) {
  const { children } = props;
  return <Wrapper {...props}>{children}</Wrapper>;
}
