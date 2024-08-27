import Layout from '../components/Layout'
import '../styles/globals.css';
import { AppContextProvider } from '../context/provider';

export default function App({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  )
}
