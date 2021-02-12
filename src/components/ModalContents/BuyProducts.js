/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLastLocation } from 'react-router-last-location';
import { useHistory } from 'react-router-dom';
import * as actions from '../../store/actions/indexActions';
import Button from '../UI/Button/Button';
import Heading from '../UI/Heading/Heading';
import FlexWrapper from '../UI/FlexWrapper';

const BuyProducts = () => {
  const history = useHistory();
  const lastLocation = useLastLocation();

  const dispatch = useDispatch();
  const onSetModal = useCallback((isModalOpen) => dispatch(actions.setModal(isModalOpen)), [
    dispatch,
  ]);
  const onBuyProducts = useCallback(
    (currentHistory, lastPath) => dispatch(actions.buyProducts(currentHistory, lastPath)),
    [dispatch],
  );

  return (
    <>
      <Heading variant="h3" mgBottom="3" lineHeight="3" align="center">
        Are you sure?
      </Heading>
      <FlexWrapper justify="center" spacing="3">
        <Button clicked={() => onSetModal(false)}>Cancel</Button>
        <Button filled clicked={() => onBuyProducts(history, lastLocation.pathname)}>
          Confirm
        </Button>
      </FlexWrapper>
    </>
  );
};

export default BuyProducts;
