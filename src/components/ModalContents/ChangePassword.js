import React, { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';
import { inputKinds, userRules } from '../../shared/constants';

const validationSchema = Yup.object({
  password: userRules.password,
});

const ChangePassword = () => {
  const dispatch = useDispatch();
  const onUpdateUser = useCallback(
    (creds, message) => dispatch(actions.updateUser(creds, message)),
    [dispatch],
  );

  return (
    <Formik
      initialValues={{
        currentPassword: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        onUpdateUser(data, 'Password has been changed successfully');
      }}
    >
      {({ dirty, errors, touched, isValid, setFieldTouched }) => (
        <Form
          btnText="change"
          headingText="Change your password"
          isValid={dirty && isValid}
          cancellable
        >
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'password',
              name: 'currentPassword',
              id: 'currentPassword',
              placeholder: 'Your current password',
              autoComplete: 'off',
            }}
            label="Current password"
          />
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'password',
              name: 'password',
              id: 'password',
              placeholder: 'Secure password (7-64 characters)',
              autoComplete: 'off',
              onInput: setFieldTouched.bind(this, 'password', true, true),
            }}
            isValid={!errors.password}
            isTouched={touched.password}
            label="New password"
          />
        </Form>
      )}
    </Formik>
  );
};

export default ChangePassword;
