/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as SC from './ProductItem.sc';
import { baseURL } from '../../../axios';
import noPhoto from '../../../images/no-photo.png';
import { GrayText } from '../../../styled/components';
import { formatPrice, validateURL } from '../../../shared/utility';

const ProductItem = (props) => {
  const {
    data: { name, price, condition, quantitySold, photo, _id },
  } = props;

  let conditionNode = null;
  if (condition !== 'not_applicable') {
    conditionNode = (
      <span className="condition">
        <GrayText>Condition: </GrayText>
        {condition}
      </span>
    );
  }

  let quantitySoldNode = null;
  if (quantitySold >= 1) {
    quantitySoldNode = (
      <div className="quantity-sold-box">
        <GrayText className="quantity-sold">
          {quantitySold === 1 ? '1 person' : `${quantitySold} people`} bought
        </GrayText>
      </div>
    );
  }

  const photoURL = `${baseURL}/products/${_id}/photo`;
  const validPhotoURL = validateURL(photoURL) ? photoURL : noPhoto;

  return (
    <Link to={`/products/${_id}`}>
      <SC.Wrapper>
        <div className="photo-box">
          <img src={photo ? validPhotoURL : noPhoto} alt="product" className="photo" />
        </div>
        <div className="data-box">
          <span className="name">{name}</span>
          {conditionNode}
          <span className="price">{formatPrice(price)}</span>
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
