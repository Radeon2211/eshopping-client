import React from 'react';
import { screen } from '@testing-library/react';
import PaginationCounter from './PaginationCounter';
import { renderAppPart } from '../../../shared/testUtility/testUtility';
import { listItemTypes } from '../../../shared/constants';

const createProps = (itemQuantity, itemsType, quantityPerPage) => ({
  itemQuantity,
  itemsType,
  quantityPerPage,
});

const setUp = (props, pageNumber = 1) => {
  return renderAppPart(<PaginationCounter {...props} />, {
    pathname: '/products',
    search: `?p=${pageNumber}`,
  });
};

describe('<PaginationCounter />', () => {
  describe('check if correct text render', () => {
    it('should be 1 - 2 of 5 products', () => {
      const props = createProps(5, listItemTypes.PRODUCT, 2);
      setUp(props);
      expect(screen.getByText('1 - 2 of 5 products'));
    });

    it('should be 1 - 1 of 1 product', () => {
      const props = createProps(1, listItemTypes.PRODUCT, 1);
      setUp(props);
      expect(screen.getByText('1 - 1 of 1 product'));
    });

    it('should be 3 - 4 of 5 products', () => {
      const props = createProps(5, listItemTypes.PRODUCT, 2);
      setUp(props, 2);
      expect(screen.getByText('3 - 4 of 5 products'));
    });

    it('should be 5 - 7 of 7 orders', () => {
      const props = createProps(7, listItemTypes.ORDER, 4);
      setUp(props, 2);
      expect(screen.getByText('5 - 7 of 7 orders'));
    });

    it('should be 1 - 1 of 10 orders', () => {
      const props = createProps(10, listItemTypes.ORDER, 1);
      setUp(props);
      expect(screen.getByText('1 - 1 of 10 orders'));
    });

    it('should be 1 - 1 of 1 order', () => {
      const props = createProps(1, listItemTypes.ORDER, 1);
      setUp(props);
      expect(screen.getByText('1 - 1 of 1 order'));
    });

    it('should be 10 - 10 of 10 orders', () => {
      const props = createProps(10, listItemTypes.ORDER, 1);
      setUp(props, 10);
      expect(screen.getByText('10 - 10 of 10 orders'));
    });
  });
});
