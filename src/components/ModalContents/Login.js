import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';
import PlainText from '../UI/PlainText';
import { inputKinds, modalTypes } from '../../shared/constants';
import { GreenText } from '../../styled/components';

const Login = () => {
  const dispatch = useDispatch();
  const onLoginUser = useCallback((creds) => dispatch(actions.loginUser(creds)), [dispatch]);
  const onSetModal = useCallback((modalContent) => dispatch(actions.setModal(modalContent)), [
    dispatch,
  ]);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(data) => {
        onLoginUser(data);
      }}
    >
      {({ dirty }) => (
        <Form btnText="login" headingText="Login to your account" isValid={dirty} cancellable>
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'email',
              name: 'email',
              id: 'email',
              placeholder: 'Your email address',
              autoComplete: 'email',
              autoFocus: true,
            }}
            label="Email"
          />
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'password',
              name: 'password',
              id: 'password',
              placeholder: 'Your password',
              autoComplete: 'off',
            }}
            label="Password"
          />
          <PlainText size="1" mgBottom="3">
            <GreenText onClick={() => onSetModal(modalTypes.RESET_PASSWORD)}>
              Forgot password
            </GreenText>
          </PlainText>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
