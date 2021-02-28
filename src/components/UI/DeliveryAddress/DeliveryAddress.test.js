import React from 'react';
import { shallow } from 'enzyme';
import DeliveryAddress from './DeliveryAddress';
import { checkProps, defaultDeliveryAddress } from '../../../shared/testUtility';

const setUp = (data) => {
  return shallow(<DeliveryAddress data={data} />);
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

  it('Should render five <PlainText /> with correct values', () => {
    const wrapper = setUp(defaultDeliveryAddress);
    expect(wrapper).toMatchSnapshot();
  });
});
