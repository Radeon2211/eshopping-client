/* eslint-disable react/jsx-one-expression-per-line */
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import Button from '../../UI/Button/Button';
import Heading from '../../UI/Heading/Heading';
import FlexWrapper from '../../UI/FlexWrapper';

export default function PendingUserInfo() {
  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (modalContent) => dispatch(actions.setModal(modalContent)),
    [dispatch],
  );

  return (
    <>
      <Heading $variant="h4" $mgBottom="3" $lineHeight="4" $align="center">
        You need to activate your account
      </Heading>
      <FlexWrapper $justify="center">
        <Button clicked={() => onSetModal('')}>Ok</Button>
      </FlexWrapper>
    </>
  );
}
