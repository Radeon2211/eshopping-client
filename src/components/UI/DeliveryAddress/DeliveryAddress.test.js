import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import DeliveryAddress from './DeliveryAddress';
import theme from '../../../styled/theme';
import PlainText from '../PlainText';
import { checkProps, defaultDeliveryAddress } from '../../../shared/testUtility';

const setUp = (data) => {
  const props = { data };
  return mount(
    <ThemeProvider theme={theme}>
      <DeliveryAddress {...props} />
    </ThemeProvider>,
  );
};

describe('<DeliveryAddress />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const expectedProps = {
        data: defaultDeliveryAddress,
      };
      expect(checkProps(DeliveryAddress, expectedProps)).toBeUndefined();
    });

    it('Should throw a warning if data is uncomplete', () => {
      const expectedProps = {
        data: {
          ...defaultDeliveryAddress,
          phone: undefined,
        },
      };
      expect(checkProps(DeliveryAddress, expectedProps)).not.toBe(null);
    });

    it('Should throw a warning if data is empty', () => {
      expect(checkProps(DeliveryAddress, {})).not.toBe(null);
    });
  });

  describe('Check how <PlainText /> render', () => {
    it('Should render five <PlainText /> with correct values', () => {
      const wrapper = setUp(defaultDeliveryAddress);

      expect(wrapper.find(PlainText)).toHaveLength(5);
      expect(wrapper.find(PlainText).at(0).text()).toEqual('firstName lastName');
      expect(wrapper.find(PlainText).at(1).text()).toEqual('street');
      expect(wrapper.find(PlainText).at(2).text()).toEqual('zipCode city');
      expect(wrapper.find(PlainText).at(3).text()).toEqual('country');
      expect(wrapper.find(PlainText).at(4).text()).toEqual('phone');
    });
  });
});
