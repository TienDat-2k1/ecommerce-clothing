import { useState } from 'react';

import './FormInput.scss';

type FormInputProps = {
  value: string | number;
  label: string;
  errorMessage?: string;
  pattern?: string;
} & React.ComponentProps<'input'>;

const FormInput = ({
  label,
  errorMessage,
  type,
  ...otherProps
}: FormInputProps) => {
  const [focused, setFocused] = useState(false);

  const handlerFocus = () => {
    setFocused(true);
  };
  return (
    <div className="input-group">
      <input
        type={type}
        className={`form-input `}
        {...otherProps}
        data-focused={focused.toString()}
        onBlur={handlerFocus}
      />
      {label && (
        <label
          htmlFor=""
          className={`form-input-label ${
            (typeof otherProps.value === 'number' && otherProps.value >= 0) ||
            (typeof otherProps.value === 'string' && otherProps.value.length)
              ? 'shrink'
              : ''
          }`}
        >
          {label}
        </label>
      )}
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );
};
export default FormInput;
