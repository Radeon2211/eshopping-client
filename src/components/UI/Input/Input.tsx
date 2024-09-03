import { Field, FieldProps } from 'formik';
import Textarea from 'react-textarea-autosize';
import Select from 'react-select';
import * as SC from './Input.sc';
import { InputKind } from '../../../shared/types/types';

export interface InputProps {
  kind: InputKind;
  config: {
    name: string;
    id?: string;
    type?: string;
    checked?: boolean;
    autoComplete?: string;
    autoFocus?: boolean;
    placeholder?: string;
    min?: number;
    max?: number;
    step?: string;
    options?: {
      id: string;
      value: string;
      label: string;
      checked: boolean;
      'data-testid'?: string;
    }[];
    onInput?: () => void;
    setFieldValue?: (field: string, value: unknown, shouldValidate?: boolean) => void;
    setFieldTouched?: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
    maxRows?: number;
    'data-testid'?: string;
  };
  label: string;
  isValid?: boolean;
  isTouched?: boolean;
}

export default function Input({ kind, config, label, isValid, isTouched }: InputProps) {
  let input = null;
  let validityClassname = null;
  if (isValid !== undefined && isTouched) {
    validityClassname = isValid ? 'valid' : 'invalid';
  }

  switch (kind) {
    case InputKind.INPUT:
      input = (
        <Field name={config.name}>
          {({ field }: FieldProps) => <SC.Input {...config} {...field} />}
        </Field>
      );
      break;
    case InputKind.TEXTAREA:
      input = (
        <Field name={config.name}>
          {({ field }: FieldProps) => <Textarea {...config} {...field} className="textarea" />}
        </Field>
      );
      break;
    case InputKind.SELECT:
      input = (
        <Field name={config.name}>
          {({ field }: FieldProps) => (
            <Select
              className="select"
              {...config}
              {...field}
              onChange={(option) => {
                config.setFieldValue?.(config.name, option);
                config.setFieldTouched?.(config.name, true, true);
              }}
            />
          )}
        </Field>
      );
      break;
    case InputKind.RADIO:
      input = (
        <Field name={config.name}>
          {({ field }: FieldProps) =>
            config?.options?.map((option) => (
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
        <Field name={config.name}>
          {({ field }: FieldProps) => <SC.Input {...config} {...field} />}
        </Field>
      );
  }

  return (
    <SC.Wrapper className={validityClassname || ''} $type={config.type} $checked={config.checked}>
      <SC.Label htmlFor={config.id}>{label}</SC.Label>
      {input}
    </SC.Wrapper>
  );
}
