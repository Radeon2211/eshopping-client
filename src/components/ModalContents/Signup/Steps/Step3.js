import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import * as SC from '../Signup.sc';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import SideBySide from '../../../UI/SideBySide';
import PlainText from '../../../UI/PlainText';
import { stepFormVariants } from '../Signup.sc';
import { inputKinds, listOfCountries } from '../../../../shared/constants';
import * as propTypes from '../../../../shared/propTypes';

export default function Step3(props) {
  const { isVisible, goToPrevStep, errors, touched, setFieldTouched, setFieldValue, values } =
    props;

  const isFormLoading = useSelector((state) => state.ui.isFormLoading);

  let btnDisabled = false;
  if (
    errors.street ||
    errors.zipCode ||
    errors.city ||
    (errors.country && !values.country) ||
    !touched.street ||
    !touched.zipCode ||
    !touched.city ||
    !touched.country
  ) {
    btnDisabled = true;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <SC.Step
          variants={stepFormVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          data-testid="Step3"
        >
          <PlainText $size="level1" $mgBottom="level3" $textAlign="justify">
            These data will be visible only to user you will place order with (and you can change it
            to specific order)
          </PlainText>
          <Input
            kind={inputKinds.INPUT}
            config={{
              type: 'text',
              name: 'street',
              id: 'street',
              placeholder: 'Your street and number',
              autoComplete: 'street-address',
              autoFocus: true,
              onInput: setFieldTouched.bind(this, 'street', true, true),
              'data-testid': 'Step3-street',
            }}
            label="Street and number"
            isValid={!errors.street}
            isTouched={touched.street}
          />
          <SideBySide $proportion="1/3">
            <Input
              kind={inputKinds.INPUT}
              config={{
                type: 'text',
                name: 'zipCode',
                id: 'zipCode',
                placeholder: 'Your zip code',
                autoComplete: 'postal-code',
                onInput: setFieldTouched.bind(this, 'zipCode', true, true),
                'data-testid': 'Step3-zipCode',
              }}
              label="Zip code"
              isValid={!errors.zipCode}
              isTouched={touched.zipCode}
            />
            <Input
              kind={inputKinds.INPUT}
              config={{
                type: 'text',
                name: 'city',
                id: 'city',
                placeholder: 'Your city',
                autoComplete: 'address-level2',
                onInput: setFieldTouched.bind(this, 'city', true, true),
                'data-testid': 'Step3-city',
              }}
              label="City"
              isValid={!errors.city}
              isTouched={touched.city}
            />
          </SideBySide>
          <Input
            kind={inputKinds.SELECT}
            config={{
              name: 'country',
              id: 'country',
              placeholder: 'Choose your country',
              options: listOfCountries,
              setFieldValue,
              setFieldTouched,
            }}
            label="Country"
            isValid={Boolean(!errors.country || values.country)}
            isTouched={touched.country}
          />
          <PlainText $size="level1" $mgBottom="level3" $textAlign="justify">
            We will send verification link to email provided by you. It will be active for 10
            minutes, but you will be able to resend the activation link later. If you do not
            activate your account within 1 hour, account will be deleted permanently
          </PlainText>
          <SC.Buttons $buttonsNumber={2}>
            <Button clicked={goToPrevStep} data-testid="Step3-previous-btn">
              Previous
            </Button>
            <Button type="submit" $filled disabled={btnDisabled || isFormLoading}>
              Finish
            </Button>
          </SC.Buttons>
        </SC.Step>
      )}
    </AnimatePresence>
  );
}

Step3.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  goToPrevStep: PropTypes.func.isRequired,
  errors: PropTypes.shape(propTypes.signupErrors).isRequired,
  touched: PropTypes.shape(propTypes.signupTouched).isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape(propTypes.signupValues).isRequired,
};
