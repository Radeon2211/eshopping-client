import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { useWindowWidth } from '@react-hook/window-size';
import * as SC from './SearchForm.sc';
import Button from '../../UI/Button/Button';
import MyIcon from '../../UI/MyIcon';
import { ReactComponent as SearchIcon } from '../../../images/icons/search.svg';
import { DEFAULT_PATH } from '../../../shared/constants';

const SearchForm = () => {
  const [productName, setProductName] = useState('');
  const history = useHistory();

  const windowWidth = useWindowWidth();

  const checkQueryParams = useCallback(
    (queryParams) => {
      const { name = '' } = queryString.parse(queryParams);
      setProductName(name);
    },
    [setProductName],
  );

  useEffect(() => {
    checkQueryParams(history.location.search);
    history.listen(({ search }) => {
      checkQueryParams(search);
    });
  }, [history, setProductName, checkQueryParams]);

  const formSubmitHandle = (e) => {
    e.preventDefault();
    const { name = '' } = queryString.parse(history.location.search);
    if (name === productName) return;
    let nameParam = '';
    if (productName.length > 0) {
      nameParam = `&name=${productName}`;
    }
    history.push(`${DEFAULT_PATH}${nameParam}`);
  };

  let buttonContent = 'search';
  if (windowWidth < 900) {
    buttonContent = (
      <MyIcon size="small" color="#fff">
        <SearchIcon />
      </MyIcon>
    );
  }

  return (
    <SC.SearchForm onSubmit={formSubmitHandle}>
      <input
        type="text"
        className="name-input"
        name="product"
        value={productName}
        maxLength="150"
        autoComplete="off"
        spellCheck="false"
        onChange={(e) => setProductName(e.target.value)}
      />
      <Button type="submit" filled>
        {buttonContent}
      </Button>
    </SC.SearchForm>
  );
};

export default SearchForm;
