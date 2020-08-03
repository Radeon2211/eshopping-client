import React, { useCallback, useEffect, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './store/actions/indexActions';
import { Route, Redirect, Switch } from 'react-router-dom';
import Modal from './components/UI/Modal/Modal';
import Navbar from './components/Navbar/Navbar';
import Loader from './components/UI/Loader/Loader';

import Logout from './containers/Logout/Logout';

const WaitingComponent = (Component) => {
  return (props) => (
    <Suspense
      fallback={
        // eslint-disable-next-line react/jsx-wrap-multilines
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
  const getProfile = useCallback(() => dispatch(actions.getProfile()), [dispatch]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  let routes = (
    <div style={{ textAlign: 'center' }}>
      <Loader size="big" />
    </div>
  );

  if (userProfile === null) {
    routes = (
      <>
        <Modal />
        <Navbar userProfile={userProfile} />
      </>
    );
  }
  if (userProfile) {
    routes = (
      <>
        <Modal />
        <Navbar userProfile={userProfile} />
        <Switch>
          <Route path="/logout" component={Logout} />
        </Switch>
      </>
    );
  }

  return routes;
};

export default App;
