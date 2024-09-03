import { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as actions from '../../../store/actions/indexActions';
import Form from '../../UI/Form/Form';
import Input from '../../UI/Input/Input';
import { userRules } from '../../../shared/constants';
import { InputKind } from '../../../shared/types/types';
import { useTypedDispatch } from '../../../store/reducers/rootReducer';

const validationSchema = Yup.object({
  email: userRules.email,
});

export default function AddAdmin() {
  const dispatch = useTypedDispatch();
  const onAddAdmin = useCallback((email: string) => dispatch(actions.addAdmin(email)), [dispatch]);

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
              onInput: setFieldTouched.bind(AddAdmin, 'email', true, true),
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
