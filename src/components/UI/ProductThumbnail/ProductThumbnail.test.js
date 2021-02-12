import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import ProductThumbnail from './ProductThumbnail';
import { checkProps } from '../../../shared/testUtility';
import noPhoto from '../../../images/no-photo.png';

const setUp = (photo = false, orderId = '') => {
  const props = {
    photo,
    orderId,
    productId: 'p1',
    width: '5',
    height: '5',
    alt: 'testAlt',
  };
  return mount(
    <ThemeProvider theme={theme}>
      <ProductThumbnail {...props} />
    </ThemeProvider>,
  );
};

describe('<ProductThumbnail />', () => {
  describe('Check prop types', () => {
    const props = {
      photo: false,
      productId: 'p1',
      width: '5',
      height: '5',
      alt: 'alt',
    };
    it('Should NOT throw a warning', () => {
      expect(checkProps(ProductThumbnail, props)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(ProductThumbnail, {})).not.toBe(null);
    });
  });

  describe('Check what src and alt in img is', () => {
    it('Should src be link to product photo in order collection', () => {
      const wrapper = setUp(true, 'o1');
      expect(wrapper.find('img').prop('src')).toEqual(
        `${process.env.REACT_APP_API_URL}/orders/o1/p1/photo`,
      );
    });

    it('Should src be link to product photo in product collection', () => {
      const wrapper = setUp(true);
      expect(wrapper.find('img').prop('src')).toEqual(
        `${process.env.REACT_APP_API_URL}/products/p1/photo`,
      );
    });

    it('Should src be noPhoto', () => {
      const wrapper = setUp(false);
      expect(wrapper.find('img').prop('src')).toEqual(noPhoto);
    });

    it('Should alt be testAlt', () => {
      const wrapper = setUp();
      expect(wrapper.find('img').prop('alt')).toEqual('testAlt');
    });
  });
});
