import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useWindowWidth } from '@react-hook/window-size';
import { ReactComponent as CartIcon } from '../../../images/SVG/cart.svg';
import { ReactComponent as ArrowIcon } from '../../../images/SVG/arrow.svg';
import MyIcon from '../../UI/MyIcon';
import Dropdown from './Dropdown/Dropdown';

const usernameLengthBig = 15;
const usernameLengthSmall = 9;

const SC = {};
SC.Wrapper = styled.nav`
  align-items: center;
  display: flex;

  & > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacings.level4};
  }

  @media only screen and (max-width: 56.25em) {
    & > *:not(:last-child) {
      margin-right: ${({ theme }) => theme.spacings.level3};
    }
  }
`;
SC.User = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  padding: ${({ theme }) => theme.spacings.level1} 0;
  position: relative;

  & .username {
    font-size: ${({ theme }) => theme.fontSizes.level3};
    margin-right: ${({ theme }) => theme.spacings.level1};
  }
`;

const SignedInLinks = (props) => {
  const { username } = props;

  const windowWidth = useWindowWidth();

  const usernameRef = useRef();

  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);

  const userClickHandle = () => {
    setDropdownIsVisible((prevState) => !prevState);
  };

  const closeDropdownHandle = () => {
    setDropdownIsVisible(false);
  };

  let usernameToDisplay = username;
  if (windowWidth > 900 && username.length > usernameLengthBig + 1) {
    usernameToDisplay = `${username.slice(0, usernameLengthBig)}...`;
  } else if (windowWidth < 900 && username.length > usernameLengthSmall + 1) {
    usernameToDisplay = `${username.slice(0, usernameLengthSmall)}...`;
  }

  return (
    <SC.Wrapper>
      <Link to="/cart">
        <MyIcon size="big">
          <CartIcon />
        </MyIcon>
      </Link>
      <SC.User id="user" onClick={userClickHandle}>
        <span className="username" ref={usernameRef}>
          {usernameToDisplay}
        </span>
        <MyIcon size="small" rotation={dropdownIsVisible ? -90 : 90}>
          <ArrowIcon />
        </MyIcon>
        <Dropdown isVisible={dropdownIsVisible} closed={closeDropdownHandle} />
      </SC.User>
    </SC.Wrapper>
  );
};

SignedInLinks.propTypes = {
  username: PropTypes.string.isRequired,
};

export default SignedInLinks;
