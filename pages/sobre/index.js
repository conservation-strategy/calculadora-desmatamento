"use client"

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Sobre from "../../components/Sobre"

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen mx-auto bg-white bg-opacity-100">
      {/* <Navbar /> */}
      <Sobre />
      {/* <Footer /> */}
    </div>
  )
}
