/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as SC from './ProductItem.sc';
import { baseURL } from '../../../axios';
import noPhoto from '../../../images/no-photo.png';

const ProductItem = (props) => {
  const {
    data: { name, price, condition, quantitySold, photo, _id },
  } = props;

  let conditionNode = null;
  if (condition !== 'not_applicable') {
    conditionNode = (
      <span className="condition">
        <span className="gray">Condition: </span>
        {condition}
      </span>
    );
  }

  let quantitySoldNode = null;
  if (quantitySold === 1) {
    quantitySoldNode = <span className="quantity-sold gray">1 person bought</span>;
  }
  if (quantitySold > 1) {
    quantitySoldNode = <span className="quantity-sold gray">{quantitySold} people bought</span>;
  }

  return (
    <Link to={`/products/${_id}`}>
      <SC.Wrapper>
        <div className="photo-box">
          <img
            src={photo ? `${baseURL}/products/${_id}/photo` : noPhoto}
            alt="product"
            className="photo"
          />
        </div>
        <div className="data-box">
          <span className="name">{name}</span>
          {conditionNode}
          <span className="price">${price.toFixed(2)}</span>
          {quantitySoldNode}
        </div>
      </SC.Wrapper>
    </Link>
  );
};

ProductItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ProductItem;
