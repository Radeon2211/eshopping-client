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
import { checkProps } from '../../../../shared/testUtility';

const mockStore = configureMockStore([thunk]);
const defaultStore = mockStore({});

const setUp = (isVisible, closed) => {
  const props = {
    isVisible,
    closed,
  };
  return mount(
    <Provider store={defaultStore}>
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
        isVisible: true,
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
      const wrapper = setUp(true, jest.fn());
      expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
    });

    it('Should NOT render <SC.Wrapper />', () => {
      const wrapper = setUp(false, jest.fn());
      expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
    });
  });
});
