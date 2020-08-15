import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as SC from './SearchForm.sc';
import Button from '../../UI/Button/Button';

const SearchForm = () => {
  const [productName, setProductName] = useState('');
  const history = useHistory();

  const formSubmitHandle = (e) => {
    e.preventDefault();
    if (!productName) return;
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
