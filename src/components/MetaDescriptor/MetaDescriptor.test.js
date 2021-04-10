import React from 'react';
import { shallow } from 'enzyme';
import MetaDescriptor from './MetaDescriptor';
import { checkProps } from '../../shared/testUtility/testUtility';

describe('<MetaDescriptor />', () => {
  describe('check prop types', () => {
    it('should NOT throw a warning', () => {
      expect(checkProps(MetaDescriptor, { title: 'Test title' })).toBeUndefined();
    });

    it('should throw a warning', () => {
      expect(checkProps(MetaDescriptor, {})).not.toBe(null);
    });
  });

  describe('check how renders', () => {
    it('should render with title and description', () => {
      const wrapper = shallow(<MetaDescriptor title="Test title" description="Test description" />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render with title only', () => {
      const wrapper = shallow(<MetaDescriptor title="Test title" />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
