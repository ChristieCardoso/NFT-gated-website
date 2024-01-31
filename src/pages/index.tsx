import { Header } from "../components/Header";
import styles from "../styles/page.module.css";

export default function Home() {
  return (
    <div>
      <Header showConnectWalletLink={true} />
      <div className={styles.container}>
        <h1 className={styles.h1}>Home</h1>
        <p className={styles.description}>
          Este projeto utiliza autenticação baseada em NFTs para controlar o
          acesso à página. A autenticação por NFTs oferece segurança adicional,
          garantindo que apenas os proprietários dos NFTs específicos possam
          acessar o conteúdo exclusivo deste site. Além disso, ao utilizar a
          autenticação por NFTs, os usuários podem desfrutar dos benefícios de
          posse e autenticidade dos NFTs, agregando valor à experiência de
          interação com o site.
        </p>
        <p className={styles.reference}>
          Site de referência:{" "}
          <a href="https://caiovicentino.com.br/" target="_blank">
            https://caiovicentino.com.br/🚀
          </a>
        </p>
        <p className={styles.reference}>
          Link do Contrato:{" "}
          <a href="0x18F5603075FeEfdAdFDd8c0398DB4E3a25975D0A" target="_blank">
            0x18F5603075FeEfdAdFDd8c0398DB4E3a25975D0A
          </a>
        </p>
      </div>
    </div>
  );
}
