import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useHistory, Link } from 'react-router-dom';
import * as SC from './NumberPagination.sc';
import MyIcon from '../../UI/MyIcon';
import { ReactComponent as ArrowIcon } from '../../../images/icons/arrow.svg';
import { updateQueryParams, calculateNumberOfPages } from '../../../shared/utility';

const NumberPagination = (props) => {
  const { itemQuantity, quantityPerPage } = props;

  const history = useHistory();
  const { search, pathname } = history.location;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const { p: urlPage } = queryString.parse(search);
    const urlPageNumber = +urlPage;
    setCurrentPage(urlPageNumber);
  }, [search]);

  const createLinkNode = (pageNumber) => {
    return (
      <Link
        to={`${pathname}?${updateQueryParams(search, pageNumber)}`}
        key={pageNumber}
        className={`number-link${pageNumber === currentPage ? ' active' : ''}`}
        data-testid={`page${pageNumber}`}
      >
        {pageNumber}
      </Link>
    );
  };

  let pagination = null;
  if (itemQuantity) {
    const numberOfPages = calculateNumberOfPages(itemQuantity, quantityPerPage);
    const previousPagePath = `${pathname}?${updateQueryParams(search, currentPage - 1)}`;
    const nextPagePath = `${pathname}?${updateQueryParams(search, currentPage + 1)}`;

    const paginationNumbers = [];
    if (numberOfPages <= 6 || (currentPage <= 4 && numberOfPages > 6)) {
      const endLoopNumber = Math.min(6, numberOfPages);
      for (let i = 1; i <= endLoopNumber; i += 1) {
        paginationNumbers.push(createLinkNode(i));
      }
    } else {
      paginationNumbers.push(createLinkNode(1));
      paginationNumbers.push(
        <span key={2} className="ellipsis">
          ...
        </span>,
      );

      let startLoopNumber = currentPage - 2;
      if (numberOfPages - currentPage === 1) {
        startLoopNumber = currentPage - 3;
      } else if (numberOfPages === currentPage) {
        startLoopNumber = currentPage - 4;
      }

      for (let i = startLoopNumber; i <= startLoopNumber + 4; i += 1) {
        paginationNumbers.push(createLinkNode(i));
      }
    }

    pagination = (
      <SC.Wrapper>
        <Link
          to={previousPagePath}
          className={`arrow${currentPage > 1 ? '' : ' hide-arrow'}`}
          data-testid="left-arrow"
        >
          <MyIcon size="small" rotation={180}>
            <ArrowIcon />
          </MyIcon>
        </Link>
        {paginationNumbers}
        <span className="of">of</span>
        <span className="of">{numberOfPages}</span>
        <Link
          to={nextPagePath}
          className={`arrow${currentPage < numberOfPages ? '' : ' hide-arrow'}`}
          data-testid="right-arrow"
        >
          <MyIcon size="small">
            <ArrowIcon />
          </MyIcon>
        </Link>
      </SC.Wrapper>
    );
  }

  return pagination;
};

NumberPagination.propTypes = {
  itemQuantity: undefined,
};

NumberPagination.propTypes = {
  itemQuantity: PropTypes.number,
  quantityPerPage: PropTypes.number.isRequired,
};

export default NumberPagination;
