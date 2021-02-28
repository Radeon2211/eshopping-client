import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import * as SC from '../Signup.sc';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import SideBySide from '../../../UI/SideBySide';
import PlainText from '../../../UI/PlainText';
import { stepFormVariants } from '../Signup.sc';
import { inputKinds, listOfAreaCodes } from '../../../../shared/constants';

const Step2 = (props) => {
  const {
    currentStep,
    goToNextStep,
    goToPrevStep,
    errors,
    values,
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
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'text',
              name: 'firstName',
              id: 'firstName',
              placeholder: 'Your first name (up to 60 characters)',
              autoComplete: 'given-name',
              autoFocus: true,
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
          <PlainText
            size="1"
            mgTop="2"
            extraMgTop="0.4rem"
            minusMgTop
            mgBottom="3"
            textAlign="justify"
            display="block"
          >
            Name is visible only to user you will place order with (and you can change it to
            specific order)
          </PlainText>
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
                placeholder: 'Your phone number (numbers, dashes)',
                autoComplete: 'tel-national',
                onInput: setFieldTouched.bind(this, 'phoneNumber', true, true),
              }}
              label="Phone number"
              isValid={!errors.phoneNumber}
              isTouched={touched.phoneNumber}
            />
          </SideBySide>
          <PlainText
            size="1"
            mgTop="2"
            extraMgTop="0.4rem"
            minusMgTop
            mgBottom="3"
            textAlign="justify"
            display="block"
          >
            You can change phone number to specific order
          </PlainText>
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
          <PlainText
            size="1"
            mgTop="2"
            extraMgTop="0.4rem"
            minusMgTop
            mgBottom="3"
            textAlign="justify"
            display="block"
          >
            Phone number is visible to everyone by default. You can hide it from others (it will
            still be visible to user who will place order with you and to user you will place order
            with)
          </PlainText>
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
