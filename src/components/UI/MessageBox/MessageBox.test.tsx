import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MessageBox from './MessageBox';
import * as actions from '../../../store/actions/indexActions';
import { renderAppPart } from '../../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);

const setUp = (message: string) => {
  const store = mockStore({
    ui: { message },
  });
  store.dispatch = jest.fn();

  return {
    ...renderAppPart(<MessageBox />, {
      withoutRouter: true,
      store,
    }),
    store,
  };
};

describe('<MessageBox />', () => {
  describe('check how renders', () => {
    it('should render everything correctly if message is NOT empty', () => {
      const message = 'test message';
      setUp(message);
      expect(screen.getByText(message)).toBeInTheDocument();
      expect(screen.getByTestId('MessageBox')).toBeInTheDocument();
      expect(screen.getByTestId('MessageBox-close-icon')).toBeInTheDocument();
    });

    it('should NOT render anything if message is empty', () => {
      setUp('');
      expect(screen.queryByTestId('MessageBox')).not.toBeInTheDocument();
    });
  });

  describe('check redux actions calls', () => {
    it('should call setMessage() after close icon click', async () => {
      const { store } = setUp('test message');
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId('MessageBox-close-icon'));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setMessage(''));
    });
  });
});
