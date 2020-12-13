/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../../store/actions/indexActions';
import Button from '../UI/Button/Button';
import Heading from '../UI/Heading/Heading';
import HorizontalWrapper from '../UI/HorizontalWrapper';

const DeleteProduct = () => {
  const history = useHistory();

  const productDetails = useSelector((state) => state.product.productDetails);

  const dispatch = useDispatch();
  const onSetModal = useCallback((isModalOpen) => dispatch(actions.setModal(isModalOpen)), [
    dispatch,
  ]);
  const onDeleteProduct = useCallback(
    (productId, currentHistory) => dispatch(actions.deleteProduct(productId, currentHistory)),
    [dispatch],
  );

  return (
    <>
      <Heading variant="h4" mgBottom="medium" lineHeight="medium" align="center">
        Are you sure to delete &quot;{productDetails?.name}&quot;?
      </Heading>
      <HorizontalWrapper>
        <Button clicked={() => onSetModal(false)}>Cancel</Button>
        <Button filled color="red" clicked={() => onDeleteProduct(productDetails?._id, history)}>
          Delete
        </Button>
      </HorizontalWrapper>
    </>
  );
};

export default DeleteProduct;
