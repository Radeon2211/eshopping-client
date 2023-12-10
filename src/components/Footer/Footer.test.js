import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import theme from '../../styled/theme';
import Footer from './Footer';
import * as actions from '../../store/actions/indexActions';
import { modalTypes } from '../../shared/constants';

const mockStore = configureMockStore([thunk]);

const setUp = () => {
  const store = mockStore({});
  store.dispatch = jest.fn();

  return {
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Footer />
        </ThemeProvider>
      </Provider>,
    ),
    store,
  };
};

afterEach(cleanup);

describe('<Footer />', () => {
  describe('check redux actions calls and mail link href', () => {
    it('should call setModal() after about website text click and render correct', () => {
      const { store } = setUp();
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByRole('button', { name: /about website/i }));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(modalTypes.ABOUT_WEBSITE));
    });

    it('should mail link has correct href attribute', () => {
      setUp();
      expect(
        screen.getByRole('link', { name: /radoslawmikrut@wp.pl/i }).closest('a'),
      ).toHaveAttribute('href', 'mailto:radoslawmikrut@wp.pl');
    });
  });
});
