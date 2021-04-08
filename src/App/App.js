import React, { useCallback, useEffect, Suspense, lazy } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import axios from '../axios';
import * as actions from '../store/actions/indexActions';
import { defaultAppPath } from '../shared/constants';
import ErrorPage from '../components/UI/ErrorPage/ErrorPage';
import FlexWrapper from '../components/UI/FlexWrapper';
import { ReactComponent as ServerErrorImage } from '../images/server-connection-error.svg';
import { ReactComponent as UnexpectedBugImage } from '../images/unexpected-bug.svg';

import Modal from '../components/UI/Modal/Modal';
import MessageBox from '../components/UI/MessageBox/MessageBox';
import Navbar from '../components/Navbar/Navbar';
import Loader from '../components/UI/Loader/Loader';
import Main from '../components/UI/Main';
import Footer from '../components/Footer/Footer';
import Products from '../containers/Products/Products';
import Logout from '../containers/Logout/Logout';

const OrderDetails = lazy(() => import('../containers/OrderDetails/OrderDetails'));
const ProductDetails = lazy(() => import('../containers/ProductDetails/ProductDetails'));
const OtherUser = lazy(() => import('../containers/OtherUser/OtherUser'));
const MyAccount = lazy(() => import('../containers/MyAccount/MyAccount'));
const Cart = lazy(() => import('../containers/Cart/Cart'));
const Transaction = lazy(() => import('../containers/Transaction/Transaction'));

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

  let content = (
    <FlexWrapper justify="center" mgTop="3">
      <Loader size="big" />
    </FlexWrapper>
  );
  let routes = null;

  if (userProfile === null) {
    if (!axios.defaults.headers.post['X-CSRF-Token']) {
      content = (
        <ErrorPage info="Oops! Server connection error. Please try again later">
          <ServerErrorImage />
        </ErrorPage>
      );
    } else {
      routes = (
        <Main data-testid="App-user-null">
          <Switch>
            <Route path="/user/:username" exact component={WaitingComponent(OtherUser)} />
            <Route path="/product/:id" exact component={WaitingComponent(ProductDetails)} />
            <Route path="/products" exact component={Products} />
            <Redirect to="/products" />
          </Switch>
        </Main>
      );
    }
  } else if (userProfile) {
    if (userProfile.status === 'active') {
      routes = (
        <Main data-testid="App-user-active">
          <Switch data-testid="kupa">
            <Route path="/logout" component={Logout} />
            <Route path="/order/:id" exact component={WaitingComponent(OrderDetails)} />
            <Route path="/product/:id" exact component={WaitingComponent(ProductDetails)} />
            <Route path="/products" exact component={Products} />
            <Route path="/user/:username" exact component={WaitingComponent(OtherUser)} />
            <Route path="/cart" exact component={WaitingComponent(Cart)} />
            <Route path="/transaction" exact component={WaitingComponent(Transaction)} />
            <Route path="/my-account" component={WaitingComponent(MyAccount)} />
            <Redirect to={defaultAppPath} />
          </Switch>
        </Main>
      );
    } else {
      routes = (
        <Main data-testid="App-user-pending">
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/product/:id" exact component={WaitingComponent(ProductDetails)} />
            <Route path="/products" exact component={Products} />
            <Route path="/user/:username" exact component={WaitingComponent(OtherUser)} />
            <Route path="/my-account" component={WaitingComponent(MyAccount)} />
            <Redirect to={defaultAppPath} />
          </Switch>
        </Main>
      );
    }
  }

  if (routes) {
    content = (
      <>
        <Modal />
        <MessageBox />
        <Navbar userProfile={userProfile} />
        {routes}
        <Footer />
      </>
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <ErrorPage info="Something went wrong. Please refresh the page">
          <UnexpectedBugImage />
        </ErrorPage>
      }
    >
      {content}
    </ErrorBoundary>
  );
};

export default App;
