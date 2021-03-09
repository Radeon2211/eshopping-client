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
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('Should render correctly without info', () => {
    const { asFragment } = setUp();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render info after 8 seconds', () => {
    setUp();
    act(() => {
      jest.advanceTimersByTime(8000);
    });
    expect(screen.getByTestId('LoadingOverlay-info')).toBeInTheDocument();
  });

  it('Should NOT render info after 7 seconds', () => {
    setUp();
    act(() => {
      jest.advanceTimersByTime(7000);
    });
    expect(screen.queryByTestId('LoadingOverlay-info')).not.toBeInTheDocument();
  });

  it('Should NOT render info after 8 seconds if disableText is true', () => {
    setUp(true);
    act(() => {
      jest.advanceTimersByTime(8000);
    });
    expect(screen.queryByTestId('LoadingOverlay-info')).not.toBeInTheDocument();
  });
});
