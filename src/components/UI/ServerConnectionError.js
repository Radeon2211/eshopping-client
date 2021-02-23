import React from 'react';
import styled from 'styled-components';
import Heading from './Heading/Heading';
import { ReactComponent as ServerErrorImage } from '../../images/server-connection-error.svg';

const SC = {};
SC.Wrapper = styled.div`
  text-align: center;
  padding: 0 ${({ theme }) => theme.spacings.level2};

  & .image {
    max-width: 100%;
    width: 60rem;
  }
`;

const ServerConnectionError = () => {
  return (
    <SC.Wrapper>
      <Heading variant="h3" align="center" mgTop="3" lineHeight="4">
        Oops! Server connection error. Please try again later
      </Heading>
      <ServerErrorImage className="image" />
    </SC.Wrapper>
  );
};

export default ServerConnectionError;
