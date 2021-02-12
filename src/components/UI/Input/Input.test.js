import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { Formik } from 'formik';
import Textarea from 'react-textarea-autosize';
import Select from 'react-select';
import theme from '../../../styled/theme';
import { checkProps } from '../../../shared/testUtility';
import { inputKinds } from '../../../shared/constants';
import Input from './Input';
import * as SC from './Input.sc';

const setUp = (props) => {
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

  describe('Check input kind', () => {
    const createProps = (kind, configExtra) => ({
      kind,
      config: {
        name: 'testName',
        ...configExtra,
      },
      label: 'testLabel',
    });

    it('Should render <SC.Input />', () => {
      const props = createProps(inputKinds.INPUT);
      const wrapper = setUp(props);
      expect(wrapper.find(SC.Input)).toHaveLength(1);
    });

    it('Should render <Textarea />', () => {
      const props = createProps(inputKinds.TEXTAREA);
      const wrapper = setUp(props);
      expect(wrapper.find(Textarea)).toHaveLength(1);
    });

    it('Should render <Select />', () => {
      const props = createProps(inputKinds.SELECT);
      const wrapper = setUp(props);
      expect(wrapper.find(Select)).toHaveLength(1);
    });

    it('Should render <SC.RadioWrapper />', () => {
      const props = createProps(inputKinds.RADIO, {
        options: [
          {
            value: 'testValue',
            label: 'testLabel',
          },
        ],
      });
      const wrapper = setUp(props);
      expect(wrapper.find(SC.RadioWrapper)).toHaveLength(1);
    });

    it('Should render <SC.Input />', () => {
      const props = createProps('incorrectKind');
      const wrapper = setUp(props);
      expect(wrapper.find(SC.Input)).toHaveLength(1);
    });
  });
});
