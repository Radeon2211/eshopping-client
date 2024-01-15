import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import * as SC from '../Signup.sc';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import PlainText from '../../../UI/PlainText';
import { stepFormVariants } from '../Signup.sc';
import { inputKinds } from '../../../../shared/constants';
import * as propTypes from '../../../../shared/propTypes';

export default function Step1(props) {
  const { isVisible, goToNextStep, errors, values, touched, setFieldTouched } = props;

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
    <AnimatePresence mode="wait">
      {isVisible && (
        <SC.Step
          variants={stepFormVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          data-testid="Step1"
        >
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
              'data-testid': 'Step1-email',
            }}
            label="Email"
            isValid={!errors.email}
            isTouched={touched.email}
          />
          <PlainText
            $size="1"
            $mgTop="2"
            $extraMgTop="0.4rem"
            $minusMgTop
            $mgBottom="3"
            $textAlign="justify"
            $display="block"
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
              checked: values.hideEmail,
              'data-testid': 'Step1-hideEmail',
            }}
            label="Hide my email address from others"
          />
          <PlainText
            $size="1"
            $mgTop="2"
            $extraMgTop="0.4rem"
            $minusMgTop
            $mgBottom="3"
            $textAlign="justify"
            $display="block"
          >
            Email is visible to everyone by default. You can hide it from others (it will still be
            visible to people who will place order with you)
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
              'data-testid': 'Step1-username',
            }}
            label="Username"
            isValid={!errors.username}
            isTouched={touched.username}
          />
          <PlainText
            $size="1"
            $mgTop="2"
            $extraMgTop="0.4rem"
            $minusMgTop
            $mgBottom="3"
            $textAlign="justify"
            $display="block"
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
              'data-testid': 'Step1-password',
            }}
            label="Password"
            isValid={!errors.password}
            isTouched={touched.password}
          />
          <SC.Buttons $buttonsNumber={1}>
            <Button
              $filled
              clicked={goToNextStep}
              disabled={btnDisabled}
              data-testid="Step1-next-btn"
            >
              Next
            </Button>
          </SC.Buttons>
        </SC.Step>
      )}
    </AnimatePresence>
  );
}

Step1.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  goToNextStep: PropTypes.func.isRequired,
  errors: PropTypes.shape(propTypes.signupErrors).isRequired,
  touched: PropTypes.shape(propTypes.signupTouched).isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  values: PropTypes.shape(propTypes.signupValues).isRequired,
};
