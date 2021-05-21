import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NumberPagination from '../NumberPagination/NumberPagination';
import PaginationCounter from '../PaginationCounter/PaginationCounter';
import { listItemTypes } from '../../../shared/constants';

const SC = {};
SC.Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacings.level3};
  padding: 0 ${({ theme }) => theme.spacings.level2} 0 0;

  @media only screen and (max-width: 37.5em) {
    padding: 0;
  }
`;

export default function BottomPagination({ itemQuantity, itemsType, quantityPerPage }) {
  return (
    <SC.Wrapper>
      <PaginationCounter
        itemQuantity={itemQuantity}
        itemsType={itemsType}
        quantityPerPage={quantityPerPage}
      />
      <NumberPagination itemQuantity={itemQuantity} quantityPerPage={quantityPerPage} />
    </SC.Wrapper>
  );
}

BottomPagination.propTypes = {
  itemQuantity: PropTypes.number.isRequired,
  itemsType: PropTypes.oneOf(Object.values(listItemTypes)).isRequired,
  quantityPerPage: PropTypes.number.isRequired,
};
