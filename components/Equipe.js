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
  const { equipe } = content;

  return (
    <>
      <Head>
        <title>Calculadora de Impactos do Desmatamento | Conheça a equipe</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Meta Tags for SEO */}
        <meta name="description" content="Descubra a equipe responsável pelo desenvolvimento da Calculadora de Impactos do
Desmatamento." />
        {/* <meta name="keywords" content="calculadora, desmatamento, impactos, ambiente, ecossistema" /> */}

        {/* Open Graph Tags (for social sharing) */}
        <meta property="og:title" content="Calculadora de Impactos do Desmatamento | Conheça a equipe" />
        <meta property="og:description" content="Descubra a equipe responsável pelo desenvolvimento da Calculadora de Impactos do
Desmatamento." />
        <meta property="og:image" content="https://deforestationcalculator.conservation-strategy.org/images/logo-fundo3.png" />
        <meta property="og:url" content="https://deforestationcalculator.conservation-strategy.org/equipe" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="-mt-40 pb-10">
        <Header2 title={"Equipe"} image="images/header2_bg.jpg"/>

        {/* <h1 className="flex text-2xl md:text-2xl font-bold p-10 border-b-8 border-black gap-4 items-center">
          <RiPlantFill />
          {equipe.heading}
        </h1> */}

        <div className="max-w-screen-sm md:max-w-screen-2xl mx-auto box-content max-[500px]:px-8 px-14 py-10 md:py-16 prose prose-sm md:prose-lg max-w-none">
        
          <div className='flex flex-col gap-8 text-balance'>
            {equipe.areas.map((item) => (
              <div key={item.title}>
                <span className="text-xl md:text-2xl font-bold">{item.title}</span>
                <br/>
                {item.team.map((member) => (
                  <div key={item.title + member}>
                  {member}
                  <br/>
                  </div>
                ))}
              </div>
            ))}
            {/* <div>
            <strong>Concepção e Coordenação Técnica</strong>
            <br/>
            Pedro Gasparinetti
            </div>
            
            <strong>Valoração econômica</strong>
            <br/>
            Pedro Gasparinetti (coordenador geral)
            <br/>
            Leonardo Bakker (analista econômico)
            <br/>
            Victor Araújo (analista de dados)
            
            <strong>Comunicação, redação, imprensa</strong>
            <br/>
            Luisa Turbay
            
            <strong>Website</strong>
            <br/>
            Desenvolvimento
            <br/>
            Linze User Experience
            
            <strong>Design</strong>
            <br/>
            Carlos Eduardo Veloso
            
            <strong>Ilustrações</strong>
            <br/>
            Thaís Erre
            
            <strong>Roteiros</strong>
            <br/>
            Luisa Turbay
            
            <strong>Imagens</strong>
            <br/>
            Freepik
            
            <strong>Financiamento</strong>
            <br/>
            Open Society */}
                      
          </div>

        </div>

      </div>
    </>
  )
}
