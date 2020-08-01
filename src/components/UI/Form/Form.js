import React, { useCallback } from 'react';
import { Form as FormikForm } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import * as SC from './Form.sc';
import Button from '../Button/Button';
import Heading from '../Heading/Heading';

const Form = (props) => {
  const { headingText, btnText, isValid, cancellable, children, height } = props;

  const formError = useSelector((state) => state.ui.formError);

  const dispatch = useDispatch();
  const onSetModal = useCallback((isModalOpen, modalContent) => dispatch(actions.setModal(isModalOpen, modalContent)), [dispatch]);

  const error = formError ? <span className="error">{formError}</span> : null;

  let heading = null;
  if (headingText) {
    heading = <Heading variant="h3">{headingText}</Heading>;
  }

  let cancelButton = null;
  if (cancellable) {
    cancelButton = (
      <div className="cancel-button-box">
        <Button size="small" clicked={() => onSetModal(false, '')}>cancel</Button>
      </div>
    );
  }

  let buttonsBox = null;
  if (btnText) {
    buttonsBox = (
      <div className="buttons-box">
        {cancelButton}
        <Button size="big" filled type="submit" disabled={!isValid}>
          {btnText}
        </Button>
      </div>
    );
  }

  const form = (
    <FormikForm className="formik-form">
      {children}
      {buttonsBox}
    </FormikForm>
  );

  return (
    <SC.Wrapper height={height}>
      {heading}
      {form}
      {error}
    </SC.Wrapper>
  );
};

export default Form;
