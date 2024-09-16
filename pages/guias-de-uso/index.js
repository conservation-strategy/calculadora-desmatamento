"use client"

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Guias from "../../components/Guias"

export default function Layout() {
  return (
    <div
      className="bg-auto bg-center"
      //style={{ backgroundImage: `url("/images/bg1_blur.jpg")` }}
    >
      <div className="flex flex-col min-h-screen max-w-screen-sm md:max-w-screen-2xl mx-auto bg-white bg-opacity-100">
        {/* <Navbar /> */}
        <Guias />
        {/* <Footer /> */}
      </div>
    </div>
  )
}
