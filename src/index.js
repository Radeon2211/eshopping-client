import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { LastLocationProvider } from 'react-router-last-location';
import { HashRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './components/UI/ErrorPage/ErrorPage';
import { ReactComponent as UnexpectedBugImage } from './images/unexpected-bug.svg';

import theme from './styled/theme';
import GlobalStyles from './styled/globalStyles';
import rootReducer from './store/reducers/rootReducer';
import App from './App';
import * as serviceWorker from './serviceWorker';

const reduxDevToolsEnhancer =
  process.env.NODE_ENV === 'development' && !navigator.userAgent.match(/Android/i)
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
      })
    : null || compose;

const store = createStore(rootReducer, reduxDevToolsEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <LastLocationProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <ErrorBoundary
              fallback={
                <ErrorPage info="Something went wrong. Please refresh the page">
                  <UnexpectedBugImage />
                </ErrorPage>
              }
            >
              <App />
            </ErrorBoundary>
          </ThemeProvider>
        </LastLocationProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.register();
