/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import Textarea from 'react-textarea-autosize';
import * as SC from './Input.sc';
import { inputKinds } from '../../../shared/constants';
import Select from 'react-select';

const Input = (props) => {
  const { kind, config, label, isValid, isTouched, captionText } = props;

  let input = null;
  let valid = null;
  if (isValid !== undefined && isTouched) {
    valid = isValid ? 'valid' : 'invalid';
  }

  let caption = null;
  if (captionText) {
    caption = <span className="caption">{captionText}</span>;
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
              <SC.RadioWrapper key={option.value}>
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
    <SC.Wrapper className={valid} type={config.type}>
      <SC.Label htmlFor={config.id}>{label}</SC.Label>
      {input}
      {caption}
    </SC.Wrapper>
  );
};

Input.defaultProps = {
  isValid: undefined,
  isTouched: undefined,
  captionText: '',
};

Input.propTypes = {
  kind: PropTypes.string.isRequired,
  config: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  isTouched: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  captionText: PropTypes.string,
};

export default Input;
