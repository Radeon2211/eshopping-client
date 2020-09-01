import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';
import { inputKinds } from '../../shared/constants';

const ChangeName = () => {
  const userProfile = useSelector((state) => state.auth.profile);

  const dispatch = useDispatch();
  const onChangeName = useCallback((creds) => dispatch(actions.changeName(creds)), [dispatch]);

  return (
    <Formik
      initialValues={{
        firstName: userProfile?.firstName,
        lastName: userProfile?.lastName,
      }}
      onSubmit={(data) => {
        onChangeName(data);
      }}
    >
      {({ dirty }) => (
        <Form btnText="change" headingText="Change your name" isValid={dirty} cancellable>
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'text',
              name: 'firstName',
              id: 'firstName',
              placeholder: 'Your first name',
              autoComplete: 'given-name',
            }}
            label="First name"
          />
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'text',
              name: 'lastName',
              id: 'lastName',
              placeholder: 'Your last name',
              autoComplete: 'family-name',
            }}
            label="Last name"
          />
        </Form>
      )}
    </Formik>
  );
};

export default ChangeName;
