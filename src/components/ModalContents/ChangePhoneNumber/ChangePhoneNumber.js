import { useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import Form from '../../UI/Form/Form';
import Input from '../../UI/Input/Input';
import SideBySide from '../../UI/SideBySide';
import { inputKinds, userRules, listOfAreaCodes } from '../../../shared/constants';
import { getPhonePrefixAndNumber } from '../../../shared/utility/utility';

const validationSchema = Yup.object({
  phonePrefix: userRules.phonePrefix,
  phoneNumber: userRules.phoneNumber,
});

export default function ChangePhoneNumber() {
  const userProfile = useSelector((state) => state.auth.profile);

  const dispatch = useDispatch();
  const onUpdateUser = useCallback(
    (creds, message) => dispatch(actions.updateUser(creds, message)),
    [dispatch],
  );

  const { phoneNumber, phonePrefix } = getPhonePrefixAndNumber(userProfile.phone);

  return (
    <Formik
      initialValues={{
        phonePrefix,
        phoneNumber,
      }}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        const correctData = { phone: `+${data.phonePrefix.value} ${data.phoneNumber}` };
        onUpdateUser(correctData, 'Phone number has been changed successfully');
      }}
    >
      {({ dirty, isValid, touched, errors, setFieldTouched, setFieldValue }) => (
        <Form
          btnText="change"
          headingText="Change your phone number"
          isValid={dirty && isValid}
          cancellable
        >
          <SideBySide $proportion="1/1">
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
                autoFocus: true,
                onInput: setFieldTouched.bind(this, 'phoneNumber', true, true),
                'data-testid': 'ChangePhoneNumber-phoneNumber',
              }}
              label="Phone number"
              isValid={!errors.phoneNumber}
              isTouched={touched.phoneNumber}
            />
          </SideBySide>
        </Form>
      )}
    </Formik>
  );
}
