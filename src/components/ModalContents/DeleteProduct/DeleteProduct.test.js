import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DeleteProduct from './DeleteProduct';
import theme from '../../../styled/theme';
import { createProductItem } from '../../../shared/testUtility/testUtility';
import * as actions from '../../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const setUp = (productName, productId) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: `/product/${productId}` },
  };

  const store = mockStore({
    product: {
      productDetails: createProductItem({
        name: productName,
        id: productId,
      }),
    },
  });
  store.dispatch = jest.fn();

  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          <ThemeProvider theme={theme}>
            <DeleteProduct />
          </ThemeProvider>
        </Router>
      </Provider>,
    ),
    store,
    history,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  deleteProduct: (productId, currentHistory) => ({
    productId,
    currentHistory,
  }),
}));

afterEach(cleanup);

describe('<DeleteProduct />', () => {
  describe('check redux actions calling', () => {
    it('should call push with /cart after go to cart button click', () => {
      const productId = 'p1';
      const { store, history } = setUp('Wellingtons', productId);
      expect(store.dispatch).not.toHaveBeenCalled();

      fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.setModal(''));

      fireEvent.click(screen.getByRole('button', { name: /delete/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.deleteProduct(productId, history));

      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
