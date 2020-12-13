import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form as FormikForm } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import * as SC from './Form.sc';
import Button from '../Button/Button';
import Heading from '../Heading/Heading';

const Form = (props) => {
  const { headingText, btnText, isValid, cancellable, children, height, btnColor } = props;

  const isFormLoading = useSelector((state) => state.ui.isFormLoading);
  const formError = useSelector((state) => state.ui.formError);

  const dispatch = useDispatch();
  const onSetModal = useCallback((isModalOpen) => dispatch(actions.setModal(isModalOpen)), [
    dispatch,
  ]);

  const error = formError ? <span className="error">{formError}</span> : null;

  let heading = null;
  if (headingText) {
    heading = <Heading variant="h3">{headingText}</Heading>;
  }

  let cancelButton = null;
  if (cancellable) {
    cancelButton = (
      <div className="cancel-button-box">
        <Button clicked={() => onSetModal(false)}>cancel</Button>
      </div>
    );
  }

  let buttonsBox = null;
  if (btnText) {
    buttonsBox = (
      <div className="buttons-box">
        {cancelButton}
        <Button
          filled
          type="submit"
          color={btnColor}
          disabled={!isValid || isFormLoading}
          data-test="submit-btn"
        >
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

Form.defaultProps = {
  headingText: '',
  btnText: '',
  isValid: undefined,
  cancellable: false,
  height: undefined,
  btnColor: 'blue',
};

Form.propTypes = {
  headingText: PropTypes.string,
  btnText: PropTypes.string,
  isValid: PropTypes.bool,
  cancellable: PropTypes.bool,
  children: PropTypes.node.isRequired,
  height: PropTypes.number,
  btnColor: PropTypes.string,
};

export default Form;
