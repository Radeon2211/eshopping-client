import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { listItemTypes } from '../../../shared/constants';
import theme from '../../../styled/theme';
import PlainText from '../../UI/PlainText';
import { getParamsWithoutPollution } from '../../../shared/utility/utility';

export default function PaginationCounter({ itemQuantity, itemsType, quantityPerPage }) {
  const { search } = useLocation();

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
      <PlainText $size="1" $color={theme.colors.light4} data-testid="PaginationCounter">
        {`${firstOfferNumber} - ${lastOfferNumber} of ${itemQuantity} ${itemsTypeText}`}
      </PlainText>
    );
  }

  return paginationCounter;
}

PaginationCounter.propTyeps = {
  itemQuantity: PropTypes.number.isRequired,
  itemsType: PropTypes.oneOf([listItemTypes.PRODUCT, listItemTypes.ORDER]).isRequired,
  quantityPerPage: PropTypes.number.isRequired,
};
