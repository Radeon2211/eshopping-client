import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as CartIcon } from '../../../images/SVG/cart.svg';
import { ReactComponent as ArrowIcon } from '../../../images/SVG/arrow.svg';
import MyIcon from '../../UI/MyIcon/MyIcon';
import Dropdown from './Dropdown/Dropdown';

const SC = {};
SC.Wrapper = styled.nav`
  align-items: center;
  display: flex;

  & > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacings.level5};
  }
`;
SC.User = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  position: relative;

  & .username {
    font-size: 1.5rem;
    margin-right: ${({ theme }) => theme.spacings.level1};
  }
`;
SC.Arrow = styled.div`
  transform: rotate(90deg);
  transition: transform 0.2s;

  ${({ rotated }) => {
    if (rotated) {
      return `
        transform: rotate(-90deg);
      `;
    }
    return ``;
  }}
`;

const SignedInLinks = (props) => {
  const { username } = props;

  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);

  const userClickHandle = () => {
    setDropdownIsVisible((prevState) => !prevState);
  };

  const closeDropdownHandle = () => {
    setDropdownIsVisible(false);
  };

  return (
    <SC.Wrapper>
      <Link to="/cart">
        <MyIcon size="big">
          <CartIcon />
        </MyIcon>
      </Link>
      <SC.User id="user" onClick={userClickHandle}>
        <span className="username">{username}</span>
        <SC.Arrow rotated={dropdownIsVisible}>
          <MyIcon size="small">
            <ArrowIcon />
          </MyIcon>
        </SC.Arrow>
        <Dropdown visible={dropdownIsVisible} closed={closeDropdownHandle} />
      </SC.User>
    </SC.Wrapper>
  );
};

SignedInLinks.propTypes = {
  username: PropTypes.string.isRequired,
};

export default SignedInLinks;
