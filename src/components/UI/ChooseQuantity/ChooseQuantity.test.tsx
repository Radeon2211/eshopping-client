import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChooseQuantity, { ChooseQuantityProps } from './ChooseQuantity';
import { renderAppPart } from '../../../shared/testUtility/testUtility';

const defaultProps: ChooseQuantityProps = {
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

  return renderAppPart(<ChooseQuantity {...finalProps} />, {
    withoutRouter: true,
  });
};

describe('<ChooseQuantity />', () => {
  describe('check how renders', () => {
    it('should minus button be disabled but plus button NOT', () => {
      setUp();
      expect(screen.getByTestId('ChooseQuantity-minus-btn')).toBeDisabled();
      expect(screen.getByTestId('ChooseQuantity-plus-btn')).not.toBeDisabled();
    });

    it('should minus button NOT be disabled but plus button yes', () => {
      const props = {
        value: 5,
      };
      setUp(props);

      expect(screen.getByTestId('ChooseQuantity-minus-btn')).not.toBeDisabled();
      expect(screen.getByTestId('ChooseQuantity-plus-btn')).toBeDisabled();
    });

    it('should both buttons NOT be disabled', () => {
      const props = {
        value: 2,
      };
      setUp(props);

      expect(screen.getByTestId('ChooseQuantity-minus-btn')).not.toBeDisabled();
      expect(screen.getByTestId('ChooseQuantity-plus-btn')).not.toBeDisabled();
    });
  });

  describe('check behaviour', () => {
    it('should call changed', () => {
      const changedFn = jest.fn();
      const props = {
        changed: changedFn,
      };
      setUp(props);

      fireEvent.input(screen.getByTestId('NumberInput-quantity'), { target: { value: 5 } });
      expect(changedFn).toHaveBeenCalledTimes(1);
    });

    it('should call incremented', () => {
      const incrementedFn = jest.fn();
      const props = {
        incremented: incrementedFn,
      };
      setUp(props);

      fireEvent.click(screen.getByTestId('ChooseQuantity-plus-btn'));
      expect(incrementedFn).toHaveBeenCalledTimes(1);
    });

    it('should NOT call incremented if plus button is disabled', () => {
      const incrementedFn = jest.fn();
      const props = {
        value: 5,
        incremented: incrementedFn,
      };
      setUp(props);

      fireEvent.click(screen.getByTestId('ChooseQuantity-plus-btn'));
      expect(incrementedFn).not.toHaveBeenCalled();
    });

    it('should call decremented', () => {
      const decrementedFn = jest.fn();
      const props = {
        decremented: decrementedFn,
        value: 2,
      };
      setUp(props);

      fireEvent.click(screen.getByTestId('ChooseQuantity-minus-btn'));
      expect(decrementedFn).toHaveBeenCalledTimes(1);
    });

    it('should NOT call decremented if minus button is disabled', () => {
      const decrementedFn = jest.fn();
      const props = {
        decremented: decrementedFn,
      };
      setUp(props);

      fireEvent.click(screen.getByTestId('ChooseQuantity-minus-btn'));
      expect(decrementedFn).not.toHaveBeenCalled();
    });

    it('should call blured and focused', () => {
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
