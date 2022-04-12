import { ForwardedRef, forwardRef } from "react";
import { InputProps } from "./input.type";
import { variants } from "./input.variants";

export const InputComponent = (
  { labelText, className, id, type, ...rest }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const Label = labelText && (
    <label className={variants.label[type]} htmlFor={id}>
      {labelText}
    </label>
  );

  const CustomInput = (
    <input
      id={id}
      className={variants.input[type]}
      type={type}
      {...rest}
      ref={ref}
    />
  );

  return (
    <div className={variants.container[type]}>
      {type === "radio" ? (
        <>
          {CustomInput}
          {Label}
        </>
      ) : (
        <>
          {Label}
          {CustomInput}
        </>
      )}
    </div>
  );
};

export const Input = forwardRef(InputComponent);
