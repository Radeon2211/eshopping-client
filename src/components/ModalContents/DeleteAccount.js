import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../../store/actions/indexActions';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';
import { inputKinds } from '../../shared/constants';

const DeleteAccount = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const onDeleteAccount = useCallback(
    (creds, currentHistory) => dispatch(actions.deleteAccount(creds, currentHistory)),
    [dispatch],
  );

  return (
    <Formik
      initialValues={{
        currentPassword: '',
      }}
      onSubmit={(data) => {
        onDeleteAccount(data, history);
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
            }}
            label="Current password"
          />
        </Form>
      )}
    </Formik>
  );
};

export default DeleteAccount;
