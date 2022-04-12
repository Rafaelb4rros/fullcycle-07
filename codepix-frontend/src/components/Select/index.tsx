import { ForwardedRef, forwardRef, PropsWithChildren } from "react";
import styles from "./select.module.scss";
import { SelectProps } from "./select.types";

const SelectComponent = (
  { children, id, labelText, ...rest }: PropsWithChildren<SelectProps>,
  ref: ForwardedRef<HTMLSelectElement>
) => {
  const Label = labelText ? <label htmlFor={id}>{labelText}</label> : null;

  return (
    <div className="form-group">
      {Label}
      <select className="form-control" id={id} {...rest} ref={ref}>
        {children}
      </select>
    </div>
  );
};

export const Select = forwardRef(SelectComponent);
