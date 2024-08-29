"use client"
import Home from "../components/Home"

export default function Layout() {
  return (
    // <div className="flex flex-col min-h-screen max-w-screen-sm md:max-w-screen-2xl mx-auto border-black bg-white bg-opacity-100">
    <div className="flex flex-col min-h-screen mx-auto border-black bg-white bg-opacity-100">
      <Home />
    </div>
  )
}