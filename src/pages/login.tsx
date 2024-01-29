import {
  ConnectWallet,
  MediaRenderer,
  useContract,
  useContractMetadata,
} from "@thirdweb-dev/react";
import Link from "next/link";
import { contractAddress } from "../../const/yourDetails";
import { Header } from "../components/Header";
import styles from "../styles/Home.module.css";

export default function Login() {
  const { contract } = useContract(contractAddress);
  const { data: contractMetadata, isLoading: contractLoading } =
    useContractMetadata(contract);

  return (
    <div className={styles.container}>
      <Header showConnectWalletLink={true} />
      <div className={styles.card}>
        <h3>Holder exclusive</h3>
        <p>To unlock this product, you need:</p>

        {contractMetadata && (
          <div className={styles.nft}>
            <MediaRenderer
              src={contractMetadata.image}
              alt={contractMetadata.name}
              width="70px"
              height="70px"
            />
            <div className={styles.nftDetails}>
              <h4>{contractMetadata.name}</h4>
              {contractMetadata.description && (
                <p>{contractMetadata.description.substring(0, 100)}...</p>
              )}
            </div>
          </div>
        )}
        {contractLoading && <p>Loading...</p>}

        <ConnectWallet theme="dark" className={styles.connect} />
      </div>
    </div>
  );
}
