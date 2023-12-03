import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import ProgressBar from './ProgressBar';
import { checkProps } from '../../../../shared/testUtility/testUtility';
import theme from '../../../../styled/theme';

const setUp = (currentStep, stepsNumber = 3) => {
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
      setUp(1);
      const hiddenNumbers = screen.queryAllByTestId('ProgressBar-step-box-number-hidden');
      const visibleNumbers = screen.getAllByTestId('ProgressBar-step-box-number-visible');
      expect(hiddenNumbers).toHaveLength(0);
      expect(visibleNumbers).toHaveLength(3);
      expect(visibleNumbers[0]).toHaveTextContent('1');
      expect(visibleNumbers[1]).toHaveTextContent('2');
      expect(visibleNumbers[2]).toHaveTextContent('3');
    });

    it('should render everything correctly for currentStep 2 and stepsNumber 3', () => {
      setUp(2);
      const hiddenNumbers = screen.getAllByTestId('ProgressBar-step-box-number-hidden');
      const visibleNumbers = screen.getAllByTestId('ProgressBar-step-box-number-visible');
      expect(hiddenNumbers).toHaveLength(1);
      expect(hiddenNumbers[0]).toHaveTextContent('1');
      expect(visibleNumbers).toHaveLength(2);
      expect(visibleNumbers[0]).toHaveTextContent('2');
      expect(visibleNumbers[1]).toHaveTextContent('3');
    });

    it('should render everything correctly for currentStep 3 and stepsNumber 3', () => {
      setUp(3);
      const hiddenNumbers = screen.getAllByTestId('ProgressBar-step-box-number-hidden');
      const visibleNumbers = screen.getAllByTestId('ProgressBar-step-box-number-visible');
      expect(hiddenNumbers).toHaveLength(2);
      expect(hiddenNumbers[0]).toHaveTextContent('1');
      expect(hiddenNumbers[1]).toHaveTextContent('2');
      expect(visibleNumbers).toHaveLength(1);
      expect(visibleNumbers[0]).toHaveTextContent('3');
    });
  });
});
