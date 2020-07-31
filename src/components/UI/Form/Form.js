import React from 'react';
import { useSelector } from 'react-redux';
import { Form as FormikForm } from 'formik';
import * as SC from './Form.sc';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Heading from '../Heading/Heading';

const Form = (props) => {
  const { headingText, btnText, isValid, cancelled, children, submitted, height } = props;

  // const { loading: postLoading, error: postError } = useSelector((state) => state.post);
  // const { loading: authLoading, error: authError } = useSelector((state) => state.auth);

  // const loading = isPostForm ? postLoading : authLoading;
  const loading = true;
  // const loader = loading ? <Loader size="small" /> : null;
  // const error = isPostForm ? postError : authError;

  let heading = null;
  if (headingText) {
    heading = (
      <Heading variant="h3">{headingText}</Heading>
    );
  }

  let errorNode = null;
  // if (error) {
  //   errorNode = <span className="error">{error}</span>;
  // }

  let cancelButton = null;
  if (cancelled) {
    cancelButton = (
      <div className="cancel-button-box">
        <Button size="small" clicked={cancelled}>Cancel</Button>
      </div>
    );
  }

  const submitButtonContent = loading ? <Loader size="small" /> : btnText;

  let buttonsBox = null;
  if (btnText) {
    buttonsBox = (
      <div className="buttons-box">
        {cancelButton}
        <Button size="big" filled type="submit" disabled={!isValid || loading}>
          {submitButtonContent}
        </Button>
      </div>
    );
  }

  let form = null;
  if (submitted) {
    form = (
      <form onSubmit={submitted}>
        {children}
        {buttonsBox}
      </form>
    );
  } else {
    form = (
      <FormikForm className="formik-form">
        {children}
        {buttonsBox}
      </FormikForm>
    );
  }

  return (
    <SC.Wrapper height={height}>
      {heading}
      {form}
      {errorNode}
    </SC.Wrapper>
  );
};

export default Form;
