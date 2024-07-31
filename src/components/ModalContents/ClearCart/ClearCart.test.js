import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ClearCart from './ClearCart';
import * as actions from '../../../store/actions/indexActions';
import { renderAppPart } from '../../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);
const defaultStore = mockStore({});
defaultStore.dispatch = jest.fn();

const setUp = () => {
  return {
    ...renderAppPart(<ClearCart />, {
      store: defaultStore,
      withoutRouter: true,
    }),
    store: defaultStore,
  };
};

jest.mock('../../../store/actions/indexActions.ts', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.ts'),
  clearCart: () => {},
}));

describe('<ClearCart />', () => {
  describe('checks behaviour after buttons clicks', () => {
    it('should call setModal() after cancel button click', () => {
      const { store } = setUp();
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(null));
    });

    it('should call setModal() and clearCart() after clear button click', () => {
      const { store } = setUp();

      expect(store.dispatch).not.toHaveBeenCalled();

      fireEvent.click(screen.getByRole('button', { name: /clear/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.clearCart());
      expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.setModal(null));

      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
