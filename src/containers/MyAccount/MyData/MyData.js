import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as SC from './MyData.sc';
import * as actions from '../../../store/actions/indexActions';
import { modalTypes, singleInfoNames } from '../../../shared/constants';
import PlainPanel from '../../../components/UI/Panels/PlainPanel';
import FlexWrapper from '../../../components/UI/FlexWrapper';
import Heading from '../../../components/UI/Heading/Heading';
import SingleInfo from './SingleInfo/SingleInfo';
import Button from '../../../components/UI/Button/Button';
import PlainText from '../../../components/UI/PlainText';

const MyData = (props) => {
  const { history } = props;

  const userProfile = useSelector((state) => state.auth.profile);

  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (isModalOpen, modalContent) => dispatch(actions.setModal(isModalOpen, modalContent)),
    [dispatch],
  );

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

    const isAccountActive = status === 'active';

    let adminContent = null;
    if (isAdmin) {
      adminContent = (
        <FlexWrapper
          spacing="3"
          className="actions"
          justify="center"
          data-testid="MyData-admin-content"
        >
          <Button clicked={() => onSetModal(true, modalTypes.ADD_ADMIN)}>Add admin</Button>
          <Button color="red" clicked={() => onSetModal(true, modalTypes.REMOVE_ADMIN)}>
            Remove admin
          </Button>
        </FlexWrapper>
      );
    }

    let pendingUserActions = null;
    if (!isAccountActive) {
      pendingUserActions = (
        <FlexWrapper
          spacing="3"
          justify="center"
          className="actions"
          data-testid="MyData-pending-user-actions"
        >
          <Button clicked={() => onSetModal(true, modalTypes.SEND_VERIFICATION_LINK)}>
            Send verification link
          </Button>
          <Button clicked={() => history.push('/logout')}>Logout</Button>
        </FlexWrapper>
      );
    }

    dataAndActions = (
      <>
        <SingleInfo name={singleInfoNames.USERNAME} content={username} />
        <SingleInfo
          name={singleInfoNames.NAME}
          content={`${firstName} ${lastName}`}
          clickHandler={isAccountActive ? () => onSetModal(true, modalTypes.CHANGE_NAME) : null}
        />
        <SingleInfo
          name={singleInfoNames.EMAIL}
          content={email}
          clickHandler={isAccountActive ? () => onSetModal(true, modalTypes.CHANGE_EMAIL) : null}
        />
        <SingleInfo
          name={singleInfoNames.ADDRESS}
          content={[street, `${zipCode} ${city}`, country]}
          clickHandler={isAccountActive ? () => onSetModal(true, modalTypes.CHANGE_ADDRESS) : null}
        />
        <SingleInfo
          name={singleInfoNames.CONTACTS}
          content={contacts}
          clickHandler={isAccountActive ? () => onSetModal(true, modalTypes.CHANGE_CONTACTS) : null}
        />
        <SingleInfo
          name={singleInfoNames.PHONE_NUMBER}
          content={phone}
          clickHandler={
            isAccountActive ? () => onSetModal(true, modalTypes.CHANGE_PHONE_NUMBER) : null
          }
        />
        {pendingUserActions}
        <FlexWrapper spacing="3" className="actions" justify="center">
          {isAccountActive && (
            <Button
              clicked={() => onSetModal(true, modalTypes.CHANGE_PASSWORD)}
              data-testid="MyData-change-password-btn"
            >
              Change password
            </Button>
          )}
          <Button color="red" clicked={() => onSetModal(true, modalTypes.DELETE_ACCOUNT)}>
            Delete account
          </Button>
        </FlexWrapper>
        {adminContent}
      </>
    );

    if (!isAccountActive) {
      pendingUserContent = (
        <PlainPanel data-testid="MyData-pending-user-content">
          <PlainText size="3" lineHeight="5">
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
      <Heading variant="h3">My data</Heading>
      <FlexWrapper direction="column" spacing="3">
        {pendingUserContent}
        <PlainPanel>
          <SC.Wrapper>{dataAndActions}</SC.Wrapper>
        </PlainPanel>
      </FlexWrapper>
    </>
  );
};

export default MyData;
