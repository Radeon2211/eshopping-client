import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as ArrowIcon } from '../../../images/SVG/arrow.svg';
import MyIcon from '../../UI/MyIcon';
import Dropdown from './Dropdown/Dropdown';
import CartLink from './CartLink/CartLink';

export const SC = {};
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
    overflow: hidden;
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 15rem;
  }
`;

const SignedInLinks = (props) => {
  const { username } = props;

  const usernameRef = useRef();

  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);

  const userClickHandle = () => {
    setDropdownIsVisible((prevState) => !prevState);
  };

  const closeDropdownHandle = () => {
    setDropdownIsVisible(false);
  };

  return (
    <SC.Wrapper>
      <CartLink />
      <SC.User id="user" onClick={userClickHandle}>
        <span className="username" ref={usernameRef}>
          {username}
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
