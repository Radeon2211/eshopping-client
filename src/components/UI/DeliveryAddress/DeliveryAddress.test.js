import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import DeliveryAddress from './DeliveryAddress';
import { defaultDeliveryAddress } from '../../../shared/testUtility/testUtility';

const setUp = (data) => {
  return render(
    <ThemeProvider theme={theme}>
      <DeliveryAddress data={data} />
    </ThemeProvider>,
  );
};

afterEach(cleanup);

describe('<DeliveryAddress />', () => {
  it('should render five <PlainText /> with correct values', () => {
    const { asFragment } = setUp(defaultDeliveryAddress);
    expect(asFragment()).toMatchSnapshot();
  });
});
