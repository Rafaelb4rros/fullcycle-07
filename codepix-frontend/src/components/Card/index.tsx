import { ReactNode } from "react";
import styles from "./card.module.scss";

export function Card({ children }: { children: ReactNode }) {
  return <div className={styles.root}>{children}</div>;
}
