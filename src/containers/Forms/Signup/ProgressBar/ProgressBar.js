import React from 'react';
import PropTypes from 'prop-types';
import * as SC from './ProgressBar.sc';

const ProgressBar = (props) => {
  const { stepsNumber, currentStep } = props;

  const steps = [];
  for (let i = 1; i <= stepsNumber; i++) {
    const stepBoxContent = currentStep > i ? '✓' : i;
    steps.push(
      <React.Fragment key={i}>
        <div className={`step-box${currentStep >= i ? ' active' : ''}`}>
          <span className="step-number">{stepBoxContent}</span>
        </div>
        {i < 3 && (
          <div className="step-line">
            <div className={`step-line-fill${currentStep > i ? ' active' : ''}`} />
          </div>
        )}
      </React.Fragment>
    );
  }

  return <SC.Wrapper>{steps}</SC.Wrapper>;
};

ProgressBar.propTypes = {
  stepsNumber: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default ProgressBar;
