import { render } from '@testing-library/react';
import DeliveryAddress from './DeliveryAddress';
import { defaultDeliveryAddress, renderAppPart } from '../../../shared/testUtility/testUtility';
import { DeliveryAddress as IDeliveryAddress } from '../../../shared/types/types';

const setUp = (data: IDeliveryAddress) => {
  return renderAppPart(<DeliveryAddress data={data} />, {
    withoutRouter: true,
  });
};

describe('<DeliveryAddress />', () => {
  it('should render five <PlainText /> with correct values', () => {
    const { asFragment } = setUp(defaultDeliveryAddress) as ReturnType<typeof render>;
    expect(asFragment()).toMatchSnapshot();
  });
});
