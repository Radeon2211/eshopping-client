/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback, useEffect } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modalTypes } from '../../shared/constants';
import * as actions from '../../store/actions/indexActions';
import * as SC from './ProductDetails.sc';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import Panel from '../../components/UI/Panel';
import Heading from '../../components/UI/Heading/Heading';
import SideBySide from '../../components/UI/SideBySide';
import PurchaseSection from './PurchaseSection/PurchaseSection';
import Button from '../../components/UI/Button/Button';
import noPhoto from '../../images/no-photo.png';
import { baseURL } from '../../axios';

const ProductDetails = (props) => {
  const {
    match: {
      params: { id: productId },
    },
  } = props;

  const windowWidth = useWindowWidth();

  const userProfile = useSelector((state) => state.auth.profile);
  const productDetails = useSelector((state) => state.product.productDetails);
  const isDataLoading = useSelector((state) => state.ui.isDataLoading);

  const dispatch = useDispatch();
  const onFetchProductDetails = useCallback((id) => dispatch(actions.fetchProductDetails(id)), [
    dispatch,
  ]);
  const onDeleteProductDetails = useCallback(() => dispatch(actions.deleteProductDetails()), [
    dispatch,
  ]);
  const onSetModal = useCallback(
    (isModalOpen, modalContent) => dispatch(actions.setModal(isModalOpen, modalContent)),
    [dispatch],
  );

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

    const proportion = windowWidth <= 900 ? '1/1' : '3/2';
    let descriptionContent = (
      <span className="description-heading">This product has no description</span>
    );
    if (description) {
      descriptionContent = (
        <>
          <span className="description-heading">Description</span>
          <span className="description-content">{description}</span>
        </>
      );
    }

    let deleteProductBtn = null;
    if (userProfile?._id === seller._id || userProfile?.isAdmin) {
      deleteProductBtn = (
        <div className="delete-btn-box">
          <Button color="red" clicked={() => onSetModal(true, modalTypes.DELETE_PRODUCT)}>
            Delete offer
          </Button>
        </div>
      );
    }

    details = (
      <>
        <SideBySide proportion={proportion} makeVerticalWhen={600}>
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
              {`${conditionText.slice(0, 1).toUpperCase()}${conditionText.slice(1)}`}
            </span>
            <span className="price">${price.toFixed(2)}</span>
            {quantitySoldNode}
            <PurchaseSection
              productQuantity={quantity}
              productSellerId={seller._id}
              onSetModal={onSetModal}
              userProfile={userProfile}
            />
          </div>
        </SideBySide>
        <div className="description-box">{descriptionContent}</div>
        {deleteProductBtn}
      </>
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
