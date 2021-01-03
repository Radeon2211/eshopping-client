import React, { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';
import { inputKinds, userRules } from '../../shared/constants';

const validationSchema = Yup.object({
  email: userRules.email,
});

const ChangeEmail = () => {
  const userProfile = useSelector((state) => state.auth.profile);

  const dispatch = useDispatch();
  const onUpdateUser = useCallback((creds, message) => dispatch(actions.updateUser(creds, message)), [
    dispatch,
  ]);

  return (
    <Formik
      initialValues={{
        email: '',
        currentPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        onUpdateUser(data, 'Email has been changed successfully');
      }}
    >
      {({ dirty, errors, touched, values, isValid, setFieldTouched }) => (
        <Form
          btnText="change"
          headingText="Change your email"
          isValid={dirty && isValid && userProfile.email !== values.email}
          cancellable
        >
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'email',
              name: 'email',
              id: 'email',
              placeholder: 'Your new email',
              autoComplete: 'email',
              onInput: setFieldTouched.bind(this, 'email', true, true),
            }}
            isValid={!errors.email && userProfile.email !== values.email}
            isTouched={touched.email}
            label="New email"
          />
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
        </Form>
      )}
    </Formik>
  );
};

export default ChangeEmail;
