import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import NumberInput from './NumberInput';
import { checkProps } from '../../../shared/testUtility/testUtility';

const defaultProps = {
  name: 'testName',
  changed: jest.fn(),
};

const setUp = (props) => {
  return render(
    <ThemeProvider theme={theme}>
      <NumberInput {...props} />
    </ThemeProvider>,
  );
};

afterEach(cleanup);

describe('<NumberInput />', () => {
  describe('check prop types', () => {
    it('should NOT throw a warning', () => {
      expect(checkProps(NumberInput, defaultProps)).toBeUndefined();
    });
    it('should throw a warning', () => {
      expect(checkProps(NumberInput, {})).not.toBe(null);
    });
  });

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
