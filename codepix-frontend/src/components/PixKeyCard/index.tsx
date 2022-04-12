import { PixKeyCardProps } from "./pix-key-card.types";
import styles from "./pix-key-card.module.scss";
import { useBankContext } from "../../contexts/BankContext";

const getPixKeyKindFormatted = {
  cpf: "CPF",
  email: "E-mail",
};

export function PixKeyCard({ pixKey }: PixKeyCardProps) {
  const { cssCode } = useBankContext();

  return (
    <div className={`${styles.root} ${styles[cssCode]}`}>
      <p className={styles.kind}>{getPixKeyKindFormatted[pixKey.kind]}</p>
      <span className={styles.key}>{pixKey.key}</span>
    </div>
  );
}
