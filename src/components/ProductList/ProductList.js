import React from 'react';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem/ProductItem';

const ProductList = (props) => {
  const { products } = props;

  let productList = (
    <span>
      We didn&apos;t find any matching results. Try typing something else or change search criteria
    </span>
  );
  if (products.length > 0) {
    productList = products.map((product) => <ProductItem key={product._id} data={product} />);
  }

  return <>{productList}</>;
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductList;
