import React from 'react';
import { mount } from 'enzyme';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import theme from '../../../../styled/theme';
import Dropdown from './Dropdown';
import * as SC from './Dropdown.sc';
import { checkProps } from '../../../../shared/utility';

const mockStore = configureMockStore([thunk]);

const setUp = (props = {}) => {
  const store = mockStore({});
  return mount(
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Dropdown {...props} />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

describe('<Dropdown />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const props = {
        visible: true,
        closed: jest.fn(),
      };
      expect(checkProps(Dropdown, props)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(Dropdown, {})).not.toBe(null);
    });
  });

  describe('Check if it renders correctly', () => {
    it('Should render <SC.Wrapper />', () => {
      const props = {
        visible: true,
        closed: jest.fn(),
      };
      const wrapper = setUp(props);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
    });
    it('Should NOT render <SC.Wrapper />', () => {
      const props = {
        visible: false,
        closed: jest.fn(),
      };
      const wrapper = setUp(props);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
    });
  });
});
