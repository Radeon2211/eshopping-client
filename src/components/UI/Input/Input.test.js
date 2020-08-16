import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { Formik } from 'formik';
import Textarea from 'react-textarea-autosize';
import Select from 'react-select';
import theme from '../../../styled/theme';
import { checkProps } from '../../../shared/utility';
import Input from './Input';
import * as SC from './Input.sc';

const setUpWrapper = (props) => {
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
      const props = createProps('input');
      const wrapper = setUpWrapper(props);
      expect(wrapper.find(SC.Input)).toHaveLength(1);
    });
    it('Should render <Textarea />', () => {
      const props = createProps('textarea');
      const wrapper = setUpWrapper(props);
      expect(wrapper.find(Textarea)).toHaveLength(1);
    });
    it('Should render <Select />', () => {
      const props = createProps('select');
      const wrapper = setUpWrapper(props);
      expect(wrapper.find(Select)).toHaveLength(1);
    });
    it('Should render <SC.RadioWrapper />', () => {
      const props = createProps('radio', {
        options: [
          {
            value: 'testValue',
            label: 'testLabel',
          },
        ],
      });
      const wrapper = setUpWrapper(props);
      expect(wrapper.find(SC.RadioWrapper)).toHaveLength(1);
    });
    it('Should render <SC.Input />', () => {
      const props = createProps('incorrectKind');
      const wrapper = setUpWrapper(props);
      expect(wrapper.find(SC.Input)).toHaveLength(1);
    });
  });

  describe('Complete props', () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        kind: 'input',
        config: {
          name: 'testName',
        },
        label: 'testLabel',
        captionText: 'testCaptionText',
      };
      wrapper = setUpWrapper(props);
    });
    it('Should render caption', () => {
      expect(wrapper.find('.caption')).toHaveLength(1);
    });
  });

  describe('Incomplete props', () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        kind: 'input',
        config: {
          name: 'testName',
        },
        label: 'testLabel',
      };
      wrapper = setUpWrapper(props);
    });
    it('Should NOT render caption', () => {
      expect(wrapper.find('.caption')).toHaveLength(0);
    });
  });
});
