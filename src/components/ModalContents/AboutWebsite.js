import React from 'react';
import Heading from '../UI/Heading/Heading';
import PlainText from '../UI/PlainText';

const AboutWebsite = () => {
  return (
    <>
      <Heading variant="h3" align="center" mgBottom="3">
        About website
      </Heading>
      <PlainText size="3" lineHeight="5" textAlign="justify">
        This website is not used to buy and sell products. Offers on this website are not real and
        orders will not be realized. Data that you specify in forms do not need to be real. However
        they are not processed in any way except of storing in database and displaying them on this
        website.
      </PlainText>
    </>
  );
};

export default AboutWebsite;
