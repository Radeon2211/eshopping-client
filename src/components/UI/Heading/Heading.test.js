import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import Heading from './Heading';

const setUp = (text, props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <Heading {...props}>{text}</Heading>
    </ThemeProvider>,
  );
};

describe('<Heading />', () => {
  it('should render h1 with correct text', () => {
    setUp('h1 heading', { $variant: 'h1' });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('h1 heading');
  });

  it('should render h2 with correct text', () => {
    setUp('h2 heading', { $variant: 'h2' });
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('h2 heading');
  });

  it('should render h3 with correct text', () => {
    setUp('h3 heading', { $variant: 'h3' });
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('h3 heading');
  });

  it('should render h4 with correct text', () => {
    setUp('h4 heading', { $variant: 'h4' });
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('h4 heading');
  });

  it('should render h5 with correct text', () => {
    setUp('h5 heading', { $variant: 'h5' });
    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent('h5 heading');
  });

  it('should render h6 with correct text', () => {
    setUp('h6 heading', { $variant: 'h6' });
    expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent('h6 heading');
  });
});
