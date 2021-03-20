import React from 'react';
import { render, cleanup } from '@testing-library/react';
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
    const { asFragment } = setUp('center');
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render without wrapper', () => {
    const { asFragment } = setUp();
    expect(asFragment()).toMatchSnapshot();
  });
});
