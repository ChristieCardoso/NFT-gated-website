import Link from "next/link";
import { Header } from "../components/Header";
import styles from "../styles/Home.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <Header showConnectWalletLink={true} />
      <h1 className={styles.h1}>Index </h1>
    </div>
  );
}
