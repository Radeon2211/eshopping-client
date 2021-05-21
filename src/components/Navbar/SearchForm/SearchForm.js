import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as SC from './SearchForm.sc';
import Button from '../../UI/Button/Button';
import MyIcon from '../../UI/MyIcon';
import { ReactComponent as SearchIcon } from '../../../images/icons/search.svg';
import { defaultAppPath } from '../../../shared/constants';
import { getParamsWithoutPollution } from '../../../shared/utility/utility';
import useWindowSize from '../../../shared/useWindowSize';

export default function SearchForm() {
  const [productName, setProductName] = useState('');
  const history = useHistory();

  const windowSize = useWindowSize();

  const checkQueryParams = useCallback(
    (queryParams) => {
      const correctQueryParams = getParamsWithoutPollution(queryParams);
      const { name = '' } = correctQueryParams;
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
    const correctQueryParams = getParamsWithoutPollution(history.location.search);
    const { name = '' } = correctQueryParams;
    if (name === productName) return;
    let nameParam = '';
    if (productName.length > 0) {
      nameParam = `&name=${productName}`;
    }
    history.push(`${defaultAppPath}${nameParam}`);
  };

  let buttonContent = 'search';
  if (windowSize.width < 900) {
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
        data-testid="SearchForm-input"
      />
      <Button type="submit" filled aria-label="Search">
        {buttonContent}
      </Button>
    </SC.SearchForm>
  );
}
