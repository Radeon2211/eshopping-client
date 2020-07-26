import React from 'react';
import { AnimatePresence } from 'framer-motion';
import * as SC from '../Signup.sc';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import { stepFormVariants } from '../../../../shared/framer';

const Step2 = (props) => {
  const { currentStep, goToNextStep, goToPrevStep, errors, touched, setFieldTouched } = props;

  let btnDisabled = false;
  if (errors.firstName || errors.lastName || errors.phone || !touched.firstName || !touched.lastName || !touched.phone) {
    btnDisabled = true;
  }

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
          <Input
            kind="input"
            config={{
              type: 'text',
              name: 'phone',
              id: 'phone',
              placeholder: 'Your phone number',
              autoComplete: 'tel-national',
              onInput: setFieldTouched.bind(this, 'phone', true, true),
            }}
            label="Phone number"
            isValid={!errors.phone}
            isTouched={touched.phone}
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

export default Step2;
