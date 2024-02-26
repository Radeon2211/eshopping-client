import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BuyProducts from './BuyProducts';
import * as actions from '../../../store/actions/indexActions';
import useLastLocation from '../../../shared/useLastLocation';
import { renderAppPart } from '../../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);

const setUp = () => {
  const store = mockStore({});
  store.dispatch = jest.fn();

  return {
    ...renderAppPart(<BuyProducts />, {
      pathname: '/transaction',
      store,
    }),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  buyProducts: (navigateFn, lastPath) => ({
    navigateFn,
    lastPath,
  }),
}));

jest.mock('../../../shared/useLastLocation', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseNavigateFn = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigateFn,
}));

describe('<BuyProducts />', () => {
  describe('checks behaviour after buttons clicks', () => {
    it('should call setModal() and buyProducts() after buttons clicks', () => {
      useLastLocation.mockImplementation(() => ({
        pathname: '/cart',
      }));

      const { store } = setUp();
      expect(store.dispatch).not.toHaveBeenCalled();

      fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.setModal(''));

      fireEvent.click(screen.getByRole('button', { name: /confirm/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        2,
        actions.buyProducts(mockedUseNavigateFn, '/cart'),
      );

      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
