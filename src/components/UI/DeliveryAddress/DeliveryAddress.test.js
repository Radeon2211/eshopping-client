import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import DeliveryAddress from './DeliveryAddress';
import theme from '../../../styled/theme';
import { UserDataValue } from '../../../styled/components';
import { checkProps } from '../../../shared/testUtility';

const setUp = (data) => {
  const props = { data };
  return mount(
    <ThemeProvider theme={theme}>
      <DeliveryAddress {...props} />
    </ThemeProvider>,
  );
};

const delAddress = {
  firstName: 'firstName',
  lastName: 'lastName',
  street: 'street',
  zipCode: 'zipCode',
  city: 'city',
  country: 'country',
  phone: 'phone',
};

describe('<DeliveryAddress />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const expectedProps = {
        data: delAddress,
      };
      expect(checkProps(DeliveryAddress, expectedProps)).toBeUndefined();
    });

    it('Should throw a warning if data is uncomplete', () => {
      const expectedProps = {
        data: {
          ...delAddress,
          phone: undefined,
        },
      };
      expect(checkProps(DeliveryAddress, expectedProps)).not.toBe(null);
    });

    it('Should throw a warning if data is empty', () => {
      expect(checkProps(DeliveryAddress, {})).not.toBe(null);
    });
  });

  describe('Check how <UserDataValue /> render', () => {
    it('Should render five <UserDataValue /> with correct values', () => {
      const wrapper = setUp(delAddress);

      expect(wrapper.find(UserDataValue)).toHaveLength(5);
      expect(wrapper.find(UserDataValue).at(0).text()).toEqual(
        `${delAddress.firstName} ${delAddress.lastName}`,
      );
      expect(wrapper.find(UserDataValue).at(1).text()).toEqual(delAddress.street);
      expect(wrapper.find(UserDataValue).at(2).text()).toEqual(
        `${delAddress.zipCode} ${delAddress.city}`,
      );
      expect(wrapper.find(UserDataValue).at(3).text()).toEqual(delAddress.country);
      expect(wrapper.find(UserDataValue).at(4).text()).toEqual(delAddress.phone);
    });
  });
});
