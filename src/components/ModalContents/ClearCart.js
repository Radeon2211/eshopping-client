import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../UI/Button/Button';
import * as actions from '../../store/actions/indexActions';
import Heading from '../UI/Heading/Heading';
import FlexWrapper from '../UI/FlexWrapper';

const ClearCart = () => {
  const dispatch = useDispatch();
  const onSetModal = useCallback((isModalOpen) => dispatch(actions.setModal(isModalOpen)), [
    dispatch,
  ]);
  const onClearCart = useCallback(() => dispatch(actions.clearCart()), [dispatch]);

  const clearCartClickHandle = () => {
    onClearCart();
    onSetModal(false);
  };

  return (
    <>
      <Heading variant="h3" mgBottom="3" align="center">
        Clear the shopping cart
      </Heading>
      <Heading variant="h4" mgBottom="3" align="center">
        Are you sure to do that?
      </Heading>
      <FlexWrapper mgTop="3" justify="center" spacing="3">
        <Button color="blue" clicked={() => onSetModal(false)}>
          cancel
        </Button>
        <Button color="red" filled clicked={clearCartClickHandle}>
          clear
        </Button>
      </FlexWrapper>
    </>
  );
};

export default ClearCart;
