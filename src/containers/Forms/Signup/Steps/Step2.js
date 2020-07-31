import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import { getCountries } from 'country-fns';
import * as SC from '../Signup.sc';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import SideBySide from '../../../../components/UI/SideBySide/SideBySide';
import { stepFormVariants } from '../../../../shared/framer';

const Step2 = (props) => {
  const { currentStep, goToNextStep, goToPrevStep, errors, touched, setFieldTouched, setFieldValue } = props;

  let btnDisabled = false;
  if (
    errors.firstName
    || errors.lastName
    || errors.phoneNumber
    || errors.phonePrefix
    || !touched.firstName
    || !touched.lastName
    || !touched.phoneNumber
    || !touched.phonePrefix
  ) {
    btnDisabled = true;
  }

  const listOfAreaCodes = getCountries().map(({ name, dial }) => {
    const finalValue = `+${dial} ${name.split('(')[0].trim()}`;
    return {
      value: dial,
      label: finalValue,
    };
  });

  return (
    <AnimatePresence>
      {currentStep === 2 && (
        <SC.Step
          variants={stepFormVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="help-info-box">
            <span className="help-info-line">
              These data allow you to place orders.
            </span>
            <span className="help-info-line">
              You can hide phone number, but this may make it difficult for the courier to contact you.
            </span>
          </div>
          <Input
            kind="input"
            config={{
              type: 'text',
              name: 'firstName',
              id: 'firstName',
              placeholder: 'Your first name (up to 60 characters)',
              autoComplete: 'given-name',
              onInput: setFieldTouched.bind(this, 'firstName', true, true),
            }}
            label="First name"
            isValid={!errors.firstName}
            isTouched={touched.firstName}
          />
          <Input
            kind="input"
            config={{
              type: 'text',
              name: 'lastName',
              id: 'lastName',
              placeholder: 'Your last name (up to 80 characters)',
              autoComplete: 'family-name',
              onInput: setFieldTouched.bind(this, 'lastName', true, true),
            }}
            label="Last name"
            isValid={!errors.lastName}
            isTouched={touched.lastName}
          />
          <SideBySide proportion="1/1">
            <Input
              kind="select"
              config={{
                name: 'phonePrefix',
                id: 'phonePrefix',
                value: '',
                placeholder: 'Choose your phone number prefix',
                options: listOfAreaCodes,
                setFieldValue: setFieldValue,
                setFieldTouched: setFieldTouched,
              }}
              label="Phone number prefix"
              isValid={!errors.phonePrefix}
              isTouched={touched.phonePrefix}
            />
            <Input
              kind="input"
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
          <Input
            kind="input"
            config={{
              type: 'checkbox',
              name: 'hidePhone',
              id: 'hidePhone',
            }}
            label="Hide my phone number from others"
          />
          <SC.Buttons buttonsNumber={2}>
            <Button size="big" onClick={goToPrevStep}>Previous</Button>
            <Button size="big" filled onClick={goToNextStep} disabled={btnDisabled}>Next</Button>
          </SC.Buttons>
        </SC.Step>
      )}
    </AnimatePresence>
  );
};

Step2.propTypes = {
  currentStep: PropTypes.number.isRequired,
  goToPrevStep: PropTypes.func.isRequired,
  goToNextStep: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default Step2;
