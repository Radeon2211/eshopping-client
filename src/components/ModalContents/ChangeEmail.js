import React, { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';
import { inputKinds } from '../../shared/constants';

const validationSchema = Yup.object({
  email: Yup.string().email().trim().required(),
});

const ChangeEmail = () => {
  const dispatch = useDispatch();
  const onChangeEmail = useCallback((creds) => dispatch(actions.changeEmail(creds)), [dispatch]);

  return (
    <Formik
      initialValues={{
        email: '',
        currentPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        onChangeEmail(data);
      }}
    >
      {({ dirty, errors, touched, isValid }) => (
        <Form
          btnText="change"
          headingText="Change your email"
          isValid={dirty && isValid}
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
            }}
            isValid={!errors.email}
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
