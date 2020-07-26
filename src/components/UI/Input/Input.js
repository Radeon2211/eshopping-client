import React from 'react';
import { Field } from 'formik';
import Textarea from 'react-textarea-autosize';
import Select from 'react-select';
import * as SC from './Input.sc';

const Input = (props) => {
  const { kind, config, label, isValid, isTouched } = props;

  let input = null;
  let valid = null;
  if (isValid !== undefined && isTouched) {
    valid = isValid ? 'valid' : 'invalid';
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
          {({ field }) => <Textarea {...config} {...field} />}
        </Field>
      );
      break;
    case 'select':
      input = (
        <Field name={config.name}>
          {({ field }) => (
            <Select className="select" {...config} {...field} onChange={(option) => config.setFieldValue('country', option)} />
          )}
        </Field>
      );
      break;
    default:
      input = (
        <Field name={config.name}>{({ field }) => <SC.Input {...config} {...field} />}</Field>
      );
  }

  return (
    <SC.Wrapper className={valid}>
      <SC.Label htmlFor={config.id}>{label}</SC.Label>
      {input}
    </SC.Wrapper>
  );
};

export default Input;
