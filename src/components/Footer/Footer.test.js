import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Footer from './Footer';
import * as actions from '../../store/actions/indexActions';
import { renderAppPart } from '../../shared/testUtility/testUtility';
import { ModalType } from '../../shared/types/types';

const mockStore = configureMockStore([thunk]);

const setUp = () => {
  const store = mockStore({});
  store.dispatch = jest.fn();

  return {
    ...renderAppPart(<Footer />, {
      store,
      withoutRouter: true,
    }),
    store,
  };
};

describe('<Footer />', () => {
  describe('check redux actions calls and mail link href', () => {
    it('should call setModal() after about website text click and render correct', () => {
      const { store } = setUp();
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByRole('button', { name: /about website/i }));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(ModalType.ABOUT_WEBSITE));
    });

    it('should mail link has correct href attribute', () => {
      setUp();
      expect(
        screen.getByRole('link', { name: /radoslawmikrut@wp.pl/i }).closest('a'),
      ).toHaveAttribute('href', 'mailto:radoslawmikrut@wp.pl');
    });
  });
});
