import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FlexWrapper from './FlexWrapper';
import { formatPrice } from '../../shared/utility';

const SC = {};
SC.Wrapper = styled(FlexWrapper)`
  font-size: ${({ theme }) => theme.fontSizes.level4};

  & .value {
    font-size: ${({ theme }) => theme.fontSizes.level6};
    letter-spacing: 1px;
  }
`;

const ToPayInfo = (props) => {
  const { value } = props;

  return (
    <SC.Wrapper align="center" justify="center" wrap="wrap" spacing="level1">
      <span>To pay</span>
      <span className="value">{formatPrice(value)}</span>
    </SC.Wrapper>
  );
};

ToPayInfo.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ToPayInfo;
