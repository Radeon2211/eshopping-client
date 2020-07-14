import React, { Suspense, lazy } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

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
  <h1>E-Shopping App</h1>
);

export default App;
