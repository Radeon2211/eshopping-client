/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/indexActions';
import MyIcon from '../UI/MyIcon';
import PlainText from '../UI/PlainText';
import FlexWrapper from '../UI/FlexWrapper';
import { ReactComponent as LinkedinIcon } from '../../images/icons/linkedin.svg';
import { ReactComponent as EmailIcon } from '../../images/icons/email.svg';
import { ModalType } from '../../shared/types/types';
import * as SC from './Footer.sc';

export default function Footer() {
  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (modalContent: ModalType) => dispatch(actions.setModal(modalContent)),
    [dispatch],
  );

  return (
    <SC.Wrapper data-testid="Footer">
      <PlainText $size="level2">&copy; 2023 Radosław Mikrut. All rights reserved</PlainText>
      <FlexWrapper
        $align="center"
        $justify="center"
        $mgBottom="level2"
        $mgTop="level2"
        $spacing="level3"
      >
        <a
          href="https://www.linkedin.com/in/rados%C5%82aw-mikrut-a8600b198/"
          rel="noopener noreferrer"
          className="social-link"
          target="_blank"
        >
          <MyIcon $size="medium">
            <LinkedinIcon />
          </MyIcon>
        </a>
        <a href="mailto:radoslawmikrut@wp.pl" rel="noopener noreferrer" className="social-link">
          <MyIcon $size="medium">
            <EmailIcon />
          </MyIcon>
          <PlainText $size="level1" $mgLeft="level1">
            radoslawmikrut@wp.pl
          </PlainText>
        </a>
      </FlexWrapper>
      <span
        className="about-website"
        onClick={() => onSetModal(ModalType.ABOUT_WEBSITE)}
        role="button"
        tabIndex={0}
        onKeyDown={() => onSetModal(ModalType.ABOUT_WEBSITE)}
      >
        About website
      </span>
    </SC.Wrapper>
  );
}
