import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import * as SC from './SearchForm.sc';
import Button from '../../UI/Button/Button';

const SearchForm = () => {
  const [productName, setProductName] = useState('');
  const history = useHistory();

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
    history.push(`/products?p=1${nameParam}`);
  };

  return (
    <SC.SearchForm onSubmit={formSubmitHandle}>
      <input
        type="text"
        className="name-input"
        name="product"
        value={productName}
        autoComplete="off"
        spellCheck="false"
        onChange={(e) => setProductName(e.target.value)}
      />
      <Button type="submit" filled>
        search
      </Button>
    </SC.SearchForm>
  );
};

export default SearchForm;