import {
  ConnectWallet,
  MediaRenderer,
  useContract,
  useContractMetadata,
} from "@thirdweb-dev/react";
import { contractAddress } from "../../const/yourDetails";
import { Header } from "../components/Header";

import styles from "../styles/page.module.css";

export default function Login() {
  const { contract } = useContract(contractAddress);
  const { data: contractMetadata, isLoading: contractLoading } = useContractMetadata(contract);

  return (
    <div>
      <Header showConnectWalletLink={true} />
      <div className={styles.container}>
        <h1 className={styles.h1}>Faça seu login</h1>
        <div className={styles.card}>
          {contractMetadata && (
            <div className={styles.nft}>
              <MediaRenderer
                src={contractMetadata.image}
                alt={contractMetadata.name}
                width="100px"
                height="100px"
              />
              <div className={styles.nftDetails}>
                <h4>{contractMetadata.name}</h4>
                {contractMetadata.description && (
                  <p>{contractMetadata.description.substring(0, 100)}...</p>
                )}
                <p>Símbolo: {contractMetadata.symbol}</p>
              </div>
            </div>
          )}
          {contractLoading && <p>Loading...</p>}
          <div className={styles.connect}>
            <ConnectWallet theme="dark" />
          </div>
        </div>
      </div>
    </div>
  );
}
