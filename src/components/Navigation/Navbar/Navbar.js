import React from 'react';
import * as SC from './Navbar.sc';
import logo from '../../../images/logo.png';

const Navbar = () => {
  return (
    <SC.Wrapper>
      <header className="header">
        <img src={logo} alt="E-Shopping" />
      </header>
    </SC.Wrapper>
  );
};

export default Navbar;
