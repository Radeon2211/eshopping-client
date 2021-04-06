import React from 'react';
import { render, cleanup } from '@testing-library/react';
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
    const { asFragment } = setUp(1195.2);
    expect(asFragment()).toMatchSnapshot();
  });
});
