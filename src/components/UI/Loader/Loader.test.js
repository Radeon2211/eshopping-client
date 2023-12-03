import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import Loader from './Loader';

const setUp = (align = '') => {
  return render(
    <ThemeProvider theme={theme}>
      <Loader align={align} />
    </ThemeProvider>,
  );
};

afterEach(cleanup);

describe('<Loader />', () => {
  it('should render with wrapper', () => {
    setUp('center');
    expect(screen.getByTestId('LoaderWrapper')).toBeInTheDocument();
    expect(screen.getByTestId('Loader')).toBeInTheDocument();
  });

  it('should render without wrapper', () => {
    setUp();
    expect(screen.queryByTestId('LoaderWrapper')).not.toBeInTheDocument();
    expect(screen.getByTestId('Loader')).toBeInTheDocument();
  });
});
