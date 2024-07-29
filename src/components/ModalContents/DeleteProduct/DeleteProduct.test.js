import { screen, fireEvent } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DeleteProduct from './DeleteProduct';
import { createProductItem, renderAppPart } from '../../../shared/testUtility/testUtility';
import * as actions from '../../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const setUp = (productName, productId) => {
  const store = mockStore({
    product: {
      productDetails: createProductItem({
        _id: productId,
        name: productName,
      }),
    },
  });
  store.dispatch = jest.fn();

  return {
    ...renderAppPart(<DeleteProduct />, {
      pathname: `/product/${productId}`,
      store,
    }),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  deleteProduct: (productId, currentHistory) => ({
    productId,
    currentHistory,
  }),
}));

const mockedUseNavigateFn = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigateFn,
}));

describe('<DeleteProduct />', () => {
  describe('check redux actions calling', () => {
    it('should call push with /cart after go to cart button click', () => {
      const productId = 'p1';
      const { store } = setUp('Wellingtons', productId);
      expect(store.dispatch).not.toHaveBeenCalled();

      fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.setModal(null));

      fireEvent.click(screen.getByRole('button', { name: /delete/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        2,
        actions.deleteProduct(productId, mockedUseNavigateFn),
      );

      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
