/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as actions from '../../store/actions/indexActions';
import Button from '../UI/Button/Button';
import Heading from '../UI/Heading/Heading';

const SC = {};
SC.Wrapper = styled.div`
  & .buttons {
    margin-top: ${({ theme }) => theme.spacings.level3};

    & > *:not(:last-child) {
      margin-right: ${({ theme }) => theme.spacings.level3};
    }
  }
`;

const DeleteProduct = () => {
  const history = useHistory();

  const productDetails = useSelector((state) => state.product.productDetails);

  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (isModalOpen, modalContent) => dispatch(actions.setModal(isModalOpen, modalContent)),
    [dispatch],
  );
  const onDeleteProduct = useCallback(
    (productId, currentHistory) => dispatch(actions.deleteProduct(productId, currentHistory)),
    [dispatch],
  );

  return (
    <SC.Wrapper>
      <Heading variant="h4">Are you sure to delete &quot;{productDetails?.name}&quot;?</Heading>
      <div className="buttons">
        <Button filled color="red" clicked={() => onDeleteProduct(productDetails?._id, history)}>
          Delete
        </Button>
        <Button clicked={() => onSetModal(false, '')}>Cancel</Button>
      </div>
    </SC.Wrapper>
  );
};

export default DeleteProduct;
