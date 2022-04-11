import styles from "./bank-account-card.module.scss";
import { BankAccountCardTypes } from "./bank-account-card.types";

export function BankAccountCard({ bankAccount }: BankAccountCardTypes) {
  return (
    <article className={`${styles.root} ${styles.bank001}`}>
      <div>
        <h2 className={styles.ownerName}>{bankAccount.owner_name}</h2>
        <p className={`${styles.accountNumber} ${styles.bank001}`}>
          {bankAccount.account_number}
        </p>
      </div>
      <span
        className={`fas fa-chevron-right ${styles.iconRight} ${styles.bank001}`}
      />
    </article>
  );
}
