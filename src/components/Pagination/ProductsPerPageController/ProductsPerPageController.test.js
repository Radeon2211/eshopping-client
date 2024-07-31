import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import selectEvent from 'react-select-event';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ProductsPerPageController from './ProductsPerPageController';
import { productsPerPageControllerOptions } from '../../../shared/constants';
import * as actions from '../../../store/actions/indexActions';
import { renderAppPart } from '../../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});
store.dispatch = jest.fn();

const defaultLocation = {
  pathname: '/products',
  search: '?p=1',
};

const setUp = (quantityPerPage = 10) => {
  return renderAppPart(<ProductsPerPageController quantityPerPage={quantityPerPage} />, {
    pathname: defaultLocation.pathname,
    search: defaultLocation.search,
    store,
  });
};

jest.mock('../../../store/actions/indexActions.ts', () => ({
  changeProductsPerPage: (quantity, pathname, search, navigateFn) => ({
    quantity,
    pathname,
    search,
    navigateFn,
  }),
}));

const mockedUseNavigateFn = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigateFn,
}));

describe('<ProductsPerPageController />', () => {
  describe('check how renders', () => {
    it('should render everything correctly', () => {
      setUp();
      expect(screen.getByText(/10/i)).toBeInTheDocument();
    });
  });

  it('should render all options with default as 10', async () => {
    setUp(10);
    await selectEvent.openMenu(screen.getByText(/10/i));

    expect(screen.getByText(productsPerPageControllerOptions[0].label)).toBeInTheDocument();
    expect(screen.getByText(productsPerPageControllerOptions[1].label)).toBeInTheDocument();
    expect(screen.getByText(productsPerPageControllerOptions[2].label)).toBeInTheDocument();
    expect(screen.getByText(productsPerPageControllerOptions[3].label)).toBeInTheDocument();
    expect(screen.getByText(productsPerPageControllerOptions[4].label)).toBeInTheDocument();
    expect(screen.getAllByText(productsPerPageControllerOptions[5].label)).toHaveLength(2);
    expect(screen.getByText(productsPerPageControllerOptions[6].label)).toBeInTheDocument();
    expect(screen.getByText(productsPerPageControllerOptions[7].label)).toBeInTheDocument();
    expect(screen.getByText(productsPerPageControllerOptions[8].label)).toBeInTheDocument();
  });

  it('should change quantity to 15 and call changeProductsPerPage()', async () => {
    setUp(10);
    await selectEvent.openMenu(screen.getByText(/10/i));

    fireEvent.click(screen.getByText(/15/i));
    expect(store.dispatch).toHaveBeenCalledWith(
      actions.changeProductsPerPage(
        15,
        defaultLocation.pathname,
        defaultLocation.search,
        mockedUseNavigateFn,
      ),
    );

    await selectEvent.openMenu(screen.getByText(/15/i));
    expect(screen.getAllByText(/15/i)).toHaveLength(2);
  });

  it('should change quantity if clicked option has the same value as current', async () => {
    setUp(10);
    await selectEvent.openMenu(screen.getByText(/10/i));

    fireEvent.click(screen.getAllByText(/10/i)[1]);
    expect(store.dispatch).not.toHaveBeenCalled();

    await selectEvent.openMenu(screen.getByText(/10/i));
    expect(screen.getAllByText(/10/i)).toHaveLength(2);
  });
});
