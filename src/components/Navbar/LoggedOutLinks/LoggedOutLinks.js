import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import Button from '../../UI/Button/Button';
import FlexWrapper from '../../UI/FlexWrapper';
import { ModalType } from '../../../shared/types/types';

export default function LoggedOutLinks() {
  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (modalContent) => dispatch(actions.setModal(modalContent)),
    [dispatch],
  );

  return (
    <FlexWrapper $width="auto" $spacing="3" data-testid="LoggedOutLinks">
      <Button clicked={() => onSetModal(ModalType.LOGIN)}>login</Button>
      <Button $filled clicked={() => onSetModal(ModalType.SIGNUP)}>
        signup
      </Button>
    </FlexWrapper>
  );
}
