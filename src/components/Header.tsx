/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";

import styles from "../styles/header.module.css";

export const Header = ({ showConnectWalletLink }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <nav className={styles.header}>
      <Link href="/">
        <img
          src="https://res.cloudinary.com/dmvm1mlgv/image/upload/f_auto,q_auto/xeh85vuil3bxqtiu8o36"
          alt="Logo Pass"
          className={styles.logo}
        />
      </Link>
      <div className={styles.container_link}>
        <Link className={styles.link} href="/">Home</Link>
        <Link className={styles.link} href="login">Login</Link>
        <Link className={styles.link} href="members">Membros</Link>
        <Link className={styles.link} href="buyNft">Comprar NFT</Link>
      </div>
      {showConnectWalletLink && <ConnectWallet theme="dark" />}

      <div className={styles.navbar_mobile}>
        <GiHamburgerMenu style={{ cursor: "pointer" }} color="#fff" fontSize={27} onClick={() => setToggleMenu(true)}/>
        {toggleMenu && (
          <div className={styles.navbar_mobile_overlay}>
            <IoCloseOutline fontSize={27} className={styles.navbar_mobile_overlay_close} onClick={() => setToggleMenu(false)}/>
            <ul className={styles.navbar_mobile_links}>
              <li><a href={"/"}>Home</a></li>
              <li><a href="login">Login</a></li>
              <li><a href="members">Membros</a></li>
              <li><a href="buyNft">Comprar NFT</a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
