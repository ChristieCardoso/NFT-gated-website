import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  MediaRenderer,
  useContract,
  useContractMetadata,
  useUser,
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { getUser } from "../../auth.config";
import { contractAddress } from "../../const/yourDetails";
import { Header } from "../components/Header";
import checkBalance from "../util/checkBalance";

import styles from "../styles/page.module.css";

export default function Members() {
  const { isLoggedIn, isLoading } = useUser(); // Obtém informações sobre o estado de login do usuário
  const router = useRouter(); // Hook para acessar o objeto de roteamento do Next.js
  const { contract } = useContract(contractAddress); // Obtém o contrato inteligente com base no endereço fornecido
  const { data: contractMetadata, isLoading: contractLoading } = useContractMetadata(contract); // Obtém os metadados do contrato inteligente

  useEffect(() => {
    // Redireciona o usuário para a página de login se não estiver logado e não estiver carregando
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  return (
    <div className={styles.container}>
      <Header showConnectWalletLink={true} />
      <h1 className={styles.h1}>Seja Bem Vindo</h1>{" "}      
      <div className={styles.card}>
        <h3>Passe Exclusivo desbloqueado</h3>
       
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
              <p>Descrição: {contractMetadata.description}</p>
              <p>Símbolo: {contractMetadata.symbol}</p>
            </div>
          </div>
        )}
        {contractLoading && <p>Carregando...</p>}
      </div>
    </div>
  );
}

// Esta função é chamada em cada requisição do lado do servidor
export async function getServerSideProps(context) {
  const user = await getUser(context.req); // Obtém informações do usuário com base no contexto da requisição

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const secretKey = process.env.TW_SECRET_KEY; // Obtém a chave secreta do ambiente

  if (!secretKey) {
    console.log("Variável de ambiente ausente: TW_SECRET_KEY");
    throw new Error("Variável de ambiente ausente: TW_SECRET_KEY");
  }

  // Garante que podemos gerar um token de autenticação usando nossa chave privada SDK instanciada
  const PRIVATE_KEY = process.env.THIRDWEB_AUTH_PRIVATE_KEY;
  if (!PRIVATE_KEY) {
    throw new Error(
      "Você precisa adicionar uma variável de ambiente PRIVATE_KEY."
    );
  }

  // Instancia nosso SDK
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.THIRDWEB_AUTH_PRIVATE_KEY,
    "mumbai",
    { secretKey }
  );

  // Verifica se o usuário possui um NFT
  const hasNft = await checkBalance(sdk, user.address);

  if (!hasNft) {
    return {
      redirect: {
        destination: "/buyNft",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
