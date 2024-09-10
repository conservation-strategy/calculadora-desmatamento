"use client"

//import { useState } from "react"
import Head from "next/head";
// import Button from "@mui/material/Button"
import { RiPlantFill } from "react-icons/ri/";
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
import Header2 from "./Header2";
import { useContext } from "react";
import { Language } from "../context/provider";

export default function Calculate() {
  const { content } = useContext(Language);
  const { metodologia } = content;


  return (
    <>
      <Head>
        <title>Calculadora de Impactos do Desmatamento | Metodologia de trabalho</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Meta Tags for SEO */}
        <meta name="description" content="Entenda a metodologia por trás da Calculadora de Impactos do Desmatamento. Descubra
como são feitas as análises de danos ambientais e sociais do desmatamento." />
        {/* <meta name="keywords" content="calculadora, desmatamento, impactos, ambiente, ecossistema" /> */}

        {/* Open Graph Tags (for social sharing) */}
        <meta property="og:title" content="Calculadora de Impactos do Desmatamento | Metodologia de trabalho" />
        <meta property="og:description" content="Entenda a metodologia por trás da Calculadora de Impactos do Desmatamento. Descubra
como são feitas as análises de danos ambientais e sociais do desmatamento." />
        <meta property="og:image" content="https://deforestationcalculator.conservation-strategy.org/images/Principal_Fundo1.png" />
        <meta property="og:url" content="https://deforestationcalculator.conservation-strategy.org/metodologia" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="-mt-40 pb-10">
        <Header2 title={"Metodologia"} image="images/header2_bg.jpg"/>
        {/* <h1 className="flex text-2xl md:text-2xl font-bold p-10 border-b-8 border-black gap-4 items-center">
          <RiPlantFill />
          {metodologia.heading}
        </h1> */}

        <div className="flex justify-center items-center px-14">
          <div className="max-w-screen-sm md:max-w-screen-2xl py-10 md:py-16 prose prose-sm md:prose-lg max-w-none">
          {/* <h2>{metodologia.main.heading}</h2> */}
            <p>
              {metodologia.main.first_paragraph}
            </p>
            <div className="w-full flex justify-center items-center">
              <img src="/images/img1.png"/>
            </div>
            {metodologia.main.paragraphs.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
            <ul>
              {metodologia.main.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p>
              {metodologia.main.last_paragraph}
            </p>
            <p>
              <strong>{metodologia.footnote.heading}</strong>
              <br/>
              {metodologia.footnote.lines.map((item, i) => (
                <span key={i}>
                {item}
                <br/>
                </span>
              ))}
              {/* Conservação Estratégica (CSF) e Center for Climate Crimes Analysis (CCCA) (2022) Caso Casino: A Ligação entre o abastecimento de carne do Grupo Casino. Desmatamento e violações de direitos dos povos que habitam a Terra Indígena Uru-Eu-Wau-Wau na Amazônia Brasileira. 
              <br/>
              Disponível em:
              <br/> */}
              <a href="https://climatecrimeanalysis.org/wp-content/uploads/2022/08/CCCA-CasinoCase-Portuguese.pdf" target="_blank"> <small>https://climatecrimeanalysis.org/wp-content/uploads/2022/08/CCCA-CasinoCase-Portuguese.pdf</small></a>
              {/* <br/>
              <br/>
              Para saber mais, leia nosso relatório metodológico completo de valoração de impactos do desmatamento na Amazônia, aqui. */}

            </p>
          </div>
        </div>
      </div>
    </>
  )
}
