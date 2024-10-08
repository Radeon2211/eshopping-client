import { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import Form from '../../UI/Form/Form';
import Input from '../../UI/Input/Input';
import { anyStringRule, userRules } from '../../../shared/constants';
import { InputKind } from '../../../shared/types/types';

const validationSchema = Yup.object({
  currentPassword: anyStringRule,
  password: userRules.password,
});

export default function ChangePassword() {
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
            kind={InputKind.INPUT}
            config={{
              type: 'password',
              name: 'currentPassword',
              id: 'currentPassword',
              placeholder: 'Your current password',
              autoComplete: 'off',
              autoFocus: true,
              'data-testid': 'ChangePassword-current-password',
            }}
            isValid={!errors.currentPassword}
            isTouched={touched.currentPassword}
            label="Current password"
          />
          <Input
            kind={InputKind.INPUT}
            config={{
              type: 'password',
              name: 'password',
              id: 'password',
              placeholder: 'Secure password (7-64 characters)',
              autoComplete: 'off',
              onInput: setFieldTouched.bind(this, 'password', true, true),
              'data-testid': 'ChangePassword-password',
            }}
            isValid={!errors.password}
            isTouched={touched.password}
            label="New password"
          />
        </Form>
      )}
    </Formik>
  );
}
