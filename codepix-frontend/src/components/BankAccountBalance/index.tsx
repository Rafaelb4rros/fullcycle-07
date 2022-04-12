import { useBankContext } from "../../contexts/BankContext";
import styles from "./bank-account-balance.module.scss";
import { BankAccountBalanceProps } from "./bank-account-balance.types";

export function BankAccountBalance({ balance }: BankAccountBalanceProps) {
  const { cssCode } = useBankContext();

  return (
    <div className={`${styles.root} ${styles[cssCode]}`}>
      <h2>
        Saldo em conta Corrente{" "}
        <span>R$ {balance.toLocaleString("pt-BR")}</span>
      </h2>
    </div>
  );
}
