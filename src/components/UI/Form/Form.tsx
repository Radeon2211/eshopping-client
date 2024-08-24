import { useCallback } from 'react';
import { Form as FormikForm } from 'formik';
import * as actions from '../../../store/actions/indexActions';
import * as SC from './Form.sc';
import Button from '../Button/Button';
import FlexWrapper from '../FlexWrapper';
import PlainText from '../PlainText';
import Heading from '../Heading/Heading';
import theme from '../../../styled/theme';
import { ModalType, PropsWithChildren } from '../../../shared/types/types';
import { useTypedDispatch, useTypedSelector } from '../../../store/reducers/rootReducer';

export interface FormProps {
  headingText?: string;
  btnText?: string;
  isValid?: boolean;
  cancellable?: boolean;
  height?: number;
  btnColor?: 'blue' | 'red';
}

export default function Form(props: PropsWithChildren<FormProps>) {
  const {
    headingText,
    btnText,
    isValid,
    cancellable = false,
    children,
    height,
    btnColor = 'blue',
  } = props;

  const isFormLoading = useTypedSelector((state) => state.ui.isFormLoading);
  const formError = useTypedSelector((state) => state.ui.formError);

  const dispatch = useTypedDispatch();
  const onSetModal = useCallback(
    (modalContent: ModalType | null) => dispatch(actions.setModal(modalContent)),
    [dispatch],
  );

  const error = formError ? (
    <PlainText $size="level3" $mgTop="level3" $color={theme.colors.red} data-testid="Form-error">
      {formError}
    </PlainText>
  ) : null;

  let heading = null;
  if (headingText) {
    heading = <Heading $variant="h3">{headingText}</Heading>;
  }

  let cancelButton = null;
  if (cancellable) {
    cancelButton = (
      <PlainText $display="block" $mgRight="level3">
        <Button clicked={() => onSetModal(null)}>cancel</Button>
      </PlainText>
    );
  }

  let buttonsBox = null;
  if (btnText) {
    buttonsBox = (
      <FlexWrapper $align="center" $justify="flex-end" $spacing="level3">
        {cancelButton}
        <Button
          $filled
          type="submit"
          $color={btnColor}
          disabled={!isValid || isFormLoading}
          data-testid="Form-submit-btn"
        >
          {btnText}
        </Button>
      </FlexWrapper>
    );
  }

  const form = (
    <FormikForm className="formik-form">
      {children}
      {buttonsBox}
    </FormikForm>
  );

  return (
    <SC.Wrapper $height={height}>
      {heading}
      {form}
      {error}
    </SC.Wrapper>
  );
}
