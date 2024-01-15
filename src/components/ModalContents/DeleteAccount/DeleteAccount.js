import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../../../store/actions/indexActions';
import Form from '../../UI/Form/Form';
import Input from '../../UI/Input/Input';
import { inputKinds } from '../../../shared/constants';

export default function DeleteAccount() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onDeleteAccount = useCallback(
    (creds, navigateFn) => dispatch(actions.deleteAccount(creds, navigateFn)),
    [dispatch],
  );

  return (
    <Formik
      initialValues={{
        currentPassword: '',
      }}
      onSubmit={(data) => {
        onDeleteAccount(data, navigate);
      }}
    >
      {({ dirty }) => (
        <Form
          btnText="delete"
          btnColor="red"
          headingText="Delete your account"
          isValid={dirty}
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
              autoFocus: true,
              'data-testid': 'DeleteAccount-current-password',
            }}
            label="Current password"
          />
        </Form>
      )}
    </Formik>
  );
}
