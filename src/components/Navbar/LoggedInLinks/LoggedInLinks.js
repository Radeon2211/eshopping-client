import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as CartIcon } from '../../../images/SVG/cart.svg';
import { ReactComponent as ArrowIcon } from '../../../images/SVG/arrow.svg';
import MyIcon from '../../UI/MyIcon';
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
  padding: ${({ theme }) => theme.spacings.level1};
  position: relative;

  & .username {
    font-size: ${({ theme }) => theme.fontSizes.level3};
    margin-right: ${({ theme }) => theme.spacings.level1};
  }
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
        <MyIcon size="small" rotation={dropdownIsVisible ? -90 : 90}>
          <ArrowIcon />
        </MyIcon>
        <Dropdown visible={dropdownIsVisible} closed={closeDropdownHandle} />
      </SC.User>
    </SC.Wrapper>
  );
};

SignedInLinks.propTypes = {
  username: PropTypes.string.isRequired,
};

export default SignedInLinks;
