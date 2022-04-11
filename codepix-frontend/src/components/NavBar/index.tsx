import styles from "./nav-bar.module.scss";

export function NavBar() {
  return (
    <nav
      className={`${styles.root} ${styles.bank001}  navbar navbar-expand-lg`}
    >
      <div className={`${styles.navbarBody} container-fluid`}>
        <a className={`${styles.navbarBrand} navbar-brand`} href="#">
          <img
            className={styles.logoBank}
            src="/img/icon_banco.png"
            alt="logo"
          />
          <div className={styles.bankName}>
            <span>Cod - 001</span>
            <h2>BBX</h2>
          </div>
        </a>

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
              <p className={styles.ownerName}>Prop | C/C: N</p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
