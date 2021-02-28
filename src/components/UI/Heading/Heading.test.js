import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import Heading from './Heading';

const setUp = (text, props = {}) => {
  return mount(
    <ThemeProvider theme={theme}>
      <Heading {...props}>{text}</Heading>
    </ThemeProvider>,
  );
};

describe('<Heading />', () => {
  it('Should render h1 with correct text', () => {
    const wrapper = setUp('h1 heading', { variant: 'h1' });
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render h2 with correct text', () => {
    const wrapper = setUp('h2 heading', { variant: 'h2' });
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render h3 with correct text', () => {
    const wrapper = setUp('h3 heading', { variant: 'h3' });
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render h4 with correct text', () => {
    const wrapper = setUp('h4 heading', { variant: 'h4' });
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render h5 with correct text', () => {
    const wrapper = setUp('h5 heading', { variant: 'h5' });
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render h6 with correct text', () => {
    const wrapper = setUp('h6 heading', { variant: 'h6' });
    expect(wrapper).toMatchSnapshot();
  });
});
