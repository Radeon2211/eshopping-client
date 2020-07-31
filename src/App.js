import React, { Suspense, lazy } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Modal from './components/UI/Modal/Modal';
import Navbar from './components/Navbar/Navbar';

const WaitingComponent = (Component) => {
  return (props) => (
    <Suspense
      fallback={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <div style={{ textAlign: 'center' }}>
          Loading...
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

const App = () => (
  <>
    <Modal />
    <Navbar />
  </>
);

export default App;
