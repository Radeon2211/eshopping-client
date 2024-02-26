import { fireEvent, screen } from '@testing-library/react';
import NumberInput from './NumberInput';
import { renderAppPart } from '../../../shared/testUtility/testUtility';

const defaultProps = {
  name: 'testName',
  changed: jest.fn(),
};

const setUp = (props) => {
  return renderAppPart(<NumberInput {...props} />, {
    withoutRouter: true,
  });
};

describe('<NumberInput />', () => {
  describe('check behaviour', () => {
    it('should fire off functions from props', () => {
      const changedFn = jest.fn();
      const focusedFn = jest.fn();
      const bluredFn = jest.fn();
      const props = {
        ...defaultProps,
        changed: changedFn,
        focused: focusedFn,
        blured: bluredFn,
      };

      setUp(props);
      const input = screen.getByRole('spinbutton');

      fireEvent.input(input, { target: { value: 5 } });
      expect(document.activeElement).not.toEqual(input);
      input.focus();
      expect(document.activeElement).toEqual(input);
      input.blur();
      expect(document.activeElement).not.toEqual(input);
      expect(changedFn).toHaveBeenCalledTimes(1);
      expect(bluredFn).toHaveBeenCalledTimes(1);
      expect(focusedFn).toHaveBeenCalledTimes(1);
    });
  });
});
