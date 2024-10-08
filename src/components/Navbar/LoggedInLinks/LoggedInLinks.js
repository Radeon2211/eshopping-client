import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../../images/icons/arrow.svg';
import { ReactComponent as SettingsIcon } from '../../../images/icons/settings.svg';
import MyIcon from '../../UI/MyIcon';
import Dropdown from './Dropdown/Dropdown';
import CartLink from './CartLink/CartLink';
import PlainText from '../../UI/PlainText';
import { ProfileStatus } from '../../../shared/types/types';

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
`;

export default function LoggedInLinks({ username, status }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const showUsername = (name) => {
    return (
      <PlainText
        $size="level3"
        $mgRight="level1"
        $maxWidth="15rem"
        $overflow="hidden"
        $textOverflow="ellipsis"
        $whiteSpace="nowrap"
        $textAlign="right"
      >
        {name}
      </PlainText>
    );
  };

  const content =
    status === ProfileStatus.ACTIVE ? (
      <>
        <CartLink />
        <SC.User
          id="user"
          onClick={() => setIsDropdownVisible((prevState) => !prevState)}
          data-testid="LoggedInLinks-user-box"
        >
          {showUsername(username)}
          <MyIcon $size="small" $rotation={isDropdownVisible ? -90 : 90}>
            <ArrowIcon />
          </MyIcon>
          <Dropdown isVisible={isDropdownVisible} closed={() => setIsDropdownVisible(false)} />
        </SC.User>
      </>
    ) : (
      <Link to="/my-account/data" data-testid="LoggedInLinks-my-account-link">
        <SC.User id="user">
          {showUsername(username)}
          <MyIcon $size="small">
            <SettingsIcon />
          </MyIcon>
        </SC.User>
      </Link>
    );

  return <SC.Wrapper data-testid="LoggedInLinks">{content}</SC.Wrapper>;
}

LoggedInLinks.propTypes = {
  username: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.values(ProfileStatus)).isRequired,
};
