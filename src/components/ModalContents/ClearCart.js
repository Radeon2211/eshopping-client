import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../UI/Button/Button';
import * as actions from '../../store/actions/indexActions';
import Heading from '../UI/Heading/Heading';
import HorizontalWrapper from '../UI/HorizontalWrapper';

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
      <Heading variant="h3" mgBottom="level3" align="center">
        Clear the shopping cart
      </Heading>
      <Heading variant="h4" mgBottom="level3" align="center">
        Are you sure to do that?
      </Heading>
      <HorizontalWrapper mgTop="level3">
        <Button color="blue" clicked={() => onSetModal(false)}>
          cancel
        </Button>
        <Button color="red" filled clicked={clearCartClickHandle}>
          clear
        </Button>
      </HorizontalWrapper>
    </>
  );
};

export default ClearCart;
