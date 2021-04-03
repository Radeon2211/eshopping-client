import React, { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import Form from '../../UI/Form/Form';
import Input from '../../UI/Input/Input';
import SideBySide from '../../UI/SideBySide';
import { inputKinds, userRules, listOfCountries, listOfAreaCodes } from '../../../shared/constants';
import { getPhonePrefixAndNumber, getChangedValues } from '../../../shared/utility/utility';

const validationSchema = Yup.object({
  firstName: userRules.firstName,
  lastName: userRules.lastName,
  street: userRules.street,
  zipCode: userRules.zipCode,
  city: userRules.city,
  country: userRules.country,
  phonePrefix: userRules.phonePrefix,
  phoneNumber: userRules.phoneNumber,
  onlyCurrentOrders: Yup.bool(),
});

const ChangeDeliveryAddress = () => {
  const deliveryAddress = useSelector((state) => state.auth.deliveryAddress);
  const { firstName, lastName, street, zipCode, city, country, phone } = deliveryAddress;

  const dispatch = useDispatch();
  const onChangeDeliveryAddress = useCallback(
    (creds) => dispatch(actions.changeDeliveryAddress(creds)),
    [dispatch],
  );

  const defaultCountry = listOfCountries.find(({ value }) => value === country);
  const { phoneNumber, phonePrefix } = getPhonePrefixAndNumber(phone);

  const initialValues = {
    firstName,
    lastName,
    street,
    zipCode,
    city,
    country: defaultCountry,
    phonePrefix,
    phoneNumber,
    onlyCurrentOrders: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        const changedValues = getChangedValues(data, initialValues);
        if (changedValues.country) {
          changedValues.country = data.country.value;
        }
        if (changedValues.phoneNumber || changedValues.phonePrefix) {
          changedValues.phone = `+${data.phonePrefix.value} ${data.phoneNumber}`;
        }
        delete changedValues.phoneNumber;
        delete changedValues.phonePrefix;

        onChangeDeliveryAddress({
          ...changedValues,
          onlyCurrentOrders: data.onlyCurrentOrders,
        });
      }}
    >
      {({
        dirty,
        setFieldTouched,
        setFieldValue,
        isValid,
        touched,
        errors,
        values,
        initialValues: initValues,
      }) => {
        const changedKeys = Object.entries(values)
          .map(([key, value]) => {
            if (value !== initValues[key]) return key;
            return false;
          })
          .filter(Boolean);
        const isReallyChanged =
          changedKeys.length > 1 ||
          (changedKeys.length === 1 && !changedKeys.includes('onlyCurrentOrders'));

        return (
          <Form
            btnText="change"
            headingText="Change your delivery address"
            isValid={dirty && isValid && isReallyChanged}
            cancellable
          >
            <Input
              kind={inputKinds.INPUT}
              config={{
                type: 'text',
                name: 'firstName',
                id: 'firstName',
                placeholder: 'Your first name',
                autoComplete: 'given-name',
                autoFocus: true,
                onInput: setFieldTouched.bind(this, 'firstName', true, true),
                'data-testid': 'ChangeDeliveryAddress-first-name',
              }}
              label="First name"
              isValid={!errors.firstName}
              isTouched={touched.firstName}
            />
            <Input
              kind={inputKinds.INPUT}
              config={{
                type: 'text',
                name: 'lastName',
                id: 'lastName',
                placeholder: 'Your last name',
                autoComplete: 'family-name',
                onInput: setFieldTouched.bind(this, 'lastName', true, true),
                'data-testid': 'ChangeDeliveryAddress-last-name',
              }}
              label="Last name"
              isValid={!errors.lastName}
              isTouched={touched.lastName}
            />
            <Input
              kind={inputKinds.INPUT}
              config={{
                type: 'text',
                name: 'street',
                id: 'street',
                placeholder: 'Your street and number',
                autoComplete: 'street-address',
                onInput: setFieldTouched.bind(this, 'street', true, true),
                'data-testid': 'ChangeDeliveryAddress-street',
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
                  'data-testid': 'ChangeDeliveryAddress-zip-code',
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
                  'data-testid': 'ChangeDeliveryAddress-city',
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
            <SideBySide proportion="1/1">
              <Input
                kind={inputKinds.SELECT}
                config={{
                  name: 'phonePrefix',
                  id: 'phonePrefix',
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
                  'data-testid': 'ChangeDeliveryAddress-phone-number',
                }}
                label="Phone number"
                isValid={!errors.phoneNumber}
                isTouched={touched.phoneNumber}
              />
            </SideBySide>
            <Input
              kind={inputKinds.INPUT}
              config={{
                type: 'checkbox',
                name: 'onlyCurrentOrders',
                id: 'onlyCurrentOrders',
                checked: values.onlyCurrentOrders,
                'data-testid': 'ChangeDeliveryAddress-only-current-orders',
              }}
              label="Apply changes only to these orders"
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default ChangeDeliveryAddress;
