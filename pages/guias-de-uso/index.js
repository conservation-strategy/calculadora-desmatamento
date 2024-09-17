"use client"

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Guias from "../../components/Guias"

// PROX PASSO AQUI: consertar margem em telas grandes
export default function Layout() {
  return (
    <div
      className="bg-auto bg-center"
      //style={{ backgroundImage: `url("/images/bg1_blur.jpg")` }}
    >
      <div className="flex flex-col mx-auto bg-neutral100 bg-opacity-100">
        {/* <Navbar /> */}
        <Guias />
        {/* <Footer /> */}
      </div>
    </div>
  )
}
