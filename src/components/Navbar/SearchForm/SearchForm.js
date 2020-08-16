import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import * as SC from './SearchForm.sc';
import Button from '../../UI/Button/Button';

const SearchForm = () => {
  const [productName, setProductName] = useState('');
  const history = useHistory();

  useEffect(() => {
    history.listen(({ search }) => {
      const { name } = queryString.parse(search);
      setProductName(name || '');
    });
  }, [history, setProductName]);

  const formSubmitHandle = (e) => {
    e.preventDefault();
    const { name = '' } = queryString.parse(history.location.search);
    if (name === productName) return;
    history.push(`/products?name=${productName}`);
  };

  return (
    <SC.SearchForm onSubmit={formSubmitHandle}>
      <input
        type="text"
        className="input-text"
        name="product"
        value={productName}
        autoComplete="off"
        spellCheck="false"
        onChange={(e) => setProductName(e.target.value)}
      />
      <Button type="submit" size="big" filled>
        search
      </Button>
    </SC.SearchForm>
  );
};

export default SearchForm;
