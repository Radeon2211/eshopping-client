import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import * as SC from '../Signup.sc';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import { stepFormVariants } from '../../../../shared/framer';

const Step1 = (props) => {
  const { currentStep, goToNextStep, errors, touched, setFieldTouched } = props;

  let btnDisabled = false;
  if (errors.email || errors.username || errors.password || !touched.email || !touched.username || !touched.password) {
    btnDisabled = true;
  }

  return (
    <AnimatePresence exitBeforeEnter>
      {currentStep === 1 && (
        <SC.Step
          variants={stepFormVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="help-info-box">
            <span className="help-info-line">
              Email can be used by others to contact with you, but you can hide it.
            </span>
            <span className="help-info-line">
              Username will be visible by everyone and cannot be changed.
            </span>
          </div>
          <Input
            kind="input"
            config={{
              type: 'email',
              name: 'email',
              id: 'email',
              placeholder: 'Your email address',
              autoComplete: 'email',
              onInput: setFieldTouched.bind(this, 'email', true, true),
            }}
            label="Email"
            isValid={!errors.email}
            isTouched={touched.email}
          />
          <Input
            kind="input"
            config={{
              type: 'checkbox',
              name: 'hideEmail',
              id: 'hideEmail',
            }}
            label="Hide my email address from others"
          />
          <Input
            kind="input"
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
          <Input
            kind="input"
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
            <Button size="big" filled onClick={goToNextStep} disabled={btnDisabled}>Next</Button>
          </SC.Buttons>
        </SC.Step>
      )}
    </AnimatePresence>
  );
};

Step1.propTypes = {
  currentStep: PropTypes.number.isRequired,
  goToNextStep: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
};

export default Step1;
