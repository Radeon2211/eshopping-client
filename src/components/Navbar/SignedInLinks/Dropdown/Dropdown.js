import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import * as SC from './Dropdown.sc';
import MyIcon from '../../../UI/MyIcon/MyIcon';
import { ReactComponent as AddProductIcon } from '../../../../images/SVG/add-product.svg';
import { ReactComponent as MyAccountIcon } from '../../../../images/SVG/my-account.svg';
import { ReactComponent as MyOffersIcon } from '../../../../images/SVG/my-offers.svg';
import { ReactComponent as PlacedOrdersIcon } from '../../../../images/SVG/placed-orders.svg';
import { ReactComponent as SellHistoryIcon } from '../../../../images/SVG/sell-history.svg';
import { ReactComponent as LogOutIcon } from '../../../../images/SVG/log-out.svg';

const Dropdown = (props) => {
  const { visible, closed } = props;
  return (
    <OutsideClickHandler
      onOutsideClick={(e) => {
        if (visible && !e.target.closest('#user')) closed();
      }}
    >
      <SC.Wrapper visible={visible}>
        <ul className="list">
          <li className="item">
            <Link to="/add-product" className="link">
              <MyIcon size="small"><AddProductIcon /></MyIcon>
              <span>Add product</span>
            </Link>
          </li>
          <li className="item">
            <Link to="/my-account" className="link">
              <MyIcon size="small"><MyAccountIcon /></MyIcon>
              <span>My account</span>
            </Link>
          </li>
          <li className="item">
            <Link to="/my-account/products" className="link">
              <MyIcon size="small"><MyOffersIcon /></MyIcon>
              <span>My offers</span>
            </Link>
          </li>
          <li className="item">
            <Link to="/my-account/placed-orders" className="link">
              <MyIcon size="small"><PlacedOrdersIcon /></MyIcon>
              <span>Placed orders</span>
            </Link>
          </li>
          <li className="item">
            <Link to="/my-account/sell-history" className="link">
              <MyIcon size="small"><SellHistoryIcon /></MyIcon>
              <span>My sell history</span>
            </Link>
          </li>
          <li className="item">
            <Link to="/logout" className="link">
              <MyIcon size="small"><LogOutIcon /></MyIcon>
              <span>Log out</span>
            </Link>
          </li>
        </ul>
      </SC.Wrapper>
    </OutsideClickHandler>
  );
};

Dropdown.propTypes = {
  visible: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired,
};

export default Dropdown;
