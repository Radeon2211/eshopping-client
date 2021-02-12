import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import * as SC from '../Signup.sc';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import PlainText from '../../../UI/PlainText';
import { stepFormVariants } from '../../../../shared/framer';
import { inputKinds } from '../../../../shared/constants';

const Step1 = (props) => {
  const { currentStep, goToNextStep, errors, touched, setFieldTouched } = props;

  let btnDisabled = false;
  if (
    errors.email ||
    errors.username ||
    errors.password ||
    !touched.email ||
    !touched.username ||
    !touched.password
  ) {
    btnDisabled = true;
  }

  return (
    <AnimatePresence exitBeforeEnter>
      {currentStep === 1 && (
        <SC.Step variants={stepFormVariants} initial="hidden" animate="visible" exit="hidden">
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'email',
              name: 'email',
              id: 'email',
              placeholder: 'Your email address',
              autoComplete: 'email',
              autoFocus: true,
              onInput: setFieldTouched.bind(this, 'email', true, true),
            }}
            label="Email"
            isValid={!errors.email}
            isTouched={touched.email}
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
            We will send verification link to this email, so make sure it is correct. If you provide
            someone else&apos;s email, that person will have access to that account.
          </PlainText>
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'checkbox',
              name: 'hideEmail',
              id: 'hideEmail',
            }}
            label="Hide my email address from others"
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
            Email is visible to everyone by default. You can hide it from others (it will still be
            visible to people who will place order with you).
          </PlainText>
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'text',
              name: 'username',
              id: 'username',
              placeholder: 'Your identifier (3-20 characters)',
              autoComplete: 'username',
              onInput: setFieldTouched.bind(this, 'username', true, true),
            }}
            label="Username"
            isValid={!errors.username}
            isTouched={touched.username}
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
            Username will be visible to everyone and cannot be changed
          </PlainText>
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'password',
              name: 'password',
              id: 'password',
              placeholder: 'Secure password (7-64 characters)',
              autoComplete: 'off',
              onInput: setFieldTouched.bind(this, 'password', true, true),
            }}
            label="Password"
            isValid={!errors.password}
            isTouched={touched.password}
          />
          <SC.Buttons buttonsNumber={1}>
            <Button filled onClick={goToNextStep} disabled={btnDisabled}>
              Next
            </Button>
          </SC.Buttons>
        </SC.Step>
      )}
    </AnimatePresence>
  );
};

Step1.propTypes = {
  currentStep: PropTypes.number.isRequired,
  goToNextStep: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  touched: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setFieldTouched: PropTypes.func.isRequired,
};

export default Step1;
