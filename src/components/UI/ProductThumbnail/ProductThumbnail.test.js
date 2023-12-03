import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
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
  return render(<ProductThumbnail {...props} />);
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
      setUp(true, 'o1');
      expect(screen.getByTestId('ProductThumbnail-img')).toHaveAttribute(
        'src',
        `${process.env.REACT_APP_API_URL}/orders/o1/p1/photo`,
      );
    });

    it('should src be a link to product photo in product collection', () => {
      setUp(true);
      expect(screen.getByTestId('ProductThumbnail-img')).toHaveAttribute(
        'src',
        `${process.env.REACT_APP_API_URL}/products/p1/photo`,
      );
    });

    it('should src be a noPhoto', () => {
      setUp(false);
      expect(screen.getByTestId('ProductThumbnail-img')).toHaveAttribute('src', 'no-photo.png');
    });
  });
});
