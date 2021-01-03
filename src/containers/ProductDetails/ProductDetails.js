/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback, useEffect } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modalTypes } from '../../shared/constants';
import * as actions from '../../store/actions/indexActions';
import * as SC from './ProductDetails.sc';
import Loader from '../../components/UI/Loader';
import PlainPanel from '../../components/UI/Panels/PlainPanel';
import Heading from '../../components/UI/Heading/Heading';
import SideBySide from '../../components/UI/SideBySide';
import PurchaseSection from './PurchaseSection/PurchaseSection';
import Button from '../../components/UI/Button/Button';
import noPhoto from '../../images/no-photo.png';
import { baseURL } from '../../axios';
import { GrayText, GreenText } from '../../styled/components';
import FlexWrapper from '../../components/UI/FlexWrapper';
import { formatPrice } from '../../shared/utility';

const ProductDetails = (props) => {
  const {
    match: {
      params: { id: productId },
    },
  } = props;

  const windowWidth = useWindowWidth();

  const userProfile = useSelector((state) => state.auth.profile);
  const productDetails = useSelector((state) => state.product.productDetails);

  const dispatch = useDispatch();
  const onFetchProductDetails = useCallback((id) => dispatch(actions.fetchProductDetails(id)), [
    dispatch,
  ]);
  const onSetProductDetails = useCallback(() => dispatch(actions.setProductDetails()), [dispatch]);
  const onSetModal = useCallback(
    (isModalOpen, modalContent) => dispatch(actions.setModal(isModalOpen, modalContent)),
    [dispatch],
  );

  useEffect(() => {
    onFetchProductDetails(productId);
    return () => onSetProductDetails();
  }, [productId, onFetchProductDetails, onSetProductDetails]);

  let details = <Loader align="center" />;
  if (productDetails === null) {
    details = (
      <Heading variant="h4" align="center" data-test="not-found">
        Such product does not exist or has already been sold
      </Heading>
    );
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
        <GrayText className="quantity-sold">
          {quantitySold === 1 ? '1 person' : `${quantitySold} people`} bought
        </GrayText>
      );
    }

    let descriptionSection = (
      <Heading variant="h4" mgTop="level3" data-test="no-description">
        This product has no description
      </Heading>
    );
    if (description) {
      descriptionSection = (
        <section>
          <Heading variant="h4" mgBottom="level2" mgTop="level3">
            Description
          </Heading>
          <p className="description-content">{description}</p>
        </section>
      );
    }

    const userIsOwner = userProfile?._id === seller._id;

    let editProductBtn = null;
    let deleteProductBtn = null;
    if (userIsOwner) {
      editProductBtn = (
        <Button
          color="blue"
          clicked={() => onSetModal(true, modalTypes.EDIT_PRODUCT)}
          data-test="edit-button"
        >
          Edit offer
        </Button>
      );
    }
    if (userIsOwner || userProfile?.isAdmin) {
      deleteProductBtn = (
        <Button
          color="red"
          clicked={() => onSetModal(true, modalTypes.DELETE_PRODUCT)}
          data-test="delete-button"
        >
          Delete offer
        </Button>
      );
    }

    let manageButtonsBox = null;
    if (deleteProductBtn || editProductBtn) {
      manageButtonsBox = (
        <FlexWrapper mgTop="level5" justify="center">
          {editProductBtn}
          {deleteProductBtn}
        </FlexWrapper>
      );
    }

    details = (
      <>
        <SideBySide proportion={windowWidth <= 900 ? '1/1' : '3/2'} makeVerticalWhen={600}>
          <section className="photo-section">
            <img
              src={photo ? `${baseURL}/products/${_id}/photo` : noPhoto}
              alt="product"
              className="photo"
            />
          </section>
          <section className="data-section">
            <Heading variant="h4">{name}</Heading>
            {/* <span className="name">{name}</span> */}
            <span className="seller">
              <GrayText>from </GrayText>
              <Link to={`/user/${seller.username}?p=1`}>
                <GreenText>{seller.username}</GreenText>
              </Link>
            </span>
            <span className="condition">
              <GrayText>Condition: </GrayText>
              {`${conditionText.slice(0, 1).toUpperCase()}${conditionText.slice(1)}`}
            </span>
            <span className="price">{formatPrice(price)}</span>
            {quantitySoldNode}
            <PurchaseSection
              productId={productId}
              productQuantity={quantity}
              productSellerId={seller._id}
              onSetModal={onSetModal}
              userProfile={userProfile}
            />
          </section>
        </SideBySide>
        {descriptionSection}
        {manageButtonsBox}
      </>
    );
  }

  return (
    <PlainPanel>
      <SC.Wrapper>{details}</SC.Wrapper>
    </PlainPanel>
  );
};

export default ProductDetails;
