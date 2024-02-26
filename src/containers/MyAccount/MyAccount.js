import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import * as SC from './MyAccount.sc';
import { defaultAppPath, userStatuses } from '../../shared/constants';

export default function MyAccount() {
  const userProfile = useSelector((state) => state.auth.profile);

  return (
    <SC.Wrapper>
      {userProfile.status === userStatuses.ACTIVE && (
        <nav className="nav" data-testid="MyAccount-navigation">
          <ul className="nav-list">
            <li>
              <NavLink to="/my-account/data" className="nav-link" data-testid="MyAccount-data-link">
                Data
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/my-account${defaultAppPath}`}
                className="nav-link"
                data-testid="MyAccount-products-link"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-account/sell-history?p=1"
                className="nav-link"
                data-testid="MyAccount-sell-history-link"
              >
                Sell history
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-account/placed-orders?p=1"
                className="nav-link"
                data-testid="MyAccount-placed-orders-link"
              >
                Placed orders
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      <SC.Routes
        $extraMargin={userProfile.status === userStatuses.ACTIVE}
        data-testid={
          userProfile.status === userStatuses.ACTIVE
            ? 'MyAccount-active-user-routes'
            : 'MyAccount-pending-user-routes'
        }
      >
        <Outlet />
      </SC.Routes>
    </SC.Wrapper>
  );
}
