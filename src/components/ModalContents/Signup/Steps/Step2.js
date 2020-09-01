import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import * as SC from '../Signup.sc';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import SideBySide from '../../../UI/SideBySide/SideBySide';
import { stepFormVariants } from '../../../../shared/framer';
import { inputKinds } from '../../../../shared/constants';
import { listOfAreaCodes } from '../../../../shared/utility';

const Step2 = (props) => {
  const {
    currentStep,
    goToNextStep,
    goToPrevStep,
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
  } = props;

  let btnDisabled = false;
  if (
    errors.firstName ||
    errors.lastName ||
    errors.phoneNumber ||
    errors.phonePrefix ||
    !touched.firstName ||
    !touched.lastName ||
    !touched.phoneNumber ||
    !touched.phonePrefix
  ) {
    btnDisabled = true;
  }

  return (
    <AnimatePresence>
      {currentStep === 2 && (
        <SC.Step variants={stepFormVariants} initial="hidden" animate="visible" exit="hidden">
          <div className="help-info-box">These data allow you to place orders.</div>
          <Input
            kind={inputKinds.INPUT}
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
            kind={inputKinds.INPUT}
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
              }}
              label="Phone number"
              isValid={!errors.phoneNumber}
              isTouched={touched.phoneNumber}
              captionText="You can hide phone number, but this may make it difficult for the courier to contact you"
            />
          </SideBySide>
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'checkbox',
              name: 'hidePhone',
              id: 'hidePhone',
            }}
            label="Hide my phone number from others"
          />
          <SC.Buttons buttonsNumber={2}>
            <Button onClick={goToPrevStep}>Previous</Button>
            <Button filled onClick={goToNextStep} disabled={btnDisabled}>
              Next
            </Button>
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
  errors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  touched: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default Step2;
