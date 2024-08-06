import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import theme from './styled/theme';
import GlobalStyles from './styled/globalStyles';
import { rootStore } from './store/reducers/rootReducer';
import App from './App/App';
import * as serviceWorker from './serviceWorker';

const app = (
  <Provider store={rootStore}>
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Router>
  </Provider>
);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);
root.render(app);

serviceWorker.register();
