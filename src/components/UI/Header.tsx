import styled from 'styled-components';
import logo from '../../images/logo.png';
import Heading from './Heading/Heading';

interface HeaderProps {
  size: 'small' | 'big';
}

const Wrapper = styled.header<{ $size: HeaderProps['size'] }>`
  display: flex;

  & .logo {
    ${({ $size }) => {
      if ($size === 'big') {
        return `
          width: 5.5rem;
          height: 5.5rem;
        `;
      }
      return `
        width: 4.6rem;
        height: 4.6rem;
      `;
    }}
    margin-right: ${({ theme }) => theme.spacings.level1};
  }
`;

export default function Header({ size }: HeaderProps) {
  return (
    <Wrapper $size={size}>
      <img src={logo} alt="E-Shopping" className="logo" />
      <Heading $variant="h1" className="heading" $fontSize={size}>
        shopping
      </Heading>
    </Wrapper>
  );
}
