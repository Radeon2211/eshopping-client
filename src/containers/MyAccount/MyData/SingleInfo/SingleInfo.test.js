import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import SingleInfo from './SingleInfo';
import { checkProps } from '../../../../shared/testUtility';
import { singleInfoNames } from '../../../../shared/constants';
import theme from '../../../../styled/theme';
import Button from '../../../../components/UI/Button/Button';

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
      expect(wrapper.find('.name').text()).toBe(singleInfoNames.NAME);
      expect(wrapper.find('.content')).toHaveLength(1);
      expect(wrapper.find('.content').text()).toBe('test name');
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
      const address = {
        street: 'Street 1',
        zipCodeAndCity: `00-000 City`,
        country: 'Poland',
      };
      const wrapper = setUp(singleInfoNames.ADDRESS, address);
      expect(wrapper.find('.content').at(0).text()).toBe(address.street);
      expect(wrapper.find('.content').at(1).text()).toBe(address.zipCodeAndCity);
      expect(wrapper.find('.content').at(2).text()).toBe(address.country);
    });

    it('Should render contacts with all visible', () => {
      const wrapper = setUp(singleInfoNames.CONTACTS, ['email', 'phone']);
      expect(wrapper.find('.content').at(0).text()).toBe('Email: visible');
      expect(wrapper.find('.content').at(1).text()).toBe('Phone number: visible');
    });

    it('Should render contacts with all hidden', () => {
      const wrapper = setUp(singleInfoNames.CONTACTS, []);
      expect(wrapper.find('.content').at(0).text()).toBe('Email: hidden');
      expect(wrapper.find('.content').at(1).text()).toBe('Phone number: hidden');
    });
  });
});
