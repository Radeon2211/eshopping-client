import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import * as SC from './OrderDetails.sc';
import PlainPanel from '../../components/UI/Panels/PlainPanel';
import Heading from '../../components/UI/Heading/Heading';
import Loader from '../../components/UI/Loader';
import FlexWrapper from '../../components/UI/FlexWrapper';
import TransactionAndOrderProdItem from '../../components/TransactionAndOrderProdItem/TransactionAndOrderProdItem';
import DeliveryAddress from '../../components/UI/DeliveryAddress/DeliveryAddress';
import { formatOrderDate, formatPrice } from '../../shared/utility';
import { GreenText, GrayText, BoldText, UserDataValue } from '../../styled/components';

const OrderDetails = (props) => {
  const {
    match: {
      params: { id: orderId },
    },
  } = props;

  const orderDetails = useSelector((state) => state.auth.orderDetails);

  const dispatch = useDispatch();
  const onFetchOrderDetails = useCallback((id) => dispatch(actions.fetchOrderDetails(id)), [
    dispatch,
  ]);
  const onSetOrderDetails = useCallback(() => dispatch(actions.setOrderDetails()), [dispatch]);

  useEffect(() => {
    onFetchOrderDetails(orderId);
    return () => onSetOrderDetails();
  }, [orderId, onFetchOrderDetails, onSetOrderDetails]);

  let content = <Loader align="center" />;
  if (orderDetails === null) {
    content = (
      <Heading variant="h4" align="center" data-test="not-found">
        There is a problem to fetch order details or given order does not exist
      </Heading>
    );
  } else if (orderDetails) {
    const { _id, seller, buyer, deliveryAddress, products, overallPrice, createdAt } = orderDetails;

    const generalInfoSection = (
      <div data-test="general-info-section">
        <Heading variant="h4" mgBottom="level2">
          General info
        </Heading>
        <FlexWrapper direction="column" spacing="level1">
          <div>
            <BoldText>Order number:&nbsp;</BoldText>
            <UserDataValue data-test="order-id">{_id}</UserDataValue>
          </div>
          <div>
            <BoldText>Transaction date:&nbsp;</BoldText>
            <UserDataValue data-test="transaction-date">{formatOrderDate(createdAt)}</UserDataValue>
          </div>
          <div>
            <BoldText>Buyer:&nbsp;</BoldText>
            <UserDataValue data-test="buyer-username">
              {buyer ? (
                <Link to={`/user/${buyer.username}?p=1`} data-test="buyer-link">
                  <GreenText>{buyer.username}</GreenText>
                </Link>
              ) : (
                <i>(account has been deleted)</i>
              )}
            </UserDataValue>
          </div>
        </FlexWrapper>
      </div>
    );

    const infoAboutSellerSection = (
      <div data-test="info-about-seller-section">
        <Heading variant="h4" mgBottom="level2">
          Info about seller
        </Heading>
        {seller ? (
          <FlexWrapper direction="column" spacing="level1" data-test="seller-info">
            <div>
              <BoldText>Username:&nbsp;</BoldText>
              <UserDataValue data-test="seller-username">
                <Link to={`/user/${seller.username}?p=1`} data-test="seller-link">
                  <GreenText>{seller.username}</GreenText>
                </Link>
              </UserDataValue>
            </div>
            <div>
              <BoldText>Email:&nbsp;</BoldText>
              <UserDataValue data-test="seller-email">{seller.email}</UserDataValue>
            </div>
            <div>
              <BoldText>Phone:&nbsp;</BoldText>
              <UserDataValue data-test="seller-phone">{seller.phone}</UserDataValue>
            </div>
          </FlexWrapper>
        ) : (
          <i data-test="seller-deleted">(account has been deleted)</i>
        )}
      </div>
    );

    const deliveryAddressSection = (
      <div data-test="delivery-address-section">
        <Heading variant="h4" mgBottom="level2">
          Delivery address
        </Heading>
        <DeliveryAddress data={deliveryAddress} />
      </div>
    );

    const productsSection = (
      <>
        <Heading variant="h4" mgTop="level3">
          Products
        </Heading>
        {products.map((product) => (
          <TransactionAndOrderProdItem key={product._id} data={product} orderId={_id} />
        ))}
        <div className="total-price-wrapper">
          <GrayText className="total-price-text">TOTAL</GrayText>
          <span className="total-price-value">{formatPrice(overallPrice)}</span>
        </div>
      </>
    );

    content = (
      <SC.Wrapper>
        <PlainPanel>
          <FlexWrapper direction="column" spacing="level3">
            {generalInfoSection}
            {infoAboutSellerSection}
            {deliveryAddressSection}
          </FlexWrapper>
          {productsSection}
        </PlainPanel>
      </SC.Wrapper>
    );
  }

  return content;
};

export default OrderDetails;
