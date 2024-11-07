"use client";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import styles from "./Nav.module.css";

function CreateUser() {
  alert("Hello from Opret bruger");
}
function LogIn() {
  alert("Hello from Opret bruger");
}

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logoDiv}>
        <a className={`${styles.logo} oswald-medium`} href="/">
          Musik Samspil
        </a>
        <p className={`${styles.logoText} montserrat-regular`}>
          Skabt af DAOS - Dansk Amatørorkester Samvirke
        </p>
      </div>
      <div className={styles.navLinksDiv}>
        <a className={`${styles.navLink} montserrat-bold`} href="/opslag">
          Opslag
        </a>
        <a className={`${styles.navLink} montserrat-bold`} href="/profil">
          Profil
        </a>
        <PrimaryButton color="blue" size="medium" onClick={CreateUser}>
          Opret bruger{" "}
        </PrimaryButton>
        <PrimaryButton color="white" size="medium" onClick={LogIn}>
          {" "}
          Log ind
        </PrimaryButton>
      </div>
    </nav>
  );
}
