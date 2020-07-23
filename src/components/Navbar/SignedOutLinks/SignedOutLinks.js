import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../UI/Button/Button';
import Login from '../../../containers/Forms/Login';
import Signup from '../../../containers/Forms/Signup';
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

  const closeModalHandle = () => {
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
        <Button onClick={() => openModalHandle(Login)}>login</Button>
        <Button filled onClick={() => openModalHandle(Signup)}>signup</Button>
      </SC.Wrapper>
    </>
  );
};

export default SignedOutLinks;
