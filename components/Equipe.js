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
        <title>CSF</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="-mt-40 pb-10 border-b-8 border-black">
        <Header2/>

        <h1 className="flex text-2xl md:text-2xl font-bold p-10 border-b-8 border-black gap-4 items-center">
          <RiPlantFill />
          {equipe.heading}
        </h1>

        <div className="pl-10 pt-10 prose prose-sm md:prose-lg">
        
          <div className='flex flex-col gap-8'>
            {equipe.areas.map((item) => (
              <div key={item.title}>
                <strong>{item.title}</strong>
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
