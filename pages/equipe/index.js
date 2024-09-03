"use client"

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Equipe from "../../components/Equipe"

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen mx-auto bg-white bg-opacity-100">
      <Equipe />
    </div>
  )
}
