import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import * as modalTypes from '../../../store/actions/modalTypes';
import Button from '../../UI/Button/Button';

const SC = {};
SC.Wrapper = styled.nav`
  display: flex;

  & > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacings.level3};
  }
`;

const SignedOutLinks = () => {
  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (isModalOpen, modalContent) => dispatch(actions.setModal(isModalOpen, modalContent)),
    [dispatch],
  );

  return (
    <SC.Wrapper>
      <Button clicked={() => onSetModal(true, modalTypes.LOGIN)}>login</Button>
      <Button filled clicked={() => onSetModal(true, modalTypes.SIGNUP)}>
        signup
      </Button>
    </SC.Wrapper>
  );
};

export default SignedOutLinks;
