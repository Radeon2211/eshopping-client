import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { listItemTypes } from '../../../shared/constants';
import theme from '../../../styled/theme';
import PlainText from '../../UI/PlainText';
import { getParamsWithoutPollution } from '../../../shared/utility/utility';

const PaginationCounter = (props) => {
  const { itemQuantity, itemsType, quantityPerPage } = props;

  const history = useHistory();
  const { search } = history.location;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const { p: urlPage } = getParamsWithoutPollution(search);
    const urlPageNumber = +urlPage;
    setCurrentPage(urlPageNumber);
  }, [search]);

  const firstOfferNumber = currentPage * quantityPerPage - (quantityPerPage - 1);
  let lastOfferNumber = firstOfferNumber + quantityPerPage - 1;
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
      <PlainText size="1" color={theme.colors.light4}>
        {`${firstOfferNumber} - ${lastOfferNumber} of ${itemQuantity} ${itemsTypeText}`}
      </PlainText>
    );
  }

  return paginationCounter;
};

PaginationCounter.propTyeps = {
  itemQuantity: PropTypes.number.isRequired,
  itemsType: PropTypes.oneOf([listItemTypes.PRODUCT, listItemTypes.ORDER]).isRequired,
  quantityPerPage: PropTypes.number.isRequired,
};

export default PaginationCounter;
