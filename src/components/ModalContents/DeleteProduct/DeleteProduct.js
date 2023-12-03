/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../../../store/actions/indexActions';
import Button from '../../UI/Button/Button';
import Heading from '../../UI/Heading/Heading';
import FlexWrapper from '../../UI/FlexWrapper';

export default function DeleteProduct() {
  const history = useHistory();

  const productDetails = useSelector((state) => state.product.productDetails);

  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (modalContent) => dispatch(actions.setModal(modalContent)),
    [dispatch],
  );
  const onDeleteProduct = useCallback(
    (productId, currentHistory) => dispatch(actions.deleteProduct(productId, currentHistory)),
    [dispatch],
  );

  return (
    <>
      <Heading
        variant="h4"
        mgBottom="3"
        lineHeight="4"
        align="center"
        data-testid="DeleteProduct-heading"
      >
        Are you sure to delete &quot;{productDetails?.name}&quot;?
      </Heading>
      <FlexWrapper justify="center" spacing="3">
        <Button clicked={() => onSetModal('')}>Cancel</Button>
        <Button filled color="red" clicked={() => onDeleteProduct(productDetails?._id, history)}>
          Delete
        </Button>
      </FlexWrapper>
    </>
  );
}
