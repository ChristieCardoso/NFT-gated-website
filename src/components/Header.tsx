/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ConnectWallet } from "@thirdweb-dev/react";

import styles from "../styles/components.module.css";

export const Header = ({ showConnectWalletLink }) => {
  return (
    <nav className={styles.header}>
      <Link href="/">
        <img
          src="https://res.cloudinary.com/dmvm1mlgv/image/upload/f_auto,q_auto/v1/Landing-Page%20-%20BemJequi/z9ethdzd4sfbicud5dya"
          alt="thirdweb"
          width={92}
          height={82}
        />
      </Link>
      <Link className={styles.link} href="/">Home</Link>
      <Link className={styles.link} href="login">Login</Link>
      <Link className={styles.link} href="members">Membros</Link>
      <Link className={styles.link} href="buyNft">Comprar NFT</Link>
      {showConnectWalletLink && <ConnectWallet theme="dark" />}
    </nav>
  );
};
