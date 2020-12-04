import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import * as actions from '../../../../store/actions/indexActions';
import { modalTypes } from '../../../../shared/constants';
import * as SC from './Dropdown.sc';
import { dropdownVariants } from '../../../../shared/framer';
import MyIcon from '../../../UI/MyIcon';
import { ReactComponent as AddProductIcon } from '../../../../images/SVG/add-product.svg';
import { ReactComponent as MyAccountIcon } from '../../../../images/SVG/my-account.svg';
import { ReactComponent as MyOffersIcon } from '../../../../images/SVG/my-offers.svg';
import { ReactComponent as PlacedOrdersIcon } from '../../../../images/SVG/placed-orders.svg';
import { ReactComponent as SellHistoryIcon } from '../../../../images/SVG/sell-history.svg';
import { ReactComponent as LogOutIcon } from '../../../../images/SVG/log-out.svg';

const Dropdown = (props) => {
  const { isVisible, closed } = props;

  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (isModalOpen, modalContent) => dispatch(actions.setModal(isModalOpen, modalContent)),
    [dispatch],
  );

  return (
    <OutsideClickHandler
      onOutsideClick={(e) => {
        if (isVisible && !e.target.closest('#user')) {
          closed();
        }
      }}
    >
      <AnimatePresence exitBeforeEnter>
        {isVisible && (
          <SC.Wrapper variants={dropdownVariants} initial="hidden" animate="visible" exit="hidden">
            <ul className="list">
              <li className="item">
                <div
                  className="link"
                  onClick={() => onSetModal(true, modalTypes.ADD_PRODUCT)}
                  onKeyDown={() => onSetModal(true, modalTypes.ADD_PRODUCT)}
                  role="button"
                  tabIndex={0}
                >
                  <MyIcon size="small">
                    <AddProductIcon />
                  </MyIcon>
                  <span>Add product</span>
                </div>
              </li>
              <li className="item">
                <Link to="/my-account" className="link">
                  <MyIcon size="small">
                    <MyAccountIcon />
                  </MyIcon>
                  <span>My account</span>
                </Link>
              </li>
              <li className="item">
                <Link to="/my-account/products" className="link">
                  <MyIcon size="small">
                    <MyOffersIcon />
                  </MyIcon>
                  <span>My offers</span>
                </Link>
              </li>
              <li className="item">
                <Link to="/my-account/placed-orders" className="link">
                  <MyIcon size="small">
                    <PlacedOrdersIcon />
                  </MyIcon>
                  <span>Placed orders</span>
                </Link>
              </li>
              <li className="item">
                <Link to="/my-account/sell-history" className="link">
                  <MyIcon size="small">
                    <SellHistoryIcon />
                  </MyIcon>
                  <span>My sell history</span>
                </Link>
              </li>
              <li className="item">
                <Link to="/logout" className="link">
                  <MyIcon size="small">
                    <LogOutIcon />
                  </MyIcon>
                  <span>Log out</span>
                </Link>
              </li>
            </ul>
          </SC.Wrapper>
        )}
      </AnimatePresence>
    </OutsideClickHandler>
  );
};

Dropdown.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired,
};

export default Dropdown;
