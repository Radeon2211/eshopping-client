import { useCallback } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import Form from '../../UI/Form/Form';
import Input from '../../UI/Input/Input';
import PlainText from '../../UI/PlainText';
import { GreenText } from '../../../styled/components';
import { InputKind, ModalType } from '../../../shared/types/types';

export default function Login() {
  const dispatch = useDispatch();
  const onLoginUser = useCallback((creds) => dispatch(actions.loginUser(creds)), [dispatch]);
  const onSetModal = useCallback(
    (modalContent) => dispatch(actions.setModal(modalContent)),
    [dispatch],
  );

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(data) => {
        onLoginUser(data);
      }}
    >
      {({ dirty }) => (
        <Form btnText="login" headingText="Login to your account" isValid={dirty} cancellable>
          <Input
            kind={InputKind.INPUT}
            config={{
              type: 'email',
              name: 'email',
              id: 'email',
              placeholder: 'Your email address',
              autoComplete: 'email',
              autoFocus: true,
              'data-testid': 'Login-email',
            }}
            label="Email"
          />
          <Input
            kind={InputKind.INPUT}
            config={{
              type: 'password',
              name: 'password',
              id: 'password',
              placeholder: 'Your password',
              autoComplete: 'off',
              'data-testid': 'Login-password',
            }}
            label="Password"
          />
          <PlainText $size="level1" $mgBottom="level3" role="link">
            <GreenText
              onClick={() => onSetModal(ModalType.RESET_PASSWORD)}
              data-testid="Login-forgot-password-link"
            >
              Forgot password
            </GreenText>
          </PlainText>
        </Form>
      )}
    </Formik>
  );
}
