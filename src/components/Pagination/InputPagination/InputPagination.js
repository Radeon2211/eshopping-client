import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import * as SC from './InputPagination.sc';
import MyIcon from '../../UI/MyIcon/MyIcon';
import { ReactComponent as ArrowIcon } from '../../../images/SVG/arrow.svg';
import { historyActions, MAX_QUANTITY_ON_PAGE } from '../../../shared/constants';

const InputPagination = (props) => {
  const { itemQuantity, isListLoading } = props;
  const history = useHistory();
  const { search } = history.location;

  const [inputValue, setInputValue] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const changePage = useCallback(
    (pageNumber, action) => {
      const parsedQueryParams = queryString.parse(search);
      const correctQueryParams = {
        ...parsedQueryParams,
        p: pageNumber,
      };
      const stringifiedQueryParams = queryString.stringify(correctQueryParams);
      if (pageNumber === currentPage) {
        history.goBack();
      } else if (action === historyActions.PUSH) {
        history.push(`${history.location.pathname}?${stringifiedQueryParams}`);
      } else {
        history.replace(`${history.location.pathname}?${stringifiedQueryParams}`);
      }
    },
    [history, search, currentPage],
  );

  useEffect(() => {
    const maxPageNumber = Math.ceil(itemQuantity / MAX_QUANTITY_ON_PAGE);
    const parsedQueryParams = queryString.parse(search);
    const { p: urlPage } = parsedQueryParams;
    const urlPageNumber = +urlPage;
    let correctPageNumber = 1;
    if (!Number.isNaN(urlPageNumber)) {
      if (urlPageNumber > maxPageNumber) {
        correctPageNumber = maxPageNumber;
      } else if (urlPageNumber < 1) {
        correctPageNumber = 1;
      } else {
        correctPageNumber = urlPageNumber;
      }
      if (urlPageNumber > maxPageNumber || urlPageNumber < 1) {
        changePage(correctPageNumber, historyActions.REPLACE);
      }
    } else {
      changePage(1, historyActions.REPLACE);
    }
    setInputValue(correctPageNumber);
    setCurrentPage(correctPageNumber);
  }, [itemQuantity, history, search, setInputValue, changePage]);

  const inputChangeHandle = (e) => {
    setInputValue(e.target.value);
  };

  const inputKeyDownHandle = (e) => {
    if (e.key === 'e' || e.key === 'E' || e.key === '.' || e.key === ',' || e.key === '-') {
      e.preventDefault();
    }
  };

  const formSubmitHandle = (e) => {
    e.preventDefault();
    changePage(inputValue, historyActions.PUSH);
  };

  const arrowClickHandle = (action) => {
    if (isListLoading) return;
    const { p: urlPage } = queryString.parse(search);
    const urlPageNumber = +urlPage;
    const correctPageNumber = action === 'prev' ? urlPageNumber - 1 : urlPageNumber + 1;
    changePage(correctPageNumber, historyActions.PUSH);
  };

  let pagination = null;
  if (itemQuantity) {
    pagination = (
      <SC.Wrapper>
        {currentPage > 1 && (
          <MyIcon
            size="small"
            rotation={180}
            onClick={() => arrowClickHandle('prev')}
            className="arrow"
          >
            <ArrowIcon />
          </MyIcon>
        )}
        <form onSubmit={formSubmitHandle}>
          <input
            type="number"
            name="page"
            className="input-number"
            onChange={inputChangeHandle}
            onKeyDown={inputKeyDownHandle}
            value={inputValue}
          />
        </form>
        <span className="of">of</span>
        <span className="of">{Math.ceil(itemQuantity / MAX_QUANTITY_ON_PAGE)}</span>
        {currentPage < Math.ceil(itemQuantity / MAX_QUANTITY_ON_PAGE) && (
          <MyIcon size="small" onClick={() => arrowClickHandle('next')} className="arrow">
            <ArrowIcon />
          </MyIcon>
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
