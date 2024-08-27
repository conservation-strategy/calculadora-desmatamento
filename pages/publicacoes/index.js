"use client"

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Publicacoes from "../../components/Publicacoes"

export default function Layout() {
  return (
    <div
      className="bg-auto bg-center pb-10"
      //style={{ backgroundImage: `url("/images/bg1_blur.jpg")` }}
    >
      <div className="flex flex-col min-h-screen max-w-screen-sm md:max-w-screen-2xl mx-auto border-l-8 border-r-8 border-black bg-white bg-opacity-100">
        {/* <Navbar /> */}
        <Publicacoes />
        {/* <Footer /> */}
      </div>
    </div>
  )
}
