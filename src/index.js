import { createRoot } from 'react-dom/client';
import thunk from 'redux-thunk';
import { HashRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import theme from './styled/theme';
import GlobalStyles from './styled/globalStyles';
import rootReducer from './store/reducers/rootReducer';
import App from './App/App';
import * as serviceWorker from './serviceWorker';

const reduxDevToolsEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
      })
    : null || compose;

const store = createStore(rootReducer, reduxDevToolsEnhancer(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Router>
  </Provider>
);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(app);

serviceWorker.register();
