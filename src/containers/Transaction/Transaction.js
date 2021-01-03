import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SideBySide from '../../components/UI/SideBySide';
import FlexWrapper from '../../components/UI/FlexWrapper';
import PlainPanel from '../../components/UI/Panels/PlainPanel';
import StickyPanel from '../../components/UI/Panels/StickyPanel';
import DeliveryAddress from './DeliveryAddress/DeliveryAddress';
import Heading from '../../components/UI/Heading/Heading';
import ToPayInfo from '../../components/UI/ToPayInfo';
import { CTItemTypes } from '../../shared/constants';
import Button from '../../components/UI/Button/Button';
import CartAndTransactionItems from '../../components/CartAndTransactionItems/CartAndTransactionItems';

const Transaction = () => {
  const transaction = useSelector((state) => state.auth.transaction);
  const isCartLoading = useSelector((state) => state.ui.isCartLoading);

  const history = useHistory();

  useEffect(() => {
    if (!transaction || transaction?.length <= 0) {
      if (history.length > 2) history.goBack();
      else history.replace('/cart');
    }
  }, [history, transaction]);

  let content = null;
  if (transaction?.length > 0) {
    const toPayValue = transaction.reduce((acc, { price, quantity }) => {
      return acc + price * quantity;
    }, 0);
    const roundedToPayValue = Math.round((toPayValue + Number.EPSILON) * 100) / 100;

    content = (
      <>
        <Heading variant="h3">Transaction</Heading>
        <SideBySide proportion="3/1" makeVerticalWhen={1200}>
          <FlexWrapper direction="column" align="stretch">
            <DeliveryAddress />
            <PlainPanel>
              <Heading variant="h4">Products</Heading>
              <CartAndTransactionItems items={transaction} type={CTItemTypes.TRANSACTION} />
            </PlainPanel>
          </FlexWrapper>
          <StickyPanel>
            <FlexWrapper direction="column" spacing="level2">
              <ToPayInfo value={roundedToPayValue} />
              <Button filled disabled={isCartLoading}>
                I buy and pay
              </Button>
            </FlexWrapper>
          </StickyPanel>
        </SideBySide>
      </>
    );
  }

  return content;
};

export default Transaction;
