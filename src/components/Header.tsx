/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Header.module.css";

export const Header = ({ showConnectWalletLink }) => {
  return (
    <nav className={styles.header}>
      <Link href="/">
        <img
          src="/thirdweb.svg"
          alt="thirdweb"
          width={52}
          height={32}
          className={styles.logo}
        />
      </Link>
      <Link href="/">Home</Link>
      <Link href="login">Login</Link>
      <Link href="afiliados">Afiliados</Link>
      <Link href="buyNft">Comprar NFT</Link>
      {showConnectWalletLink && <ConnectWallet theme="dark" />}
    </nav>
  );
};
