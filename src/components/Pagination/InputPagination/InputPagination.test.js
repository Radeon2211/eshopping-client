import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import InputPagination from './InputPagination';
import {
  checkProps,
  createHistoryPageNumber,
  createPaginationProps,
} from '../../../shared/testUtility';

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

afterEach(cleanup);

describe('<NumberPagination />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(InputPagination, defaultProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(InputPagination, {})).not.toBe(null);
    });
  });

  describe('Check how renders', () => {
    it('Should render all correctly (without hide-arrow class on arrows)', () => {
      const history = createHistoryPageNumber(2);
      const { asFragment } = setUp(defaultProps, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should only left arrow has hide-arrow class', () => {
      const history = createHistoryPageNumber(1);
      setUp(defaultProps, history);
      expect(screen.getByTestId('left-arrow').className.includes('hide-arrow')).toEqual(true);
      expect(screen.getByTestId('right-arrow').className.includes('hide-arrow')).toEqual(false);
    });

    it('Should only right arrow has hide-arrow class', () => {
      const history = createHistoryPageNumber(3);
      setUp(defaultProps, history);
      expect(screen.getByTestId('left-arrow').className.includes('hide-arrow')).toEqual(false);
      expect(screen.getByTestId('right-arrow').className.includes('hide-arrow')).toEqual(true);
    });

    it('Should both arrows have hide-arrow class', () => {
      const history = createHistoryPageNumber(1);
      const props = createPaginationProps(2);
      setUp(props, history);
      expect(screen.getByTestId('left-arrow').className.includes('hide-arrow')).toEqual(true);
      expect(screen.getByTestId('right-arrow').className.includes('hide-arrow')).toEqual(true);
    });
  });

  describe('Check behaviour of arrows', () => {
    it('Right arrow click (p is 1, quantity is 5, per page is 2)', () => {
      const pushFn = jest.fn();
      const history = createHistoryPageNumber(1, pushFn);

      const { getByTestId } = setUp(defaultProps, history);

      fireEvent.click(getByTestId('right-arrow'));
      expect(pushFn).toHaveBeenCalledTimes(1);
      expect(pushFn).toHaveBeenCalledWith('/products?p=2');
    });

    it('Left arrow click (p is 3, quantity is 5, per page is 2)', () => {
      const pushFn = jest.fn();
      const history = createHistoryPageNumber(3, pushFn);

      const { getByTestId } = setUp(defaultProps, history);

      fireEvent.click(getByTestId('left-arrow'));
      expect(pushFn).toHaveBeenCalledTimes(1);
      expect(pushFn).toHaveBeenCalledWith('/products?p=2');
    });

    it('Both arrows clicks (p is 2, quantity is 5, per page is 2)', () => {
      const pushFn = jest.fn();
      const history = createHistoryPageNumber(2, pushFn);

      const { getByTestId } = setUp(defaultProps, history);

      fireEvent.click(getByTestId('left-arrow'));
      expect(pushFn).toHaveBeenCalledWith('/products?p=1');
      fireEvent.click(getByTestId('right-arrow'));
      expect(pushFn).toHaveBeenLastCalledWith('/products?p=3');
      expect(pushFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('Check behaviour of input', () => {
    it('Should go to second page after input number 2 and submit form', () => {
      const pushFn = jest.fn();
      const history = createHistoryPageNumber(1, pushFn);

      const { container } = setUp(defaultProps, history);
      const input = screen.getByRole('spinbutton');

      fireEvent.input(input, { target: { value: 2 } });
      expect(input.value).toEqual('2');
      fireEvent.submit(container.querySelector('form'));
      expect(pushFn).toHaveBeenCalledTimes(1);
      expect(pushFn).toHaveBeenCalledWith('/products?p=2');
    });

    it('Should go to second page after input number 2 and click enter (submit input)', () => {
      const pushFn = jest.fn();
      const history = createHistoryPageNumber(1, pushFn);

      setUp(defaultProps, history);
      const input = screen.getByRole('spinbutton');

      fireEvent.input(input, { target: { value: 2 } });
      expect(input.value).toEqual('2');
      fireEvent.submit(input);
      expect(pushFn).toHaveBeenCalledTimes(1);
      expect(pushFn).toHaveBeenCalledWith('/products?p=2');
    });

    it('Should NOT change value to `e E - .`', () => {
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
});
