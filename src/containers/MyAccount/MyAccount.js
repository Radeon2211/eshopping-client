import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import * as SC from './MyAccount.sc';
import MyData from './MyData/MyData';
import MyProducts from './MyProducts/MyProducts';
import MySellHistory from './MySellHistory/MySellHistory';
import MyPlacedOrders from './MyPlacedOrders/MyPlacedOrders';
import { DEFAULT_PATH } from '../../shared/constants';

const MyAccount = () => {
  const userProfile = useSelector((state) => state.auth.profile);

  let navigation = null;
  if (userProfile.status === 'active') {
    navigation = (
      <nav className="nav" data-testid="MyAccount-navigation">
        <ul className="nav-list">
          <li>
            <NavLink to="/my-account/data" className="nav-link" activeClassName="nav-link-active">
              Data
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/my-account${DEFAULT_PATH}`}
              className="nav-link"
              activeClassName="nav-link-active"
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-account/sell-history?p=1"
              className="nav-link"
              activeClassName="nav-link-active"
            >
              Sell history
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-account/placed-orders?p=1"
              className="nav-link"
              activeClassName="nav-link-active"
            >
              Placed orders
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }

  let routes = (
    <SC.Routes extraMargin={false} data-testid="MyAccount-pending-user-routes">
      <Switch>
        <Route path="/my-account/data" exact component={MyData} />
        <Redirect to="/my-account/data" />
      </Switch>
    </SC.Routes>
  );
  if (userProfile.status === 'active') {
    routes = (
      <SC.Routes extraMargin data-testid="MyAccount-active-user-routes">
        <Switch>
          <Route path="/my-account/data" exact component={MyData} />
          <Route
            path="/my-account/products"
            exact
            render={(props) => <MyProducts userProfile={userProfile} {...props} />}
          />
          <Route path="/my-account/sell-history" exact component={MySellHistory} />
          <Route path="/my-account/placed-orders" exact component={MyPlacedOrders} />
          <Redirect to="/my-account/data" />
        </Switch>
      </SC.Routes>
    );
  }

  return (
    <SC.Wrapper>
      {navigation}
      {routes}
    </SC.Wrapper>
  );
};

export default MyAccount;
