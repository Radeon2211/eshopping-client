import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useHistory, Link } from 'react-router-dom';
import * as SC from './NumberPagination.sc';
import MyIcon from '../../UI/MyIcon/MyIcon';
import { ReactComponent as ArrowIcon } from '../../../images/SVG/arrow.svg';
import { updateQueryParams, calculateNumberOfPages } from '../../../shared/utility';

const InputPagination = (props) => {
  const { itemQuantity, isListLoading } = props;

  const history = useHistory();
  const { search } = history.location;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const { p: urlPage } = queryString.parse(search);
    const urlPageNumber = +urlPage;
    setCurrentPage(urlPageNumber);
  }, [search]);

  const arrowClickHandle = (e) => {
    if (isListLoading) {
      e.preventDefault();
    }
  };

  const createLinkNode = (pageNumber) => {
    return (
      <Link
        to={`${history.location.pathname}?${updateQueryParams(search, pageNumber)}`}
        key={pageNumber}
        className={`number-link${pageNumber === currentPage ? ' active' : ''}`}
      >
        {pageNumber}
      </Link>
    );
  };

  let pagination = null;
  if (itemQuantity) {
    const numberOfPages = calculateNumberOfPages(itemQuantity);
    const previousPagePath = `${history.location.pathname}?${updateQueryParams(
      search,
      currentPage - 1,
    )}`;
    const nextPagePath = `${history.location.pathname}?${updateQueryParams(
      search,
      currentPage + 1,
    )}`;
    const firstPagePath = `${history.location.pathname}?${updateQueryParams(search, 1)}`;

    const paginationNumbers = [];
    if (numberOfPages <= 6 || (currentPage <= 4 && numberOfPages > 6)) {
      const endLoopNumber = Math.min(6, numberOfPages);
      for (let i = 1; i <= endLoopNumber; i += 1) {
        paginationNumbers.push(createLinkNode(i));
      }
    } else {
      paginationNumbers.push(
        <Link to={firstPagePath} key={1} className="number-link">
          1
        </Link>,
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
        {currentPage > 1 && (
          <Link to={previousPagePath} onClick={arrowClickHandle} className="arrow">
            <MyIcon size="small" rotation={180}>
              <ArrowIcon />
            </MyIcon>
          </Link>
        )}
        {paginationNumbers}
        <span className="of">of</span>
        <span className="of">{numberOfPages}</span>
        {currentPage < numberOfPages && (
          <Link to={nextPagePath} onClick={arrowClickHandle} className="arrow">
            <MyIcon size="small">
              <ArrowIcon />
            </MyIcon>
          </Link>
        )}
      </SC.Wrapper>
    );
  }

  return pagination;
};

InputPagination.propTypes = {
  itemQuantity: undefined,
};

InputPagination.propTypes = {
  itemQuantity: PropTypes.number,
  isListLoading: PropTypes.bool.isRequired,
};

export default InputPagination;
