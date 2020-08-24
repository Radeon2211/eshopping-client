import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useLastLocation } from 'react-router-last-location';
import { useHistory, Link } from 'react-router-dom';
import * as SC from './InputPagination.sc';
import MyIcon from '../../UI/MyIcon/MyIcon';
import NumberInput from '../../UI/NumberInput/NumberInput';
import { ReactComponent as ArrowIcon } from '../../../images/SVG/arrow.svg';
import { historyActions } from '../../../shared/constants';
import { updateQueryParams, calculateNumberOfPages } from '../../../shared/utility';

const InputPagination = (props) => {
  const { itemQuantity, isListLoading, maxQuantityPerPage } = props;

  const history = useHistory();
  const { search, pathname } = history.location;

  const lastLocation = useLastLocation();

  const [inputValue, setInputValue] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const changePage = useCallback(
    (pageNumber, action) => {
      const updatedQueryParams = updateQueryParams(search, pageNumber);

      const previousPath = `${pathname}${lastLocation?.search}`;
      const currentPath = `${pathname}${search}`;
      const nextPath = `${pathname}?${updatedQueryParams}`;

      if ((previousPath === currentPath || previousPath === nextPath) && history.length > 2) {
        history.goBack();
      } else if (action === historyActions.PUSH && nextPath !== currentPath) {
        history.push(nextPath);
      } else if (action === historyActions.REPLACE) {
        history.replace(nextPath);
      }
    },
    [history, search, pathname, lastLocation],
  );

  useEffect(() => {
    const numberOfPages = calculateNumberOfPages(itemQuantity, maxQuantityPerPage);
    const parsedQueryParams = queryString.parse(search);
    const { p: urlPage } = parsedQueryParams;
    const urlPageNumber = +urlPage;
    let correctPageNumber = 1;

    if (!Number.isNaN(urlPageNumber)) {
      if (urlPageNumber > numberOfPages) {
        correctPageNumber = numberOfPages;
        changePage(correctPageNumber, historyActions.REPLACE);
      } else if (urlPageNumber < 1) {
        correctPageNumber = 1;
        changePage(correctPageNumber, historyActions.REPLACE);
      } else {
        correctPageNumber = urlPageNumber;
      }
    } else {
      changePage(1, historyActions.REPLACE);
    }

    setInputValue(correctPageNumber);
    setCurrentPage(correctPageNumber);
  }, [itemQuantity, history, search, setInputValue, changePage, maxQuantityPerPage]);

  const inputChangeHandle = (e) => {
    setInputValue(e.target.value);
  };

  const formSubmitHandle = (e) => {
    e.preventDefault();
    const numberOfPages = calculateNumberOfPages(itemQuantity, maxQuantityPerPage);
    if (currentPage === numberOfPages && inputValue >= numberOfPages) return;
    const updatedQueryParams = updateQueryParams(search, inputValue);
    console.log(updatedQueryParams);
    history.push(`${pathname}?${updatedQueryParams}`);
  };

  const arrowClickHandle = (e) => {
    if (isListLoading) {
      e.preventDefault();
    }
  };

  let pagination = null;
  if (itemQuantity) {
    const queryParamsPrevious = updateQueryParams(search, currentPage - 1);
    const queryParamsNext = updateQueryParams(search, currentPage + 1);
    const numberOfPages = calculateNumberOfPages(itemQuantity, maxQuantityPerPage);

    pagination = (
      <SC.Wrapper>
        {currentPage > 1 && (
          <Link
            to={`${pathname}?${queryParamsPrevious}`}
            onClick={arrowClickHandle}
            className="arrow"
            data-test="leftArrow"
          >
            <MyIcon size="small" rotation={180}>
              <ArrowIcon />
            </MyIcon>
          </Link>
        )}
        <form onSubmit={formSubmitHandle} className="form-number">
          <NumberInput name="page" size="small" changed={inputChangeHandle} value={inputValue} />
        </form>
        <span className="of">of</span>
        <span className="of">{numberOfPages}</span>
        {currentPage < numberOfPages && (
          <Link
            to={`${pathname}?${queryParamsNext}`}
            onClick={arrowClickHandle}
            className="arrow"
            data-test="rightArrow"
          >
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
  maxQuantityPerPage: PropTypes.number.isRequired,
};

export default InputPagination;
