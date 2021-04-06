import React from 'react';
import { shallow } from 'enzyme';
import ProductThumbnail from './ProductThumbnail';
import { checkProps } from '../../../shared/testUtility/testUtility';

const setUp = (photo = false, orderId = '') => {
  const props = {
    photo,
    orderId,
    productId: 'p1',
    width: '5',
    height: '5',
    alt: 'testAlt',
  };
  return shallow(<ProductThumbnail {...props} />);
};

describe('<ProductThumbnail />', () => {
  describe('check prop types', () => {
    const props = {
      photo: false,
      productId: 'p1',
      width: '5',
      height: '5',
      alt: 'alt',
    };
    it('should NOT throw a warning', () => {
      expect(checkProps(ProductThumbnail, props)).toBeUndefined();
    });
    it('should throw a warning', () => {
      expect(checkProps(ProductThumbnail, {})).not.toBe(null);
    });
  });

  describe('check how renders', () => {
    it('should src be a link to product photo in order collection', () => {
      const wrapper = setUp(true, 'o1');
      expect(wrapper).toMatchSnapshot();
    });

    it('should src be a link to product photo in product collection', () => {
      const wrapper = setUp(true);
      expect(wrapper).toMatchSnapshot();
    });

    it('should src be a noPhoto', () => {
      const wrapper = setUp(false);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
