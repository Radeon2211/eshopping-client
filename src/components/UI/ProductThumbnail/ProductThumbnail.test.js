import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductThumbnail from './ProductThumbnail';

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

afterEach(cleanup);

describe('<ProductThumbnail />', () => {
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
