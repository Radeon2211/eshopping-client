import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import * as SC from './InputPagination.sc';
import MyIcon from '../../UI/MyIcon';
import PlainText from '../../UI/PlainText';
import NumberInput from '../../UI/NumberInput/NumberInput';
import { ReactComponent as ArrowIcon } from '../../../images/icons/arrow.svg';
import {
  stringifyParamsWithOtherPage,
  calculateNumberOfPages,
  getParamsWithoutPollution,
} from '../../../shared/utility/utility';
import useLastLocation from '../../../shared/hooks/useLastLocation';

export default function InputPagination({ itemQuantity, quantityPerPage }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { search, pathname } = location;

  const lastLocation = useLastLocation();

  const [inputValue, setInputValue] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const changePage = useCallback(
    (pageNumber) => {
      const updatedQueryParams = stringifyParamsWithOtherPage(search, pageNumber);

      const previousPath = `${lastLocation?.pathname}${lastLocation?.search}`;
      const currentPath = `${pathname}${search}`;
      const nextPath = `${pathname}?${updatedQueryParams}`;

      if (previousPath === currentPath || previousPath === nextPath) {
        navigate(-1);
      } else {
        navigate(nextPath, { replace: true });
      }
    },
    [search, pathname, location],
  );

  useEffect(() => {
    const numberOfPages = calculateNumberOfPages(itemQuantity, quantityPerPage);
    const parsedQueryParams = getParamsWithoutPollution(search);
    const { p: urlPage } = parsedQueryParams;
    const urlPageNumber = +urlPage;
    let correctPageNumber = 1;

    if (!Number.isNaN(urlPageNumber)) {
      if (urlPageNumber > numberOfPages) {
        correctPageNumber = numberOfPages;
        changePage(correctPageNumber);
      } else if (urlPageNumber < 1) {
        correctPageNumber = 1;
        changePage(correctPageNumber);
      } else {
        correctPageNumber = urlPageNumber;
      }
    } else {
      changePage(1);
    }

    setInputValue(correctPageNumber);
    setCurrentPage(correctPageNumber);
  }, [itemQuantity, pathname, search, setInputValue, changePage, quantityPerPage]);

  const inputChangeHandle = (e) => {
    setInputValue(e.target.value);
  };

  const formSubmitHandle = (e) => {
    e.preventDefault();
    const numberOfPages = calculateNumberOfPages(itemQuantity, quantityPerPage);
    if (currentPage === numberOfPages && inputValue >= numberOfPages) {
      setInputValue(currentPage);
      return;
    }
    const updatedQueryParams = stringifyParamsWithOtherPage(search, inputValue);
    navigate(`${pathname}?${updatedQueryParams}`);
  };

  let pagination = null;
  if (itemQuantity) {
    const queryParamsPrevious = stringifyParamsWithOtherPage(search, currentPage - 1);
    const queryParamsNext = stringifyParamsWithOtherPage(search, currentPage + 1);
    const numberOfPages = calculateNumberOfPages(itemQuantity, quantityPerPage);

    pagination = (
      <SC.Wrapper data-testid="InputPagination">
        <Link
          to={`${pathname}?${queryParamsPrevious}`}
          className={`arrow${currentPage > 1 ? '' : ' hide-arrow'}`}
          data-testid="InputPagination-left-arrow"
        >
          <MyIcon $size="small" $rotation={180}>
            <ArrowIcon />
          </MyIcon>
        </Link>
        <form onSubmit={formSubmitHandle} className="form-number">
          <NumberInput name="page" size="small" changed={inputChangeHandle} value={inputValue} />
        </form>
        <PlainText $size="level3" $mgLeft="level1" $mgRight="level1">
          of
        </PlainText>
        <PlainText
          $size="level3"
          $mgLeft="level1"
          $mgRight="level1"
          data-testid="InputPagination-number-of-pages"
        >
          {numberOfPages}
        </PlainText>
        <Link
          to={`${pathname}?${queryParamsNext}`}
          className={`arrow${currentPage < numberOfPages ? '' : ' hide-arrow'}`}
          data-testid="InputPagination-right-arrow"
        >
          <MyIcon $size="small">
            <ArrowIcon />
          </MyIcon>
        </Link>
      </SC.Wrapper>
    );
  }

  return pagination;
}

InputPagination.propTypes = {
  itemQuantity: undefined,
};

InputPagination.propTypes = {
  itemQuantity: PropTypes.number,
  quantityPerPage: PropTypes.number.isRequired,
};
