import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { Formik, Field } from 'formik';
import Textarea from 'react-textarea-autosize';
import Select from 'react-select';
import theme from '../../../styled/theme';
import { checkProps } from '../../../shared/testUtility/testUtility';
import { inputKinds, listOfCountries } from '../../../shared/constants';
import Input from './Input';
import * as SC from './Input.sc';

const defaultName = 'testName';
const defaultLabel = 'testLabel';

const setUp = (kind, extraProps = {}, extraConfig = {}) => {
  const props = {
    kind,
    label: defaultLabel,
    config: {
      name: defaultName,
      ...extraConfig,
    },
    ...extraProps,
  };

  return mount(
    <ThemeProvider theme={theme}>
      <Formik>
        <Input {...props} />
      </Formik>
    </ThemeProvider>,
  );
};

describe('<Input />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const expectedProps = {
        kind: 'testKind',
        config: {
          name: 'testName',
        },
        label: 'testLabel',
      };
      expect(checkProps(Input, expectedProps)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      const expectedProps = {};
      expect(checkProps(Input, expectedProps)).not.toBeNull();
    });
  });

  describe('Check how renders', () => {
    it('Should render <SC.Input /> with default props', () => {
      const wrapper = setUp(inputKinds.INPUT);

      const SCWrapper = wrapper.find(SC.Wrapper);
      expect(SCWrapper.prop('className')).toEqual(null);
      expect(SCWrapper.prop('type')).toEqual(undefined);
      expect(SCWrapper.prop('checked')).toEqual(undefined);

      const label = SCWrapper.find(SC.Label);
      expect(label.text()).toEqual(defaultLabel);
      expect(label.prop('htmlFor')).toEqual(undefined);

      const field = SCWrapper.find(Field);
      expect(field.prop('name')).toEqual(defaultName);

      const input = field.find(SC.Input);
      expect(input.prop('name')).toEqual(defaultName);
      expect(input.prop('id')).toEqual(undefined);
    });

    it('Should render <SC.Input /> with full props (type text)', () => {
      const id = 'firstName';
      const placeholder = 'Your name';
      const autoComplete = 'given-name';
      const type = 'text';
      const autoFocus = true;
      const onInput = jest.fn();

      const wrapper = setUp(
        inputKinds.INPUT,
        { isValid: true, isTouched: true },
        { id, type, placeholder, autoComplete, autoFocus, onInput },
      );

      const SCWrapper = wrapper.find(SC.Wrapper);
      expect(SCWrapper.prop('className')).toEqual('valid');
      expect(SCWrapper.prop('type')).toEqual(type);
      expect(SCWrapper.prop('checked')).toEqual(undefined);

      const label = SCWrapper.find(SC.Label);
      expect(label.text()).toEqual(defaultLabel);
      expect(label.prop('htmlFor')).toEqual(id);

      const field = SCWrapper.find(Field);
      expect(field.prop('name')).toEqual(defaultName);

      const input = field.find(SC.Input);
      expect(input.prop('name')).toEqual(defaultName);
      expect(input.prop('id')).toEqual(id);
      expect(input.prop('type')).toEqual(type);
      expect(input.prop('placeholder')).toEqual(placeholder);
      expect(input.prop('autoFocus')).toEqual(autoFocus);
      expect(input.prop('autoComplete')).toEqual(autoComplete);
      expect(input.prop('onInput')).toEqual(onInput);
    });

    it('Should render <SC.Input /> with full props (type checkbox)', () => {
      const id = 'hideEmail';
      const type = 'checkbox';
      const checked = true;

      const wrapper = setUp(inputKinds.INPUT, {}, { id, type, checked });

      const SCWrapper = wrapper.find(SC.Wrapper);
      expect(SCWrapper.prop('className')).toEqual(null);
      expect(SCWrapper.prop('type')).toEqual(type);
      expect(SCWrapper.prop('checked')).toEqual(checked);

      const label = SCWrapper.find(SC.Label);
      expect(label.text()).toEqual(defaultLabel);
      expect(label.prop('htmlFor')).toEqual(id);

      const field = SCWrapper.find(Field);
      expect(field.prop('name')).toEqual(defaultName);

      const input = field.find(SC.Input);
      expect(input.prop('name')).toEqual(defaultName);
      expect(input.prop('id')).toEqual(id);
      expect(input.prop('checked')).toEqual(checked);
      expect(input.prop('type')).toEqual(type);
    });

    it('Should <SC.Wrapper /> has className invalid if isValid is false and isTouched true', () => {
      const wrapper = setUp(inputKinds.INPUT, { isValid: false, isTouched: true });
      expect(wrapper.find(SC.Wrapper).prop('className')).toEqual('invalid');
    });

    it('Should <SC.Wrapper /> has className null if isValid is true and isTouched false', () => {
      const wrapper = setUp(inputKinds.INPUT, { isValid: true, isTouched: false });
      expect(wrapper.find(SC.Wrapper).prop('className')).toEqual(null);
    });

    it('Should render <Textarea /> with full props', () => {
      const id = 'description';
      const placeholder = 'Description...';
      const maxRows = 6;

      const wrapper = setUp(
        inputKinds.TEXTAREA,
        { isValid: true, isTouched: true },
        { id, placeholder, maxRows },
      );

      const SCWrapper = wrapper.find(SC.Wrapper);
      expect(SCWrapper.prop('className')).toEqual('valid');
      expect(SCWrapper.prop('type')).toEqual(undefined);
      expect(SCWrapper.prop('checked')).toEqual(undefined);

      const label = SCWrapper.find(SC.Label);
      expect(label.text()).toEqual(defaultLabel);
      expect(label.prop('htmlFor')).toEqual(id);

      const field = SCWrapper.find(Field);
      expect(field.prop('name')).toEqual(defaultName);

      const textarea = wrapper.find(Textarea);
      expect(textarea.prop('name')).toEqual(defaultName);
      expect(textarea.prop('id')).toEqual(id);
      expect(textarea.prop('placeholder')).toEqual(placeholder);
      expect(textarea.prop('maxRows')).toEqual(maxRows);
      expect(textarea.prop('className')).toEqual('textarea');
    });

    it('Should render <Select /> with full props', () => {
      const id = 'country';
      const placeholder = 'Choose a country';
      const setFieldValue = jest.fn();
      const setFieldTouched = jest.fn();
      const options = listOfCountries;

      const wrapper = setUp(
        inputKinds.SELECT,
        { isValid: true, isTouched: true },
        { id, placeholder, setFieldValue, setFieldTouched, options },
      );

      const SCWrapper = wrapper.find(SC.Wrapper);
      expect(SCWrapper.prop('className')).toEqual('valid');
      expect(SCWrapper.prop('type')).toEqual(undefined);
      expect(SCWrapper.prop('checked')).toEqual(undefined);

      const label = SCWrapper.find(SC.Label);
      expect(label.text()).toEqual(defaultLabel);
      expect(label.prop('htmlFor')).toEqual(id);

      const field = SCWrapper.find(Field);
      expect(field.prop('name')).toEqual(defaultName);

      const textarea = wrapper.find(Select);
      expect(textarea.prop('name')).toEqual(defaultName);
      expect(textarea.prop('id')).toEqual(id);
      expect(textarea.prop('placeholder')).toEqual(placeholder);
      expect(textarea.prop('options')).toEqual(options);
      expect(textarea.prop('className')).toEqual('select');
      expect(textarea.prop('onChange')).toBeInstanceOf(Function);
    });

    it('Should render <SC.RadioWrapper /> with full props', () => {
      const value = 'new';
      const options = [
        { value: 'new', id: 'new', checked: value === 'new', label: 'new' },
        { value: 'used', id: 'used', checked: value === 'used', label: 'used' },
        {
          value: 'not_applicable',
          id: 'not_applicable',
          checked: value === 'not_applicable',
          label: 'not applicable',
        },
      ];

      const wrapper = setUp(inputKinds.RADIO, {}, { value, options });

      const SCWrapper = wrapper.find(SC.Wrapper);
      expect(SCWrapper.prop('className')).toEqual(null);
      expect(SCWrapper.prop('type')).toEqual(undefined);
      expect(SCWrapper.prop('checked')).toEqual(undefined);

      const label = SCWrapper.find(SC.Label);
      expect(label.text()).toEqual(defaultLabel);
      expect(label.prop('htmlFor')).toEqual(undefined);

      const field = SCWrapper.find(Field);
      expect(field.prop('name')).toEqual(defaultName);

      const radioWrappers = SCWrapper.find(SC.RadioWrapper);
      expect(radioWrappers).toHaveLength(3);
      expect(radioWrappers.at(0).prop('checked')).toEqual(options[0].checked);
      const firstInput = radioWrappers.at(0).find(SC.Input);
      expect(firstInput.prop('id')).toEqual(options[0].id);
      expect(firstInput.prop('checked')).toEqual(options[0].checked);
      expect(firstInput.prop('type')).toEqual('radio');
      expect(firstInput.prop('label')).toEqual('new');
      const firstLabel = radioWrappers.at(0).find('label');
      expect(firstLabel.prop('htmlFor')).toEqual(options[0].id);
      expect(firstLabel.text()).toEqual(options[0].label);

      expect(radioWrappers.at(1).prop('checked')).toEqual(options[1].checked);
      const secondInput = radioWrappers.at(1).find(SC.Input);
      expect(secondInput.prop('id')).toEqual(options[1].id);
      expect(secondInput.prop('checked')).toEqual(options[1].checked);
      expect(secondInput.prop('type')).toEqual('radio');
      expect(secondInput.prop('label')).toEqual('used');
      const secondLabel = radioWrappers.at(1).find('label');
      expect(secondLabel.prop('htmlFor')).toEqual(options[1].id);
      expect(secondLabel.text()).toEqual(options[1].label);

      expect(radioWrappers.at(2).prop('checked')).toEqual(options[2].checked);
      const thirdInput = radioWrappers.at(2).find(SC.Input);
      expect(thirdInput.prop('id')).toEqual(options[2].id);
      expect(thirdInput.prop('checked')).toEqual(options[2].checked);
      expect(thirdInput.prop('type')).toEqual('radio');
      expect(thirdInput.prop('label')).toEqual('not applicable');
      const thirdLabel = radioWrappers.at(2).find('label');
      expect(thirdLabel.prop('htmlFor')).toEqual(options[2].id);
      expect(thirdLabel.text()).toEqual(options[2].label);
    });

    it('Should render <SC.Input /> if passed kind is incorrect', () => {
      const wrapper = setUp('incorrectKind');
      expect(wrapper.find(SC.Input)).toHaveLength(1);
    });
  });
});
