import React from 'react';
import { render, cleanup, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import LoadingOverlay from './LoadingOverlay';

const setUp = (disableText = false) => {
  return render(
    <ThemeProvider theme={theme}>
      <LoadingOverlay disableText={disableText} />
    </ThemeProvider>,
  );
};

afterEach(cleanup);

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
