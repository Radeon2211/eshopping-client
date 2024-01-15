import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CartLink from './CartLink';
import { renderAppPart, testRouterPushCall } from '../../../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);

const setUp = (cart, pushFn = jest.fn()) => {
  const store = mockStore({
    auth: { cart },
  });

  return {
    ...renderAppPart(<CartLink />, {
      push: pushFn,
      store,
    }),
    store,
  };
};

describe('<CartLink />', () => {
  it('should render everything correctly with quantity 1', () => {
    setUp([{ _id: '1' }]);
    expect(screen.getByTestId('CartLink-quantity')).toHaveTextContent('1');
  });

  it('should NOT render quantity if cart length is 0', () => {
    setUp([]);
    expect(screen.queryByTestId('CartLink-quantity')).not.toBeInTheDocument();
  });

  it('should NOT render quantity if cart is null', () => {
    setUp(null);
    expect(screen.queryByTestId('CartLink-quantity')).not.toBeInTheDocument();
  });

  it('should render quantity 3', () => {
    setUp([{ _id: '1' }, { _id: '2' }, { _id: '3' }]);
    expect(screen.getByTestId('CartLink-quantity')).toHaveTextContent('3');
  });

  it('should call push after clicking cart link', () => {
    const pushFn = jest.fn();
    setUp([], pushFn);
    fireEvent.click(screen.getByTestId('CartLink'));
    testRouterPushCall(pushFn, 0, '/cart');
  });
});
