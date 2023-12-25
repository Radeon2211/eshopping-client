import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logo from '../../images/logo.png';
import Heading from './Heading/Heading';

const SC = {};
SC.Wrapper = styled.header`
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

export default function Header({ size }) {
  return (
    <SC.Wrapper $size={size}>
      <img src={logo} alt="E-Shopping" className="logo" />
      <Heading $variant="h1" className="heading" $fontSize={size}>
        shopping
      </Heading>
    </SC.Wrapper>
  );
}

Header.propTypes = {
  size: PropTypes.oneOf(['small', 'big']).isRequired,
};
