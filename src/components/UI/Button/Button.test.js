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
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(Button, { children: 'Test button' })).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(Button, {})).not.toBe(null);
    });
  });

  describe('Check how renders', () => {
    it('Should render without <LoadingOverlay />', () => {
      const props = {
        children: 'Test button',
      };
      const { asFragment } = setUp(props);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render with <LoadingOverlay />', () => {
      const props = {
        children: 'Test button',
        isLoading: true,
      };
      const { asFragment } = setUp(props);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should button be disabled if disabled is true', () => {
      const props = {
        children: 'Test button',
        disabled: true,
      };
      setUp(props);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('Should button be disabled if isLoading is true', () => {
      const props = {
        children: 'Test button',
        isLoading: true,
      };
      setUp(props);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  it('Should call clicked after clicking', () => {
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
