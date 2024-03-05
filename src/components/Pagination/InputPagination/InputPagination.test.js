import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputPagination from './InputPagination';
import {
  createPaginationProps,
  renderAppPart,
  testRouterPushCall,
} from '../../../shared/testUtility/testUtility';
import { defaultAppPath } from '../../../shared/constants';
import useLastLocation from '../../../shared/hooks/useLastLocation';

const defaultProps = createPaginationProps();

const setUp = (props = {}, pageNumber = 1, pushFn = jest.fn()) => {
  return renderAppPart(<InputPagination {...props} />, {
    pathname: '/products',
    search: `?p=${pageNumber}`,
    push: pushFn,
  });
};

jest.mock('../../../shared/hooks/useLastLocation', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseNavigateFn = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigateFn,
}));

describe('<InputPagination />', () => {
  describe('check how renders', () => {
    it('should render all correctly (without hide-arrow class on arrows)', () => {
      setUp(defaultProps, 2);
      expect(screen.getByTestId('NumberInput-page')).toHaveValue(2);
      expect(screen.getByTestId('InputPagination-number-of-pages')).toHaveTextContent('3');
      expect(screen.getByTestId('InputPagination-left-arrow')).not.toHaveClass('hide-arrow');
      expect(screen.getByTestId('InputPagination-right-arrow')).not.toHaveClass('hide-arrow');
    });

    it('should only left arrow has hide-arrow class', () => {
      setUp(defaultProps);
      expect(screen.getByTestId('InputPagination-left-arrow')).toHaveClass('hide-arrow');
      expect(screen.getByTestId('InputPagination-right-arrow')).not.toHaveClass('hide-arrow');
    });

    it('should only right arrow has hide-arrow class', () => {
      setUp(defaultProps, 3);
      expect(screen.getByTestId('InputPagination-left-arrow')).not.toHaveClass('hide-arrow');
      expect(screen.getByTestId('InputPagination-right-arrow')).toHaveClass('hide-arrow');
    });

    it('should both arrows have hide-arrow class', () => {
      const props = createPaginationProps(2);
      setUp(props);
      expect(screen.getByTestId('InputPagination-left-arrow')).toHaveClass('hide-arrow');
      expect(screen.getByTestId('InputPagination-right-arrow')).toHaveClass('hide-arrow');
    });
  });

  describe('check behaviour of arrows', () => {
    it('should react to right arrow click (p is 1, quantity is 5, per page is 2)', () => {
      const pushFn = jest.fn();
      setUp(defaultProps, 1, pushFn);
      fireEvent.click(screen.getByTestId('InputPagination-right-arrow'));
      testRouterPushCall(pushFn, 0, '/products', '?p=2');
    });

    it('should react to left arrow click (p is 3, quantity is 5, per page is 2)', () => {
      const pushFn = jest.fn();
      setUp(defaultProps, 3, pushFn);
      fireEvent.click(screen.getByTestId('InputPagination-left-arrow'));
      testRouterPushCall(pushFn, 0, '/products', '?p=2');
    });

    it('should react to both arrows clicks (p is 2, quantity is 5, per page is 2)', () => {
      const pushFn = jest.fn();
      setUp(defaultProps, 2, pushFn);

      fireEvent.click(screen.getByTestId('InputPagination-left-arrow'));
      testRouterPushCall(pushFn, 0, '/products', '?p=1');

      fireEvent.click(screen.getByTestId('InputPagination-right-arrow'));
      testRouterPushCall(pushFn, 1, '/products', '?p=3');
    });
  });

  describe('check behaviour of input', () => {
    it('should go to second page after input number 2 and submit form', async () => {
      const { container } = setUp(defaultProps);
      const input = screen.getByRole('spinbutton');

      fireEvent.input(input, { target: { value: 2 } });
      expect(input.value).toEqual('2');

      fireEvent.submit(container.querySelector('form'));
      expect(mockedUseNavigateFn).toHaveBeenCalledWith('/products?p=2');
    });

    it('should go to second page after input number 2 and click enter (submit input)', () => {
      setUp(defaultProps);
      const input = screen.getByRole('spinbutton');

      fireEvent.input(input, { target: { value: 2 } });
      expect(input.value).toEqual('2');

      fireEvent.submit(input);
      expect(mockedUseNavigateFn).toHaveBeenCalledWith('/products?p=2');
    });

    it('should NOT change value to `e E - .`', () => {
      setUp(defaultProps);
      const input = screen.getByRole('spinbutton');

      fireEvent.input(input, { target: { value: 'e' } });
      expect(input.value).toEqual('');
      fireEvent.input(input, { target: { value: 'E' } });
      expect(input.value).toEqual('');
      fireEvent.input(input, { target: { value: '-' } });
      expect(input.value).toEqual('');
      fireEvent.input(input, { target: { value: '.' } });
      expect(input.value).toEqual('');
    });
  });

  describe('check useEffect()', () => {
    beforeEach(() => {
      useLastLocation.mockImplementation(() => ({
        pathname: '/products',
        search: '?p=3',
      }));
    });

    it('should NOT go back nor replace url if given page number is correct', () => {
      setUp(defaultProps, 2);
      expect(mockedUseNavigateFn).not.toHaveBeenCalled();
    });

    it('should replace url if given page number is lower than 1', () => {
      setUp(defaultProps, 0);
      expect(mockedUseNavigateFn).toHaveBeenCalledWith(defaultAppPath, { replace: true });
    });

    it('should replace url if given page number is falsy after parsing to number', () => {
      setUp(defaultProps, 'invalid');
      expect(mockedUseNavigateFn).toHaveBeenCalledWith(defaultAppPath, { replace: true });
    });

    it('should replace url if page number is not given', () => {
      setUp(defaultProps, '');
      expect(mockedUseNavigateFn).toHaveBeenCalledWith(defaultAppPath, { replace: true });
    });

    it('should navigate back if given page number is higher than number of pages and previous path is the same as next path', () => {
      setUp(defaultProps, 4);
      expect(mockedUseNavigateFn).toHaveBeenCalledWith(-1);
    });

    it('should replace url with last page if given page number is higher than number of pages', () => {
      useLastLocation.mockImplementation(() => ({
        pathname: '/products',
        search: '?p=2',
      }));
      setUp(defaultProps, 4);
      expect(mockedUseNavigateFn).toHaveBeenCalledWith('/products?p=3', { replace: true });
    });

    it('should navigate back if previous path is the same as current path', () => {
      useLastLocation.mockImplementation(() => ({
        pathname: '/products',
        search: '?p=4',
      }));

      setUp(defaultProps, 4);
      expect(mockedUseNavigateFn).toHaveBeenCalledWith(-1);
      expect(mockedUseNavigateFn).toHaveBeenCalledTimes(1);
    });

    it('should navigate back if previous path is the same as next path', () => {
      setUp(defaultProps, 4);
      expect(mockedUseNavigateFn).toHaveBeenCalledWith(-1);
      expect(mockedUseNavigateFn).toHaveBeenCalledTimes(1);
    });
  });
});
