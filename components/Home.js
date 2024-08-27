"use client"

import Head from "next/head"
import Button from "@mui/material/Button"
import { RiPlantLine } from "react-icons/ri/"
import { useContext, useState } from "react"
import { Language, ENGLISH } from "../context/provider"
import React from "react"
import Image from "next/image"
import styles from '../styles/Home.module.css';

export default function Home() {
  const { content, language } = useContext(Language);
  const { home } = content;
  const [showVideo, setShowVideo] = useState(false);
  console.log('showVideo', showVideo)
  return (
    <>
      <Head>
        <title>CSF</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-0">
        <div
          className={`xl:pt-32 bg-cover bg-center px-0 lg:px-0 bg-black relative ${styles.hero}`}
          style={{ backgroundImage: `url("/images/banner2.jpg")`}}
        >
          <div className={styles.filter}></div>
          <div className={`flex mx-auto px-4 items-center border-b-8 border-black h-full`}>
            <div className="flex flex-col w-full items-start justify-between text-[#FCF8F7] pt-16 lg:pt-38 pb-10 px-4 lg:px-10 lg:pb-10 gap-10 lg:gap-10 tracking-wide">
              <h1 className={`text-2xl md:text-4xl font-light text-left mb-0 pt-0 md:w-2/3 xl:w-1/2 z-10`} style={{ ...(language === ENGLISH ? {lineHeight: '135%'} : {lineHeight: '125%'}) }}>
                {home.hero.text.article + " "}
                <span className="font-bold">
                  {home.hero.text.name}
                </span>{" "}
                {home.hero.text.description}
              </h1>
              <div className={`${styles.buttons__container} z-10`}>
                <Button
                  sx={{
                    backgroundColor: "#6AA65B",
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
                    '@media (max-width: 469px)': {
                      fontSize: '0.8rem',
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
                    backgroundColor: "#6AA65B",
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
                    '@media (max-width: 469px)': {
                      fontSize: '0.8rem',
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

        <h1 className={`flex text-2xl md:text-2xl font-bold p-10 border-b-8 border-black gap-4 items-center ${styles.section__title}`}>
          <RiPlantLine strokeWidth="0.5" size={28} style={{ minWidth: '28px' }} />
          {home.main.section_1.heading}
        </h1>

        <div className={`flex flex-col lg:flex-row mx-0 lg:mx-auto pt-0 justify-between items-stretch gap-0 md:gap-0`}>
          <div className="w-full lg:w-1/2 p-10 lg:border-r-8 border-black">
            <div className={`prose prose-lg leading-normal ${styles.section__body}`}>
              <p>
                {home.main.section_1.description.intro}
              </p>
              <div className="">
                <ul className="flex flex-col pl-4 border-l-0 border-black">
                  {home.main.section_1.description.list.map((item, i) => (
                    <li key={i} className="mb-0 font-bold">{item}</li>
                  ))}
                  {/* <li className="mb-0 font-bold">
                    Estimar valores de danos ambientais para apoiar a
                    definição de compensações e indenizações;
                  </li>
                  <li className="mb-0 font-bold">
                    Estimar níveis eficientes de investimentos para
                    planejamento e prevenção de impactos;
                  </li>
                  <li className="mb-0 font-bold">
                    Estimar receitas potenciais que o Estado poderia ter com
                    seus ativos florestais.
                  </li> */}
                </ul>
              </div>

              <p className="mt-4">
                {home.main.section_1.description.conclusion}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center w-full lg:w-1/2 bg-black border-t-8 lg:border-t-0 border-black">
            {!showVideo
              ? <div className="flex items-center w-full h-full bg-white max-w-[943px] cursor-pointer" onClick={() => setShowVideo(true)}>
                  <img
                  width='100%'
                  height='100%'
                  alt='video'
                  src='images/video_placeholder.png'
                  />
                </div>
              : <div style={{ aspectRatio: 16 / 9, width: '100%', maxWidth: '943px' }}>
                  <iframe
                    width='100%'
                    height='100%'
                    src="https://www.youtube.com/embed/kJxyPxpZPDU?si=iFAxGlzFzTU8-uyK" 
                    title="YouTube video player" 
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                  ></iframe>
                </div>
            }
          </div>
        </div>

        <h1 className={`flex text-2xl md:text-2xl font-bold p-10 border-t-8 border-black gap-4 items-center ${styles.section__title}`}>
          <RiPlantLine strokeWidth="0.5" size={28} style={{ minWidth: '28px' }} /> {home.main.section_2.heading}
        </h1>

        <div className="mt-0 pt-0 pb-0 px-4 lg:px-0 border-y-8 border-black">
          <div className="mx-auto p-0">
            <div className="flex flex-col lg:flex-row justify-between p-0 gap-0">
              <div className="flex flex-col justify-start items-start p-6 sm:p-12 bg-white border-b-4 lg:border-b-0 lg:pb-0 gap-4 shadow-none lg:w-1/2 lg:border-r-0 border-black">
                <div className="flex flex-col items-start">
                  {/* <img className="h-32 mx-auto pt-8" src="/images/ico1.svg" /> */}
                  <Image
                    className=" pt-8"
                    src="/images/restauracao.png"
                    alt="CSF Logo"
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

              <div className="flex flex-col justify-start items-start bg-white p-6 sm:p-12 border-0 gap-4 shadow-none lg:w-1/2 lg:border-l-8 border-black">
                <div className="flex flex-col items-start">
                  {/* <img className="h-32 mx-auto pt-8" src="/images/ico2.svg" /> */}
                  <Image
                    // className="mx-auto pt-8 mt-[-26px]"
                    className="pt-[24px]"
                    src="/images/serv-ecossistemicos.png"
                    alt="CSF Logo"
                    width={100}
                    height={100}
                    // sizes="(max-width: 1024px) 40px, 64px"
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
          </div>
        </div>
      </main>
    </>
  )
}
