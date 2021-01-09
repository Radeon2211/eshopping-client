import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DeliveryAddress from './DeliveryAddress';
import theme from '../../../styled/theme';
import { UserDataValue } from '../../../styled/components';

const mockStore = configureMockStore([thunk]);

const setUp = (deliveryAddress) => {
  const store = mockStore({
    auth: { deliveryAddress },
  });
  return mount(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <DeliveryAddress />
      </ThemeProvider>
    </Provider>,
  );
};

window.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
}));

describe('<DeliveryAddress />', () => {
  describe('Check how <UserDataValue /> render', () => {
    it('Should render five <UserDataValue /> with correct values', () => {
      const delAddress = {
        firstName: 'firstName',
        lastName: 'lastName',
        street: 'street',
        zipCode: 'zipCode',
        city: 'city',
        country: 'country',
        phone: 'phone',
      };
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
