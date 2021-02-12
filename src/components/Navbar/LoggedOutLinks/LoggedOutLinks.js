import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import { modalTypes } from '../../../shared/constants';
import Button from '../../UI/Button/Button';
import FlexWrapper from '../../UI/FlexWrapper';

const SignedOutLinks = () => {
  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (isModalOpen, modalContent) => dispatch(actions.setModal(isModalOpen, modalContent)),
    [dispatch],
  );

  return (
    <FlexWrapper width="auto" spacing="3">
      <Button clicked={() => onSetModal(true, modalTypes.LOGIN)}>login</Button>
      <Button filled clicked={() => onSetModal(true, modalTypes.SIGNUP)}>
        signup
      </Button>
    </FlexWrapper>
  );
};

export default SignedOutLinks;
