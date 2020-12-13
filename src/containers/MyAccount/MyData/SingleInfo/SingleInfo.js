import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../../../components/UI/Button/Button';
import { singleInfoNames } from '../../../../shared/constants';

const SC = {};
SC.Wrapper = styled.div`
  align-items: start;
  display: flex;
  flex-direction: column;

  & .name {
    font-size: ${({ theme }) => theme.fontSizes.level2};
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: ${({ theme }) => theme.spacings.level1};
    text-transform: uppercase;
  }

  & .content {
    font-size: ${({ theme }) => theme.fontSizes.level3};
    margin-bottom: ${({ theme }) => theme.spacings.level1};
    word-break: break-all;
  }
`;

const SingleInfo = (props) => {
  const { name, content, clickHandler } = props;

  let contentNode = '';
  if (name === singleInfoNames.ADDRESS) {
    const { street, zipCodeAndCity, country } = content;
    contentNode = (
      <>
        <span className="content">{street}</span>
        <span className="content">{zipCodeAndCity}</span>
        <span className="content">{country}</span>
      </>
    );
  } else if (name === singleInfoNames.CONTACTS) {
    contentNode = (
      <>
        <span className="content">
          Email:
          {content.includes('email') ? ' visible' : ' hidden'}
        </span>
        <span className="content">
          Phone number:
          {content.includes('phone') ? ' visible' : ' hidden'}
        </span>
      </>
    );
  } else {
    contentNode = <span className="content">{content}</span>;
  }

  let button = null;
  if (clickHandler) {
    button = <Button clicked={clickHandler}>Change</Button>;
  }

  return (
    <SC.Wrapper>
      <span className="name">{name}</span>
      {contentNode}
      {button}
    </SC.Wrapper>
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
