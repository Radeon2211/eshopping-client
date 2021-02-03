import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import { modalTypes, singleInfoNames } from '../../../shared/constants';
import PlainPanel from '../../../components/UI/Panels/PlainPanel';
import FlexWrapper from '../../../components/UI/FlexWrapper';
import Heading from '../../../components/UI/Heading/Heading';
import SingleInfo from './SingleInfo/SingleInfo';
import Button from '../../../components/UI/Button/Button';

const SC = {};
SC.Wrapper = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacings.level3};
  grid-template-columns: repeat(3, 1fr);

  & .change-passwd-btn {
    grid-area: 3 / 2 / 3 / 3;
  }

  & .actions {
    grid-column: 1 / -1;
  }

  @media only screen and (max-width: 37.5em) {
    grid-template-columns: repeat(2, 1fr);

    & .change-passwd-btn {
      grid-area: 4 / 1 / 4 / 3;
    }

    & .actions > * {
      flex-grow: 1;
    }
  }
`;

const MyData = () => {
  const userProfile = useSelector((state) => state.auth.profile);

  const dispatch = useDispatch();
  const onSetModal = useCallback(
    (isModalOpen, modalContent) => dispatch(actions.setModal(isModalOpen, modalContent)),
    [dispatch],
  );

  let wrapperContent = null;
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
      isAdmin,
    } = userProfile;

    let adminContent = null;
    if (isAdmin) {
      adminContent = (
        <FlexWrapper
          spacing="level3"
          className="actions"
          justify="center"
          data-test="admin-content"
        >
          <Button clicked={() => onSetModal(true, modalTypes.ADD_ADMIN)}>Add admin</Button>
          <Button color="red" clicked={() => onSetModal(true, modalTypes.REMOVE_ADMIN)}>
            Remove admin
          </Button>
        </FlexWrapper>
      );
    }

    wrapperContent = (
      <>
        <SingleInfo
          name={singleInfoNames.NAME}
          content={`${firstName} ${lastName}`}
          clickHandler={() => onSetModal(true, modalTypes.CHANGE_NAME)}
        />
        <SingleInfo
          name={singleInfoNames.EMAIL}
          content={email}
          clickHandler={() => onSetModal(true, modalTypes.CHANGE_EMAIL)}
        />
        <SingleInfo
          name={singleInfoNames.PHONE_NUMBER}
          content={phone}
          clickHandler={() => onSetModal(true, modalTypes.CHANGE_PHONE_NUMBER)}
        />
        <SingleInfo
          name={singleInfoNames.ADDRESS}
          content={[street, `${zipCode} ${city}`, country]}
          clickHandler={() => onSetModal(true, modalTypes.CHANGE_ADDRESS)}
        />
        <SingleInfo
          name={singleInfoNames.CONTACTS}
          content={contacts}
          clickHandler={() => onSetModal(true, modalTypes.CHANGE_CONTACTS)}
        />
        <SingleInfo name={singleInfoNames.USERNAME} content={username} />
        <FlexWrapper
          spacing="level3"
          className="actions"
          justify="center"
          data-test="all-users-content"
        >
          <Button clicked={() => onSetModal(true, modalTypes.CHANGE_PASSWORD)}>
            Change password
          </Button>
          <Button color="red" clicked={() => onSetModal(true, modalTypes.DELETE_ACCOUNT)}>
            Delete account
          </Button>
        </FlexWrapper>
        {adminContent}
      </>
    );
  }

  return (
    <>
      <Heading variant="h3">My data</Heading>
      <PlainPanel>
        <SC.Wrapper>{wrapperContent}</SC.Wrapper>
      </PlainPanel>
    </>
  );
};

export default MyData;
