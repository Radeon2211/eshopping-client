import React, { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import Form from '../../UI/Form/Form';
import Input from '../../UI/Input/Input';
import { inputKinds, userRules } from '../../../shared/constants';
import { getChangedValues } from '../../../shared/utility/utility';

const validationSchema = Yup.object({
  firstName: userRules.firstName,
  lastName: userRules.lastName,
});

export default function ChangeName() {
  const userProfile = useSelector((state) => state.auth.profile);

  const dispatch = useDispatch();
  const onUpdateUser = useCallback(
    (creds, message) => dispatch(actions.updateUser(creds, message)),
    [dispatch],
  );

  const initialValues = {
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        const changedValues = getChangedValues(data, initialValues);
        onUpdateUser(changedValues, 'Name has been changed successfully');
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
              autoFocus: true,
              onInput: setFieldTouched.bind(this, 'firstName', true, true),
              'data-testid': 'ChangeName-firstName',
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
              'data-testid': 'ChangeName-lastName',
            }}
            label="Last name"
            isValid={!errors.lastName}
            isTouched={touched.lastName}
          />
        </Form>
      )}
    </Formik>
  );
}
