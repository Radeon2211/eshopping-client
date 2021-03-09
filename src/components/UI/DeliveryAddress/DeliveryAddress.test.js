import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import DeliveryAddress from './DeliveryAddress';
import { checkProps, defaultDeliveryAddress } from '../../../shared/testUtility';

const setUp = (data) => {
  return render(
    <ThemeProvider theme={theme}>
      <DeliveryAddress data={data} />
    </ThemeProvider>,
  );
};

afterEach(cleanup);

describe('<DeliveryAddress />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(DeliveryAddress, { data: defaultDeliveryAddress })).toBeUndefined();
    });

    it('Should throw a warning if data is uncomplete', () => {
      expect(
        checkProps(DeliveryAddress, {
          ...defaultDeliveryAddress,
          phone: undefined,
        }),
      ).not.toBe(null);
    });

    it('Should throw a warning if data is empty', () => {
      expect(checkProps(DeliveryAddress, {})).not.toBe(null);
    });
  });

  it('Should render five <PlainText /> with correct values', () => {
    const { asFragment } = setUp(defaultDeliveryAddress);
    expect(asFragment()).toMatchSnapshot();
  });
});
