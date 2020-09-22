import React, { ChangeEvent, useCallback } from 'react';
import { getIn, useFormikContext } from 'formik';
import { Input, InputProps } from 'reactstrap';

interface Props extends InputProps {
  fieldPath: string;
  placeholder?: string;
  className?: string;
}
const FormikInput: React.FC<Props> = ({ fieldPath, placeholder, className, ...rest }: Props) => {
  const { values, handleSubmit, errors, touched, setFieldValue, handleBlur } = useFormikContext();
  const value = getIn(values, fieldPath, '');
  const error = getIn(errors, fieldPath, false);
  const isTouched = getIn(touched, fieldPath);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFieldValue(fieldPath, e.target.value);
    },
    [fieldPath, setFieldValue],
  );
  const onKeyDown = useCallback(
    e => {
      if (e.keyCode === 13) {
        handleSubmit();
      }
    },
    [handleSubmit],
  );
  return (
    <div className="mb-4">
      <Input
        name={fieldPath}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={className}
        {...rest}
      />
      {isTouched && error && <p className="text-danger small position-absolute">{error}</p>}
    </div>
  );
};

export default FormikInput;
