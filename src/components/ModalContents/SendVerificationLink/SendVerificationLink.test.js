import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SendVerificationLink from './SendVerificationLink';
import * as actions from '../../../store/actions/indexActions';
import { renderAppPart } from '../../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);
const defaultStore = mockStore({});
defaultStore.dispatch = jest.fn();

const setUp = () => {
  return {
    ...renderAppPart(<SendVerificationLink />, {
      store: defaultStore,
      withoutRouter: true,
    }),
    store: defaultStore,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  sendAccountVerificationLink: () => {},
}));

describe('<SendVerificationLink />', () => {
  describe('checks behaviour after buttons clicks', () => {
    it('should call setModal() after cancel button click', () => {
      const { store } = setUp();
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(''));
    });

    it('should call and sendAccountVerificationLink() after send button click', () => {
      const { store } = setUp();
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByRole('button', { name: /send/i }));
      expect(store.dispatch).toHaveBeenCalledWith(actions.sendAccountVerificationLink());
    });
  });
});
