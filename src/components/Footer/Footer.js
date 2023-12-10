/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import { modalTypes } from '../../shared/constants';
import MyIcon from '../UI/MyIcon';
import PlainText from '../UI/PlainText';
import FlexWrapper from '../UI/FlexWrapper';
import { ReactComponent as LinkedinIcon } from '../../images/icons/linkedin.svg';
import { ReactComponent as EmailIcon } from '../../images/icons/email.svg';

const SC = {};
SC.Wrapper = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.light3};
  padding: ${({ theme }) => theme.spacings.level3} ${({ theme }) => theme.spacings.level2};
  text-align: center;

  & .social-link {
    align-items: center;
    display: flex;
  }

  & .about-website {
    color: ${({ theme }) => theme.colors.light4};
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizes.level1};
    transition: color ${({ theme }) => theme.durations.level1}s;

    &:hover {
      color: #000;
    }
  }
`;

export default function Footer() {
  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (modalContent) => dispatch(actions.setModal(modalContent)),
    [dispatch],
  );

  return (
    <SC.Wrapper data-testid="Footer">
      <PlainText size="2">&copy; 2021 Radosław Mikrut. All rights reserved</PlainText>
      <FlexWrapper align="center" justify="center" mgBottom="2" mgTop="2" spacing="3">
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
          <PlainText size="1" mgLeft="1">
            radoslawmikrut@wp.pl
          </PlainText>
        </a>
      </FlexWrapper>
      <span
        className="about-website"
        onClick={() => onSetModal(modalTypes.ABOUT_WEBSITE)}
        role="button"
        tabIndex={0}
        onKeyDown={() => onSetModal(modalTypes.ABOUT_WEBSITE)}
      >
        About website
      </span>
    </SC.Wrapper>
  );
}
