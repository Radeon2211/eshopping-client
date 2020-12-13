import React, { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';
import SideBySide from '../UI/SideBySide';
import { inputKinds, userRules } from '../../shared/constants';
import { listOfCountries } from '../../shared/utility';

const validationSchema = Yup.object({
  street: userRules.street,
  zipCode: userRules.zipCode,
  city: userRules.city,
  country: userRules.country,
});

const ChangeAddress = () => {
  const userProfile = useSelector((state) => state.auth.profile);

  const dispatch = useDispatch();
  const onChangeAddress = useCallback((creds) => dispatch(actions.changeAddress(creds)), [
    dispatch,
  ]);

  const defaultCountry = listOfCountries.find(({ value }) => value === userProfile.country);

  return (
    <Formik
      initialValues={{
        street: userProfile.street,
        zipCode: userProfile.zipCode,
        city: userProfile.city,
        country: defaultCountry,
      }}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        onChangeAddress(data);
      }}
    >
      {({ dirty, setFieldTouched, setFieldValue, isValid, touched, errors }) => (
        <Form
          btnText="change"
          headingText="Change your address"
          isValid={dirty && isValid}
          cancellable
        >
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'text',
              name: 'street',
              id: 'street',
              placeholder: 'Your street and number',
              autoComplete: 'street-address',
              onInput: setFieldTouched.bind(this, 'street', true, true),
            }}
            label="Street and number"
            isValid={!errors.street}
            isTouched={touched.street}
          />
          <SideBySide proportion="1/3">
            <Input
              kind={inputKinds.INPUT}
              config={{
                type: 'text',
                name: 'zipCode',
                id: 'zipCode',
                placeholder: 'Your zip code',
                autoComplete: 'postal-code',
                onInput: setFieldTouched.bind(this, 'zipCode', true, true),
              }}
              label="Zip code"
              isValid={!errors.zipCode}
              isTouched={touched.zipCode}
            />
            <Input
              kind={inputKinds.INPUT}
              config={{
                type: 'text',
                name: 'city',
                id: 'city',
                placeholder: 'Your city',
                autoComplete: 'address-level2',
                onInput: setFieldTouched.bind(this, 'city', true, true),
              }}
              label="City"
              isValid={!errors.city}
              isTouched={touched.city}
            />
          </SideBySide>
          <Input
            kind={inputKinds.SELECT}
            config={{
              name: 'country',
              id: 'country',
              placeholder: 'Choose your country',
              options: listOfCountries,
              setFieldValue,
              setFieldTouched,
            }}
            label="Country"
            isValid={Boolean(!errors.country)}
            isTouched={touched.country}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ChangeAddress;
