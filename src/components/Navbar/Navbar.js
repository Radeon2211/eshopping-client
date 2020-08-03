import React from 'react';
import { Link } from 'react-router-dom';
import * as SC from './Navbar.sc';
import logo from '../../images/logo.png';
import Heading from '../UI/Heading/Heading';
import SearchForm from './SearchForm/SearchForm';
import SignedOutLinks from './SignedOutLinks/SignedOutLinks';
import SignedInLinks from './SignedInLinks/SignedInLinks';

const Navbar = (props) => {
  const { userProfile } = props;

  const authNav = userProfile ? <SignedInLinks username={userProfile.username} /> : <SignedOutLinks />;

  return (
    <SC.Wrapper>
      <Link to="/" className="header-link">
        <header className="header">
          <img src={logo} alt="E-Shopping" className="logo" />
          <Heading variant="h1" className="heading">shopping</Heading>
        </header>
      </Link>
      <SearchForm />
      {authNav}
    </SC.Wrapper>
  );
};

export default Navbar;
