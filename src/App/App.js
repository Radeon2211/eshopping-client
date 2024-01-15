import React, { useCallback, useEffect, Suspense, lazy } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import axios from '../axios';
import * as actions from '../store/actions/indexActions';
import { defaultAppPath, userStatuses } from '../shared/constants';
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
import LandingPage from '../containers/LandingPage/LandingPage';
import MyData from '../containers/MyAccount/MyData/MyData';
import MyProducts from '../containers/MyAccount/MyProducts/MyProducts';
import MySellHistory from '../containers/MyAccount/MySellHistory/MySellHistory';
import MyPlacedOrders from '../containers/MyAccount/MyPlacedOrders/MyPlacedOrders';

const OrderDetails = lazy(() => import('../containers/OrderDetails/OrderDetails'));
const ProductDetails = lazy(() => import('../containers/ProductDetails/ProductDetails'));
const OtherUser = lazy(() => import('../containers/OtherUser/OtherUser'));
const MyAccount = lazy(() => import('../containers/MyAccount/MyAccount'));
const Cart = lazy(() => import('../containers/Cart/Cart'));
const Transaction = lazy(() => import('../containers/Transaction/Transaction'));
const Logout = lazy(() => import('../containers/Logout/Logout'));

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
  const { pathname } = useLocation();

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
    <FlexWrapper $justify="center" $mgTop="3" data-testid="App-loader">
      <Loader size="big" />
    </FlexWrapper>
  );
  let routes = null;

  if (userProfile === null) {
    if (!axios.defaults.headers.post['X-CSRF-Token']) {
      content = (
        <ErrorPage
          info="Oops! Server connection error. Please try again later"
          icon={<ServerErrorImage />}
        />
      );
    } else {
      routes = (
        <Main data-testid="App-user-null">
          <Routes>
            <Route path="/user/:username" Component={WaitingComponent(OtherUser)} />
            <Route path="/product/:id" Component={WaitingComponent(ProductDetails)} />
            <Route path="/products" Component={Products} />
            <Route path="/" Component={LandingPage} />
            <Route path="*" element={<Navigate to={defaultAppPath} replace />} />
          </Routes>
        </Main>
      );
    }
  } else if (userProfile) {
    if (userProfile.status === userStatuses.ACTIVE) {
      routes = (
        <Main data-testid="App-user-active">
          <Routes>
            <Route path="/logout" Component={WaitingComponent(Logout)} />
            <Route path="/order/:id" Component={WaitingComponent(OrderDetails)} />
            <Route path="/product/:id" Component={WaitingComponent(ProductDetails)} />
            <Route path="/products" Component={Products} />
            <Route path="/user/:username" Component={WaitingComponent(OtherUser)} />
            <Route path="/cart" Component={WaitingComponent(Cart)} />
            <Route path="/transaction" Component={WaitingComponent(Transaction)} />
            <Route path="/my-account" Component={WaitingComponent(MyAccount)}>
              <Route path="data" Component={MyData} />
              <Route path="products" element={<MyProducts userProfile={userProfile} />} />
              <Route path="sell-history" Component={MySellHistory} />
              <Route path="placed-orders" Component={MyPlacedOrders} />
              <Route path="*" element={<Navigate to="/my-account/data" replace />} />
            </Route>
            <Route path="*" element={<Navigate to={defaultAppPath} replace />} />
          </Routes>
        </Main>
      );
    } else {
      routes = (
        <Main data-testid="App-user-pending">
          <Routes>
            <Route path="/logout" Component={WaitingComponent(Logout)} />
            <Route path="/product/:id" Component={WaitingComponent(ProductDetails)} />
            <Route path="/products" Component={Products} />
            <Route path="/user/:username" Component={WaitingComponent(OtherUser)} />
            <Route path="/my-account" Component={WaitingComponent(MyAccount)}>
              <Route path="data" Component={MyData} />
              <Route path="*" element={<Navigate to="/my-account/data" replace />} />
            </Route>
            <Route path="*" element={<Navigate to={defaultAppPath} replace />} />
          </Routes>
        </Main>
      );
    }
  }

  if (routes) {
    content = (
      <>
        <Modal />
        <MessageBox />
        {pathname !== '/' && <Navbar userProfile={userProfile} />}
        {routes}
        {pathname !== '/' && <Footer />}
      </>
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <ErrorPage
          info="Something went wrong. Please refresh the page"
          icon={<UnexpectedBugImage />}
        />
      }
    >
      {content}
    </ErrorBoundary>
  );
};

export default App;
