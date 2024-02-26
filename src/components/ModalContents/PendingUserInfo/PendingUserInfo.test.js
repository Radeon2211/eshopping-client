import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PendingUserInfo from './PendingUserInfo';
import * as actions from '../../../store/actions/indexActions';
import { renderAppPart } from '../../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);
const defaultStore = mockStore({});
defaultStore.dispatch = jest.fn();

const setUp = () => {
  return {
    ...renderAppPart(<PendingUserInfo />, {
      store: defaultStore,
      withoutRouter: true,
    }),
    store: defaultStore,
  };
};

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
