import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import * as SC from '../Signup.sc';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import SideBySide from '../../../UI/SideBySide';
import PlainText from '../../../UI/PlainText';
import { stepFormVariants } from '../Signup.sc';
import { inputKinds, listOfCountries } from '../../../../shared/constants';

const Step3 = (props) => {
  const {
    currentStep,
    goToPrevStep,
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
    formValues,
  } = props;

  const isFormLoading = useSelector((state) => state.ui.isFormLoading);

  let btnDisabled = false;
  if (
    errors.street ||
    errors.zipCode ||
    errors.city ||
    (errors.country && !formValues.country) ||
    !touched.street ||
    !touched.zipCode ||
    !touched.city ||
    !touched.country
  ) {
    btnDisabled = true;
  }

  return (
    <AnimatePresence>
      {currentStep === 3 && (
        <SC.Step variants={stepFormVariants} initial="hidden" animate="visible" exit="hidden">
          <PlainText size="1" mgBottom="3" textAlign="justify">
            These data will be visible only to user you will place order with (and you can change it
            to specific order)
          </PlainText>
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'text',
              name: 'street',
              id: 'street',
              placeholder: 'Your street and number',
              autoComplete: 'street-address',
              autoFocus: true,
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
            isValid={Boolean(!errors.country || formValues.country)}
            isTouched={touched.country}
          />
          <PlainText size="1" mgBottom="3" textAlign="justify">
            We will send verification link to email provided by you. It will be active for 10
            minutes, but you will be able to resend the activation link later. If you do not
            activate your account within 1 hour, account will be deleted permanently
          </PlainText>
          <SC.Buttons buttonsNumber={2}>
            <Button onClick={goToPrevStep}>Previous</Button>
            <Button type="submit" filled disabled={btnDisabled || isFormLoading}>
              Finish
            </Button>
          </SC.Buttons>
        </SC.Step>
      )}
    </AnimatePresence>
  );
};

Step3.propTypes = {
  currentStep: PropTypes.number.isRequired,
  goToPrevStep: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  touched: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  formValues: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Step3;
