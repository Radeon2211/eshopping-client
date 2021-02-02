import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import SingleInfo from './SingleInfo';
import { checkProps } from '../../../../shared/testUtility';
import { singleInfoNames } from '../../../../shared/constants';
import theme from '../../../../styled/theme';
import Button from '../../../../components/UI/Button/Button';
import { UserDataValue } from '../../../../styled/components';

const setUp = (name, content, clickHandler) => {
  const props = {
    name,
    content,
    clickHandler,
  };
  return mount(
    <ThemeProvider theme={theme}>
      <SingleInfo {...props} />
    </ThemeProvider>,
  );
};

describe('<SingleInfo />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const props = {
        name: singleInfoNames.NAME,
        content: 'test name',
        clickHandler: () => {},
      };
      expect(checkProps(SingleInfo, props)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(SingleInfo, {})).not.toBe(null);
    });
  });

  describe(`Check if renders correctly`, () => {
    it('Should render name, one content and <Button /> and fire off a clickHandler when <Button /> is clicked', () => {
      const clickHandlerFn = jest.fn();
      const wrapper = setUp(singleInfoNames.NAME, 'test name', clickHandlerFn);
      expect(wrapper.find('[data-test="name"]').first().text()).toEqual(singleInfoNames.NAME);
      expect(wrapper.find(UserDataValue)).toHaveLength(1);
      expect(wrapper.find(UserDataValue).text()).toEqual('test name');
      const button = wrapper.find(Button);
      expect(button).toHaveLength(1);
      button.simulate('click');
      expect(clickHandlerFn).toBeCalled();
    });

    it('Should NOT render a <Button /> if no clickHandler is given', () => {
      const wrapper = setUp(singleInfoNames.NAME, 'test name');
      expect(wrapper.find(Button)).toHaveLength(0);
    });

    it('Should render address', () => {
      const address = ['Street 1', '00-000 City', 'Poland'];
      const wrapper = setUp(singleInfoNames.ADDRESS, address);
      expect(wrapper.find(UserDataValue).at(0).text()).toEqual(address[0]);
      expect(wrapper.find(UserDataValue).at(1).text()).toEqual(address[1]);
      expect(wrapper.find(UserDataValue).at(2).text()).toEqual(address[2]);
    });

    it('Should render contacts with all visible', () => {
      const wrapper = setUp(singleInfoNames.CONTACTS, { email: true, phone: true });
      expect(wrapper.find(UserDataValue).at(0).text()).toEqual('Email: visible');
      expect(wrapper.find(UserDataValue).at(1).text()).toEqual('Phone number: visible');
    });

    it('Should render contacts with all hidden', () => {
      const wrapper = setUp(singleInfoNames.CONTACTS, { email: false, phone: false });
      expect(wrapper.find(UserDataValue).at(0).text()).toEqual('Email: hidden');
      expect(wrapper.find(UserDataValue).at(1).text()).toEqual('Phone number: hidden');
    });
  });
});
