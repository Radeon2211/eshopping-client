import React, { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';
import SideBySide from '../UI/SideBySide/SideBySide';
import { inputKinds } from '../../shared/constants';
import { listOfAreaCodes } from '../../shared/utility';

const validationSchema = Yup.object({
  phonePrefix: Yup.object()
    .shape({
      value: Yup.string().required(),
      label: Yup.string().required(),
    })
    .nullable()
    .required(),
  phoneNumber: Yup.string().max(15).trim().required(),
});

const ChangePhoneNumber = () => {
  const userProfile = useSelector((state) => state.auth.profile);

  const dispatch = useDispatch();
  const onChangePhoneNumber = useCallback((creds) => dispatch(actions.changePhoneNumber(creds)), [
    dispatch,
  ]);

  const currentPhonePrefix = userProfile.phone.split(' ')[0].split('+')[1];
  const defaultPhonePrefix = listOfAreaCodes.find(({ value }) => value === currentPhonePrefix);
  const defaultPhoneNumber = userProfile.phone.split(' ')[1];

  return (
    <Formik
      initialValues={{
        phonePrefix: defaultPhonePrefix,
        phoneNumber: defaultPhoneNumber,
      }}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        onChangePhoneNumber(data);
      }}
    >
      {({ dirty, setFieldTouched, setFieldValue, isValid, touched, errors }) => (
        <Form
          btnText="change"
          headingText="Change your phone number"
          isValid={dirty && isValid}
          cancellable
        >
          <SideBySide proportion="1/1">
            <Input
              kind={inputKinds.SELECT}
              config={{
                name: 'phonePrefix',
                id: 'phonePrefix',
                value: '',
                placeholder: 'Choose your phone number prefix',
                options: listOfAreaCodes,
                setFieldValue,
                setFieldTouched,
              }}
              label="Phone number prefix"
              isValid={!errors.phonePrefix}
              isTouched={touched.phonePrefix}
            />
            <Input
              kind={inputKinds.INPUT}
              config={{
                type: 'text',
                name: 'phoneNumber',
                id: 'phoneNumber',
                placeholder: 'Your phone number',
                autoComplete: 'tel-national',
                onInput: setFieldTouched.bind(this, 'phoneNumber', true, true),
              }}
              label="Phone number"
              isValid={!errors.phoneNumber}
              isTouched={touched.phoneNumber}
            />
          </SideBySide>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePhoneNumber;
