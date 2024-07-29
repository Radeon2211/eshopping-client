import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as actions from '../../store/actions/indexActions';
import SideBySide from '../../components/UI/SideBySide';
import FlexWrapper from '../../components/UI/FlexWrapper';
import PlainPanel from '../../components/UI/Panels/PlainPanel';
import StickyPanel from '../../components/UI/Panels/StickyPanel';
import DeliveryAddressSection from './DeliveryAddressSection/DeliveryAddressSection';
import Heading from '../../components/UI/Heading/Heading';
import ToPayInfo from '../../components/UI/ToPayInfo/ToPayInfo';
import CartAndTransactionItems from '../../components/CartAndTransactionItems/CartAndTransactionItems';
import Button from '../../components/UI/Button/Button';
import { itemTypes } from '../../shared/constants';
import { roundOverallPrice, scrollToTop } from '../../shared/utility/utility';
import MetaDescriptor from '../../components/MetaDescriptor/MetaDescriptor';
import { ModalType } from '../../shared/types/types';

export default function Transaction() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const transaction = useSelector((state) => state.auth.transaction);

  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (modalContent) => dispatch(actions.setModal(modalContent)),
    [dispatch],
  );
  const onSetTransaction = useCallback(
    (items) => dispatch(actions.setTransaction(items)),
    [dispatch],
  );

  useEffect(() => {
    scrollToTop();
    if (pathname !== '/transaction') {
      onSetTransaction(undefined);
    }
  }, [pathname, transaction, onSetTransaction]);

  useEffect(() => {
    if (!transaction?.length) {
      navigate('/cart', { replace: true });
    }
  }, []);

  let content = null;
  if (transaction?.length > 0) {
    const toPayValue = transaction.reduce((acc, { price, quantity }) => {
      return acc + price * quantity;
    }, 0);
    const roundedToPayValue = roundOverallPrice(toPayValue);

    content = (
      <>
        <Heading $variant="h3">Transaction</Heading>
        <SideBySide $proportion="3/1" $makeVerticalWhen={1200} data-testid="Transaction-content">
          <FlexWrapper $direction="column" $align="stretch" $spacing="3">
            <DeliveryAddressSection onSetModal={onSetModal} />
            <PlainPanel>
              <Heading $variant="h4">Products</Heading>
              <CartAndTransactionItems items={transaction} type={itemTypes.TRANSACTION} />
            </PlainPanel>
          </FlexWrapper>
          <StickyPanel>
            <FlexWrapper $direction="column" $spacing="2">
              <ToPayInfo value={roundedToPayValue} />
              <Button $filled clicked={() => onSetModal(ModalType.BUY_PRODUCTS)}>
                I buy and pay
              </Button>
            </FlexWrapper>
          </StickyPanel>
        </SideBySide>
      </>
    );
  }

  return (
    <>
      <MetaDescriptor title="Transaction summary - E-Shopping" />
      {content}
    </>
  );
}
