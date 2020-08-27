/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import * as SC from './ProductDetails.sc';
import LoadingOverlay from '../../components/UI/LoadingOverlay/LoadingOverlay';
import Panel from '../../components/UI/Panel/Panel';
import Heading from '../../components/UI/Heading/Heading';
import SideBySide from '../../components/UI/SideBySide/SideBySide';
import noPhoto from '../../images/no-photo.png';
import { baseURL } from '../../axios';

const ProductDetails = (props) => {
  const {
    match: {
      params: { id: productId },
    },
  } = props;

  const productDetails = useSelector((state) => state.product.productDetails);
  const isDataLoading = useSelector((state) => state.product.isDataLoading);

  const dispatch = useDispatch();
  const onFetchProductDetails = useCallback((id) => dispatch(actions.fetchProductDetails(id)), [
    dispatch,
  ]);
  const onDeleteProductDetails = useCallback(() => dispatch(actions.deleteProductDetails()), [
    dispatch,
  ]);

  useEffect(() => {
    onFetchProductDetails(productId);
    return () => onDeleteProductDetails();
  }, [productId, onFetchProductDetails, onDeleteProductDetails]);

  let loadingOverlay = null;
  if (isDataLoading) loadingOverlay = <LoadingOverlay alignLoader="top" loaderSize="small" />;

  let details = null;
  if (productDetails === null) {
    details = <Heading variant="h4">Such product does not exist or has already been sold</Heading>;
  } else if (productDetails) {
    const {
      condition,
      description,
      name,
      photo,
      price,
      quantity,
      quantitySold,
      seller,
      _id,
    } = productDetails;

    const conditionText = condition !== 'not_applicable' ? condition : 'not applicable';

    let quantitySoldNode = null;
    if (quantitySold >= 1) {
      quantitySoldNode = (
        <span className="quantity-sold gray">
          {quantitySold === 1 ? '1 person' : `${quantitySold} people`} bought
        </span>
      );
    }

    details = (
      <SideBySide proportion="3/2" makeVerticalWhen={900}>
        <div className="photo-box">
          <img
            src={photo ? `${baseURL}/products/${_id}/photo` : noPhoto}
            alt="product"
            className="photo"
          />
        </div>
        <div className="data-box">
          <span className="name">{name}</span>
          <span className="seller">
            <span className="gray">from </span>
            <Link to={`/users/${seller._id}`} className="seller-link">
              {seller.username}
            </Link>
          </span>
          <span className="condition">
            <span className="gray">Condition: </span>
            {conditionText}
          </span>
          <span className="price">${price.toFixed(2)}</span>
          {quantitySoldNode}
        </div>
      </SideBySide>
    );
  }

  return (
    <Panel>
      <SC.Wrapper>
        {loadingOverlay}
        {details}
      </SC.Wrapper>
    </Panel>
  );
};

export default ProductDetails;
