import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';
import { inputKinds } from '../../shared/constants';

const Login = () => {
  const dispatch = useDispatch();
  const onLoginUser = useCallback((creds) => dispatch(actions.loginUser(creds)), [dispatch]);

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
        </Form>
      )}
    </Formik>
  );
};

export default Login;