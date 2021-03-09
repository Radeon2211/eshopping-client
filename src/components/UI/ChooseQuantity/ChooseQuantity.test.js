import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import ChooseQuantity from './ChooseQuantity';
import { checkProps } from '../../../shared/testUtility';
import theme from '../../../styled/theme';

const defaultProps = {
  name: 'quantity',
  value: 1,
  maxQuantity: 5,
  incremented: jest.fn(),
  decremented: jest.fn(),
  changed: jest.fn(),
  blured: jest.fn(),
};

const setUp = (props = {}) => {
  const finalProps = props
    ? {
        ...defaultProps,
        ...props,
      }
    : defaultProps;

  return render(
    <ThemeProvider theme={theme}>
      <ChooseQuantity {...finalProps} />
    </ThemeProvider>,
  );
};

afterEach(cleanup);

describe('<ChooseQuantity />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(ChooseQuantity, defaultProps)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(ChooseQuantity, {})).not.toBe(null);
    });
  });

  describe('Check how renders', () => {
    it('Should render everything correctly', () => {
      const { asFragment } = setUp();
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should minus button be disabled but plus button NOT', () => {
      setUp();

      expect(screen.getByTestId('ChooseQuantity-minus-icon')).toHaveAttribute(
        'color',
        theme.colors.light2,
      );
      expect(screen.getByTestId('ChooseQuantity-plus-icon')).toHaveAttribute('color', '');

      expect(screen.getByTestId('ChooseQuantity-minus-btn')).toBeDisabled();
      expect(screen.getByTestId('ChooseQuantity-plus-btn')).not.toBeDisabled();
    });

    it('Should minus button NOT be disabled but plus button yes', () => {
      const props = {
        value: 5,
      };
      setUp(props);

      expect(screen.getByTestId('ChooseQuantity-minus-icon')).toHaveAttribute('color', '');
      expect(screen.getByTestId('ChooseQuantity-plus-icon')).toHaveAttribute(
        'color',
        theme.colors.light2,
      );

      expect(screen.getByTestId('ChooseQuantity-minus-btn')).not.toBeDisabled();
      expect(screen.getByTestId('ChooseQuantity-plus-btn')).toBeDisabled();
    });

    it('Should both buttons NOT be disabled', () => {
      const props = {
        value: 2,
      };
      setUp(props);

      expect(screen.getByTestId('ChooseQuantity-minus-icon')).toHaveAttribute('color', '');
      expect(screen.getByTestId('ChooseQuantity-plus-icon')).toHaveAttribute('color', '');

      expect(screen.getByTestId('ChooseQuantity-minus-btn')).not.toBeDisabled();
      expect(screen.getByTestId('ChooseQuantity-plus-btn')).not.toBeDisabled();
    });
  });

  describe('Check behaviour', () => {
    it('Should call changed', () => {
      const changedFn = jest.fn();
      const props = {
        changed: changedFn,
      };
      setUp(props);

      fireEvent.input(screen.getByTestId('NumberInput-quantity'), { target: { value: 5 } });
      expect(changedFn).toHaveBeenCalledTimes(1);
    });

    it('Should call incremented', () => {
      const incrementedFn = jest.fn();
      const props = {
        incremented: incrementedFn,
      };
      setUp(props);

      fireEvent.click(screen.getByTestId('ChooseQuantity-plus-btn'));
      expect(incrementedFn).toHaveBeenCalledTimes(1);
    });

    it('Should NOT call incremented if plus button is disabled', () => {
      const incrementedFn = jest.fn();
      const props = {
        value: 5,
        incremented: incrementedFn,
      };
      setUp(props);

      fireEvent.click(screen.getByTestId('ChooseQuantity-plus-btn'));
      expect(incrementedFn).not.toHaveBeenCalled();
    });

    it('Should call decremented', () => {
      const decrementedFn = jest.fn();
      const props = {
        decremented: decrementedFn,
        value: 2,
      };
      setUp(props);

      fireEvent.click(screen.getByTestId('ChooseQuantity-minus-btn'));
      expect(decrementedFn).toHaveBeenCalledTimes(1);
    });

    it('Should NOT call decremented if minus button is disabled', () => {
      const decrementedFn = jest.fn();
      const props = {
        decremented: decrementedFn,
      };
      setUp(props);

      fireEvent.click(screen.getByTestId('ChooseQuantity-minus-btn'));
      expect(decrementedFn).not.toHaveBeenCalled();
    });

    it('Should call blured and focused', () => {
      const bluredFn = jest.fn();
      const focusedFn = jest.fn();
      const props = {
        blured: bluredFn,
        focused: focusedFn,
      };
      setUp(props);

      const input = screen.getByTestId('NumberInput-quantity');
      fireEvent.focus(input);
      expect(focusedFn).toHaveBeenCalledTimes(1);
      fireEvent.blur(input);
      expect(bluredFn).toHaveBeenCalledTimes(1);
    });
  });
});
