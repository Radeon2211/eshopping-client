import { fireEvent, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DeliveryAddressSection from './DeliveryAddressSection';
import { defaultDeliveryAddress, renderAppPart } from '../../../shared/testUtility/testUtility';
import { ModalType } from '../../../shared/types/types';

const mockStore = configureMockStore([thunk]);
const defaultStore = mockStore({
  auth: {
    deliveryAddress: defaultDeliveryAddress,
  },
});

const setUp = (onSetModal = jest.fn()) => {
  return renderAppPart(<DeliveryAddressSection onSetModal={onSetModal} />, {
    pathname: `/product/123`,
    store: defaultStore,
    withoutRouter: true,
  });
};

window.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
}));

describe('<DeliveryAddressSection />', () => {
  it('should render everything correctly with default delivery address', () => {
    const { asFragment } = setUp();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call onSetModal after clicking button', () => {
    const onSetModalFn = jest.fn();
    setUp(onSetModalFn);

    fireEvent.click(screen.getByRole('button', { name: /change address/i }));
    expect(onSetModalFn).toHaveBeenCalledTimes(1);
    expect(onSetModalFn).toHaveBeenCalledWith(ModalType.CHANGE_DELIVERY_ADDRESS);
  });
});
