import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button, { ButtonProps } from './Button';
import { renderAppPart } from '../../../shared/testUtility/testUtility';

const setUp = (props: ButtonProps = {}) => {
  return renderAppPart(<Button {...props}>test</Button>, {
    withoutRouter: true,
  });
};

describe('<Button />', () => {
  describe('check how renders', () => {
    it('should render without <LoadingOverlay />', () => {
      setUp();
      expect(screen.queryByTestId('LoadingOverlay')).not.toBeInTheDocument();
    });

    it('should render with <LoadingOverlay />', () => {
      const props = {
        isLoading: true,
      };
      setUp(props);
      expect(screen.getByTestId('LoadingOverlay')).toBeInTheDocument();
    });

    it('should button be disabled if disabled is true', () => {
      const props = {
        disabled: true,
      };
      setUp(props);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should button be disabled if isLoading is true', () => {
      const props = {
        isLoading: true,
      };
      setUp(props);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  it('should call clicked after clicking', () => {
    const clickedFn = jest.fn();
    const props = {
      clicked: clickedFn,
    };
    setUp(props);

    fireEvent.click(screen.getByRole('button'));
    expect(clickedFn).toHaveBeenCalledTimes(1);
  });
});
