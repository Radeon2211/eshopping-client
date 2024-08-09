import { useCallback, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import theme from '../../styled/theme';
import { formatPrice, scrollToTop } from '../../shared/utility/utility';
import useWindowSize from '../../shared/hooks/useWindowSize';
import MetaDescriptor from '../../components/MetaDescriptor/MetaDescriptor';
import { ModalType } from '../../shared/types/types';
import { ProductCondition } from '../../shared/types/enums';

export default function ProductDetails() {
  const { id: productId } = useParams();

  const windowSize = useWindowSize();

  const userProfile = useSelector((state) => state.auth.profile);
  const productDetails = useSelector((state) => state.product.productDetails);

  const dispatch = useDispatch();
  const onFetchProductDetails = useCallback(
    (id) => dispatch(actions.fetchProductDetails(id)),
    [dispatch],
  );
  const onSetProductDetails = useCallback(() => dispatch(actions.setProductDetails()), [dispatch]);
  const onSetModal = useCallback(
    (modalContent) => dispatch(actions.setModal(modalContent)),
    [dispatch],
  );

  useEffect(() => {
    onFetchProductDetails(productId);
    scrollToTop();
    return () => onSetProductDetails();
  }, [productId, onFetchProductDetails, onSetProductDetails]);

  let pageTitle = 'Offer is loading... - E-Shopping';
  let details = <Loader align="center" />;
  if (productDetails === null) {
    pageTitle = 'Offer does not exist - E-Shopping';
    details = (
      <Heading $variant="h4" $align="center" $lineHeight="level4">
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

    pageTitle = `${name} - E-Shopping`;

    let quantitySoldNode = null;
    if (quantitySold >= 1) {
      quantitySoldNode = (
        <PlainText
          $size="level2"
          $mgBottom="level3"
          $color={theme.colors.light4}
          data-testid="ProductDetails-quantity-sold"
        >
          {buyerQuantity === 1 ? '1 person' : `${buyerQuantity} people`} bought {quantitySold}{' '}
          {quantitySold === 1 ? 'unit' : 'units'}
        </PlainText>
      );
    }

    let descriptionSection = (
      <Heading $variant="h4" $mgTop="level3" data-testid="ProductDetails-no-description">
        This product has no description
      </Heading>
    );
    if (description) {
      descriptionSection = (
        <section data-testid="ProductDetails-full-description">
          <Heading $variant="h4" $mgBottom="level2" $mgTop="level3">
            Description
          </Heading>
          <PlainText $size="level3" $lineHeight="level5">
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
          $color="blue"
          clicked={() => onSetModal(ModalType.EDIT_PRODUCT)}
          data-testid="ProductDetails-edit-button"
        >
          Edit offer
        </Button>
      );
    }
    if (userIsOwner || userProfile?.isAdmin) {
      deleteProductBtn = (
        <Button
          $color="red"
          clicked={() => onSetModal(ModalType.DELETE_PRODUCT)}
          data-testid="ProductDetails-delete-button"
        >
          Delete offer
        </Button>
      );
    }

    let manageButtonsBox = null;
    if (deleteProductBtn || editProductBtn) {
      manageButtonsBox = (
        <FlexWrapper $mgTop="level5" $justify="center" $spacing="level3">
          {editProductBtn}
          {deleteProductBtn}
        </FlexWrapper>
      );
    }

    const conditionText =
      condition !== ProductCondition.NOT_APPLICABLE ? condition : 'not applicable';

    details = (
      <PlainPanel>
        <SC.Wrapper>
          <SideBySide $proportion={windowSize.width <= 900 ? '1/1' : '3/2'} $makeVerticalWhen={600}>
            <section className="photo-section">
              <img
                src={photo ? `${process.env.REACT_APP_API_URL}/products/${_id}/photo` : noPhoto}
                alt={name}
                className="photo"
              />
            </section>
            <section className="data-section">
              <Heading $variant="h4">{name}</Heading>
              <PlainText $size="level2" $mgTop="level2" $mgBottom="level2">
                <PlainText $color={theme.colors.light4}>from&nbsp;</PlainText>
                <Link to={`/user/${seller.username}?p=1`} data-testid="ProductDetails-seller-link">
                  <GreenText>{seller.username}</GreenText>
                </Link>
              </PlainText>
              <PlainText $size="level2">
                <PlainText $color={theme.colors.light4}>Condition:</PlainText>
                {` ${conditionText.slice(0, 1).toUpperCase()}${conditionText.slice(1)}`}
              </PlainText>
              <PlainText $size="level6" $spacing="1px" $mgTop="level3" $mgBottom="level3">
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

  return (
    <>
      <MetaDescriptor title={pageTitle} description="Check out details about this products" />
      {details}
    </>
  );
}
