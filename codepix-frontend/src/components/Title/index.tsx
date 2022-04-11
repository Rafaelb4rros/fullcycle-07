import styles from "./title.module.scss";
import { ReactNode } from "react";

export function Title({ children }: { children: ReactNode }) {
  return <h1 className={styles.root}>{children}</h1>;
}
