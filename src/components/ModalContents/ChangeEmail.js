import React, { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';
import { inputKinds, userRules } from '../../shared/constants';
import PlainText from '../UI/PlainText';

const validationSchema = Yup.object({
  email: userRules.email,
});

const ChangeEmail = () => {
  const userProfile = useSelector((state) => state.auth.profile);

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
      {({ dirty, errors, touched, values, isValid, setFieldTouched }) => (
        <Form
          btnText="change"
          headingText="Change your email"
          isValid={dirty && isValid && userProfile.email !== values.email}
          cancellable
        >
          <PlainText size="1" mgBottom="3" textAlign="justify">
            We will send to given email address an email with verification link. Link will be active
            for 10 minutes. To resend an email you will need to fill this form again.
          </PlainText>
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'email',
              name: 'email',
              id: 'email',
              placeholder: 'Your new email',
              autoComplete: 'email',
              autoFocus: true,
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
