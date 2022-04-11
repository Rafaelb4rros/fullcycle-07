import { ReactNode } from "react";
import styles from "./main-content.module.scss";

export function MainContent({ children }: { children: ReactNode }) {
  return (
    <main className={styles.root}>
      <div className="container">{children}</div>
    </main>
  );
}
