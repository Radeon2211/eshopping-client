import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as SC from './Signup.sc';
import Form from '../../../components/UI/Form/Form';
import Heading from '../../../components/UI/Heading/Heading';
import ProgressBar from './ProgressBar/ProgressBar';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';

const validationSchema = Yup.object({
  email: Yup.string().email().trim().required(),
  hideEmail: Yup.bool(),
  username: Yup.string().min(3).max(20).trim().required(),
  password: Yup.string().min(7).max(64).trim().required(),
  firstName: Yup.string().max(60).required(),
  lastName: Yup.string().max(80).required(),
  phonePrefix: Yup.object().shape({
    value: Yup.string().required(),
    label: Yup.string().required(),
  }).nullable().required(),
  phoneNumber: Yup.string().max(15).trim().required(),
  hidePhone: Yup.bool(),
  street: Yup.string().max(60).required(),
  zipCode: Yup.string().trim().required(),
  city: Yup.string().max(100).required(),
  country: Yup.object().shape({
    value: Yup.string().required(),
    label: Yup.string().required(),
  }).nullable().required(),
});

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prevState) => prevState + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevState) => prevState - 1);
    }
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
          console.log(data);
        }}
      >
        {({ errors, touched, setFieldTouched, setFieldValue, values }) => {
          return (
            <Form height={50}>
              <Step1 goToNextStep={goToNextStep} errors={errors} touched={touched} currentStep={currentStep} setFieldTouched={setFieldTouched} />
              <Step2 goToPrevStep={goToPrevStep} goToNextStep={goToNextStep} errors={errors} touched={touched} currentStep={currentStep} setFieldTouched={setFieldTouched} setFieldValue={setFieldValue} />
              <Step3 goToPrevStep={goToPrevStep} errors={errors} touched={touched} currentStep={currentStep} setFieldTouched={setFieldTouched} setFieldValue={setFieldValue} formValues={values} />
            </Form>
          );
        }}
      </Formik>
    </SC.Wrapper>
  );
};

export default Signup;
