import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/indexActions';
import * as modalTypes from '../../../store/actions/modalTypes';
import Panel from '../../../components/UI/Panel/Panel';
import Heading from '../../../components/UI/Heading/Heading';
import SingleInfo from './SingleInfo/SingleInfo';

const SC = {};
SC.Wrapper = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacings.level3};
  grid-template-columns: repeat(3, 1fr);

  @media only screen and (max-width: 37.5em) {
    grid-template-columns: repeat(2, 1fr);
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
    } = userProfile;

    wrapperContent = (
      <>
        <SingleInfo
          name="First and last name"
          content={`${firstName} ${lastName}`}
          clickHandler={() => onSetModal(true, modalTypes.CHANGE_NAME)}
        />
        <SingleInfo
          name="Email"
          content={email}
          clickHandler={() => onSetModal(true, modalTypes.CHANGE_EMAIL)}
        />
        <SingleInfo name="Username" content={username} />
        <SingleInfo
          name="Address"
          content={{ street, zipCodeAndCity: `${zipCode} ${city}`, country }}
          clickHandler={() => onSetModal(true, modalTypes.CHANGE_ADDRESS)}
        />
        <SingleInfo
          name="Contacts"
          content={contacts}
          clickHandler={() => onSetModal(true, modalTypes.CHANGE_CONTACTS)}
        />
        <SingleInfo
          name="Phone number"
          content={phone}
          clickHandler={() => onSetModal(true, modalTypes.CHANGE_PHONE_NUMBER)}
        />
      </>
    );
  }

  return (
    <>
      <Heading variant="h3">My data</Heading>
      <Panel>
        <SC.Wrapper>{wrapperContent}</SC.Wrapper>
      </Panel>
    </>
  );
};

export default MyData;
