/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import Button from '../UI/Button/Button';
import Heading from '../UI/Heading/Heading';
import { AlignCenter } from '../../styled/components';

const PendingUserInfo = () => {
  const dispatch = useDispatch();
  const onSetModal = useCallback((isModalOpen) => dispatch(actions.setModal(isModalOpen)), [
    dispatch,
  ]);

  return (
    <>
      <Heading variant="h4" mgBottom="3" lineHeight="4" align="center">
        You need to activate your account
      </Heading>
      <AlignCenter>
        <Button clicked={() => onSetModal(false)}>Ok</Button>
      </AlignCenter>
    </>
  );
};

export default PendingUserInfo;
