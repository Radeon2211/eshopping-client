import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import ProgressBar from './ProgressBar';
import { checkProps } from '../../../../shared/testUtility';
import theme from '../../../../styled/theme';

const createProps = (currentStep, stepsNumber = 3) => ({
  stepsNumber,
  currentStep,
});

const defaultProps = createProps(1);

const setUp = (currentStep = 1) => {
  const props = createProps(currentStep);
  return mount(
    <ThemeProvider theme={theme}>
      <ProgressBar {...props} />
    </ThemeProvider>,
  );
};

describe('<ProgressBar />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(ProgressBar, defaultProps)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(ProgressBar, {})).not.toBe(null);
    });
  });

  describe(`Check if renders correctly`, () => {
    it('Should render three step boxes with correct numbers inside (first should be active) and two step lines and every value should has number', () => {
      const wrapper = setUp();
      expect(wrapper.find('.step-box')).toHaveLength(3);
      expect(wrapper.find('.step-box').first().hasClass('active')).toEqual(true);
      expect(wrapper.find('.step-line')).toHaveLength(2);
      wrapper.find('.step-line-fill').forEach((line) => {
        expect(line.hasClass('active')).not.toEqual(true);
      });
      wrapper.find('.step-number').forEach((box, idx) => {
        expect(box.text()).toBe((idx + 1).toString());
      });
      expect(
        wrapper.find('[data-test="icon"]').filterWhere((item) => item.prop('visible')),
      ).toHaveLength(0);
      expect(
        wrapper.find('[data-test="number"]').filterWhere((item) => item.prop('visible')),
      ).toHaveLength(3);
    });

    it('Should first two step boxes be active and first step line fill be active and first step-box value should be checkmark', () => {
      const wrapper = setUp(2);
      expect(wrapper.find('.step-box').first().hasClass('active')).toEqual(true);
      expect(wrapper.find('.step-box').at(1).hasClass('active')).toEqual(true);
      expect(wrapper.find('.step-line-fill').first().hasClass('active')).toEqual(true);
      expect(
        wrapper.find('[data-test="icon"]').filterWhere((item) => item.prop('visible')),
      ).toHaveLength(1);
      expect(
        wrapper.find('[data-test="number"]').filterWhere((item) => item.prop('visible')),
      ).toHaveLength(2);
    });

    it('Should every step-box and step-line-fill be active and first two step-box values should be checkmarks', () => {
      const wrapper = setUp(3);
      expect(wrapper.find('.step-box').every('.active')).toEqual(true);
      expect(wrapper.find('.step-line-fill').every('.active')).toEqual(true);
      expect(
        wrapper.find('[data-test="icon"]').filterWhere((item) => item.prop('visible')),
      ).toHaveLength(2);
      expect(
        wrapper.find('[data-test="number"]').filterWhere((item) => item.prop('visible')),
      ).toHaveLength(1);
    });
  });
});
