import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import AboutWebsite from './AboutWebsite';
import theme from '../../../styled/theme';

const setUp = () => {
  return render(
    <ThemeProvider theme={theme}>
      <AboutWebsite />
    </ThemeProvider>,
  );
};

afterEach(cleanup);

describe('<AboutWebsite />', () => {
  it('should render everything correctly', () => {
    const { asFragment } = setUp();
    expect(asFragment()).toMatchSnapshot();
  });
});
