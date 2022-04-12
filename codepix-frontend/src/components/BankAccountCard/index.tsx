import { useBankContext } from "../../contexts/BankContext";
import styles from "./bank-account-card.module.scss";
import { BankAccountCardTypes } from "./bank-account-card.types";

export function BankAccountCard({ bankAccount }: BankAccountCardTypes) {
  const { cssCode } = useBankContext();

  return (
    <article className={`${styles.root} ${styles[cssCode]}`}>
      <div>
        <h2 className={styles.ownerName}>{bankAccount.owner_name}</h2>
        <p className={`${styles.accountNumber} ${styles[cssCode]}`}>
          {bankAccount.account_number}
        </p>
      </div>
      <span
        className={`fas fa-chevron-right ${styles.iconRight} ${styles[cssCode]}`}
      />
    </article>
  );
}
