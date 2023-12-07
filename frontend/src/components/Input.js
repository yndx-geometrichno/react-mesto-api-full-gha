import React from "react";
import { findInputError } from "../utils/findInputError";
import { isFormInvalid } from "../utils/isFormInvalid";
import { useFormContext } from "react-hook-form";

export const Input = ({
  name,
  type,
  id,
  placeholder,
  className,
  validation,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputErrors = findInputError(errors, name);

  const isInvalid = isFormInvalid(inputErrors);

  return (
    <label className="popup__input-container">
      <input
        id={id}
        name={name}
        type={type}
        className={`popup__input ${className} ${
          isInvalid && "popup__input_type_error"
        }`}
        placeholder={placeholder}
        {...register(name, validation)}
      />
      <InputError name={id} isInvalid={isInvalid} inputErrors={inputErrors} />
    </label>
  );
};

const InputError = ({ name, isInvalid, inputErrors }) => {
  return (
    <span
      className={`${name}-input-error popup__error ${
        isInvalid && "popup__error_visible"
      }`}
    >
      {isInvalid && inputErrors.error.message}
    </span>
  );
};
