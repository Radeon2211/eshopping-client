import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../UI/Button/Button';
import Login from '../../../containers/Forms/Login';
import Signup from '../../../containers/Forms/Signup/Signup';
import Modal from '../../UI/Modal/Modal';

const SC = {};
SC.Wrapper = styled.nav`
  display: flex;

  & > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacings.level3};
  }
`;

const SignedOutLinks = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState(null);

  const closeModalHandle = (e) => {
    setIsModalVisible(false);
    setForm(null);
  };

  const openModalHandle = (component) => {
    setForm(component);
    setIsModalVisible(true);
  };

  return (
    <>
      <Modal visible={isModalVisible} closed={closeModalHandle}>{form}</Modal>
      <SC.Wrapper>
        <Button size="big" clicked={openModalHandle.bind(this, <Login />)}>login</Button>
        <Button size="big" filled clicked={openModalHandle.bind(this, <Signup />)}>signup</Button>
      </SC.Wrapper>
    </>
  );
};

export default SignedOutLinks;
