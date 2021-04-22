import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as actions from '../../store/actions/indexActions';
import * as SC from './OrderDetails.sc';
import PlainPanel from '../../components/UI/Panels/PlainPanel';
import Heading from '../../components/UI/Heading/Heading';
import Loader from '../../components/UI/Loader/Loader';
import PlainText from '../../components/UI/PlainText';
import FlexWrapper from '../../components/UI/FlexWrapper';
import TransactionAndOrderProdItem from '../../components/TransactionAndOrderProdItem/TransactionAndOrderProdItem';
import DeliveryAddress from '../../components/UI/DeliveryAddress/DeliveryAddress';
import { formatOrderDate, formatPrice, scrollToTop } from '../../shared/utility/utility';
import { GreenText } from '../../styled/components';
import theme from '../../styled/theme';
import MetaDescriptor from '../../components/MetaDescriptor/MetaDescriptor';

const OrderDetails = () => {
  const { id: orderId } = useParams();

  const orderDetails = useSelector((state) => state.auth.orderDetails);

  const dispatch = useDispatch();
  const onFetchOrderDetails = useCallback((id) => dispatch(actions.fetchOrderDetails(id)), [
    dispatch,
  ]);
  const onSetOrderDetails = useCallback(() => dispatch(actions.setOrderDetails()), [dispatch]);

  useEffect(() => {
    onFetchOrderDetails(orderId);
    scrollToTop();
    return () => onSetOrderDetails();
  }, [orderId, onFetchOrderDetails, onSetOrderDetails]);

  let content = <Loader align="center" />;
  if (orderDetails === null) {
    content = (
      <Heading variant="h4" align="center" lineHeight="4" data-testid="OrderDetails-error">
        There is a problem to fetch order details or given order does not exist
      </Heading>
    );
  } else if (orderDetails) {
    const { _id, seller, buyer, deliveryAddress, products, overallPrice, createdAt } = orderDetails;

    const generalInfoSection = (
      <div data-testid="OrderDetails-general-info-section">
        <Heading variant="h4" mgBottom="2">
          General info
        </Heading>
        <FlexWrapper direction="column" spacing="1">
          <div>
            <PlainText weight="700">Order number:&nbsp;</PlainText>
            <PlainText size="3">{_id}</PlainText>
          </div>
          <div>
            <PlainText weight="700">Transaction date:&nbsp;</PlainText>
            <PlainText size="3">{formatOrderDate(createdAt)}</PlainText>
          </div>
          <div>
            <PlainText weight="700">Buyer:&nbsp;</PlainText>
            <PlainText size="3">
              {buyer ? (
                <Link to={`/user/${buyer.username}?p=1`} data-testid="OrderDetails-buyer-link">
                  <GreenText>{buyer.username}</GreenText>
                </Link>
              ) : (
                <i data-testid="OrderDetails-buyer-deleted">(account has been deleted)</i>
              )}
            </PlainText>
          </div>
        </FlexWrapper>
      </div>
    );

    const infoAboutSellerSection = (
      <div data-testid="OrderDetails-info-about-seller">
        <Heading variant="h4" mgBottom="2">
          Info about seller
        </Heading>
        {seller ? (
          <FlexWrapper direction="column" spacing="1" data-test="OrderDetails-seller-info">
            <div>
              <PlainText weight="700">Username:&nbsp;</PlainText>
              <PlainText size="3">
                <Link to={`/user/${seller.username}?p=1`} data-testid="OrderDetails-seller-link">
                  <GreenText>{seller.username}</GreenText>
                </Link>
              </PlainText>
            </div>
            <div>
              <PlainText weight="700">Email:&nbsp;</PlainText>
              <PlainText size="3">{seller.email}</PlainText>
            </div>
            <div>
              <PlainText weight="700">Phone:&nbsp;</PlainText>
              <PlainText size="3">{seller.phone}</PlainText>
            </div>
          </FlexWrapper>
        ) : (
          <i data-testid="OrderDetails-seller-deleted">(account has been deleted)</i>
        )}
      </div>
    );

    const deliveryAddressSection = (
      <div data-testid="OrderDetails-delivery-address-section">
        <Heading variant="h4" mgBottom="2">
          Delivery address
        </Heading>
        <DeliveryAddress data={deliveryAddress} />
      </div>
    );

    const productsSection = (
      <>
        <Heading variant="h4" mgTop="3">
          Products
        </Heading>
        {products.map((product) => (
          <TransactionAndOrderProdItem key={product._id} data={product} orderId={_id} />
        ))}
        <PlainText display="block" mgTop="3" textAlign="right">
          <PlainText color={theme.colors.light4} spacing="1px" mgRight="1">
            TOTAL
          </PlainText>
          <PlainText size="5">{formatPrice(overallPrice)}</PlainText>
        </PlainText>
      </>
    );

    content = (
      <SC.Wrapper>
        <PlainPanel>
          <FlexWrapper direction="column" spacing="3">
            {generalInfoSection}
            {infoAboutSellerSection}
            {deliveryAddressSection}
          </FlexWrapper>
          {productsSection}
        </PlainPanel>
      </SC.Wrapper>
    );
  }

  return (
    <>
      <MetaDescriptor title="Order details - E-Shopping" />
      {content}
    </>
  );
};

export default OrderDetails;
