import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import Form from '../../UI/Form/Form';
import Input from '../../UI/Input/Input';
import PlainText from '../../UI/PlainText';
import { inputKinds, modalTypes } from '../../../shared/constants';
import { GreenText } from '../../../styled/components';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const onResetPassword = useCallback((email) => dispatch(actions.resetPassword(email)), [
    dispatch,
  ]);
  const onSetModal = useCallback((modalContent) => dispatch(actions.setModal(modalContent)), [
    dispatch,
  ]);

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={(data) => {
        onResetPassword(data.email);
      }}
    >
      {({ dirty }) => (
        <Form btnText="send" headingText="Reset your password" isValid={dirty} cancellable>
          <PlainText size="1" mgBottom="3">
            We will send you an email with verification link. After clicking it, you receive another
            email with new password.
          </PlainText>
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'email',
              name: 'email',
              id: 'email',
              placeholder: 'Your email address',
              autoComplete: 'email',
              autoFocus: true,
              'data-testid': 'ResetPassword-email',
            }}
            label="Email"
          />
          <PlainText size="1" mgBottom="3">
            <GreenText onClick={() => onSetModal(modalTypes.LOGIN)}>Login</GreenText>
          </PlainText>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassword;
