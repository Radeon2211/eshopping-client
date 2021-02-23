import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import MyAccount from './MyAccount';
import * as SC from './MyAccount.sc';
import MyData from './MyData/MyData';
import MyPlacedOrders from './MyPlacedOrders/MyPlacedOrders';
import MySellHistory from './MySellHistory/MySellHistory';
import theme from '../../styled/theme';
import { defaultUserProfile } from '../../shared/testUtility';

const mockStore = configureMockStore([thunk]);

const setUp = (userProfile) => {
  const store = mockStore({
    auth: { profile: userProfile },
  });

  return mount(
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <MyAccount />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

describe('<MyAccount />', () => {
  it('Should render all routes and nav if user has status active', () => {
    const wrapper = setUp(defaultUserProfile);
    expect(wrapper.find('.nav')).toHaveLength(1);
    expect(wrapper.find('.nav-list')).toHaveLength(1);

    const listItems = wrapper.find('li');
    expect(listItems).toHaveLength(4);
    expect(listItems.at(0).find(NavLink).prop('to')).toEqual('/my-account/data');
    expect(listItems.at(0).text()).toEqual('Data');
    expect(listItems.at(1).find(NavLink).prop('to')).toEqual('/my-account/products?p=1');
    expect(listItems.at(1).text()).toEqual('Products');
    expect(listItems.at(2).find(NavLink).prop('to')).toEqual('/my-account/sell-history?p=1');
    expect(listItems.at(2).text()).toEqual('Sell history');
    expect(listItems.at(3).find(NavLink).prop('to')).toEqual('/my-account/placed-orders?p=1');
    expect(listItems.at(3).text()).toEqual('Placed orders');

    const routes = wrapper.find(Route);
    expect(routes).toHaveLength(4);
    expect(routes.at(0).prop('path')).toEqual('/my-account/data');
    expect(routes.at(0).prop('component')).toEqual(MyData);
    expect(routes.at(1).prop('path')).toEqual('/my-account/products');
    expect(routes.at(1).prop('component')).not.toBeDefined();
    expect(routes.at(1).prop('render')).toBeDefined();
    expect(routes.at(2).prop('path')).toEqual('/my-account/sell-history');
    expect(routes.at(2).prop('component')).toEqual(MySellHistory);
    expect(routes.at(3).prop('path')).toEqual('/my-account/placed-orders');
    expect(routes.at(3).prop('component')).toEqual(MyPlacedOrders);

    expect(wrapper.find(SC.Routes).prop('extraMargin')).toEqual(true);
  });

  it('Should render only MyData route and NOT render nav if user has status pending', () => {
    const userProfile = { ...defaultUserProfile, status: 'pending' };
    const wrapper = setUp(userProfile);
    expect(wrapper.find('.nav')).toHaveLength(0);

    const routes = wrapper.find(Route);
    expect(routes).toHaveLength(1);
    expect(routes.at(0).prop('path')).toEqual('/my-account/data');
    expect(routes.at(0).prop('component')).toEqual(MyData);

    expect(wrapper.find(SC.Routes).prop('extraMargin')).toEqual(false);
  });
});
