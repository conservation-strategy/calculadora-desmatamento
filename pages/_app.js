import Layout from '../components/Layout'
import '../styles/globals.css';
import { AppContextProvider } from '../context/provider';
import { GoogleAnalytics } from 'nextjs-google-analytics'

export default function App({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Layout>
        <GoogleAnalytics trackPageViews />
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  )
}
