"use client"

import Head from "next/head"
import Button from "@mui/material/Button"
import { RiPlantLine } from "react-icons/ri/"
import { useContext } from "react"
import { Language, ENGLISH } from "../context/provider"
import React from "react"
import Image from "next/image"
import { IconChartPie, IconPlant, IconTimeline } from '@tabler/icons-react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { content, language } = useContext(Language);
  const { home } = content;
  
  return (
    <>
      <Head>
        <title>Deforestation Impacts Calculator | Learn More</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Meta Tags for SEO */}
        <meta name="description" content="Learn about the Deforestation Impacts Calculator, a valuation tool for the social and
environmental damages caused by deforestation in the Amazon. Try it now!" />
        {/* <meta name="keywords" content="calculadora, desmatamento, impactos, ambiente, ecossistema" /> */}

        {/* Open Graph Tags (for social sharing) */}
        <meta property="og:title" content="Deforestation Impacts Calculator | Learn More" />
        <meta property="og:description" content="Learn about the Deforestation Impacts Calculator, a valuation tool for the social and
environmental damages caused by deforestation in the Amazon. Try it now!" />
        <meta property="og:image" content="https://deforestationcalculator.conservation-strategy.org/images/logo-fundo2.png" />
        <meta property="og:url" content="https://deforestationcalculator.conservation-strategy.org/" />
        <meta property="og:type" content="website" />
      </Head>

      <main className="mt-0">
        <div
          className={`bg-cover bg-center px-0 lg:px-0 bg-black relative ${styles.hero}`}
          style={{ backgroundImage: `url("/images/banner2.jpg")`}}
        >
          <div className={styles.filter}></div>
          <div className={`w-full flex max-[500px]:px-8 px-14 items-center justify-center h-full`}>
            <div className="w-full max-w-screen-sm md:max-w-screen-2xl mx-auto flex flex-col items-center justify-between text-[#FCF8F7] gap-10 lg:gap-10 tracking-wide">
              <h1 className={`text-balance text-2xl md:text-4xl font-light text-left mb-2 pt-0 text-center z-10 lg:max-w-[45ch]`} style={{ ...(language === ENGLISH ? {lineHeight: '135%'} : {lineHeight: '135%'}) }}>
                {home.hero.text.article + " "}
                <span className="font-bold">
                  {home.hero.text.name}
                </span>{" "}
                {home.hero.text.description}
              </h1>
              <div className={`${styles.buttons__container} z-10`}>
                <Button
                  sx={{
                    borderRadius: '3px',
                    backgroundColor: "#558448",
                    "&:hover": {
                      backgroundColor: "#40615C",
                    },
                    padding: {
                      xs: "12px 24px",
                      sm: "16px 32px"
                    },
                    color: "#FCF8F7",
                    fontWeight: "600",
                    letterSpacing: "0.035em",
                    whiteSpace: 'nowrap',
                    fontSize: '1rem',
                    '@media (max-width: 469px)': {
                      padding: "12px 28px",
                    },
                    '@media (max-width: 420px)': {
                      width: '100%',
                    }
                  }}
                  variant="contained"
                  color="primary"
                  size="large"
                  href="/guias-de-uso"
                  target="_self"
                >
                  {home.hero.button_1}
                </Button>
                <Button
                  sx={{
                    borderRadius: '3px',
                    backgroundColor: "#558448",
                    "&:hover": {
                      backgroundColor: "#40615C",
                    },
                    padding: {
                      xs: "12px 24px",
                      sm: "16px 32px"
                    },
                    color: "#FCF8F7",
                    fontWeight: "600",
                    letterSpacing: "0.035em",
                    fontSize: '1rem',
                    '@media (max-width: 469px)': {
                      padding: "12px 28px",
                    },
                    '@media (max-width: 420px)': {
                      width: '100%',
                    }
                  }}
                  variant="contained"
                  color="primary"
                  size="large"
                  href="/calculadora"
                  target="_self"
                >
                  {home.hero.button_2}
                </Button>
              </div>
            </div>
          </div>
          
        </div>

        <div className="w-full px-12 md:px-16 max-[500px]:px-8 bg-darkGreen"> 
          <h1 className={`mx-auto max-w-screen-sm md:max-w-screen-2xl flex font-bold py-16 md:py-20 gap-4 items-center`}>
            <span className="pl-5 border-l-[6px] border-neutral100 text-neutral100 text-[1.2rem] min-[375px]:text-2xl min-[430px]:text-3xl min-[375px]:leading-[2.5rem]">{home.main.section_1.heading}</span>
          </h1>
        </div>

        <div className={`pb-20 px-[5.5rem] max-[500px]:px-8 flex flex-col lg:flex-row mx-0 lg:mx-auto pt-0 justify-between items-stretch gap-0 md:gap-0 bg-darkGreen text-neutral100`}>
          <div className={`w-full flex flex-col md:flex-row gap-16 min-[1025px]:gap-20 mx-auto justify-between md:max-w-screen-2xl xl:px-14`}>
            <div className={`flex flex-col gap-4 max-w-[40ch] md:max-w-[32ch] `}>
              <IconPlant size={80} strokeWidth={1} />
              <span className={`text-lg min-[1025px]:text-xl min-[1025px]:leading-[2.2rem] font-medium leading-[2.1rem] lg:leading-[2.1rem]`}>
                {home.main.section_1.description.list[0]}
              </span>
            </div>
            <div className={`flex flex-col gap-4 max-w-[40ch] md:max-w-[32ch] `}>
              <IconChartPie size={80} strokeWidth={1} />
              <span className={`text-lg min-[1025px]:text-xl min-[1025px]:leading-[2.2rem] font-medium leading-[2.1rem] lg:leading-[2.1rem]`}>
                {home.main.section_1.description.list[0]}
              </span>
            </div>
            <div className={`flex flex-col gap-4 max-w-[40ch] md:max-w-[32ch] `}>
              <IconTimeline size={80} strokeWidth={1} />
              <span className={`text-lg min-[1025px]:text-xl min-[1025px]:leading-[2.2rem] font-medium leading-[2.1rem] lg:leading-[2.1rem]`}>
                {home.main.section_1.description.list[0]}
              </span>
            </div>
          </div>
        </div>

        {/* <h1 className={`flex text-2xl md:text-2xl font-bold p-10 gap-4 items-center ${styles.section__title}`}>
          {home.main.section_2.heading}
        </h1> */}

        <div className="w-full px-12 md:px-16 max-[500px]:px-8 bg-neutral100"> 
          <h1 className={`mx-auto max-w-screen-sm md:max-w-screen-2xl flex font-bold py-16 md:py-20 gap-4 items-center`}>
            <span className="pl-5 border-l-[6px] border-darkGreen text-darkGreen text-[1.2rem] min-[375px]:text-2xl min-[430px]:text-3xl min-[375px]:leading-[2.5rem]">{home.main.section_2.heading}</span>
          </h1>
        </div>

        <div className={`w-full flex flex-col items-center bg-neutral100`}>
          <div className={`flex flex-col lg:flex-row gap-20 px-[5.5rem] max-[500px]:px-8 max-[424px]:gap-14`}>
            <div className="w-full flex flex-col justify-start items-start p-6 sm:p-12 sm:py-6 bg-neutral200 gap-4 shadow-none lg:max-w-[55ch]">
              <div className="flex flex-col items-start">
                {/* <img className="h-32 mx-auto pt-8" src="/images/ico1.svg" /> */}
                <Image
                  className=" pt-8"
                  src="/images/restauracao.png"
                  alt="Restauração"
                  width={88}
                  height={88}
                  // sizes="(max-width: 1024px) 40px, 64px"
                  priority
                />
                {/* <div className="w-1/2 lg:w-2/3 mx-auto text-2xl xl:text-3xl font-bold mt-0 border-b-2 border-black px-4 py-4 text-center"> */}
                <div className={`w-full mx-auto text-2xl font-bold mt-0 py-4 text-left ${styles.section__title}`}>
                  {home.main.section_2.subsection_1.title}
                </div>
              </div>
              <div className={`text-left prose prose-lg pb-4 ${styles.section__body}`}> 
                {home.main.section_2.subsection_1.description}
              </div>
            </div>
            <div className="w-full flex flex-col justify-start items-start p-6 sm:p-12 sm:py-6 bg-neutral200 gap-4 shadow-none lg:max-w-[55ch]">
              <div className="flex flex-col items-start">
                <Image
                  className="pt-[24px]"
                  src="/images/serv-ecossistemicos.png"
                  alt="Serviços ecossistêmicos"
                  width={100}
                  height={100}
                  priority
                />
                <div className={`w-full mx-auto text-2xl font-bold mt-0 py-4 text-left ${styles.section__title}`}>
                  {home.main.section_2.subsection_2.title}
                </div>
              </div>
              <div className={`text-left prose prose-lg pb-4 ${styles.section__body}`}>
                {home.main.section_2.subsection_2.description}
              </div>
            </div>
          </div>

          <div className="w-full mt-6 flex justify-center items-center">
            <Image
              // className="pt-[24px]"
              src="/images/info-home2.svg"
              alt="Infográfico"
              width={1536}
              height={3264.48}
              priority
            />
          </div>
          
        </div>

        
      </main>
    </>
  )
}
