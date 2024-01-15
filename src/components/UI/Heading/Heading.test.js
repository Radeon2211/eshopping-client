import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Heading from './Heading';
import { renderAppPart } from '../../../shared/testUtility/testUtility';

const setUp = (text, props = {}) => {
  return renderAppPart(<Heading {...props}>{text}</Heading>, {
    withoutRouter: true,
  });
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
