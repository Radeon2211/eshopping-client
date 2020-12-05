import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions/indexActions';
import { modalTypes } from '../shared/constants';
import MyIcon from './UI/MyIcon';
import { ReactComponent as LinkedinIcon } from '../images/SVG/linkedin.svg';
import { ReactComponent as EmailIcon } from '../images/SVG/email.svg';

const SC = {};
SC.Wrapper = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.light3};
  padding: ${({ theme }) => theme.spacings.level3} ${({ theme }) => theme.spacings.level2};
  text-align: center;

  & .copyright {
    font-size: ${({ theme }) => theme.fontSizes.level2};
  }

  & .socials {
    align-items: center;
    display: flex;
    justify-content: center;
    margin: ${({ theme }) => theme.spacings.level2} 0;

    & > *:not(:last-child) {
      margin-right: ${({ theme }) => theme.spacings.level3};
    }
  }

  & .social-link {
    align-items: center;
    display: flex;
  }

  & .email {
    font-size: ${({ theme }) => theme.fontSizes.level1};
    margin-left: ${({ theme }) => theme.spacings.level1};
  }

  & .terms-of-use {
    color: ${({ theme }) => theme.colors.light4};
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizes.level1};

    &:hover {
      color: #000;
    }
  }

  @media only screen and (max-width: 37.5em) {
    & .socials {
      margin: calc(1.5 * ${({ theme }) => theme.spacings.level2}) 0;
    }
  }
`;

const Footer = () => {
  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (isModalOpen, modalContent) => dispatch(actions.setModal(isModalOpen, modalContent)),
    [dispatch],
  );

  return (
    <SC.Wrapper>
      <span className="copyright">&copy; 2020 Radosław Mikrut. All rights reserved</span>
      <div className="socials">
        <a
          href="https://www.linkedin.com/in/rados%C5%82aw-mikrut-a8600b198/"
          rel="noopener noreferrer"
          className="social-link"
          target="_blank"
        >
          <MyIcon size="medium">
            <LinkedinIcon />
          </MyIcon>
        </a>
        <a href="mailto:radoslawmikrut@wp.pl" rel="noopener noreferrer" className="social-link">
          <MyIcon size="medium">
            <EmailIcon />
          </MyIcon>
          <span className="email">radoslawmikrut@wp.pl</span>
        </a>
      </div>
      <span
        className="terms-of-use"
        onClick={() => onSetModal(true, modalTypes.ABOUT_WEBSITE)}
        role="button"
        tabIndex={0}
        onKeyDown={() => onSetModal(true, modalTypes.ABOUT_WEBSITE)}
      >
        About website
      </span>
    </SC.Wrapper>
  );
};

export default Footer;
