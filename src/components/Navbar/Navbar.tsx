import { Link } from 'react-router-dom';
import * as SC from './Navbar.sc';
import SearchForm from './SearchForm/SearchForm';
import LoggedOutLinks from './LoggedOutLinks/LoggedOutLinks';
import LoggedInLinks from './LoggedInLinks/LoggedInLinks';
import { defaultAppPath } from '../../shared/constants';
import Header from '../UI/Header';
import { Profile } from '../../shared/types/types';

interface NavbarProps {
  userProfile: Profile | null | undefined;
}

export default function Navbar({ userProfile }: NavbarProps) {
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
