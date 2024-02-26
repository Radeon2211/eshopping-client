import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressBar from './ProgressBar';
import { renderAppPart } from '../../../../shared/testUtility/testUtility';

const setUp = (currentStep, stepsNumber = 3) => {
  return renderAppPart(<ProgressBar currentStep={currentStep} stepsNumber={stepsNumber} />, {
    withoutRouter: true,
  });
};

describe('<ProgressBar />', () => {
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
