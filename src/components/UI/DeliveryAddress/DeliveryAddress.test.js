import React from 'react';
import DeliveryAddress from './DeliveryAddress';
import { defaultDeliveryAddress, renderAppPart } from '../../../shared/testUtility/testUtility';

const setUp = (data) => {
  return renderAppPart(<DeliveryAddress data={data} />, {
    withoutRouter: true,
  });
};

describe('<DeliveryAddress />', () => {
  it('should render five <PlainText /> with correct values', () => {
    const { asFragment } = setUp(defaultDeliveryAddress);
    expect(asFragment()).toMatchSnapshot();
  });
});
