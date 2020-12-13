import React, { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';
import { inputKinds, userRules } from '../../shared/constants';

const validationSchema = Yup.object({
  firstName: userRules.firstName,
  lastName: userRules.lastName,
});

const ChangeName = () => {
  const userProfile = useSelector((state) => state.auth.profile);

  const dispatch = useDispatch();
  const onChangeName = useCallback((creds) => dispatch(actions.changeName(creds)), [dispatch]);

  return (
    <Formik
      initialValues={{
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
      }}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        onChangeName(data);
      }}
    >
      {({ dirty, errors, touched, isValid, setFieldTouched }) => (
        <Form
          btnText="change"
          headingText="Change your name"
          isValid={dirty && isValid}
          cancellable
        >
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'text',
              name: 'firstName',
              id: 'firstName',
              placeholder: 'Your first name',
              autoComplete: 'given-name',
              onInput: setFieldTouched.bind(this, 'firstName', true, true),
            }}
            label="First name"
            isValid={!errors.firstName}
            isTouched={touched.firstName}
          />
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'text',
              name: 'lastName',
              id: 'lastName',
              placeholder: 'Your last name',
              autoComplete: 'family-name',
              onInput: setFieldTouched.bind(this, 'lastName', true, true),
            }}
            label="Last name"
            isValid={!errors.lastName}
            isTouched={touched.lastName}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ChangeName;
