import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NumberInput from './NumberInput';
import MyIcon from './MyIcon';
import { ReactComponent as MinusIcon } from '../../images/SVG/minus.svg';
import { ReactComponent as PlusIcon } from '../../images/SVG/plus.svg';
import themeStyles from '../../styled/theme';

const SC = {};
SC.Wrapper = styled.div`
  align-items: stretch;
  display: flex;

  & .button {
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.light4};
    border-radius: 1px;
    cursor: pointer;
    outline: none;
    padding: 0 ${({ theme }) => theme.spacings.level2};

    &[disabled] {
      cursor: default;
    }

    &.minus {
      border-right: 0;
    }

    &.plus {
      border-left: 0;
    }
  }
`;

const ChooseQuantity = (props) => {
  const { name, value, maxQuantity, incremented, decremented, changed, blured } = props;

  return (
    <SC.Wrapper>
      <button type="button" className="button minus" disabled={value <= 1} onClick={decremented}>
        <MyIcon size="small" color={value <= 1 ? themeStyles.colors.light2 : ''}>
          <MinusIcon />
        </MyIcon>
      </button>
      <NumberInput
        name={name}
        size="small"
        value={value}
        changed={changed}
        blured={blured}
        focusable={false}
      />
      <button
        type="button"
        className="button plus"
        disabled={value >= maxQuantity}
        onClick={incremented}
      >
        <MyIcon size="small" color={value >= maxQuantity ? themeStyles.colors.light2 : ''}>
          <PlusIcon />
        </MyIcon>
      </button>
    </SC.Wrapper>
  );
};

ChooseQuantity.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  maxQuantity: PropTypes.number.isRequired,
  incremented: PropTypes.func.isRequired,
  decremented: PropTypes.func.isRequired,
  changed: PropTypes.func.isRequired,
  blured: PropTypes.func.isRequired,
};

export default ChooseQuantity;
