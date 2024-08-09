import PropTypes from 'prop-types';
import * as SC from './NumberInput.sc';

export interface NumberInputProps {
  name: string;
  value: number | string;
  changed: () => void;
  blured?: () => void;
  focused?: () => void;
  floating?: boolean;
  size?: 'small' | 'big';
}

export default function NumberInput({
  name,
  value,
  changed,
  blured,
  focused,
  floating = false,
  size = 'big',
}: NumberInputProps) {
  const inputKeyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
    if (
      e.key === 'e' ||
      e.key === 'E' ||
      e.key === '-' ||
      e.key === '.' ||
      (!floating && e.key === ',')
    ) {
      e.preventDefault();
    }
  };

  return (
    <SC.NumberInput
      type="number"
      size={size}
      name={name}
      value={value}
      onChange={changed}
      onBlur={blured}
      onKeyDown={inputKeyDownHandle}
      onFocus={focused}
      data-testid={`NumberInput-${name}`}
    />
  );
}

NumberInput.defaultProps = {
  value: '',
  size: 'big',
  floating: false,
  blured: () => {},
  focused: () => {},
};

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  changed: PropTypes.func.isRequired,
  blured: PropTypes.func,
  focused: PropTypes.func,
  floating: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'big']),
};
