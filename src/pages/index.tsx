import { Header } from "../components/Header";

import styles from "../styles/page.module.css";

export default function Home() {
  return (
    <div>
      <div className={styles.container}>
        <Header showConnectWalletLink={true} />
        <h1 className={styles.h1}>Home </h1>
      </div>
    </div>
  );
}
