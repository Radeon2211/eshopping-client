import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DeliveryAddressSection from './DeliveryAddressSection';
import theme from '../../../styled/theme';
import { defaultDeliveryAddress, checkProps } from '../../../shared/testUtility/testUtility';
import { modalTypes } from '../../../shared/constants';

const mockStore = configureMockStore([thunk]);

const defaultStore = mockStore({
  auth: {
    deliveryAddress: defaultDeliveryAddress,
  },
});

const setUp = (onSetModal = jest.fn()) => {
  return render(
    <Provider store={defaultStore}>
      <ThemeProvider theme={theme}>
        <DeliveryAddressSection onSetModal={onSetModal} />
      </ThemeProvider>
    </Provider>,
  );
};

window.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
}));

afterEach(cleanup);

describe('<DeliveryAddressSection />', () => {
  describe('check prop types', () => {
    it('should NOT throw a warning', () => {
      const props = {
        onSetModal: jest.fn(),
      };
      expect(checkProps(DeliveryAddressSection, props)).toBeUndefined();
    });

    it('should throw a warning', () => {
      expect(checkProps(DeliveryAddressSection, {})).not.toBe(null);
    });
  });

  it('should render everything correctly with default delivery address', () => {
    const { asFragment } = setUp();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call onSetModal after clicking button', () => {
    const onSetModalFn = jest.fn();
    setUp(onSetModalFn);

    fireEvent.click(screen.getByRole('button', { name: /change address/i }));
    expect(onSetModalFn).toHaveBeenCalledTimes(1);
    expect(onSetModalFn).toHaveBeenCalledWith(modalTypes.CHANGE_DELIVERY_ADDRESS);
  });
});
