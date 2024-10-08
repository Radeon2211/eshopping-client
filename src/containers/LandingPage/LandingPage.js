import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as SC from './LandingPage.sc';
import { panelVariants, panelItemVariants } from './LandingPage.sc';
import landingPageBg from '../../images/landing-page-bg.jpg';
import Header from '../../components/UI/Header';
import Button from '../../components/UI/Button/Button';
import FlexWrapper from '../../components/UI/FlexWrapper';
import { defaultAppPath } from '../../shared/constants';
import Heading from '../../components/UI/Heading/Heading';
import * as actions from '../../store/actions/indexActions';
import { ModalType } from '../../shared/types/types';

export default function LandingPage() {
  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (modalContent) => dispatch(actions.setModal(modalContent)),
    [dispatch],
  );

  return (
    <SC.Wrapper data-testid="LandingPage">
      <SC.BackgroundImage src={landingPageBg} alt="E-Shopping" />
      <SC.Gradient />
      <SC.CentralPanel variants={panelVariants} initial="hidden" animate="visible">
        <motion.div variants={panelItemVariants}>
          <Header size="big" />
        </motion.div>
        <motion.div variants={panelItemVariants}>
          <SC.Slogan>
            <Heading
              $variant="h2"
              $mgTop="level4"
              $lineHeight="level4"
              $mgBottom="level5"
              $align="center"
            >
              <span>Buy and sell</span>
              <span>whatever you want</span>
            </Heading>
          </SC.Slogan>
        </motion.div>
        <FlexWrapper $spacing="level3" $justify="center">
          <motion.div variants={panelItemVariants}>
            <Button $size="big" clicked={() => onSetModal(ModalType.LOGIN)}>
              Login
            </Button>
          </motion.div>
          <motion.div variants={panelItemVariants}>
            <Button $size="big" clicked={() => onSetModal(ModalType.SIGNUP)}>
              Signup
            </Button>
          </motion.div>
        </FlexWrapper>
        <motion.div variants={panelItemVariants}>
          <Heading $variant="h3" $mgTop="level3" $mgBottom="level3">
            OR
          </Heading>
        </motion.div>
        <motion.div variants={panelItemVariants}>
          <Link to={defaultAppPath}>
            <Button $size="big" $filled>
              View the products now
            </Button>
          </Link>
        </motion.div>
      </SC.CentralPanel>
    </SC.Wrapper>
  );
}
