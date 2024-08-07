import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import * as actions from '../../../../store/actions/indexActions';
import * as SC from './Dropdown.sc';
import MyIcon from '../../../UI/MyIcon';
import { ReactComponent as AddProductIcon } from '../../../../images/icons/add-product.svg';
import { ReactComponent as MyAccountIcon } from '../../../../images/icons/my-account.svg';
import { ReactComponent as MyOffersIcon } from '../../../../images/icons/my-offers.svg';
import { ReactComponent as PlacedOrdersIcon } from '../../../../images/icons/placed-orders.svg';
import { ReactComponent as SellHistoryIcon } from '../../../../images/icons/sell-history.svg';
import { ReactComponent as LogOutIcon } from '../../../../images/icons/log-out.svg';
import { ModalType } from '../../../../shared/types/types';

export const dropdownVariants = {
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
    y: '-10%',
  },
  visible: {
    opacity: 1,
    pointerEvents: 'initial',
    y: '0',
  },
};

export default function Dropdown({ isVisible, closed }) {
  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (modalContent) => dispatch(actions.setModal(modalContent)),
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
      <AnimatePresence mode="wait">
        {isVisible && (
          <SC.Wrapper
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            data-testid="Dropdown"
          >
            <ul className="list">
              <li className="item">
                <div
                  className="link"
                  onClick={() => onSetModal(ModalType.ADD_PRODUCT)}
                  onKeyDown={() => onSetModal(ModalType.ADD_PRODUCT)}
                  role="button"
                  tabIndex={0}
                >
                  <MyIcon $size="small">
                    <AddProductIcon />
                  </MyIcon>
                  <span>Add product</span>
                </div>
              </li>
              <li className="item">
                <Link to="/my-account/data" className="link">
                  <MyIcon $size="small">
                    <MyAccountIcon />
                  </MyIcon>
                  <span>My account</span>
                </Link>
              </li>
              <li className="item">
                <Link to="/my-account/products?p=1" className="link">
                  <MyIcon $size="small">
                    <MyOffersIcon />
                  </MyIcon>
                  <span>My offers</span>
                </Link>
              </li>
              <li className="item">
                <Link to="/my-account/sell-history?p=1" className="link">
                  <MyIcon $size="small">
                    <SellHistoryIcon />
                  </MyIcon>
                  <span>My sell history</span>
                </Link>
              </li>
              <li className="item">
                <Link to="/my-account/placed-orders?p=1" className="link">
                  <MyIcon $size="small">
                    <PlacedOrdersIcon />
                  </MyIcon>
                  <span>Placed orders</span>
                </Link>
              </li>
              <li className="item">
                <Link to="/logout" className="link" data-testid="Dropdown-logout-link">
                  <MyIcon $size="small">
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
}

Dropdown.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired,
};
