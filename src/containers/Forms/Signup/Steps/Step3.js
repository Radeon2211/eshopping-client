import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import { getCountries } from 'country-fns';
import * as SC from '../Signup.sc';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import SideBySide from '../../../../components/UI/SideBySide/SideBySide';
import { stepFormVariants } from '../../../../shared/framer';

const Step3 = (props) => {
  const { currentStep, goToPrevStep, errors, touched, setFieldTouched, setFieldValue, formValues } = props;

  let btnDisabled = false;
  if (
    errors.street
    || errors.zipCode
    || errors.city
    || errors.country && !formValues.country
    || !touched.street
    || !touched.zipCode
    || !touched.city
    || !touched.country
  ) {
    btnDisabled = true;
  }

  const listOfCountries = getCountries().map(({ name }) => {
    const finalValue = name.split('(')[0].trim();
    return {
      value: finalValue,
      label: finalValue,
    };
  });

  return (
    <AnimatePresence>
      {currentStep === 3 && (
        <SC.Step
          variants={stepFormVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="help-info-box">
            <span className="help-info-line">
              These data are necessary to place orders.
            </span>
          </div>
          <Input
            kind="input"
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
              kind="input"
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
              kind="input"
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
            kind="select"
            config={{
              name: 'country',
              id: 'country',
              value: '',
              placeholder: 'Choose your country',
              options: listOfCountries,
              setFieldValue: setFieldValue,
              setFieldTouched: setFieldTouched,
            }}
            label="Country"
            isValid={!errors.country || formValues.country}
            isTouched={touched.country}
          />
          <SC.Buttons buttonsNumber={2}>
            <Button size="big" onClick={goToPrevStep}>Previous</Button>
            <Button type="submit" filled size="big" disabled={btnDisabled}>Finish</Button>
          </SC.Buttons>
        </SC.Step>
      )}
    </AnimatePresence>
  );
};

Step3.propTypes = {
  currentStep: PropTypes.number.isRequired,
  goToPrevStep: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  formValues: PropTypes.object.isRequired,
};

export default Step3;
