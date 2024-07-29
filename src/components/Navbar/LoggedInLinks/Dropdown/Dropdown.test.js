import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import userEvent, { PointerEventsCheckLevel } from '@testing-library/user-event';
import Dropdown from './Dropdown';
import * as actions from '../../../../store/actions/indexActions';
import { renderAppPart, testRouterPushCall } from '../../../../shared/testUtility/testUtility';
import { ModalType } from '../../../../shared/types/types';

const mockStore = configureMockStore([thunk]);

const setUp = (isVisible, closed = jest.fn(), pushFn = jest.fn()) => {
  const store = mockStore({});
  store.dispatch = jest.fn();

  return {
    ...renderAppPart(<Dropdown isVisible={isVisible} closed={closed} />, {
      push: pushFn,
      pathname: '/products',
      search: '?p=1',
      store,
    }),
    store,
    user: userEvent.setup({ pointerEventsCheck: PointerEventsCheckLevel.Never }),
  };
};

describe('<Dropdown />', () => {
  describe('check how renders', () => {
    it('should render everything correctly', () => {
      setUp(true);
      expect(screen.getByTestId('Dropdown')).toBeInTheDocument();
    });

    it('should NOT render anything if isVisible is false', () => {
      setUp(false);
      expect(screen.queryByTestId('Dropdown')).not.toBeInTheDocument();
    });
  });

  describe('check behaviour after clicking at options', () => {
    it('should call push with correct paths after clicking at links', () => {
      const pushFn = jest.fn();
      setUp(true, jest.fn(), pushFn);

      fireEvent.click(screen.getByText(/my account/i));
      testRouterPushCall(pushFn, 0, '/my-account/data');

      fireEvent.click(screen.getByText(/my offers/i));
      testRouterPushCall(pushFn, 1, '/my-account/products', '?p=1');

      fireEvent.click(screen.getByText(/my sell history/i));
      testRouterPushCall(pushFn, 2, '/my-account/sell-history', '?p=1');

      fireEvent.click(screen.getByText(/placed orders/i));
      testRouterPushCall(pushFn, 3, '/my-account/placed-orders', '?p=1');

      fireEvent.click(screen.getByText(/log out/i));
      testRouterPushCall(pushFn, 4, '/logout');

      expect(pushFn).toHaveBeenCalledTimes(5);
    });

    it('should call setModal() after add product option click', () => {
      const pushFn = jest.fn();
      const { store } = setUp(true, jest.fn(), pushFn);
      fireEvent.click(screen.getByText(/add product/i));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(ModalType.ADD_PRODUCT));
      expect(pushFn).not.toHaveBeenCalled();
    });
  });

  describe('check closing mechanism', () => {
    it('should call closed after clicking outside if isVisible is true', async () => {
      const closedFn = jest.fn();
      const { user } = setUp(true, closedFn);

      await user.click(document.body);
      expect(closedFn).toHaveBeenCalledTimes(1);
    });

    it('should NOT call closed after clicking outside if isVisible is false', async () => {
      const closedFn = jest.fn();
      const { user } = setUp(false, closedFn);

      await user.click(document.body);
      expect(closedFn).not.toHaveBeenCalled();
    });

    it('should NOT call closed after clicking at <Dropdown />', async () => {
      const closedFn = jest.fn();
      const { user } = setUp(true, closedFn);

      await user.click(screen.getByTestId('Dropdown'), {}, { skipPointerEventsCheck: true });
      expect(closedFn).not.toHaveBeenCalled();
    });
  });
});
