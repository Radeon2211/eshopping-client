import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../UI/Button/Button';
import * as actions from '../../../store/actions/indexActions';
import Heading from '../../UI/Heading/Heading';
import FlexWrapper from '../../UI/FlexWrapper';

export default function ClearCart() {
  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (modalContent) => dispatch(actions.setModal(modalContent)),
    [dispatch],
  );
  const onClearCart = useCallback(() => dispatch(actions.clearCart()), [dispatch]);

  const clearCartClickHandle = () => {
    onClearCart();
    onSetModal(null);
  };

  return (
    <>
      <Heading $variant="h3" $align="center">
        Clear the shopping cart
      </Heading>
      <Heading $variant="h4" $align="center">
        Are you sure to do that?
      </Heading>
      <FlexWrapper $mgTop="3" $justify="center" $spacing="3">
        <Button $color="blue" clicked={() => onSetModal(null)}>
          cancel
        </Button>
        <Button $color="red" $filled clicked={clearCartClickHandle}>
          clear
        </Button>
      </FlexWrapper>
    </>
  );
}
