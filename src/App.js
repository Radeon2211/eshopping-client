import React, { useCallback, useEffect, Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './store/actions/indexActions';
import { Route, Redirect, Switch } from 'react-router-dom';
import Modal from './components/UI/Modal/Modal';
import Navbar from './components/Navbar/Navbar';
import Loader from './components/UI/Loader/Loader';

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
  const dispatch = useDispatch();
  const getProfile = useCallback(() => dispatch(actions.getProfile()), [dispatch]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <>
      <Modal />
      <Navbar />
    </>
  );
};

export default App;
