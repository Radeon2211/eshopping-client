import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import { modalTypes } from '../../../shared/constants';
import Button from '../../UI/Button/Button';
import FlexWrapper from '../../UI/FlexWrapper';

export default function LoggedOutLinks() {
  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (modalContent) => dispatch(actions.setModal(modalContent)),
    [dispatch],
  );

  return (
    <FlexWrapper $width="auto" $spacing="3" data-testid="LoggedOutLinks">
      <Button clicked={() => onSetModal(modalTypes.LOGIN)}>login</Button>
      <Button $filled clicked={() => onSetModal(modalTypes.SIGNUP)}>
        signup
      </Button>
    </FlexWrapper>
  );
}
