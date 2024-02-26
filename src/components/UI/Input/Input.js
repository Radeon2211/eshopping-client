import PropTypes from 'prop-types';
import { Field } from 'formik';
import Textarea from 'react-textarea-autosize';
import Select from 'react-select';
import * as SC from './Input.sc';
import { inputKinds } from '../../../shared/constants';

export default function Input({ kind, config, label, isValid, isTouched }) {
  let input = null;
  let validityClassname = null;
  if (isValid !== undefined && isTouched) {
    validityClassname = isValid ? 'valid' : 'invalid';
  }

  switch (kind) {
    case inputKinds.INPUT:
      input = (
        <Field name={config.name}>{({ field }) => <SC.Input {...config} {...field} />}</Field>
      );
      break;
    case inputKinds.TEXTAREA:
      input = (
        <Field name={config.name}>
          {({ field }) => <Textarea {...config} {...field} className="textarea" />}
        </Field>
      );
      break;
    case inputKinds.SELECT:
      input = (
        <Field name={config.name}>
          {({ field }) => (
            <Select
              className="select"
              {...config}
              {...field}
              onChange={(option) => {
                config.setFieldValue(config.name, option);
                config.setFieldTouched(config.name, true, true);
              }}
            />
          )}
        </Field>
      );
      break;
    case inputKinds.RADIO:
      input = (
        <Field name={config.name}>
          {({ field }) =>
            config.options.map((option) => (
              <SC.RadioWrapper key={option.value} $checked={option.checked}>
                <SC.Input {...field} {...option} type="radio" />
                <label htmlFor={option.id}>{option.label}</label>
              </SC.RadioWrapper>
            ))
          }
        </Field>
      );
      break;
    default:
      input = (
        <Field name={config.name}>{({ field }) => <SC.Input {...config} {...field} />}</Field>
      );
  }

  return (
    <SC.Wrapper className={validityClassname} $type={config.type} $checked={config.checked}>
      <SC.Label htmlFor={config.id}>{label}</SC.Label>
      {input}
    </SC.Wrapper>
  );
}

Input.defaultProps = {
  isValid: undefined,
  isTouched: undefined,
};

Input.propTypes = {
  kind: PropTypes.string.isRequired,
  config: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    type: PropTypes.string,
    checked: PropTypes.bool,
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    placeholder: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.string,
    onInput: PropTypes.func,
    setFieldValue: PropTypes.func,
    setFieldTouched: PropTypes.func,
  }).isRequired,
  label: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  isTouched: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};
