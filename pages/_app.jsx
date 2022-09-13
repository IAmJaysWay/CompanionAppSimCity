import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import styles from "./styles.module.css";
import { useRouter } from 'next/router';

const { Header, Content, Footer } = Layout;
const githubLink = "https://github.com/MoralisWeb3/web3-unity-sdk-sample-game-scw"

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

function MyApp({ Component, pageProps }) {

    const { push } = useRouter();
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Layout className={styles.container}>
          <Header className={styles.header}>Sim City Web3 Companion App</Header>
          <Content className={styles.content}>
            <Component {...pageProps} />
          </Content>
          <Footer className={styles.footer}>
            <div className={styles.menuItem} onClick={()=>window.open(githubLink)}>Github</div>
            <div className={styles.menuItem} onClick={()=>push('/')}>Home</div>
            <div className={styles.menuItem} onClick={()=>push('/authenticate')}>Authenticate</div>
            <div className={styles.menuItem} onClick={()=>push('/list')}>List</div>
          </Footer>
        </Layout>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
