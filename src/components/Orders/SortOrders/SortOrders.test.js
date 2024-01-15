import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import selectEvent from 'react-select-event';
import SortOrders from './SortOrders';
import { sortOrdersOptions } from '../../../shared/constants';
import { renderAppPart } from '../../../shared/testUtility/testUtility';

const setUp = () => {
  return renderAppPart(<SortOrders />, {
    pathname: '/my-account/placed-orders',
    search: '?p=1',
  });
};

const mockedUseNavigateFn = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigateFn,
}));

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
    setUp();

    const defaultOption = screen.getByText(sortOrdersOptions[0].label);

    await selectEvent.openMenu(defaultOption);
    fireEvent.click(screen.getAllByText(sortOrdersOptions[0].label)[0]);
    expect(mockedUseNavigateFn).not.toHaveBeenCalled();

    await selectEvent.openMenu(defaultOption);
    fireEvent.click(screen.getAllByText(sortOrdersOptions[0].label)[1]);
    expect(mockedUseNavigateFn).not.toHaveBeenCalled();

    await selectEvent.openMenu(defaultOption);
    fireEvent.click(screen.getByText(sortOrdersOptions[1].label));
    expect(mockedUseNavigateFn).toHaveBeenCalledWith(
      '/my-account/placed-orders?p=1&sortBy=createdAt%3Aasc',
      { replace: true },
    );

    await selectEvent.openMenu(defaultOption);
    fireEvent.click(screen.getByText(sortOrdersOptions[0].label));
    expect(mockedUseNavigateFn).toHaveBeenLastCalledWith(
      '/my-account/placed-orders?p=1&sortBy=createdAt%3Adesc',
      { replace: true },
    );

    await selectEvent.openMenu(defaultOption);
    fireEvent.click(screen.getByText(sortOrdersOptions[2].label));
    expect(mockedUseNavigateFn).toHaveBeenLastCalledWith(
      '/my-account/placed-orders?p=1&sortBy=overallPrice%3Aasc',
      { replace: true },
    );

    await selectEvent.openMenu(defaultOption);
    fireEvent.click(screen.getByText(sortOrdersOptions[3].label));
    expect(mockedUseNavigateFn).toHaveBeenLastCalledWith(
      '/my-account/placed-orders?p=1&sortBy=overallPrice%3Adesc',
      { replace: true },
    );

    expect(mockedUseNavigateFn).toHaveBeenCalledTimes(4);
  });
});
