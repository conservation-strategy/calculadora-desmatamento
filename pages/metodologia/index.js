"use client"

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Metodologia from "../../components/Metodologia"

export default function Layout() {
  return (
    <div
      className="bg-auto bg-center pb-10"
      //style={{ backgroundImage: `url("/images/bg1_blur.jpg")` }}
    >
      <div className="flex flex-col min-h-screen mx-auto bg-white bg-opacity-100">
        {/* <Navbar /> */}
        <Metodologia />
        {/* <Footer /> */}
      </div>
    </div>
  )
}
