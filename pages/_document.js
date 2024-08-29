import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div className="bg-fixed bg-screen bg-contain bg-repeat-x pt-0">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  )
}
