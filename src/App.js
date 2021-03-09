/* eslint-disable react/jsx-wrap-multilines */
import React, { useCallback, useEffect, Suspense, lazy } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from './axios';
import * as actions from './store/actions/indexActions';
import { DEFAULT_PATH } from './shared/constants';
import theme from './styled/theme';
import ServerConnectionError from './components/UI/ServerConnectionError';

import Modal from './components/UI/Modal/Modal';
import MessageBox from './components/UI/MessageBox/MessageBox';
import Navbar from './components/Navbar/Navbar';
import Loader from './components/UI/Loader/Loader';
import Main from './components/UI/Main';
import Footer from './components/Footer';
import Products from './containers/Products/Products';
import Logout from './containers/Logout/Logout';

const OrderDetails = lazy(() => import('./containers/OrderDetails/OrderDetails'));
const ProductDetails = lazy(() => import('./containers/ProductDetails/ProductDetails'));
const OtherUser = lazy(() => import('./containers/OtherUser/OtherUser'));
const MyAccount = lazy(() => import('./containers/MyAccount/MyAccount'));
const Cart = lazy(() => import('./containers/Cart/Cart'));
const Transaction = lazy(() => import('./containers/Transaction/Transaction'));

const WaitingComponent = (Component) => {
  return (props) => (
    <Suspense
      fallback={
        <div style={{ textAlign: 'center' }}>
          <Loader size="big" />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

const App = () => {
  const userProfile = useSelector((state) => state.auth.profile);

  const dispatch = useDispatch();
  const onFetchProfile = useCallback(() => dispatch(actions.fetchProfile()), [dispatch]);

  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const { data } = await axios.get('/csrf-token');
        axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
        onFetchProfile();
      } catch (error) {
        onFetchProfile();
      }
    };
    getCsrfToken();
  }, [onFetchProfile]);

  let routes = (
    <div style={{ textAlign: 'center', marginTop: theme.spacings.level3 }}>
      <Loader size="big" />
    </div>
  );

  if (userProfile === null) {
    if (!axios.defaults.headers.post['X-CSRF-Token']) {
      routes = <ServerConnectionError />;
    } else {
      routes = (
        <>
          <Modal />
          <MessageBox />
          <Navbar userProfile={userProfile} />
          <Main>
            <Switch>
              <Route path="/user/:username" exact component={WaitingComponent(OtherUser)} />
              <Route path="/product/:id" exact component={WaitingComponent(ProductDetails)} />
              <Route path="/products" exact component={Products} />
              <Redirect to="/products" />
            </Switch>
          </Main>
          <Footer />
        </>
      );
    }
  }

  if (userProfile) {
    if (userProfile.status === 'active') {
      routes = (
        <>
          <Modal />
          <MessageBox />
          <Navbar userProfile={userProfile} />
          <Main>
            <Switch>
              <Route path="/logout" component={Logout} />
              <Route path="/order/:id" exact component={WaitingComponent(OrderDetails)} />
              <Route path="/product/:id" exact component={WaitingComponent(ProductDetails)} />
              <Route path="/products" exact component={Products} />
              <Route path="/user/:username" exact component={WaitingComponent(OtherUser)} />
              <Route path="/cart" exact component={WaitingComponent(Cart)} />
              <Route path="/transaction" exact component={WaitingComponent(Transaction)} />
              <Route path="/my-account" component={WaitingComponent(MyAccount)} />
              <Redirect to={DEFAULT_PATH} />
            </Switch>
          </Main>
          <Footer />
        </>
      );
    } else {
      routes = (
        <>
          <Modal />
          <MessageBox />
          <Navbar userProfile={userProfile} />
          <Main>
            <Switch>
              <Route path="/logout" component={Logout} />
              <Route path="/product/:id" exact component={WaitingComponent(ProductDetails)} />
              <Route path="/products" exact component={Products} />
              <Route path="/user/:username" exact component={WaitingComponent(OtherUser)} />
              <Route path="/my-account" component={WaitingComponent(MyAccount)} />
              <Redirect to={DEFAULT_PATH} />
            </Switch>
          </Main>
          <Footer />
        </>
      );
    }
  }

  return routes;
};

export default App;
