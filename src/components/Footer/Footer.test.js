import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
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
  describe('Check how renders', () => {
    it('should render everything correctly', () => {
      const { asFragment } = setUp();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Check redux actions calls', () => {
    it('should call setModal() after about website text click', () => {
      const { store } = setUp();
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByText('About website'));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(modalTypes.ABOUT_WEBSITE));
    });
  });
});
