import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';
import * as SC from './Button.sc';
import { checkProps } from '../../../shared/utility';

const setUp = (props = {}) => {
  return shallow(<Button {...props} />);
};

describe('<Button />', () => {
  describe('Check prop types', () => {
    const expectedProps = {
      size: 'small',
      children: 'test button',
    };
    it('Should NOT throw a warning', () => {
      expect(checkProps(Button, expectedProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(Button, {})).not.toBe(null);
    });
  });

  describe('Check if button renders', () => {
    let wrapper;
    let mockFunc;
    beforeEach(() => {
      mockFunc = jest.fn();
      const props = {
        size: 'small',
        children: 'test button',
        clicked: mockFunc,
      };
      wrapper = setUp(props);
    });
    it('Should render a button', () => {
      expect(wrapper.find(SC.Button)).toHaveLength(1);
    });
    it('Should emit callback on click event', () => {
      const button = wrapper.find(SC.Button);
      button.simulate('click');
      const callback = mockFunc.mock.calls;
      expect(callback).toHaveLength(1);
    });
  });
});