import React from 'react';
import PropTypes from 'prop-types';
import * as SC from './ProgressBar.sc';
import { ReactComponent as CheckMarkIcon } from '../../../../images/icons/check-mark.svg';
import MyIcon from '../../../UI/MyIcon';
import PlainText from '../../../UI/PlainText';

export default function ProgressBar({ stepsNumber, currentStep }) {
  const steps = [];
  for (let i = 1; i <= stepsNumber; i += 1) {
    steps.push(
      <React.Fragment key={i}>
        <div className={`step-box${currentStep >= i ? ' active' : ''}`}>
          <PlainText $size="level3" $lineHeight="level1">
            <SC.StepBoxContent $visible={currentStep > i}>
              <MyIcon $size="small" $color="#000">
                <CheckMarkIcon />
              </MyIcon>
            </SC.StepBoxContent>
            <SC.StepBoxContent
              $visible={currentStep <= i}
              data-testid={`ProgressBar-step-box-number-${currentStep <= i ? 'visible' : 'hidden'}`}
            >
              {i}
            </SC.StepBoxContent>
          </PlainText>
        </div>
        {i < stepsNumber && (
          <div className="step-line">
            <div className={`step-line-fill${currentStep > i ? ' active' : ''}`} />
          </div>
        )}
      </React.Fragment>,
    );
  }

  return <SC.Wrapper>{steps}</SC.Wrapper>;
}

ProgressBar.propTypes = {
  stepsNumber: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
};
