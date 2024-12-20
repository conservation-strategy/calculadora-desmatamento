"use client"

import { useContext, useState } from "react"
import Head from "next/head"
import Button from "@mui/material/Button"
import { RiPlantFill } from "react-icons/ri/"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Header2 from "./Header2"
import { Language } from "../context/provider"

export default function Guias() {
  const { content } = useContext(Language);
  const { calculadora } = content;

  return (
    <>
      <Head>
        <title>Deforestation Impacts Calculator | User Guide</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Meta Tags for SEO */}
        <meta name="description" content="Follow our user guide and learn how to use the Deforestation Impacts Calculator. Evaluate
the environmental damages caused by deforestation." />
        {/* <meta name="keywords" content="calculadora, desmatamento, impactos, ambiente, ecossistema" /> */}

        {/* Open Graph Tags (for social sharing) */}
        <meta property="og:title" content="Deforestation Impacts Calculator | User Guide" />
        <meta property="og:description" content="Follow our user guide and learn how to use the Deforestation Impacts Calculator. Evaluate
the environmental damages caused by deforestation." />
        <meta property="og:image" content="https://deforestationcalculator.conservation-strategy.org/images/logo-fundo3.png" />
        <meta property="og:url" content="https://deforestationcalculator.conservation-strategy.org/guias-de-uso" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="-mt-40">
        <Header2 title={calculadora.guia.heading} image="images/header2_bg.jpg" />
        <div className="w-full h-full flex flex-col justify-center">
          {/* <div className="w-full pt-16 pb-20 px-12 md:px-16 max-[500px]:px-8 bg-neutral100 text-darkGreen">
            <div className="p-8 px-10 bg-[#717171] text-neutral100 flex flex-col gap-4 w-1/2">
              <h1 className={`max-w-screen-sm md:max-w-screen-2xl flex text-2xl justify-start font-bold`}>
                <span className=" min-[375px]:text-[1.75rem] min-[430px]:text-3xl min-[375px]:leading-[2.5rem]">Sumário</span>
              </h1>

              <div className="px-6 flex flex-col gap-4 max-w-[95ch]">
                <ol className="flex flex-col gap-4 mt-4 leading-8 text-lg ">
                  <li>1. {calculadora.guia.local.title}</li>
                  <li>2. {calculadora.guia.app.title}</li>
                  <li>3. {calculadora.guia.recreacao.title}</li>
                  <li>4. {calculadora.guia.legalidade.title}</li>
                  <li>5. {calculadora.guia.restauracao.title}</li>
                  <li>6. {calculadora.guia.uso.title}</li>
                </ol>
              </div>
            </div>
          </div> */}
          <div className="w-full px-12 md:px-16 max-[500px]:px-8 bg-neutral100 text-extraDarkGreen"> 
            <div className="w-full max-w-screen-sm md:max-w-screen-2xl mx-auto">
              <h1 className={`flex font-bold pt-16 pb-12 gap-4 items-center`}>
                <span className="pl-4 border-l-[6px] border-extraDarkGreen text-[1.3rem] min-[375px]:text-2xl min-[430px]:text-2xl min-[375px]:leading-[2.5rem]">{calculadora.guia.local.title}</span>
              </h1>
              <div className={`pb-20 min-[375px]:px-5 max-w-[95ch] 2xl:max-w-none text-base min-[425px]:text-lg leading-8`}>
                <div className="leading-8">
                  <span>{calculadora.guia.local.intro}</span>
                  <ul className="px-10 flex flex-col gap-1 my-4 list-disc leading-8">
                    {calculadora.guia.local.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <span>{calculadora.guia.local.conclusion}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-12 md:px-16 max-[500px]:px-8 bg-neutral200 text-extraDarkGreen"> 
            <div className="w-full max-w-screen-sm md:max-w-screen-2xl mx-auto">
              <h1 className={`mx-auto max-w-screen-sm md:max-w-screen-2xl flex font-bold pt-16 pb-12 gap-4 items-center`}>
                <span className="pl-4 border-l-[6px] border-extraDarkGreen text-[1.3rem] min-[375px]:text-2xl min-[430px]:text-2xl min-[375px]:leading-[2.5rem]">{calculadora.guia.app.title}</span>
              </h1>
              <div className={`pb-20 min-[375px]:px-5 max-w-[95ch] 2xl:max-w-none text-base min-[425px]:text-lg leading-9`}>
                <div className="leading-8">
                  {calculadora.guia.app.description[0]}
                  <br/>
                  <br/>
                  {calculadora.guia.app.description[1]}
                  <br/>
                  <br/>
                  <span className="leading-4"><small> Gasparinetti, P.; Burner, A.; Vilela, T (2017) Definição de níveis de equivalência ecológica para a lei de compensação florestal do DF segundo o método de experimento de escolha. Conservação Estratégica. Série Técnica- Edição 51.</small></span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-12 md:px-16 max-[500px]:px-8 bg-neutral100 text-extraDarkGreen"> 
            <div className="w-full max-w-screen-sm md:max-w-screen-2xl mx-auto">
              <h1 className={`mx-auto max-w-screen-sm md:max-w-screen-2xl flex font-bold pt-16 pb-12 gap-4 items-center`}>
                <span className="pl-4 border-l-[6px] border-extraDarkGreen text-[1.3rem] min-[375px]:text-2xl min-[430px]:text-2xl min-[375px]:leading-[2.5rem]">{calculadora.guia.recreacao.title}</span>
              </h1>
              <div className={`pb-20 min-[375px]:px-5 max-w-[95ch] 2xl:max-w-none text-base min-[425px]:text-lg leading-8`}>
                <div className="leading-8">
                  <span>
                    {calculadora.guia.recreacao.description[0]}
                  </span>
                  <br/>
                  <br/>
                  <span>{calculadora.guia.recreacao.description[1]}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-12 md:px-16 max-[500px]:px-8 bg-neutral200 text-extraDarkGreen"> 
            <div className="w-full max-w-screen-sm md:max-w-screen-2xl mx-auto">
              <h1 className={`mx-auto max-w-screen-sm md:max-w-screen-2xl flex font-bold pt-16 pb-12 gap-4 items-center`}>
                <span className="pl-4 border-l-[6px] border-extraDarkGreen text-[1.3rem] min-[375px]:text-2xl min-[430px]:text-2xl min-[375px]:leading-[2.5rem]">{calculadora.guia.legalidade.title}</span>
              </h1>
              <div className={`pb-20 min-[375px]:px-5 max-w-[95ch] 2xl:max-w-none text-base min-[425px]:text-lg leading-8`}>
                <div className="leading-8">
                  <span>
                    {calculadora.guia.legalidade.description}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-12 md:px-16 max-[500px]:px-8 bg-neutral100 text-extraDarkGreen"> 
            <div className="w-full max-w-screen-sm md:max-w-screen-2xl mx-auto">
              <h1 className={`mx-auto max-w-screen-sm md:max-w-screen-2xl flex font-bold pt-16 pb-12 gap-4 items-center`}>
                <span className="pl-4 border-l-[6px] border-extraDarkGreen text-[1.3rem] min-[375px]:text-2xl min-[430px]:text-2xl min-[375px]:leading-[2.5rem]">{calculadora.guia.restauracao.title}</span>
              </h1>
              <div className={`pb-20 min-[375px]:px-5 max-w-[95ch] 2xl:max-w-none text-base min-[425px]:text-lg leading-8`}>
                <div className="leading-8">
                  <span className="font-bold">{calculadora.guia.restauracao.name[0]}</span>
                  {calculadora.guia.restauracao.description[0]}
                    <br/>
                    <br/>
                  <span className="font-bold">{calculadora.guia.restauracao.name[1]}</span>
                  {calculadora.guia.restauracao.description[1]}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-12 md:px-16 max-[500px]:px-8 bg-neutral200 text-extraDarkGreen"> 
            <div className="w-full max-w-screen-sm md:max-w-screen-2xl mx-auto">
              <h1 className={`mx-auto max-w-screen-sm md:max-w-screen-2xl flex font-bold pt-16 pb-12 gap-4 items-center`}>
                <span className="pl-4 border-l-[6px] border-extraDarkGreen text-[1.3rem] min-[375px]:text-2xl min-[430px]:text-2xl min-[375px]:leading-[2.5rem]">{calculadora.guia.uso.title}</span>
              </h1>
              <div className={`pb-20 min-[375px]:px-5 max-w-[95ch] 2xl:max-w-none text-base min-[425px]:text-lg leading-8`}>
                <div className="leading-8">
                  <span>{calculadora.guia.uso.description}</span>
                  <ol className="px-10 flex flex-col gap-1 mt-4 list-decimal">
                    {calculadora.guia.uso.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
