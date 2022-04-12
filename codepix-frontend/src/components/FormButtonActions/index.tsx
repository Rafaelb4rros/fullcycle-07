import { ReactNode } from "react";
import styles from "./form-button-actions.module.scss";

export function FormButtonActions({ children }: { children: ReactNode }) {
  return <div className={styles.root}>{children}</div>;
}
