import { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import Form from '../../UI/Form/Form';
import Input from '../../UI/Input/Input';
import { userRules } from '../../../shared/constants';
import { InputKind } from '../../../shared/types/types';

const validationSchema = Yup.object({
  email: userRules.email,
});

export default function AddAdmin() {
  const dispatch = useDispatch();
  const onAddAdmin = useCallback((email) => dispatch(actions.addAdmin(email)), [dispatch]);

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        onAddAdmin(data.email);
      }}
    >
      {({ dirty, errors, touched, isValid, setFieldTouched }) => (
        <Form btnText="Add" headingText="Add admin" isValid={dirty && isValid} cancellable>
          <Input
            kind={InputKind.INPUT}
            config={{
              type: 'email',
              name: 'email',
              id: 'email',
              placeholder: 'Email of user that you want make an admin',
              autoComplete: 'email',
              autoFocus: true,
              onInput: setFieldTouched.bind(this, 'email', true, true),
              'data-testid': 'AddAdmin-email',
            }}
            isValid={!errors.email}
            isTouched={touched.email}
            label="Email"
          />
        </Form>
      )}
    </Formik>
  );
}
