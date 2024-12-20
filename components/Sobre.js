"use client"

//import { useState } from "react"
import Head from "next/head"
// import Button from "@mui/material/Button"
import { RiPlantFill } from "react-icons/ri/"
// import Accordion from "@mui/material/Accordion"
// import AccordionSummary from "@mui/material/AccordionSummary"
// import AccordionDetails from "@mui/material/AccordionDetails"
// import Typography from "@mui/material/Typography"
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
// import TextField from "@mui/material/TextField"
// import FormControl from "@mui/material/FormControl"
// import InputLabel from "@mui/material/InputLabel"
// import Select from "@mui/material/Select"
// import MenuItem from "@mui/material/MenuItem"
import Header2 from "./Header2"
import { useContext } from "react"
import { Language } from "../context/provider"

export default function Calculate() {
  const { content } = useContext(Language);
  const { sobre } = content;

  return (
    <>
      <Head>
        <title>Deforestation Impacts Calculator | About</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Meta Tags for SEO */}
        <meta name="description" content="Learn more about the Deforestation Impacts Calculator, developed to assess the social and
environmental damages caused by deforestation in the Amazon." />
        {/* <meta name="keywords" content="calculadora, desmatamento, impactos, ambiente, ecossistema" /> */}

        {/* Open Graph Tags (for social sharing) */}
        <meta property="og:title" content="Deforestation Impacts Calculator | About" />
        <meta property="og:description" content="Learn more about the Deforestation Impacts Calculator, developed to assess the social and
environmental damages caused by deforestation in the Amazon." />
        <meta property="og:image" content="https://deforestationcalculator.conservation-strategy.org/images/logo-fundo1.png" />
        <meta property="og:url" content="https://deforestationcalculator.conservation-strategy.org/sobre" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="-mt-40">
        <Header2 title={sobre.heading} image='images/header2_bg.jpg'/>
        {/* <h1 className="flex text-2xl md:text-2xl font-bold p-10 border-b-8 border-black gap-4 items-center">
          <RiPlantFill />
          {sobre.heading}
        </h1> */}

        <div className="prose prose-sm md:prose-lg max-w-none flex flex-col justify-center items-center ">
          <div className="max-w-screen-sm md:max-w-screen-2xl flex flex-col lg:gap-8 lg:flex-row py-10 md:py-16 mx-10 md:mx-14 ">
            <div className="lg:w-1/4 flex items-center"><h2>{sobre.section_1.heading}</h2></div>
            <div className="lg:w-3/4">
              <p>
                {sobre.section_1.description}
              </p>
              <ol>
                {sobre.section_1.list.map((item, i) => (
                  <li key={i} >{item}</li>
                ))}
              </ol>
            </div>
          </div>
          <div className="w-full px-10 md:px-14 py-10 md:pt-16 md:pb-20 bg-[rgba(227,229,226,0.6)] flex justify-center items-center">
            <div className="max-w-screen-sm md:max-w-screen-2xl">
              <h2>{sobre.section_2.heading}</h2>
              <p className="md:pt-4">
                {sobre.section_2.description}
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
