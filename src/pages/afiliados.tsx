import {
  ConnectWallet, // Componente para conectar a carteira
  MediaRenderer, // Componente para renderizar mídia (como imagens)
  useContract, // Hook para acessar um contrato inteligente
  useContractMetadata, // Hook para acessar metadados de um contrato inteligente
  useUser, // Hook para acessar informações do usuário
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getUser } from "../../auth.config"; // Função para obter informações do usuário autenticado
import { contractAddress } from "../../const/yourDetails"; // Endereço do contrato inteligente
import { Header } from "../components/Header"; // Componente de cabeçalho
import styles from "../styles/Home.module.css"; // Estilos CSS para a página
import checkBalance from "../util/checkBalance"; // Função para verificar o saldo

export default function Home() {
  const { isLoggedIn, isLoading } = useUser(); // Obtém informações sobre o estado de login do usuário
  const router = useRouter(); // Hook para acessar o objeto de roteamento do Next.js
  const { contract } = useContract(contractAddress); // Obtém o contrato inteligente com base no endereço fornecido
  const { data: contractMetadata, isLoading: contractLoading } =
    useContractMetadata(contract); // Obtém os metadados do contrato inteligente

  useEffect(() => {
    // Redireciona o usuário para a página de login se não estiver logado e não estiver carregando
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  return (
    <div className={styles.container}>
      <Header showConnectWalletLink={true} /> {/* Renderiza o componente de cabeçalho */}
      <h2 className={styles.heading}>Índice </h2> {/* Título da página */}
      <h1 className={styles.h1}>Autenticação</h1>{" "}
      {/* Título principal da seção de autenticação */}
      <p className={styles.explain}>
        Carteira de TESTE <br />
        sua coleção, usando{" "}
        <a
          className={styles.link}
          href="https://portal.thirdweb.com/auth"
          target="_blank"
          rel="noopener noreferrer"
        >
          Autenticação
        </a>
        .{" "}
      </p>
      <div className={styles.card}>
        <h3>Exclusivo desbloqueado</h3>
        <p>Carteira de TESTE.</p>

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
              <p>{contractMetadata.description}</p>
              <p>{contractMetadata.symbol}</p>
            </div>
          </div>
        )}
        {contractLoading && <p>Carregando...</p>}

        <ConnectWallet theme="dark" className={styles.connect} />
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

  // Se eles tiverem um NFT, redireciona-os para a página index
  if (hasNft) {
    return {
      redirect: {
        destination: "/buyNft",
        permanent: false,
      },
    };
  }
  if (hasNft) {
    return {
      redirect: {
        destination: "/afiliados",
        permanent: false,
      },
    };
  }

  // Finalmente, retorna as props
  return {
    props: {},
  };
}
