/* eslint-disable react/jsx-one-expression-per-line */
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import Button from '../../UI/Button/Button';
import Heading from '../../UI/Heading/Heading';
import FlexWrapper from '../../UI/FlexWrapper';

export default function SendVerificationLink() {
  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (modalContent) => dispatch(actions.setModal(modalContent)),
    [dispatch],
  );
  const onSendAccountVerificationLink = useCallback(
    () => dispatch(actions.sendAccountVerificationLink()),
    [dispatch],
  );

  return (
    <>
      <Heading $variant="h4" $mgBottom="level3" $lineHeight="level4" $align="center">
        Are you sure? Number of emails to be sent is very limited
      </Heading>
      <FlexWrapper $justify="center" $spacing="level3">
        <Button clicked={() => onSetModal(null)}>Cancel</Button>
        <Button $filled clicked={() => onSendAccountVerificationLink()}>
          Send
        </Button>
      </FlexWrapper>
    </>
  );
}
