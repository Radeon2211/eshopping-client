import PropTypes from 'prop-types';
import * as SC from './ChooseQuantity.sc';
import NumberInput from '../NumberInput/NumberInput';
import MyIcon from '../MyIcon';
import { ReactComponent as MinusIcon } from '../../../images/icons/minus.svg';
import { ReactComponent as PlusIcon } from '../../../images/icons/plus.svg';
import themeStyles from '../../../styled/theme';

export interface ChooseQuantityProps {
  name: string;
  value: number;
  maxQuantity: number;
  incremented: () => void;
  decremented: () => void;
  changed: () => void;
  blured: () => void;
  focused?: () => void;
}

export default function ChooseQuantity(props: ChooseQuantityProps) {
  const { name, value, maxQuantity, incremented, decremented, changed, blured, focused } = props;

  return (
    <SC.Wrapper>
      <button
        type="button"
        className="button minus"
        disabled={value <= 1}
        onClick={decremented}
        data-testid="ChooseQuantity-minus-btn"
        aria-label="Decrease product quantity"
      >
        <MyIcon
          $size="small"
          $color={value <= 1 ? themeStyles.colors.light2 : ''}
          data-testid="ChooseQuantity-minus-icon"
        >
          <MinusIcon />
        </MyIcon>
      </button>
      <NumberInput
        name={name}
        size="small"
        value={value}
        changed={changed}
        blured={blured}
        focused={focused}
      />
      <button
        type="button"
        className="button plus"
        disabled={value >= maxQuantity}
        onClick={incremented}
        data-testid="ChooseQuantity-plus-btn"
        aria-label="Increase product quantity"
      >
        <MyIcon
          $size="small"
          $color={value >= maxQuantity ? themeStyles.colors.light2 : ''}
          data-testid="ChooseQuantity-plus-icon"
        >
          <PlusIcon />
        </MyIcon>
      </button>
    </SC.Wrapper>
  );
}

ChooseQuantity.defaultProps = {
  focused: () => {},
};

ChooseQuantity.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  maxQuantity: PropTypes.number.isRequired,
  incremented: PropTypes.func.isRequired,
  decremented: PropTypes.func.isRequired,
  changed: PropTypes.func.isRequired,
  blured: PropTypes.func.isRequired,
  focused: PropTypes.func,
};
