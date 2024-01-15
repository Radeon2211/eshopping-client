/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../../../store/actions/indexActions';
import Button from '../../UI/Button/Button';
import Heading from '../../UI/Heading/Heading';
import FlexWrapper from '../../UI/FlexWrapper';

export default function DeleteProduct() {
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.product.productDetails);

  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (modalContent) => dispatch(actions.setModal(modalContent)),
    [dispatch],
  );
  const onDeleteProduct = useCallback(
    (productId, navigateFn) => dispatch(actions.deleteProduct(productId, navigateFn)),
    [dispatch],
  );

  return (
    <>
      <Heading
        $variant="h4"
        $mgBottom="3"
        $lineHeight="4"
        $align="center"
        data-testid="DeleteProduct-heading"
      >
        Are you sure to delete &quot;{productDetails?.name}&quot;?
      </Heading>
      <FlexWrapper $justify="center" $spacing="3">
        <Button clicked={() => onSetModal('')}>Cancel</Button>
        <Button $filled $color="red" clicked={() => onDeleteProduct(productDetails?._id, navigate)}>
          Delete
        </Button>
      </FlexWrapper>
    </>
  );
}
