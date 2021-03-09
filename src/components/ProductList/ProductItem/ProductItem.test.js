import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import theme from '../../../styled/theme';
import ProductItem from './ProductItem';
import { checkProps, createProductListItem } from '../../../shared/testUtility';

const setUp = (data, pushFn = jest.fn()) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products', search: '?p=1' },
    push: pushFn,
  };

  return render(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <ProductItem data={data} />
      </ThemeProvider>
    </Router>,
  );
};

afterEach(cleanup);

describe('<ProductItem />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(ProductItem, { data: createProductListItem() })).toBeUndefined();
    });
    it('Should throw a warning', () => {
      const expectedProps = {};
      expect(checkProps(ProductItem, expectedProps)).not.toBeNull();
    });
  });

  describe('Check how renders', () => {
    it('Should render everything correctly', () => {
      const data = createProductListItem(
        'p1',
        'user1',
        4,
        10.6,
        'product1',
        true,
        5,
        2,
        'description',
        'new',
      );
      const { asFragment } = setUp(data);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should NOT render buyer quantity, condition and should render default photo, price without decimals', () => {
      const data = createProductListItem(
        'p1',
        'user1',
        4,
        10,
        'product1',
        false,
        0,
        0,
        'description',
        'not_applicable',
      );
      const { asFragment } = setUp(data);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('Should push correct path after clicking at wrapper', () => {
    const pushFn = jest.fn();
    const data = createProductListItem('p1');
    setUp(data, pushFn);

    fireEvent.click(screen.getByTestId('ProductItem'));
    expect(pushFn).toHaveBeenCalledWith('/product/p1');
    expect(pushFn).toHaveBeenCalledTimes(1);
  });
});
