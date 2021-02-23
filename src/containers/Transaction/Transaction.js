import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../../store/actions/indexActions';
import SideBySide from '../../components/UI/SideBySide';
import FlexWrapper from '../../components/UI/FlexWrapper';
import PlainPanel from '../../components/UI/Panels/PlainPanel';
import StickyPanel from '../../components/UI/Panels/StickyPanel';
import DeliveryAddressSection from './DeliveryAddressSection/DeliveryAddressSection';
import Heading from '../../components/UI/Heading/Heading';
import ToPayInfo from '../../components/UI/ToPayInfo';
import CartAndTransactionItems from '../../components/CartAndTransactionItems/CartAndTransactionItems';
import Button from '../../components/UI/Button/Button';
import { itemTypes, modalTypes } from '../../shared/constants';
import { roundOverallPrice } from '../../shared/utility';

const Transaction = () => {
  const history = useHistory();

  const transaction = useSelector((state) => state.auth.transaction);

  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (isModalOpen, modalContent) => dispatch(actions.setModal(isModalOpen, modalContent)),
    [dispatch],
  );

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
    const roundedToPayValue = roundOverallPrice(toPayValue);

    content = (
      <>
        <Heading variant="h3">Transaction</Heading>
        <SideBySide proportion="3/1" makeVerticalWhen={1200}>
          <FlexWrapper direction="column" align="stretch" spacing="3">
            <DeliveryAddressSection />
            <PlainPanel>
              <Heading variant="h4">Products</Heading>
              <CartAndTransactionItems items={transaction} type={itemTypes.TRANSACTION} />
            </PlainPanel>
          </FlexWrapper>
          <StickyPanel>
            <FlexWrapper direction="column" spacing="2">
              <ToPayInfo value={roundedToPayValue} />
              <Button filled clicked={() => onSetModal(true, modalTypes.BUY_PRODUCTS)}>
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
