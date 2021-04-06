import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ProgressBar from './ProgressBar';
import { checkProps } from '../../../../shared/testUtility/testUtility';
import theme from '../../../../styled/theme';

const setUp = (currentStep = 1, stepsNumber = 3) => {
  return render(
    <ThemeProvider theme={theme}>
      <ProgressBar currentStep={currentStep} stepsNumber={stepsNumber} />
    </ThemeProvider>,
  );
};

afterEach(cleanup);

describe('<ProgressBar />', () => {
  describe('check prop types', () => {
    it('should NOT throw a warning', () => {
      const props = {
        currentStep: 1,
        stepsNumber: 3,
      };
      expect(checkProps(ProgressBar, props)).toBeUndefined();
    });

    it('should throw a warning', () => {
      expect(checkProps(ProgressBar, {})).not.toBe(null);
    });
  });

  describe('check how renders', () => {
    it('should render everything correctly for currentStep 1 and stepsNumber 3', () => {
      const { asFragment } = setUp();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render everything correctly for currentStep 2 and stepsNumber 3', () => {
      const { asFragment } = setUp(2);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render everything correctly for currentStep 3 and stepsNumber 3', () => {
      const { asFragment } = setUp(3);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
