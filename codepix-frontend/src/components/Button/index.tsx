import { PropsWithChildren } from "react";
import { useBankContext } from "../../contexts/BankContext";
import { ButtonProps } from "./button.types";
import { variants } from "./button.variants";

export function Button({
  children,
  variant,
  className,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  const { cssCode } = useBankContext();

  const btnClasses = ["btn", variants.button[variant], cssCode, className]
    .join(" ")
    .trim();

  return (
    <button className={btnClasses} {...rest}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  variant: "primary",
};
