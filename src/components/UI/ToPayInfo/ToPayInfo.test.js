import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import ToPayInfo from './ToPayInfo';
import theme from '../../../styled/theme';

const setUp = (value) => {
  return render(
    <ThemeProvider theme={theme}>
      <ToPayInfo value={value} />
    </ThemeProvider>,
  );
};

afterEach(cleanup);

describe('<ToPayInfo />', () => {
  it('should render everything correctly', () => {
    setUp(1195.2);
    expect(screen.getByTestId('ToPayInfo')).toHaveTextContent('To pay');
    expect(screen.getByTestId('ToPayInfo')).toHaveTextContent('$1,195.20');
  });
});
