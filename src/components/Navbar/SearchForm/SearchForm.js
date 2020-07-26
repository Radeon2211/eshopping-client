import React, { useState } from 'react';
import * as SC from './SearchForm.sc';
import Button from '../../UI/Button/Button';

const SearchForm = () => {
  const [productName, setProductName] = useState('');

  const formSubmitHandle = (e) => {
    e.preventDefault();
    if (!productName) return;
  };

  return (
    <SC.SearchForm onSubmit={formSubmitHandle}>
      <input
        type="text"
        className="input-text"
        name="product"
        value={productName}
        autoComplete="off"
        onChange={(e) => setProductName(e.target.value)}
      />
      <Button type="submit" size="big" filled>search</Button>
    </SC.SearchForm>
  );
};

export default SearchForm;
