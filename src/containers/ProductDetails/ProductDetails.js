/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modalTypes } from '../../shared/constants';
import * as actions from '../../store/actions/indexActions';
import * as SC from './ProductDetails.sc';
import Loader from '../../components/UI/Loader/Loader';
import PlainPanel from '../../components/UI/Panels/PlainPanel';
import PlainText from '../../components/UI/PlainText';
import Heading from '../../components/UI/Heading/Heading';
import SideBySide from '../../components/UI/SideBySide';
import PurchaseSection from './PurchaseSection/PurchaseSection';
import Button from '../../components/UI/Button/Button';
import noPhoto from '../../images/no-photo.png';
import { GreenText } from '../../styled/components';
import FlexWrapper from '../../components/UI/FlexWrapper';
import { formatPrice } from '../../shared/utility/utility';
import useWindowSize from '../../shared/useWindowSize';
import theme from '../../styled/theme';

const ProductDetails = (props) => {
  const {
    match: {
      params: { id: productId },
    },
  } = props;

  const windowSize = useWindowSize();

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
      <Heading variant="h4" align="center" lineHeight="4">
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
      buyerQuantity,
      seller,
      _id,
    } = productDetails;

    let quantitySoldNode = null;
    if (quantitySold >= 1) {
      quantitySoldNode = (
        <PlainText
          size="2"
          mgBottom="3"
          color={theme.colors.light4}
          data-testid="ProductDetails-quantity-sold"
        >
          {buyerQuantity === 1 ? '1 person' : `${buyerQuantity} people`} bought {quantitySold}{' '}
          {quantitySold === 1 ? 'unit' : 'units'}
        </PlainText>
      );
    }

    let descriptionSection = (
      <Heading variant="h4" mgTop="3" data-testid="ProductDetails-no-description">
        This product has no description
      </Heading>
    );
    if (description) {
      descriptionSection = (
        <section data-testid="ProductDetails-full-description">
          <Heading variant="h4" mgBottom="2" mgTop="3">
            Description
          </Heading>
          <PlainText size="3" lineHeight="5">
            {description}
          </PlainText>
        </section>
      );
    }

    const userIsOwner = userProfile?.username === seller.username;

    let editProductBtn = null;
    let deleteProductBtn = null;
    if (userIsOwner) {
      editProductBtn = (
        <Button
          color="blue"
          clicked={() => onSetModal(true, modalTypes.EDIT_PRODUCT)}
          data-testid="ProductDetails-edit-button"
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
          data-testid="ProductDetails-delete-button"
        >
          Delete offer
        </Button>
      );
    }

    let manageButtonsBox = null;
    if (deleteProductBtn || editProductBtn) {
      manageButtonsBox = (
        <FlexWrapper mgTop="5" justify="center" spacing="3">
          {editProductBtn}
          {deleteProductBtn}
        </FlexWrapper>
      );
    }

    const conditionText = condition !== 'not_applicable' ? condition : 'not applicable';

    details = (
      <PlainPanel>
        <SC.Wrapper>
          <SideBySide proportion={windowSize.width <= 900 ? '1/1' : '3/2'} makeVerticalWhen={600}>
            <section className="photo-section">
              <img
                src={photo ? `${process.env.REACT_APP_API_URL}/products/${_id}/photo` : noPhoto}
                alt={name}
                className="photo"
              />
            </section>
            <section className="data-section">
              <Heading variant="h4">{name}</Heading>
              <PlainText size="2" mgTop="2" mgBottom="2">
                <PlainText color={theme.colors.light4}>from&nbsp;</PlainText>
                <Link to={`/user/${seller.username}?p=1`} data-testid="ProductDetails-seller-link">
                  <GreenText>{seller.username}</GreenText>
                </Link>
              </PlainText>
              <PlainText size="2">
                <PlainText color={theme.colors.light4}>Condition:</PlainText>
                {` ${conditionText.slice(0, 1).toUpperCase()}${conditionText.slice(1)}`}
              </PlainText>
              <PlainText size="6" spacing="1px" mgTop="3" mgBottom="3">
                {formatPrice(price)}
              </PlainText>
              {quantitySoldNode}
              <PurchaseSection
                productId={productId}
                productQuantity={quantity}
                productSellerUsername={seller.username}
                onSetModal={onSetModal}
                userProfile={userProfile}
              />
            </section>
          </SideBySide>
          {descriptionSection}
          {manageButtonsBox}
        </SC.Wrapper>
      </PlainPanel>
    );
  }

  return details;
};

export default ProductDetails;
