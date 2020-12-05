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

const AboutWebsite = () => {
  return (
    <SC.Wrapper>
      <Heading variant="h4" align="center" mgBottom="medium">
        About website
      </Heading>
      <div className="content">
        This website is not used to buy and sell products. Offers on this website are not real and
        orders will not be realized. Data that you specify in forms do not need to be real. However
        they are not processed in any way except of storing in database and displaying them on this
        website.
      </div>
    </SC.Wrapper>
  );
};

export default AboutWebsite;
