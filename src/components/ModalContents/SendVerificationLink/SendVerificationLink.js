/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import Button from '../../UI/Button/Button';
import Heading from '../../UI/Heading/Heading';
import FlexWrapper from '../../UI/FlexWrapper';

const SendVerificationLink = () => {
  const dispatch = useDispatch();
  const onSetModal = useCallback((isModalOpen) => dispatch(actions.setModal(isModalOpen)), [
    dispatch,
  ]);
  const onSendAccountVerificationLink = useCallback(
    () => dispatch(actions.sendAccountVerificationLink()),
    [dispatch],
  );

  return (
    <>
      <Heading variant="h4" mgBottom="3" lineHeight="4" align="center">
        Are you sure? Number of emails to be sent is very limited
      </Heading>
      <FlexWrapper justify="center" spacing="3">
        <Button clicked={() => onSetModal(false)}>Cancel</Button>
        <Button filled clicked={() => onSendAccountVerificationLink()}>
          Send
        </Button>
      </FlexWrapper>
    </>
  );
};

export default SendVerificationLink;
