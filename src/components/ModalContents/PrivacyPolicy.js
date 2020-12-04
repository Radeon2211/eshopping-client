import React from 'react';
import styled from 'styled-components';
import Heading from '../UI/Heading/Heading';

const SC = {};
SC.Wrapper = styled.div`
  & .content {
    font-size: ${({ theme }) => theme.fontSizes.level3};
    text-align: justify;
  }
`;

const PrivacyPolicy = () => {
  return (
    <SC.Wrapper>
      <Heading variant="h4" align="center" mgBottom="medium">
        Privacy Policy
      </Heading>
      <div className="content">
        Data that you specify in forms do not need to be real. However they are not processed in any
        way except of storing in database and displaying them on this website.
      </div>
    </SC.Wrapper>
  );
};

export default PrivacyPolicy;
