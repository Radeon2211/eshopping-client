import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as SC from './Navbar.sc';
import logo from '../../images/logo.png';
import Heading from '../UI/Heading/Heading';
import SearchForm from './SearchForm/SearchForm';
import LoggedOutLinks from './LoggedOutLinks/LoggedOutLinks';
import LoggedInLinks from './LoggedInLinks/LoggedInLinks';
import { DEFAULT_PATH } from '../../shared/constants';

const Navbar = (props) => {
  const { userProfile } = props;

  const authNav = userProfile ? (
    <LoggedInLinks username={userProfile.username} status={userProfile.status} />
  ) : (
    <LoggedOutLinks />
  );

  return (
    <SC.Wrapper>
      <Link to={DEFAULT_PATH}>
        <header className="header">
          <img src={logo} alt="E-Shopping" className="logo" />
          <Heading variant="h1" className="heading">
            shopping
          </Heading>
        </header>
      </Link>
      <SearchForm />
      {authNav}
    </SC.Wrapper>
  );
};

Navbar.defaultProps = {
  userProfile: null,
};

Navbar.propTypes = {
  userProfile: PropTypes.oneOfType([PropTypes.object]),
};

export default Navbar;
