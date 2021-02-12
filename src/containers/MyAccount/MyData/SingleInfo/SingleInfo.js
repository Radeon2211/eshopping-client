import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../components/UI/Button/Button';
import Heading from '../../../../components/UI/Heading/Heading';
import { singleInfoNames } from '../../../../shared/constants';
import FlexWrapper from '../../../../components/UI/FlexWrapper';
import PlainText from '../../../../components/UI/PlainText';

const SingleInfo = (props) => {
  const { name, content, clickHandler } = props;

  let contentNode = '';
  if (name === singleInfoNames.ADDRESS) {
    contentNode = (
      <FlexWrapper direction="column" spacing="1">
        {content.map((value, idx) => (
          <PlainText key={idx} size="3" wordBreak="break-all">
            {value}
          </PlainText>
        ))}
      </FlexWrapper>
    );
  } else if (name === singleInfoNames.CONTACTS) {
    contentNode = (
      <FlexWrapper direction="column" spacing="1">
        <PlainText size="3" wordBreak="break-all">
          Email:
          {content.email ? ' visible' : ' hidden'}
        </PlainText>
        <PlainText size="3" wordBreak="break-all">
          Phone number:
          {content.phone ? ' visible' : ' hidden'}
        </PlainText>
      </FlexWrapper>
    );
  } else {
    contentNode = (
      <PlainText size="3" wordBreak="break-all">
        {content}
      </PlainText>
    );
  }

  let button = null;
  if (clickHandler) {
    button = <Button clicked={clickHandler}>Change</Button>;
  }

  return (
    <FlexWrapper direction="column" spacing="2" align="start">
      <Heading variant="h4" data-test="name">
        {name}
      </Heading>
      {contentNode}
      {button}
    </FlexWrapper>
  );
};

SingleInfo.defaultProps = {
  clickHandler: undefined,
};

SingleInfo.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]).isRequired,
  clickHandler: PropTypes.func,
};

export default SingleInfo;
