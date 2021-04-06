import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import Button from './Button';
import { checkProps } from '../../../shared/testUtility/testUtility';

const setUp = (props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <Button {...props} />
    </ThemeProvider>,
  );
};

afterEach(cleanup);

describe('<Button />', () => {
  describe('check prop types', () => {
    it('should NOT throw a warning', () => {
      expect(checkProps(Button, { children: 'Test button' })).toBeUndefined();
    });

    it('should throw a warning', () => {
      expect(checkProps(Button, {})).not.toBe(null);
    });
  });

  describe('check how renders', () => {
    it('should render without <LoadingOverlay />', () => {
      const props = {
        children: 'Test button',
      };
      const { asFragment } = setUp(props);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render with <LoadingOverlay />', () => {
      const props = {
        children: 'Test button',
        isLoading: true,
      };
      const { asFragment } = setUp(props);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should button be disabled if disabled is true', () => {
      const props = {
        children: 'Test button',
        disabled: true,
      };
      setUp(props);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should button be disabled if isLoading is true', () => {
      const props = {
        children: 'Test button',
        isLoading: true,
      };
      setUp(props);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  it('should call clicked after clicking', () => {
    const clickedFn = jest.fn();
    const props = {
      children: 'Test button',
      clicked: clickedFn,
    };
    setUp(props);

    fireEvent.click(screen.getByRole('button'));
    expect(clickedFn).toHaveBeenCalledTimes(1);
  });
});
