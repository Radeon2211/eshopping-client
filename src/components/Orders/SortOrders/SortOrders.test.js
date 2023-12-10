import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import selectEvent from 'react-select-event';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import SortOrders from './SortOrders';
import theme from '../../../styled/theme';
import { sortOrdersOptions } from '../../../shared/constants';

const setUp = (replaceFn = jest.fn()) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/my-account/placed-orders', search: '?p=1' },
    replace: replaceFn,
  };

  return render(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <SortOrders />
      </ThemeProvider>
    </Router>,
  );
};

afterEach(cleanup);

describe('<SortOrders />', () => {
  it('should render all sorting options', async () => {
    setUp();
    await selectEvent.openMenu(screen.getByText(sortOrdersOptions[0].label));
    const firstOptionTexts = screen.getAllByText(sortOrdersOptions[0].label);
    expect(firstOptionTexts[0]).toBeInTheDocument();
    expect(firstOptionTexts[1]).toBeInTheDocument();
    expect(screen.getByText(sortOrdersOptions[1].label)).toBeInTheDocument();
    expect(screen.getByText(sortOrdersOptions[2].label)).toBeInTheDocument();
    expect(screen.getByText(sortOrdersOptions[3].label)).toBeInTheDocument();
  });

  it('should call replace with correct paths and params', async () => {
    const replaceFn = jest.fn();
    setUp(replaceFn);

    const defaultOption = screen.getByText(sortOrdersOptions[0].label);

    await selectEvent.openMenu(defaultOption);
    fireEvent.click(screen.getAllByText(sortOrdersOptions[0].label)[0]);
    expect(replaceFn).not.toHaveBeenCalled();

    await selectEvent.openMenu(defaultOption);
    fireEvent.click(screen.getAllByText(sortOrdersOptions[0].label)[1]);
    expect(replaceFn).not.toHaveBeenCalled();

    await selectEvent.openMenu(defaultOption);
    fireEvent.click(screen.getByText(sortOrdersOptions[1].label));
    expect(replaceFn).toHaveBeenCalledWith('/my-account/placed-orders?p=1&sortBy=createdAt%3Aasc');

    await selectEvent.openMenu(defaultOption);
    fireEvent.click(screen.getByText(sortOrdersOptions[0].label));
    expect(replaceFn).toHaveBeenLastCalledWith(
      '/my-account/placed-orders?p=1&sortBy=createdAt%3Adesc',
    );

    await selectEvent.openMenu(defaultOption);
    fireEvent.click(screen.getByText(sortOrdersOptions[2].label));
    expect(replaceFn).toHaveBeenLastCalledWith(
      '/my-account/placed-orders?p=1&sortBy=overallPrice%3Aasc',
    );

    await selectEvent.openMenu(defaultOption);
    fireEvent.click(screen.getByText(sortOrdersOptions[3].label));
    expect(replaceFn).toHaveBeenLastCalledWith(
      '/my-account/placed-orders?p=1&sortBy=overallPrice%3Adesc',
    );

    expect(replaceFn).toHaveBeenCalledTimes(4);
  });
});
