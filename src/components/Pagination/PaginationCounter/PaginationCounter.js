import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { MAX_QUANTITY_ON_PAGE, listItemTypes } from '../../../shared/constants';

const SC = {};
SC.Wrapper = styled.div`
  color: ${({ theme }) => theme.colors.light4};
  font-size: 1.3rem;
`;

const PaginationCounter = (props) => {
  const { itemQuantity, itemsType } = props;

  const history = useHistory();
  const { search } = history.location;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const { p: urlPage } = queryString.parse(search);
    const urlPageNumber = +urlPage;
    setCurrentPage(urlPageNumber);
  }, [search]);

  const firstOfferNumber = currentPage * MAX_QUANTITY_ON_PAGE - (MAX_QUANTITY_ON_PAGE - 1);
  let lastOfferNumber = firstOfferNumber + MAX_QUANTITY_ON_PAGE - 1;
  if (lastOfferNumber > itemQuantity) {
    lastOfferNumber = itemQuantity;
  }

  let itemsTypeText = '';
  if (itemsType === listItemTypes.PRODUCT) {
    itemsTypeText = 'product';
  } else if (itemsType === listItemTypes.ORDER) {
    itemsTypeText = 'order';
  }
  if (itemQuantity > 1) {
    itemsTypeText += 's';
  }

  let paginationCounter = null;
  if (itemQuantity) {
    paginationCounter = (
      <SC.Wrapper>
        {`${firstOfferNumber} - ${lastOfferNumber} of ${itemQuantity} ${itemsTypeText}`}
      </SC.Wrapper>
    );
  }

  return paginationCounter;
};

PaginationCounter.propTyeps = {
  itemQuantity: PropTypes.number.isRequired,
  itemsType: PropTypes.string.isRequired,
};

export default PaginationCounter;
