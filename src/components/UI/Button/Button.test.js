import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import Button from './Button';

const setUp = (props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <Button {...props} />
    </ThemeProvider>,
  );
};

afterEach(cleanup);

describe('<Button />', () => {
  describe('check how renders', () => {
    it('should render without <LoadingOverlay />', () => {
      const props = {
        children: 'Test button',
      };
      setUp(props);
      expect(screen.queryByTestId('LoadingOverlay')).not.toBeInTheDocument();
    });

    it('should render with <LoadingOverlay />', () => {
      const props = {
        children: 'Test button',
        isLoading: true,
      };
      setUp(props);
      expect(screen.getByTestId('LoadingOverlay')).toBeInTheDocument();
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
