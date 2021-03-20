import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MyData from './MyData';
import theme from '../../../styled/theme';
import { defaultUserProfile } from '../../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);

const setUp = (profile, pushFn = jest.fn()) => {
  const store = mockStore({
    auth: { profile },
  });

  const props = {
    history: {
      push: pushFn,
    },
  };

  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MyData {...props} />
      </ThemeProvider>
    </Provider>,
  );
};

afterEach(cleanup);

describe('<MyData />', () => {
  describe('Check how renders', () => {
    describe('Snapshots', () => {
      it('should render everything correctly for non admin user with status active', () => {
        const { asFragment } = setUp(defaultUserProfile);
        expect(asFragment()).toMatchSnapshot();
      });

      it('should render everything correctly for non admin user with status pending', () => {
        const { asFragment } = setUp({ ...defaultUserProfile, status: 'pending' });
        expect(asFragment()).toMatchSnapshot();
      });

      it('should render everything correctly for admin user', () => {
        const { asFragment } = setUp({ ...defaultUserProfile, isAdmin: true });
        expect(asFragment()).toMatchSnapshot();
      });
    });

    it('should call push after clicking on logout button', () => {
      const pushFn = jest.fn();
      setUp({ ...defaultUserProfile, status: 'pending' }, pushFn);

      fireEvent.click(screen.getByText('Logout'));
      expect(pushFn).toHaveBeenCalledTimes(1);
      expect(pushFn).toHaveBeenCalledWith('/logout');
    });
  });
});
