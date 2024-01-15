import React from 'react';
import { screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingOverlay from './LoadingOverlay';
import { renderAppPart } from '../../../shared/testUtility/testUtility';

const setUp = (disableText = false) => {
  return renderAppPart(<LoadingOverlay disableText={disableText} />, {
    withoutRouter: true,
  });
};

describe('<LoadingOverlay />', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('check how renders', () => {
    it('should render without info', () => {
      setUp();
      expect(screen.getByTestId('LoadingOverlay')).toBeInTheDocument();
    });

    it('should render info after 8 seconds', () => {
      setUp();
      expect(screen.queryByTestId('LoadingOverlay-info')).not.toBeInTheDocument();
      act(() => {
        jest.advanceTimersByTime(8000);
      });
      expect(screen.getByTestId('LoadingOverlay-info')).toBeInTheDocument();
    });

    it('should NOT render info after 7999ms', () => {
      setUp();
      act(() => {
        jest.advanceTimersByTime(7999);
      });
      expect(screen.queryByTestId('LoadingOverlay-info')).not.toBeInTheDocument();
    });

    it('should NOT render info after 8 seconds if disableText is true', () => {
      setUp(true);
      act(() => {
        jest.advanceTimersByTime(8000);
      });
      expect(screen.queryByTestId('LoadingOverlay-info')).not.toBeInTheDocument();
    });
  });
});
