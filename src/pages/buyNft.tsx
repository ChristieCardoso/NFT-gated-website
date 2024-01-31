import { Header } from "../components/Header";

import styles from "../styles/page.module.css";

export default function Buynft() {
  return (
    <div>
      <Header showConnectWalletLink={false} />
      <div className={styles.container}>
        <h1 className={styles.h1}>Compre Seu NFT </h1>
        <iframe
          className={styles.iframe}
          src="https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0x18F5603075FeEfdAdFDd8c0398DB4E3a25975D0A&chain=%7B%22name%22%3A%22Mumbai%22%2C%22chain%22%3A%22Polygon%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fmumbai.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22MATIC%22%2C%22symbol%22%3A%22MATIC%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22maticmum%22%2C%22chainId%22%3A80001%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22mumbai%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9%2Fpolygon%2F512.png%22%2C%22width%22%3A512%2C%22height%22%3A512%2C%22format%22%3A%22png%22%7D%7D&clientId=e892cbea7776b89493b395ee43ab0712&theme=dark&primaryColor=purple"
          width="600px"
          height="600px"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}
