import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../components/UI/Button/Button';
import Heading from '../../../../components/UI/Heading/Heading';
import { singleInfoNames } from '../../../../shared/constants';
import FlexWrapper from '../../../../components/UI/FlexWrapper';
import { UserDataValue } from '../../../../styled/components';

const SingleInfo = (props) => {
  const { name, content, clickHandler } = props;

  let contentNode = '';
  if (name === singleInfoNames.ADDRESS) {
    contentNode = (
      <FlexWrapper direction="column" spacing="level1">
        {content.map((value, idx) => (
          <UserDataValue key={idx}>{value}</UserDataValue>
        ))}
      </FlexWrapper>
    );
  } else if (name === singleInfoNames.CONTACTS) {
    contentNode = (
      <FlexWrapper direction="column" spacing="level1">
        <UserDataValue>
          Email:
          {content.email ? ' visible' : ' hidden'}
        </UserDataValue>
        <UserDataValue>
          Phone number:
          {content.phone ? ' visible' : ' hidden'}
        </UserDataValue>
      </FlexWrapper>
    );
  } else {
    contentNode = <UserDataValue>{content}</UserDataValue>;
  }

  let button = null;
  if (clickHandler) {
    button = <Button clicked={clickHandler}>Change</Button>;
  }

  return (
    <FlexWrapper direction="column" spacing="level2" align="start">
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
