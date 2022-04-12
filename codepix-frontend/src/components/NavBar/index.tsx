import Link from "next/link";
import { useBankContext } from "../../contexts/BankContext";
import { BankAccount } from "../../shared/types";
import styles from "./nav-bar.module.scss";

export function NavBar() {
  const { cssCode, code, name } = useBankContext();

  return (
    <nav
      className={`${styles.root} ${styles[cssCode]}  navbar navbar-expand-lg`}
    >
      <div className={`${styles.navbarBody} container-fluid`}>
        <Link href="/bank-accounts">
          <a className={`${styles.navbarBrand} navbar-brand`} href="#">
            <img
              className={styles.logoBank}
              src="/img/icon_banco.png"
              alt="logo"
            />

            <div className={styles.bankName}>
              <span>Cod - {code}</span>
              <h2>{name}</h2>
            </div>
          </a>
        </Link>

        <div
          className={`${styles.navbarRightRoot} collapse navbar-collapse`}
          id="navbarSupportedContent"
        >
          <ul className={`${styles.navbarRightBody} navbar-nav`}>
            <li className={`${styles.bankAccountInfo} nav-item`}>
              <img
                className={styles.iconUser}
                src="/img/icon_user.png"
                alt="user avatar"
              />
              <p className={styles.ownerName}>oi</p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
