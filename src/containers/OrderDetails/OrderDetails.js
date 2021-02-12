import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import * as SC from './OrderDetails.sc';
import PlainPanel from '../../components/UI/Panels/PlainPanel';
import Heading from '../../components/UI/Heading/Heading';
import Loader from '../../components/UI/Loader';
import PlainText from '../../components/UI/PlainText';
import FlexWrapper from '../../components/UI/FlexWrapper';
import TransactionAndOrderProdItem from '../../components/TransactionAndOrderProdItem/TransactionAndOrderProdItem';
import DeliveryAddress from '../../components/UI/DeliveryAddress/DeliveryAddress';
import { formatOrderDate, formatPrice } from '../../shared/utility';
import { GreenText } from '../../styled/components';
import theme from '../../styled/theme';

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
      <Heading variant="h4" align="center" lineHeight="4" data-test="not-found">
        There is a problem to fetch order details or given order does not exist
      </Heading>
    );
  } else if (orderDetails) {
    const { _id, seller, buyer, deliveryAddress, products, overallPrice, createdAt } = orderDetails;

    const generalInfoSection = (
      <div data-test="general-info-section">
        <Heading variant="h4" mgBottom="2">
          General info
        </Heading>
        <FlexWrapper direction="column" spacing="1">
          <div>
            <PlainText weight="700">Order number:&nbsp;</PlainText>
            <PlainText size="3" data-test="order-id">
              {_id}
            </PlainText>
          </div>
          <div>
            <PlainText weight="700">Transaction date:&nbsp;</PlainText>
            <PlainText size="3" data-test="transaction-date">
              {formatOrderDate(createdAt)}
            </PlainText>
          </div>
          <div>
            <PlainText weight="700">Buyer:&nbsp;</PlainText>
            <PlainText size="3" data-test="buyer-username">
              {buyer ? (
                <Link to={`/user/${buyer.username}?p=1`} data-test="buyer-link">
                  <GreenText>{buyer.username}</GreenText>
                </Link>
              ) : (
                <i>(account has been deleted)</i>
              )}
            </PlainText>
          </div>
        </FlexWrapper>
      </div>
    );

    const infoAboutSellerSection = (
      <div data-test="info-about-seller-section">
        <Heading variant="h4" mgBottom="2">
          Info about seller
        </Heading>
        {seller ? (
          <FlexWrapper direction="column" spacing="1" data-test="seller-info">
            <div>
              <PlainText weight="700">Username:&nbsp;</PlainText>
              <PlainText size="3" data-test="seller-username">
                <Link to={`/user/${seller.username}?p=1`} data-test="seller-link">
                  <GreenText>{seller.username}</GreenText>
                </Link>
              </PlainText>
            </div>
            <div>
              <PlainText weight="700">Email:&nbsp;</PlainText>
              <PlainText size="3" data-test="seller-email">
                {seller.email}
              </PlainText>
            </div>
            <div>
              <PlainText weight="700">Phone:&nbsp;</PlainText>
              <PlainText size="3" data-test="seller-phone">
                {seller.phone}
              </PlainText>
            </div>
          </FlexWrapper>
        ) : (
          <i data-test="seller-deleted">(account has been deleted)</i>
        )}
      </div>
    );

    const deliveryAddressSection = (
      <div data-test="delivery-address-section">
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
          <PlainText size="5" data-test="overall-order-price">
            {formatPrice(overallPrice)}
          </PlainText>
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

  return content;
};

export default OrderDetails;
