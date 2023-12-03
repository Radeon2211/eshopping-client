import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import InputPagination from './InputPagination';
import {
  checkProps,
  createHistoryPageNumber,
  createPaginationProps,
} from '../../../shared/testUtility/testUtility';
import { defaultAppPath } from '../../../shared/constants';

const defaultProps = createPaginationProps();

const setUp = (props = {}, history) => {
  return render(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <InputPagination {...props} />
      </ThemeProvider>
    </Router>,
  );
};

jest.mock('react-router-last-location', () => ({
  useLastLocation: jest.fn(),
}));

afterEach(cleanup);

describe('<InputPagination />', () => {
  describe('check prop types', () => {
    it('should NOT throw a warning', () => {
      expect(checkProps(InputPagination, defaultProps)).toBeUndefined();
    });
    it('should throw a warning', () => {
      expect(checkProps(InputPagination, {})).not.toBe(null);
    });
  });

  describe('check how renders', () => {
    it('should render all correctly (without hide-arrow class on arrows)', () => {
      const history = createHistoryPageNumber(2);
      setUp(defaultProps, history);
      expect(screen.getByTestId('NumberInput-page')).toHaveValue(2);
      expect(screen.getByTestId('InputPagination-number-of-pages')).toHaveTextContent('3');
      expect(screen.getByTestId('InputPagination-left-arrow')).not.toHaveClass('hide-arrow');
      expect(screen.getByTestId('InputPagination-right-arrow')).not.toHaveClass('hide-arrow');
    });

    it('should only left arrow has hide-arrow class', () => {
      const history = createHistoryPageNumber(1);
      setUp(defaultProps, history);
      expect(screen.getByTestId('InputPagination-left-arrow')).toHaveClass('hide-arrow');
      expect(screen.getByTestId('InputPagination-right-arrow')).not.toHaveClass('hide-arrow');
    });

    it('should only right arrow has hide-arrow class', () => {
      const history = createHistoryPageNumber(3);
      setUp(defaultProps, history);
      expect(screen.getByTestId('InputPagination-left-arrow')).not.toHaveClass('hide-arrow');
      expect(screen.getByTestId('InputPagination-right-arrow')).toHaveClass('hide-arrow');
    });

    it('should both arrows have hide-arrow class', () => {
      const history = createHistoryPageNumber(1);
      const props = createPaginationProps(2);
      setUp(props, history);
      expect(screen.getByTestId('InputPagination-left-arrow')).toHaveClass('hide-arrow');
      expect(screen.getByTestId('InputPagination-right-arrow')).toHaveClass('hide-arrow');
    });
  });

  describe('check behaviour of arrows', () => {
    it('should react to right arrow click (p is 1, quantity is 5, per page is 2)', () => {
      const history = createHistoryPageNumber(1);

      setUp(defaultProps, history);

      fireEvent.click(screen.getByTestId('InputPagination-right-arrow'));
      expect(history.push).toHaveBeenCalledWith('/products?p=2');
    });

    it('should react to left arrow click (p is 3, quantity is 5, per page is 2)', () => {
      const history = createHistoryPageNumber(3);

      setUp(defaultProps, history);

      fireEvent.click(screen.getByTestId('InputPagination-left-arrow'));
      expect(history.push).toHaveBeenCalledWith('/products?p=2');
    });

    it('should react to both arrows clicks (p is 2, quantity is 5, per page is 2)', () => {
      const history = createHistoryPageNumber(2);

      setUp(defaultProps, history);

      fireEvent.click(screen.getByTestId('InputPagination-left-arrow'));
      expect(history.push).toHaveBeenCalledWith('/products?p=1');

      fireEvent.click(screen.getByTestId('InputPagination-right-arrow'));
      expect(history.push).toHaveBeenLastCalledWith('/products?p=3');
    });
  });

  describe('check behaviour of input', () => {
    it('should go to second page after input number 2 and submit form', () => {
      const history = createHistoryPageNumber(1);

      const { container } = setUp(defaultProps, history);
      const input = screen.getByRole('spinbutton');

      fireEvent.input(input, { target: { value: 2 } });
      expect(input.value).toEqual('2');

      fireEvent.submit(container.querySelector('form'));
      expect(history.push).toHaveBeenCalledWith('/products?p=2');
    });

    it('should go to second page after input number 2 and click enter (submit input)', () => {
      const history = createHistoryPageNumber(1);

      setUp(defaultProps, history);
      const input = screen.getByRole('spinbutton');

      fireEvent.input(input, { target: { value: 2 } });
      expect(input.value).toEqual('2');

      fireEvent.submit(input);
      expect(history.push).toHaveBeenCalledWith('/products?p=2');
    });

    it('should NOT change value to `e E - .`', () => {
      const history = createHistoryPageNumber(1);

      setUp(defaultProps, history);
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

    it('should NOT call goBack nor replace if given page number is correct', () => {
      const history = createHistoryPageNumber(2);
      setUp(defaultProps, history);
      expect(history.goBack).not.toHaveBeenCalled();
      expect(history.replace).not.toHaveBeenCalled();
    });

    it('should call replace if given page number is lower than 1', () => {
      const history = createHistoryPageNumber(0);
      setUp(defaultProps, history);
      expect(history.goBack).not.toHaveBeenCalled();
      expect(history.replace).toHaveBeenCalledWith(defaultAppPath);
    });

    it('should call replace if given page number is falsy after parsing to number', () => {
      const history = createHistoryPageNumber('invalid');
      setUp(defaultProps, history);
      expect(history.goBack).not.toHaveBeenCalled();
      expect(history.replace).toHaveBeenCalledWith(defaultAppPath);
    });

    it('should call replace if given page number is not given', () => {
      const history = createHistoryPageNumber('');
      setUp(defaultProps, history);
      expect(history.goBack).not.toHaveBeenCalled();
      expect(history.replace).toHaveBeenCalledWith(defaultAppPath);
    });

    it('should call replace if given page number is higher than number of pages', () => {
      const history = createHistoryPageNumber(4);
      setUp(defaultProps, history);
      expect(history.goBack).not.toHaveBeenCalled();
      expect(history.replace).toHaveBeenCalledWith('/products?p=3');
    });

    it('should call goBack if previous path is the same as current path and history length is greater than 2', () => {
      useLastLocation.mockImplementation(() => ({
        pathname: '/products',
        search: '?p=4',
      }));

      const history = createHistoryPageNumber(4, 3);
      setUp(defaultProps, history);
    });

    it('should call goBack if previous path is the same as next path and history length is greater than 2', () => {
      const history = createHistoryPageNumber(4, 3);
      setUp(defaultProps, history);
    });

    it('should NOT call goBack if previous path is the same as current path and history length is NOT greater than 2', () => {
      const history = createHistoryPageNumber(3, 2);
      setUp(defaultProps, history);
      expect(history.goBack).not.toHaveBeenCalled();
    });

    it('should NOT call goBack if previous path is the same as next path and history length is NOT greater than 2', () => {
      const history = createHistoryPageNumber(4, 2);
      setUp(defaultProps, history);
      expect(history.goBack).not.toHaveBeenCalled();
    });
  });
});
