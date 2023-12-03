import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PendingUserInfo from './PendingUserInfo';
import theme from '../../../styled/theme';
import * as actions from '../../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const setUp = () => {
  const store = mockStore({});
  store.dispatch = jest.fn();

  return {
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PendingUserInfo />
        </ThemeProvider>
      </Provider>,
    ),
    store,
  };
};

afterEach(cleanup);

describe('<PendingUserInfo />', () => {
  describe('checks behaviour after button click', () => {
    it('should call setModal() after button click', () => {
      const { store } = setUp();
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByRole('button', { name: /ok/i }));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(''));
    });
  });
});
