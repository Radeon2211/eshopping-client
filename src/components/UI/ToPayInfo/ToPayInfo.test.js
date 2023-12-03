import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import ToPayInfo from './ToPayInfo';
import { checkProps } from '../../../shared/testUtility/testUtility';
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
  describe('check prop types', () => {
    it('should NOT throw a warning', () => {
      expect(checkProps(ToPayInfo, { value: 35 })).toBeUndefined();
    });

    it('should throw a warning', () => {
      expect(checkProps(ToPayInfo, {})).not.toBe(null);
    });
  });

  it('should render everything correctly', () => {
    setUp(1195.2);
    expect(screen.getByTestId('ToPayInfo')).toHaveTextContent('To pay');
    expect(screen.getByTestId('ToPayInfo')).toHaveTextContent('$1,195.20');
  });
});
