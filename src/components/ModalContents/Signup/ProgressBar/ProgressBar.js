import React from 'react';
import PropTypes from 'prop-types';
import * as SC from './ProgressBar.sc';
import { ReactComponent as CheckMarkIcon } from '../../../../images/icons/check-mark.svg';
import MyIcon from '../../../UI/MyIcon';
import PlainText from '../../../UI/PlainText';

const ProgressBar = (props) => {
  const { stepsNumber, currentStep } = props;

  const steps = [];
  for (let i = 1; i <= stepsNumber; i += 1) {
    steps.push(
      <React.Fragment key={i}>
        <div className={`step-box${currentStep >= i ? ' active' : ''}`}>
          <PlainText size="3" lineHeight="1">
            <SC.StepBoxContent visible={currentStep > i} data-test="icon">
              <MyIcon size="small" color="#000">
                <CheckMarkIcon />
              </MyIcon>
            </SC.StepBoxContent>
            <SC.StepBoxContent visible={currentStep <= i} data-test="number">
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
};

ProgressBar.propTypes = {
  stepsNumber: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default ProgressBar;
