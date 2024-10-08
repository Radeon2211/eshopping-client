import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as SC from './MyData.sc';
import * as actions from '../../../store/actions/indexActions';
import { singleInfoNames } from '../../../shared/constants';
import PlainPanel from '../../../components/UI/Panels/PlainPanel';
import FlexWrapper from '../../../components/UI/FlexWrapper';
import Heading from '../../../components/UI/Heading/Heading';
import SingleInfo from './SingleInfo/SingleInfo';
import Button from '../../../components/UI/Button/Button';
import PlainText from '../../../components/UI/PlainText';
import { scrollToTop } from '../../../shared/utility/utility';
import MetaDescriptor from '../../../components/MetaDescriptor/MetaDescriptor';
import { ModalType, ProfileStatus } from '../../../shared/types/types';

export default function MyData() {
  const userProfile = useSelector((state) => state.auth.profile);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (modalContent) => dispatch(actions.setModal(modalContent)),
    [dispatch],
  );

  useEffect(() => {
    scrollToTop();
  }, []);

  let dataAndActions = null;
  let pendingUserContent = null;
  if (userProfile) {
    const {
      firstName,
      lastName,
      username,
      email,
      street,
      zipCode,
      city,
      country,
      phone,
      contacts,
      status,
      isAdmin,
    } = userProfile;

    const isAccountActive = status === ProfileStatus.ACTIVE;

    let adminContent = null;
    if (isAdmin) {
      adminContent = (
        <FlexWrapper
          $spacing="level3"
          className="actions"
          $justify="center"
          data-testid="MyData-admin-content"
        >
          <Button clicked={() => onSetModal(ModalType.ADD_ADMIN)}>Add admin</Button>
          <Button $color="red" clicked={() => onSetModal(ModalType.REMOVE_ADMIN)}>
            Remove admin
          </Button>
        </FlexWrapper>
      );
    }

    let pendingUserActions = null;
    if (!isAccountActive) {
      pendingUserActions = (
        <FlexWrapper
          $spacing="level3"
          $justify="center"
          className="actions"
          data-testid="MyData-pending-user-actions"
        >
          <Button clicked={() => onSetModal(ModalType.SEND_VERIFICATION_LINK)}>
            Send verification link
          </Button>
          <Button clicked={() => navigate('/logout')}>Logout</Button>
        </FlexWrapper>
      );
    }

    dataAndActions = (
      <>
        <SingleInfo name={singleInfoNames.USERNAME} content={username} />
        <SingleInfo
          name={singleInfoNames.NAME}
          content={`${firstName} ${lastName}`}
          clickHandler={isAccountActive ? () => onSetModal(ModalType.CHANGE_NAME) : null}
        />
        <SingleInfo
          name={singleInfoNames.EMAIL}
          content={email}
          clickHandler={isAccountActive ? () => onSetModal(ModalType.CHANGE_EMAIL) : null}
        />
        <SingleInfo
          name={singleInfoNames.ADDRESS}
          content={[street, `${zipCode} ${city}`, country]}
          clickHandler={isAccountActive ? () => onSetModal(ModalType.CHANGE_ADDRESS) : null}
        />
        <SingleInfo
          name={singleInfoNames.CONTACTS}
          content={contacts}
          clickHandler={isAccountActive ? () => onSetModal(ModalType.CHANGE_CONTACTS) : null}
        />
        <SingleInfo
          name={singleInfoNames.PHONE_NUMBER}
          content={phone}
          clickHandler={isAccountActive ? () => onSetModal(ModalType.CHANGE_PHONE_NUMBER) : null}
        />
        {pendingUserActions}
        <FlexWrapper $spacing="level3" className="actions" $justify="center">
          {isAccountActive && (
            <Button clicked={() => onSetModal(ModalType.CHANGE_PASSWORD)}>Change password</Button>
          )}
          <Button $color="red" clicked={() => onSetModal(ModalType.DELETE_ACCOUNT)}>
            Delete account
          </Button>
        </FlexWrapper>
        {adminContent}
      </>
    );

    if (!isAccountActive) {
      pendingUserContent = (
        <PlainPanel data-testid="MyData-pending-user-content">
          <PlainText $size="level3" $lineHeight="level5">
            You need to activate your account to unlock all app functionalities. Verification link
            is active for 10 minutes. You can resend it below. If you do not activate your account
            within 1 hour, account will be deleted permanently.
          </PlainText>
        </PlainPanel>
      );
    }
  }

  return (
    <>
      <MetaDescriptor
        title="Your account data - E-Shopping"
        description="Check out your account informations"
      />
      <Heading $variant="h3">My data</Heading>
      <FlexWrapper $direction="column" $spacing="level3">
        {pendingUserContent}
        <PlainPanel>
          <SC.Wrapper>{dataAndActions}</SC.Wrapper>
        </PlainPanel>
      </FlexWrapper>
    </>
  );
}
