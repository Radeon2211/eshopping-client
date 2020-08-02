import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';

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
            kind="input"
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
            kind="input"
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
