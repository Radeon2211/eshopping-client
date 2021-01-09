import React, { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';
import { inputKinds, userRules } from '../../shared/constants';

const validationSchema = Yup.object({
  hideEmail: userRules.hideEmail,
  hidePhone: userRules.hidePhone,
});

const ChangeContacts = () => {
  const userProfile = useSelector((state) => state.auth.profile);

  const dispatch = useDispatch();
  const onUpdateUser = useCallback(
    (creds, message) => dispatch(actions.updateUser(creds, message)),
    [dispatch],
  );

  return (
    <Formik
      initialValues={{
        hideEmail: !userProfile.contacts.includes('email'),
        hidePhone: !userProfile.contacts.includes('phone'),
      }}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        const contacts = [];
        if (!data.hideEmail) contacts.push('email');
        if (!data.hidePhone) contacts.push('phone');
        const correctData = { contacts };
        onUpdateUser(correctData, 'Contacts have been changed successfully');
      }}
    >
      {({ dirty, isValid, values }) => (
        <Form
          btnText="change"
          headingText="Change your contacts visibility"
          isValid={dirty && isValid}
          cancellable
        >
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'checkbox',
              name: 'hideEmail',
              id: 'hideEmail',
              checked: values.hideEmail,
            }}
            label="Hide my email address from others"
          />
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'checkbox',
              name: 'hidePhone',
              id: 'hidePhone',
              checked: values.hidePhone,
            }}
            label="Hide my phone number from others"
          />
        </Form>
      )}
    </Formik>
  );
};

export default ChangeContacts;
