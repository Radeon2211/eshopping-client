import React, { useState, useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import * as SC from './Signup.sc';
import Form from '../../UI/Form/Form';
import Heading from '../../UI/Heading/Heading';
import ProgressBar from './ProgressBar/ProgressBar';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import { userRules } from '../../../shared/constants';

const validationSchema = Yup.object(userRules);

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const dispatch = useDispatch();
  const onRegisterUser = useCallback((creds) => dispatch(actions.registerUser(creds)), [dispatch]);

  const goToNextStep = () => {
    setCurrentStep((prevState) => {
      if (prevState < 3) return prevState + 1;
      return prevState;
    });
  };

  const goToPrevStep = () => {
    setCurrentStep((prevState) => {
      if (prevState > 1) return prevState - 1;
      return prevState;
    });
  };

  return (
    <SC.Wrapper>
      <Heading variant="h3">Register new account</Heading>
      <div className="progress-bar-box">
        <ProgressBar stepsNumber={3} currentStep={currentStep} />
      </div>
      <Formik
        initialValues={{
          email: '',
          hideEmail: false,
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          phonePrefix: null,
          phoneNumber: '',
          hidePhone: false,
          street: '',
          zipCode: '',
          city: '',
          country: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          onRegisterUser(data);
        }}
      >
        {({ errors, touched, setFieldTouched, setFieldValue, values }) => (
          <Form height={46}>
            <Step1
              goToNextStep={goToNextStep}
              errors={errors}
              values={values}
              touched={touched}
              currentStep={currentStep}
              setFieldTouched={setFieldTouched}
            />
            <Step2
              goToPrevStep={goToPrevStep}
              goToNextStep={goToNextStep}
              errors={errors}
              values={values}
              touched={touched}
              currentStep={currentStep}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />
            <Step3
              goToPrevStep={goToPrevStep}
              errors={errors}
              touched={touched}
              currentStep={currentStep}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              formValues={values}
            />
          </Form>
        )}
      </Formik>
    </SC.Wrapper>
  );
};

export default Signup;
