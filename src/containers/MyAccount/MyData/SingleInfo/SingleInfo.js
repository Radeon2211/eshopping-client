import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../components/UI/Button/Button';
import Heading from '../../../../components/UI/Heading/Heading';
import { singleInfoNames } from '../../../../shared/constants';
import FlexWrapper from '../../../../components/UI/FlexWrapper';
import PlainText from '../../../../components/UI/PlainText';

export default function SingleInfo({ name, content, clickHandler }) {
  let contentNode = '';
  if (name === singleInfoNames.ADDRESS) {
    contentNode = (
      <FlexWrapper $direction="column" $spacing="1">
        {content.map((value, idx) => (
          <PlainText key={idx} $size="3" $wordBreak="break-all">
            {value}
          </PlainText>
        ))}
      </FlexWrapper>
    );
  } else if (name === singleInfoNames.CONTACTS) {
    contentNode = (
      <FlexWrapper $direction="column" $spacing="1">
        <PlainText $size="3" $wordBreak="break-all">
          Email:&nbsp;
          {content.email ? 'visible' : 'hidden'}
        </PlainText>
        <PlainText $size="3" $wordBreak="break-all">
          Phone number:&nbsp;
          {content.phone ? 'visible' : 'hidden'}
        </PlainText>
      </FlexWrapper>
    );
  } else {
    contentNode = (
      <PlainText $size="3" $wordBreak="break-all">
        {content}
      </PlainText>
    );
  }

  let button = null;
  if (clickHandler) {
    button = (
      <Button clicked={clickHandler} data-testid={`SingleInfo-${name}-btn`}>
        Change
      </Button>
    );
  }

  return (
    <FlexWrapper $direction="column" $spacing="2" $align="start" data-testid={`SingleInfo-${name}`}>
      <Heading $variant="h4">{name}</Heading>
      {contentNode}
      {button}
    </FlexWrapper>
  );
}

SingleInfo.defaultProps = {
  clickHandler: undefined,
};

SingleInfo.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      email: PropTypes.bool.isRequired,
      phone: PropTypes.bool.isRequired,
    }),
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  clickHandler: PropTypes.func,
};
