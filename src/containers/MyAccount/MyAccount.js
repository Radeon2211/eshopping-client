import React from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import * as SC from './MyAccount.sc';
import MyData from './MyData/MyData';
import MyProducts from './MyProducts/MyProducts';
import MySellHistory from './MySellHistory/MySellHistory';
import MyPlacedOrders from './MyPlacedOrders/MyPlacedOrders';

const MyAccount = () => {
  return (
    <SC.Wrapper>
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <NavLink to="/my-account/data" className="nav-link" activeClassName="nav-link-active">
              Data
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-account/products?p=1"
              className="nav-link"
              activeClassName="nav-link-active"
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-account/sell-history"
              className="nav-link"
              activeClassName="nav-link-active"
            >
              Sell history
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-account/placed-orders"
              className="nav-link"
              activeClassName="nav-link-active"
            >
              Placed orders
            </NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/my-account/data" exact component={MyData} />
        <Route path="/my-account/products" exact component={MyProducts} />
        <Route path="/my-account/sell-history" exact component={MySellHistory} />
        <Route path="/my-account/placed-orders" exact component={MyPlacedOrders} />
        <Redirect to="/my-account/data" />
      </Switch>
    </SC.Wrapper>
  );
};

export default MyAccount;