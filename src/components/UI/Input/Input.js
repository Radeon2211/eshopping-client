import React from 'react';
import { Field } from 'formik';
import Textarea from 'react-textarea-autosize';
import Select from 'react-select';
import * as SC from './Input.sc';

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
    case 'input':
      input = (
        <Field name={config.name}>{({ field }) => <SC.Input {...config} {...field} />}</Field>
      );
      break;
    case 'textarea':
      input = (
        <Field name={config.name}>
          {({ field }) => <Textarea {...config} {...field} className="textarea" />}
        </Field>
      );
      break;
    case 'select':
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
    case 'radio':
      input = (
        <Field name={config.name}>
          {({ field }) => config.options.map((option) => (
            <SC.RadioWrapper key={option.value}>
              <SC.Input {...field} {...option} type="radio" />
              <label htmlFor={option.id}>{option.value}</label>
            </SC.RadioWrapper>
          ))}
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

export default Input;
