import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as SC from './Navbar.sc';
import SearchForm from './SearchForm/SearchForm';
import LoggedOutLinks from './LoggedOutLinks/LoggedOutLinks';
import LoggedInLinks from './LoggedInLinks/LoggedInLinks';
import { defaultAppPath } from '../../shared/constants';
import * as propTypes from '../../shared/propTypes';
import Header from '../UI/Header';

export default function Navbar({ userProfile }) {
  const authNav = userProfile ? (
    <LoggedInLinks username={userProfile.username} status={userProfile.status} />
  ) : (
    <LoggedOutLinks />
  );

  return (
    <SC.Wrapper data-testid="Navbar">
      <Link to={defaultAppPath} data-testid="Navbar-header-link">
        <Header size="small" />
      </Link>
      <SearchForm />
      {authNav}
    </SC.Wrapper>
  );
}

Navbar.defaultProps = {
  userProfile: null,
};

Navbar.propTypes = {
  userProfile: PropTypes.shape(propTypes.userProfile),
};
